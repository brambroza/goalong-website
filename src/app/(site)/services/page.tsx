import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, Container, PageHeader } from "@/components/ui";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "บริการพัฒนาซอฟต์แวร์ เว็บแอป แอปมือถือ และระบบไอที",
  description:
    "บริการของ GO Along: รับเขียนโปรแกรม พัฒนาเว็บแอปพลิเคชัน แอปมือถือ ออกแบบ UX/UI ติดตั้ง Network Firewall Server Cloud Backup และต่ออายุ MA FortiGate Cisco",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/services", label: "บริการ" }]}
        title="บริการของ GO Along"
        lead="ตั้งแต่ซอฟต์แวร์ที่ออกแบบเฉพาะธุรกิจของคุณไปจนถึงเครือข่ายและเซิร์ฟเวอร์ที่โปรแกรมนั้นทำงานอยู่ เลือกบริการเดียวหรือให้เราดูแลทั้งหมดก็ได้"
      />
      <Container className="py-14">
        <ul className="divide-y divide-rule border-y border-rule">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:gap-10"
              >
                <span>
                  <span className="block text-[1.2rem] font-semibold group-hover:text-andon-deep">
                    {s.name}
                  </span>
                  <span className="text-[0.95rem] text-steel">{s.nameEn}</span>
                </span>
                <span className="text-steel">{s.summary}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/network-service"
              className="group grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:gap-10"
            >
              <span>
                <span className="block text-[1.2rem] font-semibold group-hover:text-andon-deep">
                  IT Support, MA และ PM
                </span>
                <span className="text-[0.95rem] text-steel">IT services & maintenance</span>
              </span>
              <span className="text-steel">
                ต่ออายุ MA FortiGate, Cisco และ Dell Server ดูแลระบบแบบ Remote และ Onsite
                ตรวจเช็กอุปกรณ์ตามรอบ และจำหน่ายอุปกรณ์ไอที
              </span>
            </Link>
          </li>
        </ul>
      </Container>
      <ContactBand />
    </>
  );
}
