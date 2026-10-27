"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import type { PostRow } from "@/lib/supabase";

type Row = Pick<PostRow, "id" | "slug" | "title" | "published" | "published_at" | "updated_at">;

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

export function PostList({ onEdit, onNew }: { onEdit: (id: string) => void; onNew: () => void }) {
  const sb = getBrowserClient()!;
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    sb.from("posts")
      .select("id,slug,title,published,published_at,updated_at")
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(`โหลดบทความไม่สำเร็จ: ${error.message}`);
        else setRows(data as Row[]);
      });
  }, [sb]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[1.5rem] font-semibold">บทความ</h1>
        <button onClick={onNew} className="rounded-md bg-andon px-4 py-2 font-medium text-white hover:bg-andon-deep">
          เขียนบทความใหม่
        </button>
      </div>

      {error && <p role="alert" className="mt-4 text-[#b3402c]">{error}</p>}
      {!rows && !error && <p className="mt-6 text-steel">กำลังโหลด…</p>}
      {rows?.length === 0 && (
        <p className="mt-6 text-steel">ยังไม่มีบทความ กด &ldquo;เขียนบทความใหม่&rdquo; เพื่อเริ่ม</p>
      )}

      {rows && rows.length > 0 && (
        <ul className="mt-6 divide-y divide-rule rounded-lg border border-rule bg-panel">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
              <button onClick={() => onEdit(r.id)} className="min-w-0 flex-1 text-left">
                <span className="block truncate font-medium hover:text-andon-deep">{r.title || "(ไม่มีชื่อ)"}</span>
                <span className="text-[0.85rem] text-steel">/blog/{r.slug}</span>
              </button>
              <span
                className={`rounded px-2 py-0.5 text-[0.8rem] ${
                  r.published ? "bg-andon-soft text-andon-deep" : "bg-paper text-steel"
                }`}
              >
                {r.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
              </span>
              <span className="w-28 text-right text-[0.85rem] tabular-nums text-steel">
                {fmt(r.published_at ?? r.updated_at)}
              </span>
              {r.published && (
                <a
                  href={`/blog/${r.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.9rem] text-andon-deep underline underline-offset-4"
                >
                  ดูหน้าเว็บ
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
