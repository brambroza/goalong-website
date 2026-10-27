"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll reveal for a section. Children marked with data-reveal rise in
 * gently as the section enters the viewport; data-reveal-line elements
 * draw across (used for the process timeline).
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current);
        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: 22 });
          ScrollTrigger.batch(items, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                overwrite: true,
              }),
          });
        }

        const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]", root.current);
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power2.inOut",
              scrollTrigger: { trigger: line, start: "top 85%", once: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
