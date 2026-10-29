import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-paper/80 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-12 max-w-[1024px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="GO Along หน้าแรก" className="inline-flex items-center gap-2 text-ink">
          <LogoMark size={22} />
          <span className="text-[0.95rem] font-semibold tracking-tight">GO Along</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.8rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/80 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a href={site.phoneHref} className="hidden text-[0.8rem] tabular-nums text-ink/80 hover:text-ink sm:inline">
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-andon px-3.5 py-1.5 text-[0.8rem] font-medium text-white transition-colors hover:bg-andon-deep"
          >
            ปรึกษาโปรเจกต์
          </Link>
          <details className="relative lg:hidden">
            <summary className="list-none cursor-pointer px-1 text-[0.8rem] text-ink/80" aria-label="เปิดเมนู">
              เมนู
            </summary>
            <ul className="absolute right-0 mt-3 w-56 rounded-2xl border border-black/5 bg-panel p-2 shadow-xl">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-xl px-3 py-2 text-[0.95rem] hover:bg-tile">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="block rounded-xl px-3 py-2 text-[0.95rem] hover:bg-tile">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
