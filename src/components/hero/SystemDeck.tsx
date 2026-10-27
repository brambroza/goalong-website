"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCE } from "@/lib/gsap";

const GREEN = "#40bd5f";
const AMBER = "#e3a018";
const DIM = "#2d3f37";
const TEXT = "#c9d6cf";

type Node = { id: string; label: string; sub: string; x: number; y: number; accent?: boolean };

const nodes: Node[] = [
  { id: "sales", label: "ขาย", sub: "ใบสั่งขาย", x: 64, y: 78 },
  { id: "purchase", label: "จัดซื้อ", sub: "PO / วัตถุดิบ", x: 64, y: 190 },
  { id: "wms", label: "คลังสินค้า", sub: "WMS · สแกน", x: 196, y: 134 },
  { id: "prod", label: "ผลิต", sub: "แผน · ยอดจริง", x: 328, y: 78 },
  { id: "cmms", label: "ซ่อมบำรุง", sub: "CMMS · PM", x: 328, y: 190 },
  { id: "line", label: "LINE OA", sub: "แจ้งเตือนลูกค้า", x: 196, y: 246 },
  { id: "exec", label: "ผู้บริหาร", sub: "Dashboard", x: 460, y: 134, accent: true },
];

const edges: [string, string][] = [
  ["sales", "wms"],
  ["purchase", "wms"],
  ["wms", "prod"],
  ["wms", "cmms"],
  ["prod", "cmms"],
  ["wms", "line"],
  ["prod", "exec"],
  ["cmms", "exec"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;

const script: { kind: "cmd" | "ok" | "live"; text: string; reveal?: string[] }[] = [
  { kind: "cmd", text: "goalong new factory-erp --modules sales,purchasing,wms,production,cmms" },
  { kind: "ok", text: "วิเคราะห์ขั้นตอนงานจริงของโรงงาน", reveal: ["sales", "purchase"] },
  { kind: "ok", text: "ออกแบบฐานข้อมูลและ API", reveal: ["wms"] },
  { kind: "ok", text: "สร้างหน้าจอภาษาไทย ปี พ.ศ. ภาษีมูลค่าเพิ่ม", reveal: ["prod", "cmms"] },
  { kind: "cmd", text: "goalong integrate line-oa && goalong deploy --on-premise --firewall fortigate" },
  { kind: "ok", text: "เชื่อม LINE OA, ติดตั้ง Server, Backup, VLAN", reveal: ["line", "exec"] },
  { kind: "live", text: "ระบบพร้อมใช้งาน · ทีมเดิมดูแลต่อผ่าน Teams" },
];

/**
 * The hero's signature: a terminal "builds" a factory system while the
 * system map assembles itself beside it, then data starts flowing.
 */
export function SystemDeck({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_REDUCE, () => {
        gsap.set(".sd-line, .sd-node, .sd-edge, .sd-ring, .sd-live", { autoAlpha: 1 });
        gsap.set(".sd-edge, .sd-ring", { strokeDashoffset: 0 });
        root.current?.querySelectorAll<HTMLElement>(".sd-type").forEach((el) => {
          el.textContent = el.dataset.text ?? "";
        });
      });

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0, defaults: { ease: "power2.out" } });

        tl.set(q(".sd-line"), { autoAlpha: 0, y: 6 });
        tl.set(q(".sd-node"), { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
        tl.set(q(".sd-edge"), { strokeDashoffset: 100, autoAlpha: 1 });
        tl.set(q(".sd-ring"), { strokeDashoffset: 100, autoAlpha: 1 });
        tl.set(q(".sd-live, .sd-packet"), { autoAlpha: 0 });
        tl.set(q(".sd-cursor"), { autoAlpha: 1 });

        const revealed = new Set<string>();

        script.forEach((line, i) => {
          const el = q<HTMLElement>(`.sd-line[data-i="${i}"]`)[0];
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.25 }, "+=0.15");

          if (line.kind === "cmd") {
            const typeEl = el.querySelector<HTMLElement>(".sd-type")!;
            const full = typeEl.dataset.text ?? "";
            const state = { n: 0 };
            tl.to(state, {
              n: full.length,
              duration: Math.min(2.2, full.length * 0.028),
              ease: "none",
              onUpdate: () => {
                typeEl.textContent = full.slice(0, Math.round(state.n));
              },
            });
            tl.to({}, { duration: 0.35 });
          }

          if (line.reveal) {
            for (const id of line.reveal) {
              tl.to(q(`.sd-node[data-id="${id}"]`), { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)" }, "<+0.05");
              // edges whose both ends are now on the map
              revealed.add(id);
              edges.forEach(([a, b], ei) => {
                if ((a === id || b === id) && revealed.has(a) && revealed.has(b)) {
                  tl.to(q(`.sd-edge[data-i="${ei}"]`), { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "<+0.1");
                }
              });
            }
          }

          if (line.kind === "live") {
            tl.to(q(".sd-ring"), { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, "<");
            tl.to(q(".sd-live"), { autoAlpha: 1, duration: 0.3 }, "<+0.6");
            tl.set(q(".sd-cursor"), { autoAlpha: 0 });
          }
        });

        // Data flows for a while, then the deck resets and builds again.
        const flow = gsap.timeline();
        q<SVGCircleElement>(".sd-packet").forEach((p, i) => {
          const path = `#sd-edge-${p.dataset.edge}`;
          flow.fromTo(
            p,
            { autoAlpha: 0 },
            {
              keyframes: [{ autoAlpha: 1, duration: 0.15 }, { autoAlpha: 0, duration: 0.15, delay: 1.0 }],
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
              duration: 1.3,
              ease: "none",
              repeat: 3,
              repeatDelay: 0.4,
            },
            i * 0.35,
          );
        });
        flow.to(q(".sd-exec-glow"), { opacity: 0.9, duration: 0.6, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0);
        tl.add(flow, "+=0.2");
        tl.to(q(".sd-line, .sd-node, .sd-edge, .sd-ring, .sd-live"), { autoAlpha: 0, duration: 0.5, stagger: 0.01 }, "+=0.6");
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`overflow-hidden rounded-xl border border-[#2d3f37] bg-[#111b17]/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur ${className}`}
      role="img"
      aria-label="ภาพจำลอง: คำสั่งสร้างระบบ ERP โรงงาน แล้วแผนผังระบบประกอบขึ้นพร้อมข้อมูลไหลระหว่างแผนก"
    >
      <div className="flex items-center gap-2 border-b border-[#2d3f37] px-4 py-2.5 text-[0.78rem] text-[#8fa59a]">
        <span className="size-2.5 rounded-full bg-[#3a4a43]" />
        <span className="size-2.5 rounded-full bg-[#3a4a43]" />
        <span className="size-2.5 rounded-full bg-[#3a4a43]" />
        <span className="ml-2 font-mono">goalong — build &amp; deploy</span>
        <span className="sd-live ml-auto inline-flex items-center gap-1.5 text-[#3ecf8e]">
          <span className="inline-block size-1.5 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
          LIVE
        </span>
      </div>

      <div className="grid">
        {/* terminal */}
        <ol className="min-h-[196px] space-y-1 border-b border-[#2d3f37] px-4 py-3 font-mono text-[0.78rem] leading-5 text-[#c9d6cf]">
          {script.map((l, i) => (
            <li key={i} data-i={i} className="sd-line flex gap-2">
              {l.kind === "cmd" ? (
                <>
                  <span className="text-[#8fa59a]">$</span>
                  <span className="sd-type break-all" data-text={l.text} />
                </>
              ) : l.kind === "ok" ? (
                <>
                  <span className="text-[#3ecf8e]">✔</span>
                  <span>{l.text}</span>
                </>
              ) : (
                <>
                  <span className="text-[#f2b630]">●</span>
                  <span className="text-[#f2b630]">{l.text}</span>
                </>
              )}
            </li>
          ))}
          <li className="sd-cursor h-5 w-2 animate-pulse bg-[#8fa59a]" aria-hidden="true" />
        </ol>

        {/* system map */}
        <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
          <defs>
            <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect
            className="sd-ring"
            x="14"
            y="22"
            width="492"
            height="262"
            rx="18"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            strokeDasharray="100"
            pathLength={100}
            opacity="0.6"
          />
          <text x="30" y="36" fontSize="10" fill="#8fa59a" fontFamily="monospace" className="sd-live">
            FortiGate · VLAN · Backup
          </text>

          {edges.map(([a, b], i) => {
            const A = byId[a];
            const B = byId[b];
            return (
              <path
                key={i}
                id={`sd-edge-${i}`}
                data-i={i}
                className="sd-edge"
                d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}
                stroke={B.accent ? AMBER : GREEN}
                strokeWidth="1.5"
                strokeDasharray="100"
                pathLength={100}
                opacity="0.7"
                fill="none"
              />
            );
          })}

          {[0, 2, 6, 5, 7, 3].map((e, i) => (
            <circle key={i} data-edge={e} className="sd-packet" r="3.5" fill={e >= 6 ? AMBER : "#3ecf8e"} />
          ))}

          {nodes.map((n) => (
            <g key={n.id} data-id={n.id} className="sd-node" style={{ transformBox: "fill-box" } as CSSProperties}>
              {n.accent && (
                <circle className="sd-exec-glow" cx={n.x} cy={n.y} r="30" fill={AMBER} opacity="0.25" filter="url(#sd-glow)" />
              )}
              <rect
                x={n.x - 46}
                y={n.y - 22}
                width="92"
                height="44"
                rx="8"
                fill="#17221e"
                stroke={n.accent ? AMBER : DIM}
                strokeWidth="1.5"
              />
              <circle cx={n.x - 34} cy={n.y - 8} r="3" fill={n.accent ? AMBER : GREEN} />
              <text x={n.x - 26} y={n.y - 4} fontSize="12" fontWeight="600" fill="#f6f7f4">
                {n.label}
              </text>
              <text x={n.x - 34} y={n.y + 12} fontSize="9.5" fill={TEXT} opacity="0.8">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
