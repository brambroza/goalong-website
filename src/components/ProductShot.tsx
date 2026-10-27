"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * A real product screenshot in a browser frame. Enters with a slight 3D
 * tilt that flattens as it scrolls into view, with a glow behind it.
 */
export function ProductShot({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".ps-frame",
          { rotateX: 14, rotateY: -8, y: 40, autoAlpha: 0, transformPerspective: 1200 },
          {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          ".ps-glow",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top 80%", once: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <figure ref={root} className={`relative ${className}`} style={{ perspective: "1200px" }}>
      <div
        aria-hidden="true"
        className="ps-glow pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(64,189,95,0.28),rgba(64,189,95,0)_70%)]"
      />
      <div className="ps-frame relative overflow-hidden rounded-xl border border-rule bg-panel shadow-[0_30px_60px_-24px_rgba(23,34,30,0.45)] will-change-transform">
        <div className="flex items-center gap-1.5 border-b border-rule bg-paper px-3 py-2">
          <span className="size-2.5 rounded-full bg-rule" />
          <span className="size-2.5 rounded-full bg-rule" />
          <span className="size-2.5 rounded-full bg-rule" />
          <span className="ml-3 flex-1 truncate rounded bg-panel px-2 py-0.5 text-[0.72rem] text-steel">
            hr.goalong.co.th
          </span>
        </div>
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 600px, 100vw" className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-[0.9rem] text-steel">{caption}</figcaption>}
    </figure>
  );
}
