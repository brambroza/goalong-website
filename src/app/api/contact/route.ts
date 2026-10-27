import nodemailer from "nodemailer";
import { validateContact, type ContactInput } from "@/lib/contact";
import { createPublicClient } from "@/lib/supabase";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const CONTACT_TO = process.env.CONTACT_TO || "info@goalong.co.th";

// Light per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function transporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });
}

async function sendEmail(d: ContactInput): Promise<boolean> {
  const tx = transporter();
  if (!tx) {
    console.error("[contact] SMTP is not configured");
    return false;
  }
  const rows: [string, string][] = [
    ["ชื่อ", d.name],
    ["บริษัท", d.company || "-"],
    ["อีเมล", d.email],
    ["โทร", d.phone || "-"],
    ["เรื่อง", d.topic || "-"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${d.message}\n\n— ส่งจากฟอร์มติดต่อ ${site.url}/contact`;
  const html = `
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#56645f">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;margin-top:16px">${escapeHtml(d.message)}</p>
    <p style="font-family:sans-serif;font-size:12px;color:#56645f">ส่งจากฟอร์มติดต่อ ${site.url}/contact · ตอบกลับอีเมลนี้เพื่อตอบลูกค้าได้ทันที</p>`;

  try {
    await tx.sendMail({
      from: { name: "เว็บไซต์ GO Along", address: process.env.SMTP_FROM || process.env.SMTP_USER! },
      to: CONTACT_TO,
      replyTo: { name: d.name, address: d.email },
      subject: `[เว็บไซต์] ${d.topic || "ติดต่อสอบถาม"} — ${d.name}${d.company ? ` (${d.company})` : ""}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error("[contact] send failed:", err);
    return false;
  }
}

async function saveCopy(d: ContactInput, emailed: boolean): Promise<boolean> {
  const sb = createPublicClient();
  if (!sb) return false;
  const { error } = await sb.from("contact_messages").insert({
    name: d.name,
    company: d.company || null,
    email: d.email,
    phone: d.phone || null,
    topic: d.topic || null,
    message: d.message,
    emailed,
  });
  if (error) console.error("[contact] save failed:", error.message);
  return !error;
}

export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  // Bots: filled the hidden field or submitted faster than a person can type.
  if (data.website || (data.startedAt && Date.now() - data.startedAt < 3000)) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "ส่งข้อความบ่อยเกินไป รอสักครู่แล้วลองใหม่ หรือโทร " + site.phone },
      { status: 429 },
    );
  }

  const emailed = await sendEmail(data);
  const saved = await saveCopy(data, emailed);

  if (!emailed && !saved) {
    return Response.json(
      {
        ok: false,
        error: `ส่งข้อความไม่สำเร็จ กรุณาติดต่อทาง LINE ${site.line} หรือโทร ${site.phone}`,
      },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
