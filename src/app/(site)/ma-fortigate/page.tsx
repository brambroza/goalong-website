import type { Metadata } from "next";
import { ContactBand, Container, FaqList, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ต่ออายุ MA FortiGate ทุกรุ่น FortiCare FortiGuard",
  description:
    "รับต่ออายุ MA FortiGate ทุกรุ่นที่ยังไม่ EOL ทั้ง FortiCare และ FortiGuard หรือแพ็กเกจฮาร์ดแวร์พร้อม License โดย GO Along สมุทรปราการ ส่ง Serial Number มาขอใบเสนอราคาได้ทันที",
  alternates: { canonical: "/ma-fortigate" },
};

const faqs = [
  {
    q: "รุ่นไหนต่อ MA ได้บ้าง",
    a: "FortiGate ทุกรุ่นที่ยังไม่ประกาศ End of Life (EOL) จาก Fortinet หากไม่แน่ใจ ส่ง Serial Number มาให้เราตรวจสอบได้",
  },
  {
    q: "ถ้าไม่ต่อ MA จะเกิดอะไรขึ้น",
    a: "อุปกรณ์ยังเปิดใช้งานได้ แต่จะไม่ได้รับอัปเดตฐานข้อมูลภัยคุกคามจาก FortiGuard เช่น Antivirus, IPS และ Web Filter ทำให้ป้องกันภัยใหม่ไม่ได้ และไม่ได้รับการเปลี่ยนเครื่องหากฮาร์ดแวร์เสีย",
  },
  {
    q: "ขอใบเสนอราคาต้องส่งอะไรบ้าง",
    a: `ส่งชื่อบริษัทและที่อยู่สำหรับออกเอกสาร Serial Number ของอุปกรณ์ และจำนวนปีที่ต้องการต่อ มาที่ ${site.email} หรือ LINE ${site.line}`,
  },
];

export default function MaFortigatePage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/network-service", label: "Network & MA" },
          { href: "/ma-fortigate", label: "MA FortiGate" },
        ]}
        title="ต่ออายุ MA FortiGate"
        lead="ต่อ MA FortiGate ทุกรุ่นที่ยังไม่ EOL ให้ Firewall ได้รับอัปเดตการป้องกันภัยล่าสุด และได้รับการเปลี่ยนเครื่องเมื่อฮาร์ดแวร์เสีย"
      />
      <Container className="grid gap-14 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-[1.5rem] font-semibold">รูปแบบการต่ออายุ</h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
              <dt className="font-medium">FortiCare</dt>
              <dd className="text-steel">
                สิทธิ์ Support จาก Fortinet อัปเดต Firmware และการเปลี่ยนฮาร์ดแวร์
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
              <dt className="font-medium">FortiGuard</dt>
              <dd className="text-steel">
                บริการ Security เช่น Antivirus, IPS, Web Filter, Application Control
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
              <dt className="font-medium">ฮาร์ดแวร์ + FortiCare + FortiGuard</dt>
              <dd className="text-steel">
                แพ็กเกจรวมเครื่องใหม่และบริการ Security ครบ พร้อมรับประกันเครื่อง 1 ปี
                เหมาะกับอุปกรณ์ที่ใกล้ EOL
              </dd>
            </div>
          </dl>

          <h2 className="mt-12 text-[1.5rem] font-semibold">คำถามที่พบบ่อย</h2>
          <div className="mt-4">
            <FaqList faqs={faqs} />
          </div>
        </div>
        <aside className="self-start rounded-lg border border-rule bg-panel p-6">
          <h2 className="font-semibold">ขอใบเสนอราคา</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-steel">
            <li>ชื่อบริษัทและที่อยู่สำหรับออกเอกสาร</li>
            <li>Serial Number ของอุปกรณ์</li>
            <li>จำนวนปีที่ต้องการต่อ</li>
          </ol>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("ขอใบเสนอราคา MA FortiGate")}`}
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
