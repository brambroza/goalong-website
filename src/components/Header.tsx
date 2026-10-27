import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="border-b border-rule bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="GO Along หน้าแรก" className="text-ink">
          <Logo />
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-steel hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden sm:inline text-[0.95rem] font-medium tabular-nums text-ink"
          >
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-md bg-andon px-4 py-2 text-[0.95rem] font-medium text-white hover:bg-andon-deep transition-colors"
          >
            ปรึกษาโปรเจกต์
          </Link>
          <details className="relative lg:hidden">
            <summary
              className="list-none cursor-pointer rounded-md border border-rule px-3 py-2 text-[0.95rem]"
              aria-label="เปิดเมนู"
            >
              เมนู
            </summary>
            <ul className="absolute right-0 mt-2 w-56 rounded-md border border-rule bg-panel p-2 shadow-lg">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded px-3 py-2 hover:bg-andon-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="block rounded px-3 py-2 hover:bg-andon-soft"
                >
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
