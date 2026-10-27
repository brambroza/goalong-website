"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCE } from "@/lib/gsap";

/**
 * Hero entrance: copy settles in, then the andon board's lamps switch on
 * one by one — the page's single orchestrated moment.
 */
export function HeroMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          "[data-hero-item]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
        )
          .fromTo(
            "[data-hero-board]",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.15,
          )
          .fromTo(
            ".andon-row",
            { autoAlpha: 0.3 },
            { autoAlpha: 1, duration: 0.3, stagger: 0.14 },
            0.45,
          )
          .fromTo(
            ".andon-lamp",
            { backgroundColor: "#3a4a43", boxShadow: "0 0 0px rgba(0,0,0,0)", scale: 0.6 },
            {
              backgroundColor: (_i: number, el: Element) =>
                getComputedStyle(el).getPropertyValue("--lamp").trim() || "#3ecf8e",
              boxShadow: (_i: number, el: Element) =>
                `0 0 10px ${getComputedStyle(el).getPropertyValue("--lamp").trim() || "#3ecf8e"}`,
              scale: 1,
              duration: 0.25,
              stagger: 0.14,
              ease: "back.out(3)",
              clearProps: "backgroundColor,boxShadow,transform",
            },
            0.55,
          )
          .fromTo(
            "[data-hero-status]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4 },
            ">-0.1",
          );
      });

      mm.add(MOTION_REDUCE, () => {
        gsap.set("[data-hero-item],[data-hero-board],[data-hero-status]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
