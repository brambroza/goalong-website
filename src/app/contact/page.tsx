import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ติดต่อ GO Along รับเขียนโปรแกรม สมุทรปราการ",
  description: `ติดต่อ GO Along โทร ${site.phone} อีเมล ${site.email} LINE ${site.line} สำนักงาน ${site.address.th} เปิดจันทร์–ศุกร์ 9:00–18:00 เสาร์ 9:00–12:00`,
  alternates: { canonical: "/contact" },
};

const mapQuery = encodeURIComponent(
  "918/288 หมู่ 10 ในคลองบางปลากด พระสมุทรเจดีย์ สมุทรปราการ 10290",
);

export default function ContactPage() {
  const channels = [
    { label: "LINE", value: site.line, href: site.lineHref, note: "ตอบเร็วที่สุด" },
    { label: "โทร", value: site.phone, href: site.phoneHref, note: "ในเวลาทำการ" },
    { label: "อีเมล", value: site.email, href: `mailto:${site.email}`, note: "เหมาะกับการส่งเอกสารหรือ Serial Number" },
  ];
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/contact", label: "ติดต่อเรา" }]}
        title="ติดต่อ GO Along"
        lead="เล่าสั้น ๆ ว่าอยากทำระบบอะไร หรือกำลังเจอปัญหาอะไร ทีมงานจะติดต่อกลับเพื่อนัดคุยรายละเอียด ปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย"
      />
      <Container className="grid gap-14 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <ul className="divide-y divide-rule border-y border-rule">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group grid grid-cols-[90px_1fr] items-baseline gap-4 py-6"
                >
                  <span className="text-steel">{c.label}</span>
                  <span>
                    <span className="block text-[1.4rem] font-semibold tabular-nums group-hover:text-andon-deep">
                      {c.value}
                    </span>
                    <span className="text-[0.95rem] text-steel">{c.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-semibold">ข้อมูลที่ช่วยให้เราตอบได้เร็วขึ้น</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-steel">
            <li>ธุรกิจของคุณทำอะไร และมีผู้ใช้ระบบประมาณกี่คน</li>
            <li>ตอนนี้ทำงานนี้ด้วยวิธีไหน เช่น Excel กระดาษ หรือโปรแกรมเดิม</li>
            <li>อยากให้ระบบใหม่ช่วยเรื่องอะไรเป็นอันดับแรก</li>
            <li>ช่วงเวลาที่อยากเริ่มใช้งาน</li>
          </ul>
        </div>

        <aside className="space-y-8">
          <div>
            <h2 className="font-semibold">สำนักงาน</h2>
            <address className="mt-2 not-italic text-steel">
              {site.legalNameTh}
              <br />
              {site.address.th}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              className="mt-2 inline-block text-andon-deep underline underline-offset-4"
            >
              เปิดแผนที่ใน Google Maps
            </a>
          </div>
          <div>
            <h2 className="font-semibold">เวลาทำการ</h2>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-steel">
              {site.hours.map((h) => (
                <div key={h.label} className="contents">
                  <dt>{h.label}</dt>
                  <dd className="tabular-nums">{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.95rem] text-steel">{site.supportNote}</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
