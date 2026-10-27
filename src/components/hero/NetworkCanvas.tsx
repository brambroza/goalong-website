"use client";

import { useEffect, useRef } from "react";
import { MOTION_REDUCE } from "@/lib/gsap";

type Pt = { x: number; y: number; vx: number; vy: number };

/**
 * Drifting node network behind the hero. Nodes within reach link up; nodes
 * near the pointer link to it, so the field reacts to the visitor.
 * Runs only while on screen and never under reduced motion.
 */
export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia(MOTION_REDUCE).matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let pts: Pt[] = [];
    const mouse = { x: -1e4, y: -1e4 };
    const LINK = 130;
    const MOUSE_LINK = 190;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c!.clientWidth;
      h = c!.clientHeight;
      c!.width = Math.floor(w * dpr);
      c!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, Math.max(35, (w * h) / 14000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    let raf = 0;
    let running = false;

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK;
            ctx!.strokeStyle = `rgba(64,189,95,${0.16 * t})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        const mx = a.x - mouse.x;
        const my = a.y - mouse.y;
        const md2 = mx * mx + my * my;
        if (md2 < MOUSE_LINK * MOUSE_LINK) {
          const t = 1 - Math.sqrt(md2) / MOUSE_LINK;
          ctx!.strokeStyle = `rgba(64,189,95,${0.5 * t})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
          // nudge toward the pointer
          a.x -= mx * 0.002;
          a.y -= my * 0.002;
        }
      }

      ctx!.fillStyle = "rgba(143,165,154,0.55)";
      for (const p of pts) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting && document.visibilityState === "visible";
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(c);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
    };
    const host = c.parentElement ?? c;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    document.addEventListener("visibilitychange", onVis);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
