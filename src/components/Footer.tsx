import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-tile text-[0.8rem] text-steel">
      <div className="mx-auto grid max-w-[1024px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 text-ink">
            <LogoMark size={20} />
            <span className="font-semibold">GO Along</span>
          </span>
          <p className="mt-4 max-w-sm leading-6">
            {site.legalNameTh} ({site.legalNameEn})
            <br />
            {site.address.th}
          </p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt>โทร</dt>
            <dd><a href={site.phoneHref} className="text-ink hover:underline">{site.phone}</a></dd>
            <dt>อีเมล</dt>
            <dd><a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a></dd>
            <dt>LINE</dt>
            <dd><a href={site.lineHref} className="text-ink hover:underline">{site.line}</a></dd>
          </dl>
        </div>

        <div>
          <h2 className="font-semibold text-ink">บริการ</h2>
          <ul className="mt-3 space-y-1.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-ink hover:underline">{s.name}</Link>
              </li>
            ))}
            <li><Link href="/ma-fortigate" className="hover:text-ink hover:underline">ต่ออายุ MA FortiGate</Link></li>
            <li><Link href="/ma-cisco" className="hover:text-ink hover:underline">ต่ออายุ MA Cisco</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-ink">บริษัท</h2>
          <ul className="mt-3 space-y-1.5">
            <li><Link href="/products" className="hover:text-ink hover:underline">ผลงาน</Link></li>
            <li><Link href="/solutions/factory" className="hover:text-ink hover:underline">ระบบโรงงาน</Link></li>
            <li><Link href="/blog" className="hover:text-ink hover:underline">บทความ</Link></li>
            <li><Link href="/why-us" className="hover:text-ink hover:underline">ทำไมต้อง GO Along</Link></li>
            <li><Link href="/contact" className="hover:text-ink hover:underline">ติดต่อเรา</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-ink hover:underline">นโยบายความเป็นส่วนตัว</Link></li>
          </ul>
          <h2 className="mt-6 font-semibold text-ink">เวลาทำการ</h2>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
            {site.hours.map((h) => (
              <div key={h.label} className="contents">
                <dt>{h.label}</dt>
                <dd className="tabular-nums">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-rule/60">
        <p className="mx-auto max-w-[1024px] px-4 py-4 sm:px-6">
          © {new Date().getFullYear()} {site.legalNameEn} · {site.supportNote}
        </p>
      </div>
    </footer>
  );
}
