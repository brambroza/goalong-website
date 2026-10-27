"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { ContactRow } from "@/lib/supabase";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  });

/** Every contact-form submission, kept as a backup of the emails sent to the company inbox. */
export function MessageList() {
  const sb = getBrowserClient()!;
  const [rows, setRows] = useState<ContactRow[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    sb.from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) setError(`โหลดข้อความไม่สำเร็จ: ${error.message}`);
        else setRows(data as ContactRow[]);
      });
  }, [sb]);

  async function remove(id: string) {
    if (!window.confirm("ลบข้อความนี้?")) return;
    const { error } = await sb.from("contact_messages").delete().eq("id", id);
    if (error) setError(`ลบไม่สำเร็จ: ${error.message}`);
    else setRows((r) => r?.filter((x) => x.id !== id) ?? null);
  }

  return (
    <section>
      <h1 className="text-[1.5rem] font-semibold">ข้อความติดต่อ</h1>
      <p className="mt-1 text-steel">
        สำเนาของทุกข้อความจากฟอร์มติดต่อ ข้อความถูกส่งเข้าอีเมลบริษัทด้วย
      </p>
      {error && <p role="alert" className="mt-4 text-[#b3402c]">{error}</p>}
      {!rows && !error && <p className="mt-6 text-steel">กำลังโหลด…</p>}
      {rows?.length === 0 && <p className="mt-6 text-steel">ยังไม่มีข้อความ</p>}
      <ul className="mt-6 space-y-4">
        {rows?.map((m) => (
          <li key={m.id} className="rounded-lg border border-rule bg-panel p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">
                {m.name}
                {m.company && <span className="font-normal text-steel"> · {m.company}</span>}
              </p>
              <time className="text-[0.85rem] tabular-nums text-steel">{fmt(m.created_at)}</time>
            </div>
            <p className="mt-1 text-[0.95rem]">
              <a href={`mailto:${m.email}`} className="text-andon-deep underline underline-offset-4">
                {m.email}
              </a>
              {m.phone && (
                <>
                  {" · "}
                  <a href={`tel:${m.phone}`} className="text-andon-deep underline underline-offset-4">
                    {m.phone}
                  </a>
                </>
              )}
            </p>
            {m.topic && <p className="mt-2 text-[0.9rem] text-steel">เรื่อง: {m.topic}</p>}
            <p className="mt-3 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-3 flex items-center justify-between text-[0.85rem]">
              <span className={m.emailed ? "text-andon-deep" : "text-[#b3402c]"}>
                {m.emailed ? "ส่งเข้าอีเมลแล้ว" : "ส่งอีเมลไม่สำเร็จ ตอบกลับลูกค้าจากที่นี่"}
              </span>
              <button onClick={() => remove(m.id)} className="text-steel underline underline-offset-4">
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
