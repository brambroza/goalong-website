import type { Metadata } from "next";
import Link from "next/link";
import { AndonBoard } from "@/components/AndonBoard";
import { ContactBand, Container, FaqList } from "@/components/ui";
import { services } from "@/lib/services";
import { factorySystems } from "@/lib/solutions";
import { products } from "@/lib/products";
import { workflowSteps } from "@/lib/process";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "รับเขียนโปรแกรม รับพัฒนาซอฟต์แวร์ครบวงจร | GO Along" },
  description: site.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "GO Along รับทำอะไรบ้าง",
    a: "รับเขียนโปรแกรมและพัฒนาซอฟต์แวร์ตามสั่ง ทั้งเว็บแอป แอปมือถือ และโปรแกรม Windows ทำระบบสำหรับโรงงาน เช่น ERP, WMS, ระบบซ่อมบำรุง และงานไอทีโครงสร้างพื้นฐาน ได้แก่ Network, Firewall, Server และระบบสำรองข้อมูล รวมถึงต่ออายุ MA FortiGate และ Cisco",
  },
  {
    q: "รับงานพื้นที่ไหน",
    a: "สำนักงานอยู่ที่พระสมุทรเจดีย์ สมุทรปราการ รับงานซอฟต์แวร์ทั่วประเทศไทยแบบทำงานออนไลน์ งานติดตั้งหน้างานเน้นสมุทรปราการ กรุงเทพฯ และปริมณฑล",
  },
  {
    q: "ปรึกษาก่อนมีค่าใช้จ่ายไหม",
    a: "ไม่มี ติดต่อผ่าน LINE @goalong โทร 085 608 3298 หรืออีเมล sales@goalong.co.th ทีมงานจะนัดคุยรายละเอียดและสรุปขอบเขตงานพร้อมงบประมาณให้พิจารณาก่อน",
  },
  {
    q: "ระบบที่ทำด้วย AI เองแล้ว ให้ GO Along ช่วยต่อได้ไหม",
    a: "ได้ เรามีบริการ AI Production Partner สำหรับแอปที่สร้างด้วย AI ช่วยตรวจความปลอดภัย ติดตั้งขึ้นใช้งานจริง เชื่อมกับระบบเดิม และดูแลระยะยาว",
  },
];

export default function Home() {
  const software = services.filter((s) => s.group === "software");
  const infra = services.filter((s) => s.group === "infra");

  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule">
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.95rem] text-steel">
              {site.legalNameTh} สมุทรปราการ
            </p>
            <h1 className="mt-4 text-[2.15rem] font-semibold leading-[1.3] tracking-tight sm:text-[3rem] sm:leading-[1.22]">
              รับเขียนโปรแกรมและดูแลระบบไอที ให้ธุรกิจและโรงงานไทย ครบในทีมเดียว
            </h1>
            <p className="measure mt-6 text-[1.125rem] leading-8 text-steel">
              เราพัฒนาซอฟต์แวร์ตามขั้นตอนงานจริงของคุณ และดูแลทั้ง Network,
              Firewall และ Server ที่ระบบนั้นใช้งานอยู่ เมื่อมีปัญหาจึงคุยกับทีมเดียวจบ
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-andon px-6 py-3 font-medium text-white hover:bg-andon-deep"
              >
                ปรึกษาโปรเจกต์ฟรี
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-ink px-6 py-3 font-medium hover:bg-ink hover:text-white"
              >
                ดูบริการทั้งหมด
              </Link>
            </div>
          </div>
          <AndonBoard />
        </Container>
      </section>

      {/* Services: software + infra side by side */}
      <section>
        <Container className="py-16 sm:py-20">
          <h2 className="max-w-2xl text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
            ทั้งโปรแกรม และเครื่องที่โปรแกรมทำงานอยู่
          </h2>
          <p className="measure mt-3 text-steel">
            ระบบช้าอาจมาจากโค้ด ฐานข้อมูล หรือเครือข่าย ทีมเดียวที่เห็นทั้งหมดหาสาเหตุได้เร็วกว่า
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="border-b-2 border-andon pb-2 font-semibold">ซอฟต์แวร์</h3>
              <ul className="divide-y divide-rule">
                {software.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group block py-5">
                      <span className="font-medium group-hover:text-andon-deep group-hover:underline underline-offset-4">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-[0.97rem] leading-7 text-steel">
                        {s.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="border-b-2 border-amber pb-2 font-semibold">โครงสร้างไอที</h3>
              <ul className="divide-y divide-rule">
                {infra.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group block py-5">
                      <span className="font-medium group-hover:text-andon-deep group-hover:underline underline-offset-4">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-[0.97rem] leading-7 text-steel">
                        {s.summary}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/network-service" className="group block py-5">
                    <span className="font-medium group-hover:text-andon-deep group-hover:underline underline-offset-4">
                      ต่ออายุ MA FortiGate และ Cisco, IT Support, PM
                    </span>
                    <span className="mt-1 block text-[0.97rem] leading-7 text-steel">
                      ต่อสัญญาบำรุงรักษาอุปกรณ์ทุกรุ่นที่ยังไม่หมดอายุการสนับสนุน
                      และดูแลระบบตามรอบ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Factory systems */}
      <section className="border-y border-rule bg-panel">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
                ระบบสำหรับโรงงาน SME ไทย
              </h2>
              <p className="mt-3 text-steel">
                เริ่มจากโมดูลที่เราพัฒนาไว้แล้ว ปรับให้ตรงกับขั้นตอนของโรงงานคุณ
                ใช้เวลาน้อยกว่าเขียนใหม่ทั้งหมด และไม่แพงเท่า ERP ต่างประเทศ
              </p>
              <Link
                href="/solutions/factory"
                className="mt-6 inline-block font-medium text-andon-deep underline underline-offset-4"
              >
                ดูระบบโรงงานทั้งหมด
              </Link>
            </div>
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {factorySystems.map((f) => (
                <div key={f.id} className="border-t border-rule pt-4">
                  <dt className="font-medium">{f.name}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-7 text-steel">{f.problem}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section>
        <Container className="py-16 sm:py-20">
          <h2 className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
            ผลิตภัณฑ์ของเรา
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-lg border border-rule bg-panel p-6"
              >
                <h3 className="text-[1.3rem] font-semibold">{p.name}</h3>
                <p className="mt-1 text-[0.95rem] text-andon-deep">{p.kind}</p>
                <p className="mt-3 flex-1 text-steel">{p.summary}</p>
                <a
                  href={p.url}
                  className="mt-5 self-start font-medium underline underline-offset-4 hover:text-andon-deep"
                >
                  {p.cta}
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-y border-rule bg-panel">
        <Container className="py-16 sm:py-20">
          <h2 className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
            ขั้นตอนการทำงาน
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <li key={step.title} className="relative border-t-2 border-ink pt-4">
                <span className="text-[0.9rem] font-medium tabular-nums text-andon-deep">
                  ขั้นที่ {i + 1}
                </span>
                <h3 className="mt-1 font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-7 text-steel">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <h2 className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
              คำถามที่พบบ่อย
            </h2>
            <FaqList faqs={homeFaqs} />
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
