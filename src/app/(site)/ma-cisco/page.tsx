import type { Metadata } from "next";
import { ContactBand, Container, FaqList, PageHeader, SiteImage } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ต่ออายุ MA Cisco SmartNet (SNTC) ทุกรุ่น",
  description:
    "GO Along เป็น Cisco Partner รับต่ออายุ MA Cisco และ Cisco Smart Net Total Care ทุกรุ่นที่ยังไม่ EOS เลือก SLA 8x5 NBD หรือ 24x7x4 พร้อมสิทธิ์ติดต่อ Cisco TAC และดาวน์โหลด IOS",
  alternates: { canonical: "/ma-cisco" },
};

const faqs = [
  {
    q: "8x5 NBD กับ 24x7x4 ต่างกันอย่างไร",
    a: "8x5 NBD คือส่งอุปกรณ์ทดแทนภายในวันทำการถัดไป ส่วน 24x7x4 คือเปลี่ยนอุปกรณ์ภายใน 4 ชั่วโมงตลอด 24 ชั่วโมงทุกวัน เหมาะกับอุปกรณ์หลักที่หยุดไม่ได้",
  },
  {
    q: "อุปกรณ์รุ่นเก่าต่อ MA ได้ไหม",
    a: "ต่อได้ถ้ายังไม่ถึง End of Support (EOS) ตามประกาศของ Cisco ส่ง Serial Number มาให้เราตรวจสอบสถานะได้",
  },
];

const includes = [
  {
    t: "เปลี่ยนอุปกรณ์เมื่อเสีย (RMA)",
    d: "ส่งอุปกรณ์ทดแทนตามระดับ SLA ที่เลือก 8x5 NBD หรือ 24x7x4",
  },
  { t: "ติดต่อ Cisco TAC", d: "ปรึกษาวิศวกรของ Cisco ได้ตลอด 24 ชั่วโมง" },
  { t: "Firmware และ Software", d: "สิทธิ์ดาวน์โหลด Cisco IOS แพตช์ และอัปเดตสำคัญ" },
  {
    t: "Smart Net Portal",
    d: "ตรวจสถานะอุปกรณ์ แจ้งเตือน และวิเคราะห์ปัญหาอัตโนมัติ",
  },
];

export default function MaCiscoPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/network-service", label: "Network & MA" },
          { href: "/ma-cisco", label: "MA Cisco" },
        ]}
        title="ต่ออายุ MA Cisco และ Smart Net Total Care"
        lead="GO Along เป็น Cisco Partner ต่อ MA ให้อุปกรณ์ Cisco ทุกรุ่นที่ยังไม่ EOS ได้โดยตรง"
      >
        <SiteImage src="/images/network/ma-cisco.svg" alt="ต่ออายุ MA Cisco SmartNet โดย GO Along" width={1500} height={700} sizes="(min-width: 1024px) 760px, 100vw" priority className="mt-8 w-full max-w-3xl rounded-lg border border-rule bg-panel" />
      </PageHeader>
      <Container className="grid gap-14 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-[1.5rem] font-semibold">สิ่งที่ได้จาก MA Cisco</h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {includes.map((i) => (
              <div key={i.t} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
                <dt className="font-medium">{i.t}</dt>
                <dd className="text-steel">{i.d}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-12 text-[1.5rem] font-semibold">คำถามที่พบบ่อย</h2>
          <div className="mt-4">
            <FaqList faqs={faqs} />
          </div>
        </div>
        <aside className="self-start rounded-lg border border-rule bg-panel p-6">
          <h2 className="font-semibold">ขอใบเสนอราคา</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-steel">
            <li>ชื่อบริษัทและที่อยู่</li>
            <li>Serial Number ของอุปกรณ์</li>
            <li>จำนวนปีที่ต้องการต่อ และระดับ SLA</li>
          </ol>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("ขอใบเสนอราคา MA Cisco")}`}
            className="mt-5 block rounded-md bg-andon px-5 py-3 text-center font-medium text-white hover:bg-andon-deep"
          >
            ส่งอีเมลขอใบเสนอราคา
          </a>
          <a
            href={site.lineHref}
            className="mt-3 block text-center text-steel underline underline-offset-4"
          >
            หรือส่งทาง LINE {site.line}
          </a>
        </aside>
      </Container>
      <ContactBand />
    </>
  );
}
