import Link from "next/link";
import type { CSSProperties } from "react";

type Row = {
  label: string;
  detail: string;
  status: string;
  href: string;
  lamp?: string;
};

const rows: Row[] = [
  {
    label: "ซอฟต์แวร์เฉพาะธุรกิจคุณ",
    detail: "ERP, ระบบคลัง, ระบบซ่อมบำรุง",
    status: "รับงาน",
    href: "/services/software-development",
  },
  {
    label: "เว็บแอป / แอปมือถือ",
    detail: "React, Next.js, Flutter",
    status: "รับงาน",
    href: "/services/web-application",
  },
  {
    label: "ระบบจองคิวผ่าน LINE",
    detail: "QueueBooking",
    status: "ใช้งานได้",
    href: "/products",
  },
  {
    label: "Network & Firewall",
    detail: "FortiGate, Cisco, Wi-Fi",
    status: "MA",
    href: "/network-service",
  },
  {
    label: "Server & Backup",
    detail: "Dell, HPE, Cloud",
    status: "PM",
    href: "/services/server-cloud-backup",
  },
  {
    label: "ดูแลหลังส่งมอบ",
    detail: "ทีมเดียวกับที่พัฒนา",
    status: "Teams",
    href: "/why-us",
    lamp: "#f2b630",
  },
];

/**
 * The hero's signature element: an andon status board, the light tower a
 * factory floor uses to show which line is running. Each row is a service.
 */
export function AndonBoard() {
  return (
    <div
      className="rounded-lg bg-board p-4 text-[#e6efe9] shadow-[0_24px_48px_-24px_rgba(23,34,30,0.55)] sm:p-5"
      role="group"
      aria-label="บริการของ GO Along"
    >
      <div className="flex items-center justify-between border-b border-board-line pb-3 text-[0.85rem] text-[#8fa59a]">
        <span>บอร์ดบริการ GO Along</span>
        <span data-hero-status className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-[#3ecf8e]" aria-hidden="true" />
          พร้อมให้บริการ
        </span>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li
            key={r.label}
            className="andon-row border-b border-board-line last:border-b-0"
            style={{ "--i": i } as CSSProperties}
          >
            <Link
              href={r.href}
              className="grid grid-cols-[14px_1fr_auto] items-center gap-3 rounded px-1 py-3 hover:bg-[#22352d]"
            >
              <span
                aria-hidden="true"
                className="andon-lamp size-3 rounded-full"
                style={
                  { "--i": i, ...(r.lamp ? { "--lamp": r.lamp } : {}) } as CSSProperties
                }
              />
              <span>
                <span className="block font-medium leading-6">{r.label}</span>
                <span className="block text-[0.85rem] leading-5 text-[#8fa59a]">
                  {r.detail}
                </span>
              </span>
              <span className="rounded border border-board-line px-2 py-0.5 text-[0.8rem] text-[#b9cbc1]">
                {r.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
