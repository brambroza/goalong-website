"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { portfolio } from "@/lib/portfolio";
import { PortfolioMock } from "./PortfolioMock";

/**
 * Scroll-driven product showcase. On large screens the screen frame stays
 * pinned while descriptions scroll past; each one swaps the screen with a
 * slide + the mock's own micro-animation. On small screens it's a stacked list.
 */
export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      // Per-product micro animations (run when that screen becomes active)
      const play = (id: string) => {
        const scope = q<HTMLElement>(`.sc-screen[data-id="${id}"]`)[0];
        if (!scope) return;
        const s = gsap.utils.selector(scope);
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(s(".pf-bubble"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.28 }, 0.1);
        tl.fromTo(s(".pf-node"), { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }, 0.2);
        tl.fromTo(s(".pf-edge"), { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.6, stagger: 0.08 }, 0.6);
        tl.fromTo(s(".pf-machine"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.07 }, 0.1);
        tl.fromTo(s(".pf-alert"), { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 0.9);
        tl.to(s(".pf-alert"), { opacity: 0.55, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.2);
        tl.fromTo(s(".pf-bot"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.25 }, 0.6);
        tl.fromTo(s(".pf-row"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 }, 0.3);
        tl.fromTo(s(".pf-queue-no"), { autoAlpha: 0, scale: 1.3, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.1);
        tl.fromTo(s(".pf-cta"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.06, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.4);
        tl.fromTo(s(".pf-step"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.2 }, 0.1);
        return tl;
      };

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const screens = q<HTMLElement>(".sc-screen");
        const items = q<HTMLElement>(".sc-item");
        gsap.set(screens, { autoAlpha: 0, yPercent: 6 });
        gsap.set(screens[0], { autoAlpha: 1, yPercent: 0 });
        gsap.set(items, { autoAlpha: 0.3 });
        gsap.set(items[0], { autoAlpha: 1 });

        let active = 0;
        let current: gsap.core.Timeline | undefined = play(screens[0].dataset.id!);

        const activate = (i: number) => {
          if (i === active) return;
          const prev = active;
          active = i;
          current?.kill();
          gsap.to(screens[prev], { autoAlpha: 0, yPercent: -6, duration: 0.35, ease: "power2.in" });
          gsap.fromTo(screens[i], { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power3.out", delay: 0.15 });
          gsap.to(items, { autoAlpha: 0.3, duration: 0.3 });
          gsap.to(items[i], { autoAlpha: 1, duration: 0.3 });
          q(".sc-dot").forEach((d, di) => d.classList.toggle("bg-andon", di === i));
          q(".sc-dot").forEach((d, di) => d.classList.toggle("bg-rule", di !== i));
          current = play(screens[i].dataset.id!);
        };

        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top center",
            end: "bottom center",
            onEnter: () => activate(i),
            onEnterBack: () => activate(i),
          });
        });

        ScrollTrigger.create({
          trigger: q(".sc-pin")[0],
          start: "top 96px",
          endTrigger: q(".sc-list")[0],
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        q<HTMLElement>(".sc-screen").forEach((screen) => {
          ScrollTrigger.create({
            trigger: screen,
            start: "top 80%",
            once: true,
            onEnter: () => play(screen.dataset.id!),
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="portfolio" className="bg-tile">
      <div className="mx-auto max-w-[1024px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display display-md">ระบบที่เราสร้าง และใช้งานจริง</h2>
          <p className="subhead mt-3 text-steel">
            ตั้งแต่ AI agent บน LINE ไปจนถึง ERP เต็มระบบ ทุกตัวออกแบบสำหรับธุรกิจไทย
            และดูแลต่อโดยทีมเดียวกับที่พัฒนา
          </p>
        </div>

        {/* Desktop: pinned screen + scrolling list. Mobile: stacked. */}
        <div className="mt-12 lg:grid lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="sc-pin hidden lg:block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-board shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]">
              {portfolio.map((p) => (
                <div key={p.id} data-id={p.id} className="sc-screen absolute inset-0">
                  {p.image ? (
                    <Image src={p.image} alt={`หน้าจอ ${p.name}`} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover object-top" />
                  ) : (
                    <PortfolioMock item={p} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
              {portfolio.map((p, i) => (
                <span key={p.id} className={`sc-dot size-2 rounded-full ${i === 0 ? "bg-andon" : "bg-rule"}`} />
              ))}
            </div>
          </div>

          <ol className="sc-list space-y-10 lg:space-y-0">
            {portfolio.map((p, i) => (
              <li key={p.id} className="sc-item lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center">
                {/* mobile screen */}
                <div className="mb-5 overflow-hidden rounded-[22px] bg-board lg:hidden">
                  <div data-id={p.id} className="sc-screen relative aspect-[16/10]">
                    {p.image ? (
                      <Image src={p.image} alt={`หน้าจอ ${p.name}`} fill sizes="100vw" className="object-cover object-top" />
                    ) : (
                      <PortfolioMock item={p} />
                    )}
                  </div>
                </div>
                <p className="text-[0.85rem] tabular-nums text-steel">
                  {String(i + 1).padStart(2, "0")} / {String(portfolio.length).padStart(2, "0")} · {p.kind}
                </p>
                <h3 className="mt-2 text-[1.5rem] font-semibold">{p.name}</h3>
                <p className="mt-1 text-andon-deep">{p.tagline}</p>
                <p className="mt-3 text-[0.97rem] leading-7 text-steel">{p.summary}</p>
                <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-andon" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.9rem] text-steel">เหมาะกับ: {p.audience}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-more mt-4"
                >
                  เปิดดู {p.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
