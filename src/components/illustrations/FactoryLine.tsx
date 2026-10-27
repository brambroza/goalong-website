"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const INK = "#17221e";
const STEEL = "#56645f";
const RULE = "#d8ddd8";
const GREEN = "#40bd5f";
const DEEP = "#1d7f54";
const AMBER = "#e3a018";

const rollers = [150, 200, 250, 300, 350, 400, 450];

/**
 * A press, a conveyor and a shop-floor tablet: production data flowing from
 * the machine to the screen. Animated only while on screen.
 */
export function FactoryLine({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, repeat: -1 });

        // Boxes ride the belt
        gsap.utils.toArray<SVGGElement>(".fl-box", root.current).forEach((box, i) => {
          tl.fromTo(
            box,
            { x: 120, autoAlpha: 0 },
            {
              keyframes: [
                { autoAlpha: 1, duration: 0.3 },
                { x: 390, duration: 5.4, ease: "none" },
                { autoAlpha: 0, duration: 0.3 },
              ],
            },
            i * 1.5,
          );
        });

        // Press stamps
        tl.to(".fl-ram", { y: 26, duration: 0.25, ease: "power2.in", repeat: 3, yoyo: true, repeatDelay: 1.25 }, 0.2);

        // Rollers spin
        tl.to(".fl-spoke", { rotation: 360, transformOrigin: "50% 50%", duration: 6, ease: "none" }, 0);

        // Data packets travel from machine to tablet
        gsap.utils.toArray<SVGCircleElement>(".fl-packet", root.current).forEach((dot, i) => {
          tl.fromTo(
            dot,
            { autoAlpha: 0 },
            {
              keyframes: [{ autoAlpha: 1, duration: 0.2 }, { autoAlpha: 0, duration: 0.2, delay: 1.6 }],
              motionPath: { path: "#fl-wire", align: "#fl-wire", alignOrigin: [0.5, 0.5] },
              duration: 2,
              ease: "none",
            },
            0.8 + i * 1.8,
          );
        });

        // Tablet bars update
        tl.to(".fl-bar", {
          scaleY: () => gsap.utils.random(0.35, 1),
          transformOrigin: "50% 100%",
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          repeat: 3,
          repeatRefresh: true,
          repeatDelay: 1,
        }, 1);

        // Andon tower: green lamp breathes
        tl.to(".fl-lamp-green", { opacity: 0.45, duration: 0.6, repeat: 9, yoyo: true, ease: "sine.inOut" }, 0);

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
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="ภาพประกอบ เครื่องจักรในโรงงานส่งข้อมูลการผลิตไปยังแท็บเล็ต"
    >
      {/* floor */}
      <line x1="10" y1="290" x2="550" y2="290" stroke={RULE} strokeWidth="2" />

      {/* data wire: machine → tablet */}
      <path
        id="fl-wire"
        d="M 95 70 C 95 30, 250 20, 330 40 S 470 70, 488 118"
        fill="none"
        stroke={RULE}
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="fl-packet" r="5" cx="95" cy="70" fill={GREEN} opacity="0" />
      ))}

      {/* boxes */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="fl-box" opacity="0" transform="translate(180 0)">
          <rect x="0" y="190" width="34" height="32" rx="2" fill="#f3e3b8" stroke={INK} strokeWidth="2" />
          <line x1="0" y1="202" x2="34" y2="202" stroke={INK} strokeWidth="1.5" />
          <rect x="10" y="208" width="14" height="8" fill={INK} opacity="0.2" />
        </g>
      ))}

      {/* press machine */}
      <g>
        <rect x="40" y="120" width="110" height="170" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <rect x="40" y="120" width="110" height="34" rx="6" fill={INK} />
        <g className="fl-ram">
          <rect x="83" y="154" width="24" height="34" fill={STEEL} />
          <rect x="70" y="186" width="50" height="10" rx="2" fill={INK} />
        </g>
        <rect x="62" y="226" width="66" height="8" rx="2" fill={RULE} />
        <rect x="56" y="250" width="34" height="22" rx="3" fill="none" stroke={STEEL} strokeWidth="2" />
        <circle cx="114" cy="261" r="7" fill={AMBER} />
        {/* andon tower */}
        <rect x="92" y="72" width="6" height="48" fill={INK} />
        <rect x="83" y="66" width="24" height="16" rx="3" className="fl-lamp-green" fill={GREEN} />
        <rect x="83" y="84" width="24" height="12" rx="3" fill={AMBER} opacity="0.35" />
        <rect x="83" y="98" width="24" height="12" rx="3" fill="#d4513b" opacity="0.25" />
      </g>

      {/* conveyor */}
      <g>
        <rect x="130" y="222" width="340" height="22" rx="11" fill="none" stroke={INK} strokeWidth="2.5" />
        {rollers.map((x) => (
          <g key={x} transform={`translate(${x} 233)`}>
            <circle r="8" fill="#fff" stroke={STEEL} strokeWidth="2" />
            <g className="fl-spoke">
              <line x1="-6" y1="0" x2="6" y2="0" stroke={STEEL} strokeWidth="2" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke={STEEL} strokeWidth="2" />
            </g>
          </g>
        ))}
        <line x1="170" y1="244" x2="160" y2="290" stroke={INK} strokeWidth="2.5" />
        <line x1="430" y1="244" x2="440" y2="290" stroke={INK} strokeWidth="2.5" />
      </g>

      {/* tablet on stand */}
      <g>
        <line x1="488" y1="208" x2="488" y2="290" stroke={INK} strokeWidth="3" />
        <line x1="466" y1="290" x2="510" y2="290" stroke={INK} strokeWidth="3" />
        <rect x="430" y="118" width="116" height="90" rx="8" fill={INK} />
        <rect x="438" y="126" width="100" height="74" rx="3" fill="#fff" />
        <rect x="444" y="132" width="40" height="6" rx="2" fill={DEEP} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            className="fl-bar"
            x={448 + i * 17}
            y={150}
            width="10"
            height="42"
            rx="1.5"
            fill={i === 4 ? AMBER : GREEN}
          />
        ))}
      </g>
    </svg>
  );
}
