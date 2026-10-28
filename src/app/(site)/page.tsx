import type { Metadata } from "next";
import Link from "next/link";
import { TechHero } from "@/components/hero/TechHero";
import { DataFlow } from "@/components/motion/DataFlow";
import { Showcase } from "@/components/portfolio/Showcase";
import { Reveal } from "@/components/motion/Reveal";
import { FactoryLine } from "@/components/illustrations/FactoryLine";
import { ProductShot } from "@/components/ProductShot";
import { formatThaiDate, getAllPosts } from "@/lib/blog";
import { ContactBand, Container, FaqList, PostCover, SiteImage, hasPublicFile } from "@/components/ui";
import { services } from "@/lib/services";
import { factorySystems } from "@/lib/solutions";
import { workflowSteps } from "@/lib/process";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "รับเขียนโปรแกรม รับพัฒนาซอฟต์แวร์ครบวงจร | GO Along" },
  description: site.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "GO Along รับทำอะไรบ้าง",
    a: "รับเขียนโปรแกรมและพัฒนาซอฟต์แวร์เฉพาะธุรกิจของลูกค้า ทั้งเว็บแอป แอปมือถือ และโปรแกรม Windows ทำระบบสำหรับโรงงาน เช่น ERP, WMS, ระบบซ่อมบำรุง และงานไอทีโครงสร้างพื้นฐาน ได้แก่ Network, Firewall, Server และระบบสำรองข้อมูล รวมถึงต่ออายุ MA FortiGate และ Cisco",
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


export default async function Home() {
  const software = services.filter((s) => s.group === "software");
  const infra = services.filter((s) => s.group === "infra");
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <TechHero />

      {/* Services: software + infra side by side */}
      <Reveal as="section">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div data-reveal>
              <h2 className="max-w-2xl text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
                ทั้งโปรแกรม และเครื่องที่โปรแกรมทำงานอยู่
              </h2>
              <p className="measure mt-3 text-steel">
                ระบบช้าอาจมาจากโค้ด ฐานข้อมูล หรือเครือข่าย ทีมเดียวที่เห็นทั้งหมดหาสาเหตุได้เร็วกว่า
              </p>
              <p className="measure mt-3 text-steel">
                ตัวอย่างจากระบบ GO HR ที่เราพัฒนา: หน้า Insight สรุปกำลังคน ต้นทุน และสัญญาณการลาออก
                ให้ผู้บริหารเห็นในหน้าเดียว ทำงานอยู่บนเซิร์ฟเวอร์และเครือข่ายที่ทีมเราดูแลเอง
              </p>
            </div>
            <ProductShot
              src="/images/go-hr-insight.webp"
              alt="หน้า Insight วิเคราะห์ข้อมูลของระบบ GO HR แสดงจำนวนพนักงาน อัตราลาออก และกราฟสรุปตามหน่วยงาน"
              width={1707}
              height={1231}
              caption="GO HR — ระบบบริหารงานบุคคลที่ GO Along พัฒนา"
            />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div data-reveal>
              <h3 className="border-b-2 border-andon pb-2 font-semibold">ซอฟต์แวร์</h3>
              <ul className="divide-y divide-rule">
                {software.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex gap-4 py-5">
                      {hasPublicFile(s.image) && (
                        <SiteImage src={s.image} alt="" width={300} height={200} sizes="96px" className="h-16 w-24 shrink-0 rounded-md border border-rule object-cover" />
                      )}
                      <span>
                        <span className="font-medium underline-offset-4 group-hover:text-andon-deep group-hover:underline">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-[0.97rem] leading-7 text-steel">
                          {s.summary}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="border-b-2 border-amber pb-2 font-semibold">โครงสร้างไอที</h3>
              <ul className="divide-y divide-rule">
                {infra.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex gap-4 py-5">
                      {hasPublicFile(s.image) && (
                        <SiteImage src={s.image} alt="" width={300} height={200} sizes="96px" className="h-16 w-24 shrink-0 rounded-md border border-rule object-cover" />
                      )}
                      <span>
                        <span className="font-medium underline-offset-4 group-hover:text-andon-deep group-hover:underline">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-[0.97rem] leading-7 text-steel">
                          {s.summary}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/network-service" className="group block py-5">
                    <span className="font-medium underline-offset-4 group-hover:text-andon-deep group-hover:underline">
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
      </Reveal>

      <DataFlow />

      {/* Factory systems */}
      <Reveal as="section" className="border-y border-rule bg-panel">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal>
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
            <FactoryLine className="w-full" />
          </div>
          <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {factorySystems.map((f) => (
              <div key={f.id} data-reveal className="border-t border-rule pt-4">
                <dt className="font-medium">{f.name}</dt>
                <dd className="mt-1 text-[0.95rem] leading-7 text-steel">{f.problem}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>

      <Showcase />

      {/* Process: the top rule draws across as the section scrolls in */}
      <Reveal as="section" className="border-y border-rule bg-panel">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 data-reveal className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
              ขั้นตอนการทำงาน
            </h2>
            <SiteImage src="/images/process.png" alt="ขั้นตอนการทำงานของ GO Along" width={600} height={400} sizes="320px" className="w-full max-w-xs rounded-lg border border-rule bg-panel" />
          </div>
          <div className="relative mt-10">
            <div
              data-reveal-line
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-[2px] bg-ink md:block"
            />
            <ol className="grid gap-8 md:grid-cols-5">
              {workflowSteps.map((step, i) => (
                <li key={step.title} data-reveal className="border-t-2 border-ink pt-4 md:border-t-0">
                  <span className="text-[0.9rem] font-medium tabular-nums text-andon-deep">
                    ขั้นที่ {i + 1}
                  </span>
                  <h3 className="mt-1 font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-7 text-steel">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Reveal>

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <Reveal as="section">
          <Container className="py-16 sm:py-20">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.75rem] font-semibold leading-snug sm:text-[2.1rem]">
                บทความล่าสุด
              </h2>
              <Link href="/blog" className="font-medium text-andon-deep underline underline-offset-4">
                ดูบทความทั้งหมด
              </Link>
            </div>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {latestPosts.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <PostCover src={p.coverImage} alt={p.title} />
                    <time dateTime={p.date} className="mt-4 block text-[0.9rem] text-steel">
                      {formatThaiDate(p.date)}
                    </time>
                    <h3 className="mt-1 font-semibold leading-snug group-hover:text-andon-deep">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.95rem] leading-7 text-steel">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Reveal>
      )}

      {/* FAQ */}
      <section className={latestPosts.length > 0 ? "border-t border-rule" : ""}>
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
