"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const INK = "#17221e";
const STEEL = "#56645f";
const RULE = "#d8ddd8";
const GREEN = "#40bd5f";
const DEEP = "#1d7f54";
const AMBER = "#e3a018";

/**
 * The app on screen and the hardware it runs on, joined by one cable:
 * browser → firewall → server rack. Packets travel the cable while visible.
 */
export function InfraStack({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, repeat: -1 });

        gsap.utils.toArray<SVGCircleElement>(".is-packet", root.current).forEach((p, i) => {
          tl.fromTo(
            p,
            { autoAlpha: 0 },
            {
              keyframes: [{ autoAlpha: 1, duration: 0.15 }, { autoAlpha: 0, duration: 0.15, delay: 1.9 }],
              motionPath: { path: "#is-cable", align: "#is-cable", alignOrigin: [0.5, 0.5] },
              duration: 2.2,
              ease: "power1.inOut",
            },
            i * 0.75,
          );
        });

        // Shield pulses as packets pass the firewall
        tl.to(".is-shield", { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 1);
        tl.to(".is-shield", { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 2.5);

        // Rack LEDs flicker
        tl.to(".is-led", {
          opacity: () => gsap.utils.random([0.25, 1]),
          duration: 0.12,
          stagger: { each: 0.05, from: "random" },
          repeat: 8,
          repeatRefresh: true,
        }, 0);

        // Chart line on screen redraws
        tl.fromTo(".is-chart", { strokeDashoffset: 200 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" }, 0.3);

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 480 330"
      className={className}
      role="img"
      aria-label="ภาพประกอบ ระบบงานบนหน้าจอเชื่อมผ่าน Firewall ไปยังเซิร์ฟเวอร์"
    >
      {/* cable */}
      <path
        id="is-cable"
        d="M 150 150 C 150 230, 190 250, 236 250 S 320 250, 340 200 L 340 110"
        fill="none"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} className="is-packet" r="5.5" cx="150" cy="150" fill={i % 3 === 2 ? AMBER : GREEN} opacity="0" />
      ))}

      {/* browser window */}
      <g>
        <rect x="20" y="20" width="260" height="150" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <line x1="20" y1="44" x2="280" y2="44" stroke={INK} strokeWidth="2" />
        <circle cx="36" cy="32" r="4" fill={RULE} />
        <circle cx="50" cy="32" r="4" fill={RULE} />
        <circle cx="64" cy="32" r="4" fill={RULE} />
        <rect x="20" y="44" width="58" height="126" fill="#f6f7f4" />
        {[60, 76, 92, 108].map((y, i) => (
          <rect key={y} x="30" y={y} width={i === 0 ? 38 : 30} height="6" rx="2" fill={i === 0 ? DEEP : RULE} />
        ))}
        <rect x="92" y="58" width="74" height="40" rx="4" fill="#e3f1e9" />
        <rect x="176" y="58" width="90" height="40" rx="4" fill="#f6f7f4" stroke={RULE} />
        <rect x="100" y="66" width="30" height="6" rx="2" fill={DEEP} />
        <rect x="100" y="80" width="50" height="10" rx="2" fill={INK} />
        <path
          className="is-chart"
          d="M 182 90 L 200 80 L 214 85 L 232 68 L 258 72"
          fill="none"
          stroke={GREEN}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
        />
        {[110, 126, 142].map((y) => (
          <g key={y}>
            <rect x="92" y={y} width="174" height="10" rx="2" fill="#f6f7f4" />
            <rect x="96" y={y + 2} width="60" height="6" rx="2" fill={RULE} />
          </g>
        ))}
      </g>

      {/* firewall shield */}
      <g className="is-shield">
        <path
          d="M 236 222 L 262 232 L 262 252 C 262 268, 250 278, 236 284 C 222 278, 210 268, 210 252 L 210 232 Z"
          fill={INK}
        />
        <path d="M 226 252 L 234 260 L 248 244" fill="none" stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* server rack */}
      <g>
        <rect x="320" y="30" width="140" height="270" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 46 + i * 48;
          return (
            <g key={i}>
              <rect x="334" y={y} width="112" height="36" rx="3" fill={i === 2 ? "#e3f1e9" : "#f6f7f4"} stroke={RULE} />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <rect key={j} x={344 + j * 9} y={y + 13} width="5" height="10" rx="1" fill={RULE} />
              ))}
              <circle className="is-led" cx="420" cy={y + 18} r="3.5" fill={GREEN} />
              <circle className="is-led" cx="432" cy={y + 18} r="3.5" fill={i === 3 ? AMBER : GREEN} />
            </g>
          );
        })}
        <line x1="340" y1="300" x2="340" y2="312" stroke={INK} strokeWidth="3" />
        <line x1="440" y1="300" x2="440" y2="312" stroke={INK} strokeWidth="3" />
      </g>
      <line x1="10" y1="312" x2="470" y2="312" stroke={RULE} strokeWidth="2" />
      <text x="236" y="306" textAnchor="middle" fontSize="12" fill={STEEL} fontFamily="inherit">
        Firewall
      </text>
    </svg>
  );
}
