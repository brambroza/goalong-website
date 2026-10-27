import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-board text-[#c9d6cf]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-7">
            {site.legalNameTh} ({site.legalNameEn})
            <br />
            {site.address.th}
          </p>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.95rem]">
            <dt className="text-[#8fa59a]">โทร</dt>
            <dd>
              <a href={site.phoneHref} className="text-white hover:underline">
                {site.phone}
              </a>
            </dd>
            <dt className="text-[#8fa59a]">อีเมล</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="text-white hover:underline">
                {site.email}
              </a>
            </dd>
            <dt className="text-[#8fa59a]">LINE</dt>
            <dd>
              <a href={site.lineHref} className="text-white hover:underline">
                {site.line}
              </a>
            </dd>
          </dl>
        </div>

        <div>
          <h2 className="text-[0.95rem] font-semibold text-white">บริการ</h2>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/ma-fortigate" className="hover:text-white">
                ต่ออายุ MA FortiGate
              </Link>
            </li>
            <li>
              <Link href="/ma-cisco" className="hover:text-white">
                ต่ออายุ MA Cisco
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[0.95rem] font-semibold text-white">เวลาทำการ</h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.95rem]">
            {site.hours.map((h) => (
              <div key={h.label} className="contents">
                <dt>{h.label}</dt>
                <dd className="tabular-nums">{h.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.9rem] text-[#8fa59a]">{site.supportNote}</p>
          <ul className="mt-6 space-y-1.5 text-[0.95rem]">
            <li>
              <Link href="/why-us" className="hover:text-white">
                ทำไมต้อง GO Along
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                นโยบายความเป็นส่วนตัว
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-board-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[0.85rem] text-[#8fa59a] sm:px-6">
          © {new Date().getFullYear()} {site.legalNameEn} สงวนลิขสิทธิ์
        </p>
      </div>
    </footer>
  );
}
