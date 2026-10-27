"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCE } from "@/lib/gsap";
import { NetworkCanvas } from "./NetworkCanvas";
import { SystemDeck } from "./SystemDeck";

const stats = [
  { value: 30, suffix: "+", label: "ระบบที่พัฒนาและดูแลต่อเนื่อง" },
  { value: 6, suffix: "", label: "บริการ ตั้งแต่โค้ดถึง Firewall ในทีมเดียว" },
  { value: 24, suffix: "/7", label: "ช่องทาง Teams สำหรับลูกค้าสัญญาดูแล" },
];

// Thai has no spaces between words, so break points are marked by "|"; " " keeps a real space.
const headline = "รับเขียนโปรแกรม|ด้วยเทคโนโลยี|เดียวกับ|บริษัทเทค|ระดับโลก ให้ธุรกิจ|และโรงงานไทย";
const words = headline.split("|").flatMap((chunk) => {
  const parts = chunk.split(" ");
  return parts.map((w, i) => ({ text: w, space: i < parts.length - 1 }));
});

export function TechHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MOTION_REDUCE, () => {
        gsap.set(q("[data-hero]"), { autoAlpha: 1 });
        q<HTMLElement>("[data-count]").forEach((el) => {
          el.textContent = el.dataset.count! + (el.dataset.suffix ?? "");
        });
      });

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(q("[data-hero='kicker']"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 })
          .fromTo(
            q(".hero-word"),
            { autoAlpha: 0, y: "0.6em", rotateX: -40 },
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.045, transformOrigin: "50% 100%" },
            0.1,
          )
          .fromTo(q("[data-hero='lead']"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
          .fromTo(q("[data-hero='cta']"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
          .fromTo(q("[data-hero='deck']"), { autoAlpha: 0, y: 30, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0.35)
          .fromTo(q("[data-hero='stats']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.4");

        q<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const o = { n: 0 };
          tl.to(
            o,
            {
              n: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(o.n) + suffix;
              },
            },
            "-=0.4",
          );
        });

        // Parallax glow follows the pointer
        const glow = q(".hero-glow")[0];
        const onMove = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect();
          gsap.to(glow, {
            x: e.clientX - r.left - r.width / 2,
            y: e.clientY - r.top - r.height / 2,
            duration: 1.2,
            ease: "power3.out",
          });
        };
        root.current?.addEventListener("pointermove", onMove);
        return () => root.current?.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0f1714] text-paper">
      <NetworkCanvas className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(64,189,95,0.22),rgba(64,189,95,0)_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p data-hero="kicker" className="inline-flex items-center gap-2 rounded-full border border-[#2d3f37] bg-[#17221e]/80 px-3 py-1 text-[0.85rem] text-[#8fa59a]">
              <span className="inline-block size-1.5 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
              GO Along Co., Ltd. · สมุทรปราการ
            </p>
            <h1
              className="mt-5 text-[2.1rem] font-semibold leading-[1.28] tracking-tight text-white sm:text-[2.9rem] sm:leading-[1.2]"
              style={{ perspective: "800px" }}
            >
              {words.map((w, i) => (
                <span key={i} className="hero-word inline-block whitespace-nowrap will-change-transform">
                  {w.text}
                  {w.space ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <p data-hero="lead" className="measure mt-6 text-[1.1rem] leading-8 text-[#b9cbc1]">
              ทีมของเราออกแบบ พัฒนา และดูแลระบบด้วย stack ยุคใหม่ ใช้ AI ช่วยเร่งงานทุกขั้นตอน
              และดูแลถึง Network, Firewall และ Server ที่ระบบนั้นวิ่งอยู่ ครบในทีมเดียว
            </p>
            <div data-hero="cta" className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-[#40bd5f] px-6 py-3 font-medium text-[#0f1714] shadow-[0_0_28px_rgba(64,189,95,0.35)] transition hover:bg-[#3ecf8e] hover:shadow-[0_0_36px_rgba(64,189,95,0.5)]"
              >
                ปรึกษาโปรเจกต์ฟรี
              </Link>
              <Link
                href="/solutions/factory"
                className="rounded-md border border-[#3a4a43] px-6 py-3 font-medium text-white transition hover:border-[#8fa59a] hover:bg-white/5"
              >
                ดูระบบสำหรับโรงงาน
              </Link>
            </div>
          </div>

          <div data-hero="deck">
            <SystemDeck />
          </div>
        </div>

        <dl data-hero="stats" className="mt-14 grid gap-6 border-t border-[#2d3f37] pt-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-[2.2rem] font-semibold leading-none tabular-nums text-white">
                <span data-count={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </span>
              </dd>
              <dt className="mt-2 text-[0.95rem] text-[#8fa59a]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
