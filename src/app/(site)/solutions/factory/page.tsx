import type { Metadata } from "next";
import { ContactBand, Container, FaqList, PageHeader } from "@/components/ui";
import { factorySystems } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "ระบบ ERP คลังสินค้า ซ่อมบำรุง ต้นทุน สำหรับโรงงาน SME",
  description:
    "GO Along พัฒนาระบบสำหรับโรงงาน SME ไทย: ERP/MRP วางแผนการผลิต WMS คลังสินค้า CMMS ซ่อมบำรุงเครื่องจักร คำนวณต้นทุนการผลิต และระบบ HR ปรับตามขั้นตอนงานของโรงงาน",
  alternates: { canonical: "/solutions/factory" },
};

const faqs = [
  {
    q: "ต่างจากซื้อ ERP สำเร็จรูปอย่างไร",
    a: "ERP สำเร็จรูปมักต้องปรับวิธีทำงานของโรงงานให้เข้ากับโปรแกรม และค่าปรับแต่งเพิ่มสูง เราเริ่มจากโมดูลที่มีอยู่แล้ว แล้วปรับให้ตรงกับขั้นตอนของโรงงานคุณ เลือกเฉพาะส่วนที่ใช้จริงได้",
  },
  {
    q: "เริ่มทีละระบบได้ไหม",
    a: "ได้ และแนะนำให้เริ่มจากจุดที่เจ็บที่สุดก่อน เช่น คลังสินค้า หรือติดตามออเดอร์ แล้วค่อยต่อระบบอื่นเข้ามาโดยใช้ข้อมูลชุดเดียวกัน",
  },
  {
    q: "เชื่อมกับโปรแกรมบัญชีที่ใช้อยู่ได้ไหม",
    a: "ส่วนใหญ่เชื่อมได้ ทั้งผ่าน API การส่งออกและนำเข้าไฟล์ หรือการเชื่อมฐานข้อมูลโดยตรง ขึ้นกับโปรแกรมที่ใช้ เราจะตรวจสอบให้ในขั้นวิเคราะห์ความต้องการ",
  },
  {
    q: "ติดตั้งในโรงงานหรือใช้บน Cloud",
    a: "ได้ทั้งสองแบบ โรงงานที่ต้องการเก็บข้อมูลในบริษัทติดตั้งบนเซิร์ฟเวอร์ของตัวเองได้ และเราดูแลเซิร์ฟเวอร์กับเครือข่ายให้ด้วย",
  },
];

export default function FactoryPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/solutions/factory", label: "ระบบโรงงาน" }]}
        title="ระบบสำหรับโรงงาน SME ไทย"
        lead="ระบบที่ทำให้ฝ่ายขาย จัดซื้อ คลัง ผลิต QC และซ่อมบำรุง เห็นข้อมูลชุดเดียวกัน เริ่มจากโมดูลที่เราพัฒนาไว้ แล้วปรับให้ตรงกับขั้นตอนของโรงงานคุณ"
      />
      <Container className="py-14">
        <div className="divide-y divide-rule border-y border-rule">
          {factorySystems.map((f) => (
            <section
              key={f.id}
              id={f.id}
              className="grid gap-4 py-8 md:grid-cols-[1fr_1fr_1.2fr] md:gap-8"
            >
              <div>
                <h2 className="text-[1.25rem] font-semibold">{f.name}</h2>
                <p className="text-[0.95rem] text-steel">{f.nameEn}</p>
              </div>
              <p className="text-steel">
                <span className="block text-[0.9rem] font-medium text-ink">ปัญหาที่พบบ่อย</span>
                {f.problem}
              </p>
              <div>
                <span className="block text-[0.9rem] font-medium">ระบบช่วยได้</span>
                <ul className="mt-1 space-y-1.5 text-steel">
                  {f.does.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-andon" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-[1.6rem] font-semibold">คำถามจากโรงงาน</h2>
          <FaqList faqs={faqs} />
        </div>
      </Container>
      <ContactBand title="เล่าขั้นตอนงานในโรงงานให้เราฟัง แล้วเราจะบอกว่าควรเริ่มที่ระบบไหน" />
    </>
  );
}
