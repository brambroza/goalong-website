import type { Metadata } from "next";
import { ContactBand, Container, PageHeader } from "@/components/ui";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์: QueueBooking ระบบจองคิว LINE และ AI Production Partner",
  description:
    "ผลิตภัณฑ์ของ GO Along: QueueBooking ระบบจองคิวผ่าน LINE OA สำหรับร้านและศูนย์บริการ และ AI Production Partner บริการพาแอปที่สร้างด้วย AI ขึ้นใช้งานจริงอย่างปลอดภัย",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/products", label: "ผลิตภัณฑ์" }]}
        title="ผลิตภัณฑ์ของ GO Along"
        lead="ระบบและบริการที่เราพัฒนาเอง เปิดให้ใช้ได้ทันทีโดยไม่ต้องเริ่มโปรเจกต์ใหม่"
      />
      <Container className="space-y-16 py-14">
        {products.map((p) => (
          <section
            key={p.id}
            id={p.id}
            className="grid gap-8 border-t border-rule pt-10 lg:grid-cols-[1fr_1.2fr]"
          >
            <div>
              <h2 className="text-[1.8rem] font-semibold">{p.name}</h2>
              <p className="mt-1 text-andon-deep">{p.kind}</p>
              <p className="mt-4 text-steel">{p.summary}</p>
              <a
                href={p.url}
                className="mt-6 inline-block rounded-md bg-andon px-5 py-3 font-medium text-white hover:bg-andon-deep"
              >
                {p.cta}
              </a>
            </div>
            <ul className="divide-y divide-rule self-start border-y border-rule">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 py-3">
                  <span aria-hidden="true" className="mt-[0.7rem] size-2 shrink-0 rounded-full bg-andon" />
                  {pt}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
      <ContactBand />
    </>
  );
}
