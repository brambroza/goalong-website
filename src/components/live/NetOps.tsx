"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const log: { t: string; k: "ok" | "warn" | "info"; m: string }[] = [
  { t: "09:41:02", k: "info", m: "fortigate-01  session  erp.local → db.local  allow" },
  { t: "09:41:05", k: "ok",   m: "backup       nightly  verified  restore test 4m12s" },
  { t: "09:41:09", k: "warn", m: "fortigate-01  IPS  blocked  203.0.113.7  (3 attempts)" },
  { t: "09:41:12", k: "ok",   m: "sw-core-01   uplink  10G  util 31%" },
  { t: "09:41:15", k: "info", m: "deploy       factory-erp  v2.14.0  → prod  (0 downtime)" },
  { t: "09:41:19", k: "ok",   m: "srv-app-02   cpu 23%  mem 41%  disk 58%" },
  { t: "09:41:23", k: "ok",   m: "line-oa      webhook  200  latency 84ms" },
];

/** A monitoring console: log lines stream in, latency and uptime count up. */
export function NetOps({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(q(".no-line"), { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.25, stagger: 0.32, ease: "power2.out" }, 0.2);
        q<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count); const dec = Number(el.dataset.dec ?? 0);
          const o = { n: 0 };
          tl.to(o, { n: target, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = o.n.toFixed(dec); } }, 0.2);
        });
        tl.to(q(".no-ping"), { height: () => gsap.utils.random(20, 100) + "%", duration: 0.4, stagger: 0.05, repeat: 6, repeatRefresh: true, ease: "power1.inOut" }, 0.4);
        ScrollTrigger.create({ trigger: root.current, start: "top 80%", once: true, onEnter: () => tl.play() });
      });
    },
    { scope: root },
  );

  const color = { ok: "text-brand", warn: "text-amber", info: "text-sky-300" };

  return (
    <div ref={root} className={`rounded-2xl border border-white/10 bg-[#0e1114] p-4 font-mono text-[0.78rem] text-[#c9d1cc] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[0.72rem] text-white/50">
        <span>noc · goalong monitoring</span>
        <span>samut prakan · bkk</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[["uptime 30 วัน", "99.98", "%", 2], ["latency", "84", "ms", 0], ["blocked วันนี้", "1327", "", 0]].map(([l, v, u, d]) => (
          <div key={l as string} className="rounded-xl bg-white/5 p-3">
            <div className="text-[0.68rem] text-white/50">{l}</div>
            <div className="mt-1 text-[1.35rem] font-semibold tabular-nums text-white">
              <span data-count={v} data-dec={d}>0</span><span className="ml-1 text-[0.7rem] font-normal text-white/50">{u}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex h-10 items-end gap-[3px] rounded-xl bg-white/5 px-3 pb-2 pt-3" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className="no-ping block w-full rounded-sm bg-brand/70" style={{ height: `${30 + ((i * 37) % 60)}%` }} />
        ))}
      </div>

      <ol className="mt-3 space-y-1 rounded-xl bg-black/40 p-3">
        {log.map((l, i) => (
          <li key={i} className="no-line grid grid-cols-[62px_1fr] gap-3 whitespace-nowrap">
            <span className="text-white/40">{l.t}</span>
            <span className={`truncate ${color[l.k]}`}>{l.m}</span>
          </li>
        ))}
        <li className="h-4 w-2 animate-pulse bg-white/40" aria-hidden="true" />
      </ol>
    </div>
  );
}
