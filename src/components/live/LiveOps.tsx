"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const machines = [
  { id: "CNC-01", line: "ไลน์ 1", oee: 92 },
  { id: "CNC-02", line: "ไลน์ 1", oee: 88 },
  { id: "INJ-03", line: "ไลน์ 2", oee: 74, warn: true },
  { id: "PRESS-1", line: "ไลน์ 2", oee: 95 },
  { id: "PACK-A", line: "แพ็ก", oee: 90 },
];

const spark = [42, 48, 46, 55, 61, 58, 66, 72, 70, 78, 84, 81, 89];

/**
 * A live-looking factory ops panel: KPIs count up, the output line draws,
 * one machine flips to warning, rows refresh. Software, not clip art.
 */
export function LiveOps({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

        q<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const dec = Number(el.dataset.dec ?? 0);
          const o = { n: 0 };
          tl.to(o, { n: target, duration: 1.4, onUpdate: () => { el.textContent = o.n.toFixed(dec); } }, 0.1);
        });
        tl.fromTo(q(".lo-spark"), { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.1);
        tl.fromTo(q(".lo-area"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.9);
        tl.fromTo(q(".lo-row"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.08 }, 0.3);
        tl.fromTo(q(".lo-bar"), { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.8, stagger: 0.08 }, 0.6);
        // one machine drops to warning, then an alert appears
        tl.to(q(".lo-warn-dot"), { backgroundColor: "#e3a018", boxShadow: "0 0 10px #e3a018", duration: 0.3 }, 2.0);
        tl.to(q(".lo-warn-bar"), { backgroundColor: "#e3a018", duration: 0.3 }, 2.0);
        tl.fromTo(q(".lo-alert"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.2);
        tl.to(q(".lo-alert-dot"), { opacity: 0.3, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.4);

        ScrollTrigger.create({ trigger: root.current, start: "top 80%", once: true, onEnter: () => tl.play() });
      });
    },
    { scope: root },
  );

  const w = 260, h = 70;
  const pts = spark.map((v, i) => [ (i / (spark.length - 1)) * w, h - (v / 100) * h ] as const);
  const path = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div ref={root} className={`rounded-2xl border border-white/10 bg-[#0e1114] p-4 font-mono text-[0.78rem] text-[#c9d1cc] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[0.72rem] text-white/50">
        <span>factory-erp · ops dashboard</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#40bd5f]" />live</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[["ยอดผลิตวันนี้", "1284", "ชิ้น", 0], ["OEE", "87.9", "%", 1], ["ออเดอร์ส่งทัน", "98.2", "%", 1]].map(([l, v, u, d]) => (
          <div key={l as string} className="rounded-xl bg-white/5 p-3">
            <div className="text-[0.68rem] text-white/50">{l}</div>
            <div className="mt-1 text-[1.35rem] font-semibold tabular-nums text-white">
              <span data-count={v} data-dec={d}>0</span><span className="ml-1 text-[0.7rem] font-normal text-white/50">{u}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-white/5 p-3">
        <div className="flex justify-between text-[0.68rem] text-white/50"><span>ยอดผลิตสะสม · กะเช้า</span><span>06:00 → 14:00</span></div>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lo-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#40bd5f" stopOpacity="0.35" />
              <stop offset="1" stopColor="#40bd5f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="lo-area" d={area} fill="url(#lo-g)" />
          <path className="lo-spark" d={path} fill="none" stroke="#40bd5f" strokeWidth="2" pathLength={100} strokeDasharray="100" strokeLinejoin="round" />
        </svg>
      </div>

      <ul className="mt-3 space-y-1.5">
        {machines.map((m) => (
          <li key={m.id} className="lo-row grid grid-cols-[14px_72px_1fr_44px] items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5">
            <span className={`size-2 rounded-full bg-brand shadow-[0_0_8px_#40bd5f] ${m.warn ? "lo-warn-dot" : ""}`} />
            <span className="text-white">{m.id}</span>
            <span className="h-1.5 overflow-hidden rounded bg-white/10"><span className={`lo-bar block h-full rounded bg-brand ${m.warn ? "lo-warn-bar" : ""}`} style={{ width: `${m.oee}%` }} /></span>
            <span className="text-right tabular-nums text-white/70">{m.oee}%</span>
          </li>
        ))}
      </ul>

      <div className="lo-alert mt-3 flex items-center gap-2 rounded-lg border border-amber/40 bg-amber/10 px-3 py-2 text-[0.75rem] text-[#f2c75c]">
        <span className="lo-alert-dot size-1.5 rounded-full bg-amber" />
        INJ-03 OEE ต่ำกว่า 80% · แจ้งซ่อมบำรุงอัตโนมัติ → LINE หัวหน้ากะ
      </div>
    </div>
  );
}
