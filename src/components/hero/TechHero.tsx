"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCE } from "@/lib/gsap";
import { SystemDeck } from "./SystemDeck";

// Thai has no spaces between words, so break points are marked by "|"; " " keeps a real space.
const headline = "ซอฟต์แวร์|ที่เข้าใจโรงงานไทย ดูแลถึง|เครื่องที่มันทำงานอยู่";
const words = headline.split("|").flatMap((chunk) => {
  const parts = chunk.split(" ");
  return parts.map((w, i) => ({ text: w, space: i < parts.length - 1 }));
});

/** Full-bleed black opening tile: one headline, one line, two links, the product. */
export function TechHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MOTION_REDUCE, () => {
        gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      });

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(q("[data-hero='kicker']"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 })
          .fromTo(
            q(".hero-word"),
            { autoAlpha: 0, y: "0.5em" },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 },
            0.1,
          )
          .fromTo(q("[data-hero='lead']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
          .fromTo(q("[data-hero='cta']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
          .fromTo(q("[data-hero='deck']"), { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, "-=0.3");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-board text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[55%] size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(64,189,95,0.18),rgba(64,189,95,0)_60%)]"
      />
      <div className="relative mx-auto max-w-[1024px] px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        <p data-hero="kicker" className="text-[0.95rem] text-white/60">
          GO Along · ซอฟต์แวร์และไอทีสำหรับธุรกิจไทย
        </p>
        <h1 className="display display-lg mx-auto mt-4 max-w-4xl text-white">
          {words.map((w, i) => (
            <span key={i} className="hero-word inline-block whitespace-nowrap">
              {w.text}
              {w.space ? " " : ""}
            </span>
          ))}
        </h1>
        <p data-hero="lead" className="subhead mx-auto mt-5 max-w-2xl text-white/70">
          เราเขียนโปรแกรมตามขั้นตอนงานจริงของคุณ และดูแล Network, Firewall และ Server ที่ระบบนั้นใช้อยู่ ทีมเดียวจบ
        </p>
        <div data-hero="cta" className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[1.05rem]">
          <Link href="/contact" className="link-more text-brand">ปรึกษาโปรเจกต์ฟรี</Link>
          <Link href="/solutions/factory" className="link-more text-brand">ดูระบบสำหรับโรงงาน</Link>
        </div>
        <div data-hero="deck" className="mx-auto mt-14 max-w-5xl">
          <SystemDeck />
        </div>
      </div>
    </section>
  );
}
