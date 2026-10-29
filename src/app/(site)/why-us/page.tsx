import type { Metadata } from "next";
import { ContactBand, Container, PageHeader, SiteImage } from "@/components/ui";

export const metadata: Metadata = {
  title: "ทำไมต้องเลือก GO Along พัฒนาซอฟต์แวร์และดูแลระบบไอที",
  description:
    "เหตุผลที่ธุรกิจเลือก GO Along: ทีมที่ดูแลทั้งซอฟต์แวร์ Network Server และ Security ทำงานแบบ Agile ส่งงานเป็นรอบ ตรวจความปลอดภัยทุกครั้งก่อนส่งมอบ และดูแลหลังการขายโดยทีมเดิม",
  alternates: { canonical: "/why-us" },
};

const reasons = [
  {
    t: "ทีมเดียวดูแลครบ",
    d: "ซอฟต์แวร์ เครือข่าย เซิร์ฟเวอร์ และความปลอดภัย อยู่ในทีมเดียวกัน เมื่อระบบมีปัญหาจึงไม่ต้องรอให้หลายบริษัทโยนกันว่าเป็นความรับผิดชอบของใคร",
  },
  {
    t: "เห็นงานจริงทุกรอบ",
    d: "พัฒนาแบบ Agile เป็นรอบสั้น ๆ ส่งให้ทดลองใช้บ่อย รับความเห็นแล้วปรับทันที ไม่ต้องรอจนจบโปรเจกต์ถึงจะรู้ว่าตรงกับที่ต้องการไหม",
  },
  {
    t: "ตรวจคุณภาพและความปลอดภัยก่อนส่งมอบ",
    d: "ทุกการส่งมอบผ่านการทดสอบการใช้งาน และประเมินช่องโหว่ด้านความปลอดภัย",
  },
  {
    t: "ทีมเดิมดูแลหลังส่งมอบ",
    d: "คนที่พัฒนาระบบคือคนที่ดูแลต่อ ให้คำปรึกษา แก้ไข และปรับปรุง ลูกค้าที่มีสัญญาดูแลติดต่อทีมผ่าน Microsoft Teams ได้ตลอด",
  },
  {
    t: "เข้าใจงานธุรกิจไทย",
    d: "ระบบรองรับภาษาไทย ปี พ.ศ. ภาษีมูลค่าเพิ่ม และเชื่อม LINE OA ซึ่งเป็นช่องทางที่ลูกค้าและพนักงานคนไทยใช้อยู่ทุกวัน",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/why-us", label: "ทำไมต้องเรา" }]}
        title="ทำไมต้อง GO Along"
        lead="ไปด้วยกัน ไปได้ไกล เราอยากเป็นทีมไอทีที่ธุรกิจของคุณเรียกใช้ได้ทุกครั้งที่ต้องการ ไม่ใช่แค่คนที่ส่งงานแล้วหายไป"
      />
      <Container className="py-14">
        <SiteImage src="/images/why-us.png" alt="ทำไมต้องเลือก GO Along" width={1030} height={773} sizes="(min-width: 1024px) 900px, 100vw" priority className="mb-12 w-full max-w-3xl rounded-[22px] bg-tile" />
        <dl className="divide-y divide-rule border-y border-rule">
          {reasons.map((r) => (
            <div key={r.t} className="grid gap-2 py-7 md:grid-cols-[1fr_1.6fr] md:gap-10">
              <dt className="text-[1.2rem] font-semibold">{r.t}</dt>
              <dd className="measure text-steel">{r.d}</dd>
            </div>
          ))}
        </dl>
      </Container>
      <ContactBand />
    </>
  );
}
