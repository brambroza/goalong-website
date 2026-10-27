"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { marked } from "marked";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { PostRow } from "@/lib/supabase";

type Draft = {
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image: string | null;
  published: boolean;
};

const empty: Draft = { title: "", slug: "", description: "", content: "", cover_image: null, published: false };

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_IMAGE_MB = 5;

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PostEditor({
  id,
  session,
  onDone,
  onCreated,
}: {
  id: string | null;
  session: Session;
  onDone: () => void;
  onCreated: (id: string) => void;
}) {
  const sb = getBrowserClient()!;
  const [draft, setDraft] = useState<Draft>(empty);
  const [saved, setSaved] = useState<Draft>(empty);
  const [loading, setLoading] = useState(Boolean(id));
  const [slugTouched, setSlugTouched] = useState(Boolean(id));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState<"" | "save" | "delete" | "upload" | "cover">("");
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  useEffect(() => {
    if (!id) return;
    sb.from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) {
          setMessage({ kind: "error", text: "ไม่พบบทความนี้" });
          return;
        }
        const r = data as PostRow;
        const d: Draft = {
          title: r.title,
          slug: r.slug,
          description: r.description,
          content: r.content,
          cover_image: r.cover_image,
          published: r.published,
        };
        setDraft(d);
        setSaved(d);
      });
  }, [id, sb]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const preview = useMemo(
    () => (tab === "preview" ? marked.parse(draft.content || "_ยังไม่มีเนื้อหา_", { async: false }) : ""),
    [tab, draft.content],
  );

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (key === "title" && !slugTouched) next.slug = toSlug(String(value));
      return next;
    });
  }

  async function revalidate(slug: string) {
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ slug }),
      });
    } catch {
      /* pages still refresh within 5 minutes */
    }
  }

  async function save() {
    setMessage(null);
    if (!draft.title.trim()) return setMessage({ kind: "error", text: "ใส่ชื่อบทความก่อนบันทึก" });
    if (!SLUG_RE.test(draft.slug))
      return setMessage({
        kind: "error",
        text: "ลิงก์บทความ (slug) ใช้ได้เฉพาะ a-z, 0-9 และขีดกลาง เช่น fortigate-ma-guide",
      });

    setBusy("save");
    const payload = { ...draft, title: draft.title.trim(), description: draft.description.trim() };
    const res = id
      ? await sb.from("posts").update(payload).eq("id", id).select("id").single()
      : await sb.from("posts").insert(payload).select("id").single();
    setBusy("");

    if (res.error) {
      const text =
        res.error.code === "23505"
          ? "มีบทความที่ใช้ลิงก์ (slug) นี้แล้ว เปลี่ยนเป็นชื่ออื่น"
          : `บันทึกไม่สำเร็จ: ${res.error.message}`;
      return setMessage({ kind: "error", text });
    }

    setSaved(payload);
    setDraft(payload);
    await revalidate(payload.slug);
    if (saved.slug && saved.slug !== payload.slug) await revalidate(saved.slug);
    setMessage({
      kind: "ok",
      text: payload.published ? "บันทึกแล้ว และเผยแพร่บนเว็บไซต์" : "บันทึกฉบับร่างแล้ว (ยังไม่แสดงบนเว็บไซต์)",
    });
    if (!id && res.data) onCreated((res.data as { id: string }).id);
  }

  async function remove() {
    if (!id) return onDone();
    if (!window.confirm(`ลบบทความ "${draft.title}" ถาวร?`)) return;
    setBusy("delete");
    const { error } = await sb.from("posts").delete().eq("id", id);
    setBusy("");
    if (error) return setMessage({ kind: "error", text: `ลบไม่สำเร็จ: ${error.message}` });
    await revalidate(saved.slug);
    onDone();
  }

  async function upload(file: File): Promise<string | null> {
    if (!file.type.startsWith("image/")) {
      setMessage({ kind: "error", text: "อัปโหลดได้เฉพาะไฟล์รูปภาพ" });
      return null;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setMessage({ kind: "error", text: `รูปต้องมีขนาดไม่เกิน ${MAX_IMAGE_MB} MB` });
      return null;
    }
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb.storage.from("blog").upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
    });
    if (error) {
      setMessage({ kind: "error", text: `อัปโหลดรูปไม่สำเร็จ: ${error.message}` });
      return null;
    }
    return sb.storage.from("blog").getPublicUrl(path).data.publicUrl;
  }

  function insertAtCursor(before: string, after = "", placeholder = "") {
    const el = textarea.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  }

  async function onInlineImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy("upload");
    const url = await upload(file);
    setBusy("");
    if (url) insertAtCursor(`\n![`, `](${url})\n`, file.name.replace(/\.[^.]+$/, ""));
  }

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy("cover");
    const url = await upload(file);
    setBusy("");
    if (url) set("cover_image", url);
  }

  if (loading) return <p className="text-steel">กำลังโหลดบทความ…</p>;

  const descLen = draft.description.length;

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => (!dirty || window.confirm("มีการแก้ไขที่ยังไม่บันทึก ออกจากหน้านี้?")) && onDone()} className="text-steel hover:text-ink">
          ← กลับไปรายการบทความ
        </button>
        <div className="flex items-center gap-3">
          {id && saved.published && (
            <a href={`/blog/${saved.slug}`} target="_blank" rel="noreferrer" className="text-[0.95rem] text-andon-deep underline underline-offset-4">
              ดูหน้าเว็บ
            </a>
          )}
          <button
            onClick={save}
            disabled={busy !== ""}
            className="rounded-md bg-andon px-5 py-2 font-medium text-white hover:bg-andon-deep disabled:opacity-60"
          >
            {busy === "save" ? "กำลังบันทึก…" : "บันทึก"}
          </button>
        </div>
      </div>

      {message && (
        <p
          role={message.kind === "error" ? "alert" : "status"}
          className={`mt-4 rounded-md px-4 py-2.5 text-[0.95rem] ${
            message.kind === "error" ? "bg-[#fbe9e5] text-[#8f2f1f]" : "bg-andon-soft text-andon-deep"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <Field label="ชื่อบทความ" htmlFor="title">
            <input
              id="title"
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              className="w-full rounded-md border border-rule bg-panel px-3 py-2 text-[1.2rem] font-semibold"
              placeholder="เช่น ต่ออายุ MA FortiGate ต้องรู้อะไรบ้าง"
            />
          </Field>

          <div>
            <div className="flex items-end justify-between gap-2">
              <div className="flex gap-1" role="tablist">
                {(["write", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`rounded-t-md border border-b-0 px-3 py-1.5 text-[0.9rem] ${
                      tab === t ? "border-rule bg-panel font-medium" : "border-transparent text-steel"
                    }`}
                  >
                    {t === "write" ? "เขียน" : "ดูตัวอย่าง"}
                  </button>
                ))}
              </div>
              {tab === "write" && (
                <div className="flex flex-wrap gap-1 pb-1 text-[0.85rem]">
                  <ToolButton onClick={() => insertAtCursor("\n## ", "\n", "หัวข้อ")}>หัวข้อ</ToolButton>
                  <ToolButton onClick={() => insertAtCursor("**", "**", "ตัวหนา")}>ตัวหนา</ToolButton>
                  <ToolButton onClick={() => insertAtCursor("\n- ", "", "รายการ")}>รายการ</ToolButton>
                  <ToolButton onClick={() => insertAtCursor("[", "](https://)", "ข้อความลิงก์")}>ลิงก์</ToolButton>
                  <label className="cursor-pointer rounded border border-rule bg-panel px-2 py-1 hover:bg-paper">
                    {busy === "upload" ? "กำลังอัปโหลด…" : "แทรกรูป"}
                    <input type="file" accept="image/*" className="sr-only" onChange={onInlineImage} disabled={busy !== ""} />
                  </label>
                </div>
              )}
            </div>
            {tab === "write" ? (
              <textarea
                ref={textarea}
                value={draft.content}
                onChange={(e) => set("content", e.target.value)}
                rows={22}
                className="w-full rounded-b-md rounded-tr-md border border-rule bg-panel px-4 py-3 font-[inherit] leading-7"
                placeholder={"เขียนเนื้อหาที่นี่\n\n## หัวข้อย่อย\n\nย่อหน้า…\n\n- รายการ 1\n- รายการ 2"}
              />
            ) : (
              <div
                className="prose-ga min-h-[30rem] rounded-b-md rounded-tr-md border border-rule bg-panel px-5 py-4"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            )}
            <p className="mt-1.5 text-[0.85rem] text-steel">
              ใช้รูปแบบ Markdown: <code>## หัวข้อ</code>, <code>**ตัวหนา**</code>, <code>- รายการ</code>,{" "}
              <code>[ข้อความ](ลิงก์)</code>
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-rule bg-panel p-4">
            <label className="flex items-center gap-3 font-medium">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => set("published", e.target.checked)}
                className="size-5 accent-[#1d7f54]"
              />
              เผยแพร่บนเว็บไซต์
            </label>
            <p className="mt-1 text-[0.85rem] text-steel">
              ถ้าไม่ติ๊ก บทความจะเป็นฉบับร่าง เห็นเฉพาะในหน้านี้
            </p>
          </div>

          <Field label="ลิงก์บทความ (slug)" htmlFor="slug" hint={`goalong.co.th/blog/${draft.slug || "…"}`}>
            <input
              id="slug"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              className="w-full rounded-md border border-rule bg-panel px-3 py-2"
              placeholder="fortigate-ma-guide"
            />
          </Field>

          <Field
            label="คำอธิบายสั้น"
            htmlFor="desc"
            hint={`${descLen}/160 ตัวอักษร · แสดงใน Google และตอนแชร์ลิงก์`}
          >
            <textarea
              id="desc"
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className={`w-full rounded-md border bg-panel px-3 py-2 text-[0.95rem] ${
                descLen > 160 ? "border-amber" : "border-rule"
              }`}
            />
          </Field>

          <div>
            <span className="block text-[0.95rem] font-medium">รูปปก</span>
            {draft.cover_image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={draft.cover_image} alt="" className="mt-2 aspect-[16/9] w-full rounded-md border border-rule object-cover" />
                <div className="mt-2 flex gap-3 text-[0.9rem]">
                  <label className="cursor-pointer text-andon-deep underline underline-offset-4">
                    เปลี่ยนรูป
                    <input type="file" accept="image/*" className="sr-only" onChange={onCover} />
                  </label>
                  <button onClick={() => set("cover_image", null)} className="text-steel underline underline-offset-4">
                    เอาออก
                  </button>
                </div>
              </>
            ) : (
              <label className="mt-2 flex aspect-[16/9] cursor-pointer items-center justify-center rounded-md border border-dashed border-rule bg-panel text-[0.95rem] text-steel hover:bg-paper">
                {busy === "cover" ? "กำลังอัปโหลด…" : "เลือกรูปปก (แนะนำ 1600×900)"}
                <input type="file" accept="image/*" className="sr-only" onChange={onCover} />
              </label>
            )}
          </div>

          {id && (
            <button
              onClick={remove}
              disabled={busy !== ""}
              className="text-[0.9rem] text-[#b3402c] underline underline-offset-4 disabled:opacity-60"
            >
              {busy === "delete" ? "กำลังลบ…" : "ลบบทความนี้"}
            </button>
          )}
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-[0.95rem] font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 break-all text-[0.85rem] text-steel">{hint}</p>}
    </div>
  );
}

function ToolButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="rounded border border-rule bg-panel px-2 py-1 hover:bg-paper">
      {children}
    </button>
  );
}
