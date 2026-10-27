import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description: "นโยบายความเป็นส่วนตัวของ GO Along ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/privacy-policy", label: "นโยบายความเป็นส่วนตัว" }]}
        title="นโยบายความเป็นส่วนตัว"
      />
      <Container className="py-14">
        <div className="prose-ga measure">
          <p>
            {site.legalNameTh} ({site.legalNameEn}) ให้ความสำคัญกับข้อมูลส่วนบุคคลของลูกค้าและผู้เข้าชมเว็บไซต์
            และปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
          </p>
          <h2>ข้อมูลที่เราเก็บ</h2>
          <p>
            ชื่อ ชื่อบริษัท เบอร์โทรศัพท์ อีเมล และรายละเอียดที่คุณส่งให้เราเมื่อติดต่อผ่านโทรศัพท์ อีเมล หรือ LINE
            รวมถึงข้อมูลการใช้งานเว็บไซต์ทั่วไปผ่านเครื่องมือวิเคราะห์ เช่น Google Analytics
          </p>
          <h2>วัตถุประสงค์</h2>
          <ul>
            <li>ติดต่อกลับ ให้คำปรึกษา และจัดทำใบเสนอราคา</li>
            <li>ให้บริการและดูแลระบบตามสัญญา</li>
            <li>ปรับปรุงเว็บไซต์และบริการ</li>
          </ul>
          <h2>การเปิดเผยข้อมูล</h2>
          <p>
            เราไม่ขายข้อมูลส่วนบุคคล และเปิดเผยเฉพาะเท่าที่จำเป็นต่อการให้บริการ เช่น ผู้ผลิตอุปกรณ์เมื่อต่ออายุ MA
            หรือเมื่อกฎหมายกำหนด
          </p>
          <h2>สิทธิของเจ้าของข้อมูล</h2>
          <p>
            คุณขอเข้าถึง แก้ไข ลบ หรือคัดค้านการใช้ข้อมูลของคุณได้ โดยติดต่อ{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> หรือโทร {site.phone}
          </p>
        </div>
      </Container>
    </>
  );
}
