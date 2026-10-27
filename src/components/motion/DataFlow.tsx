"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const steps = [
  {
    title: "หน้างานสแกนครั้งเดียว",
    body: "พนักงานสแกนบาร์โค้ดรับของเข้าคลัง ข้อมูลเข้าระบบทันที ไม่ต้องจดกระดาษกลับไปคีย์ซ้ำ",
  },
  {
    title: "ทุกแผนกเห็นชุดเดียวกัน",
    body: "ฝ่ายขายเห็นสต็อกจริง ฝ่ายผลิตเห็นวัตถุดิบที่พร้อม ไม่ต้องโทรถามกันว่าของถึงไหน",
  },
  {
    title: "ลูกค้ารู้สถานะเอง",
    body: "ระบบแจ้งลูกค้าผ่าน LINE OA เมื่อออเดอร์ผลิตเสร็จหรือพร้อมส่ง ลดสายโทรเข้าซ้ำ",
  },
  {
    title: "ผู้บริหารเห็นภาพรวมแบบเรียลไทม์",
    body: "Dashboard สรุปยอดผลิต ต้นทุน และงานที่เสี่ยงล่าช้า เปิดดูได้จากมือถือทุกที่",
  },
];

const PATH = "M 70 60 C 70 160, 260 100, 260 200 S 450 240, 450 340 S 240 420, 240 520";
const STOPS = [
  { t: 0, x: 70, y: 60, label: "สแกน" },
  { t: 0.33, x: 260, y: 200, label: "ERP" },
  { t: 0.66, x: 450, y: 340, label: "LINE" },
  { t: 1, x: 240, y: 520, label: "Dashboard" },
];

/**
 * Scroll-driven pipeline: the data line draws itself and each stage lights
 * up as the visitor scrolls, with the panel pinned on large screens.
 */
export function DataFlow() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 68px",
            end: "+=1600",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(q(".df-path"), { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
        tl.fromTo(
          q(".df-packet"),
          { autoAlpha: 1 },
          { motionPath: { path: q<SVGPathElement>(".df-path")[0], align: q<SVGPathElement>(".df-path")[0], alignOrigin: [0.5, 0.5] }, duration: 1, ease: "none" },
          0,
        );
        STOPS.forEach((s, i) => {
          tl.fromTo(q(`.df-stop[data-i="${i}"]`), { scale: 0.5, autoAlpha: 0.3 }, { scale: 1, autoAlpha: 1, duration: 0.05, ease: "back.out(2)" }, s.t);
          tl.to(q(`.df-step[data-i="${i}"]`), { autoAlpha: 1, x: 0, duration: 0.08 }, Math.max(0, s.t - 0.03));
          if (i > 0) tl.to(q(`.df-step[data-i="${i - 1}"]`), { autoAlpha: 0.35, duration: 0.08 }, Math.max(0, s.t - 0.03));
        });
        gsap.set(q(".df-step"), { autoAlpha: 0.35, x: -10 });
        gsap.set(q(".df-step[data-i='0']"), { autoAlpha: 1, x: 0 });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.set(q(".df-path"), { strokeDashoffset: 0 });
        gsap.set(q(".df-packet"), { autoAlpha: 0 });
        ScrollTrigger.batch(q(".df-step"), {
          start: "top 85%",
          once: true,
          onEnter: (b) => gsap.fromTo(b, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="dataflow" ref={root} className="border-y border-rule bg-panel">
      <div className="mx-auto grid lg:min-h-[calc(100vh-68px)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:py-0">
        <div>
          <p className="text-[0.95rem] text-andon-deep">ตัวอย่างการไหลของข้อมูล</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
            ข้อมูลเข้าครั้งเดียว ไหลถึงทุกคนที่ต้องใช้
          </h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} data-i={i} className="df-step border-l-2 border-andon pl-4">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-[0.97rem] leading-7 text-steel">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <svg viewBox="0 0 520 580" className="mx-auto w-full max-w-[460px]" aria-hidden="true">
          <path d={PATH} fill="none" stroke="#d8ddd8" strokeWidth="2" strokeDasharray="4 6" />
          <path
            className="df-path"
            d={PATH}
            fill="none"
            stroke="#40bd5f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="100"
            pathLength={100}
          />
          {STOPS.map((s, i) => (
            <g key={i} data-i={i} className="df-stop" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <circle cx={s.x} cy={s.y} r="26" fill="#e3f1e9" />
              <circle cx={s.x} cy={s.y} r="26" fill="none" stroke="#1d7f54" strokeWidth="2" />
              <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#13583a">
                {s.label}
              </text>
            </g>
          ))}
          <circle className="df-packet" r="7" fill="#e3a018" />
        </svg>
      </div>
    </section>
  );
}
