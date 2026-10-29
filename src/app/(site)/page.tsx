import type { Metadata } from "next";
import Link from "next/link";
import { TechHero } from "@/components/hero/TechHero";
import { DataFlow } from "@/components/motion/DataFlow";
import { Showcase } from "@/components/portfolio/Showcase";
import { Reveal } from "@/components/motion/Reveal";
import { FactoryLine } from "@/components/illustrations/FactoryLine";
import { ProductShot } from "@/components/ProductShot";
import { formatThaiDate, getAllPosts } from "@/lib/blog";
import { ContactBand, FaqList, PostCover, SiteImage, hasPublicFile } from "@/components/ui";
import { services } from "@/lib/services";
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
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <TechHero />

      {/* Two half tiles: factory systems (gray) + network (black) */}
      <Reveal as="section" className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] gap-3 px-3 py-3 md:grid-cols-2">
          <article data-reveal className="flex flex-col items-center rounded-[28px] bg-tile px-6 pb-0 pt-14 text-center">
            <h2 className="display display-sm">ระบบสำหรับโรงงาน SME</h2>
            <p className="subhead mt-2 max-w-md text-steel">ERP, คลังสินค้า, ซ่อมบำรุง, ต้นทุน ปรับจากโมดูลที่มีอยู่แล้ว</p>
            <Link href="/solutions/factory" className="link-more mt-4">ดูระบบโรงงาน</Link>
            <FactoryLine className="mt-6 w-full max-w-md" />
          </article>
          <article data-reveal className="flex flex-col items-center justify-between rounded-[28px] bg-board px-6 pt-14 text-center text-white">
            <div>
              <h2 className="display display-sm">Network, Firewall, Server</h2>
              <p className="subhead mt-2 max-w-md text-white/70">ติดตั้ง ดูแล ต่ออายุ MA FortiGate และ Cisco โดยทีมเดียวกับที่เขียนโปรแกรม</p>
              <Link href="/network-service" className="link-more mt-4 text-brand">ดูบริการ Network</Link>
            </div>
            <ul className="mt-10 grid w-full max-w-md grid-cols-2 gap-3 pb-10 text-left text-[0.9rem]">
              {[
                ["FortiGate", "Firewall · MA"],
                ["Cisco", "Switch · SmartNet"],
                ["Dell · HPE", "Server · Storage"],
                ["Aruba · Meraki", "Wi-Fi"],
              ].map(([a, b]) => (
                <li key={a} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="block font-semibold">{a}</span>
                  <span className="text-white/60">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Reveal>

      {/* Full tile: real product */}
      <Reveal as="section" className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-3 pb-3">
          <div className="rounded-[28px] bg-panel px-6 pb-12 pt-16 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:pt-20">
            <h2 data-reveal className="display display-md mx-auto max-w-3xl">
              ทั้งโปรแกรม และเครื่องที่โปรแกรมทำงานอยู่
            </h2>
            <p data-reveal className="subhead mx-auto mt-4 max-w-2xl text-steel">
              ระบบช้าอาจมาจากโค้ด ฐานข้อมูล หรือเครือข่าย ทีมเดียวที่เห็นทั้งหมดหาสาเหตุได้เร็วกว่า
            </p>
            <div data-reveal className="mt-4 flex justify-center gap-8">
              <Link href="/services" className="link-more">บริการทั้งหมด</Link>
              <Link href="/contact" className="link-more">ปรึกษาฟรี</Link>
            </div>
            <ProductShot
              src="/images/go-hr-insight.webp"
              alt="หน้า Insight วิเคราะห์ข้อมูลของระบบ GO HR แสดงจำนวนพนักงาน อัตราลาออก และกราฟสรุปตามหน่วยงาน"
              width={1707}
              height={1231}
              caption="GO HR — ระบบบริหารงานบุคคลที่ GO Along พัฒนา ทำงานบนเซิร์ฟเวอร์ที่ทีมเราดูแล"
              className="mx-auto mt-12 max-w-4xl"
            />
          </div>
        </div>
      </Reveal>

      <Showcase />

      <DataFlow />

      {/* Services grid */}
      <Reveal as="section" className="bg-paper">
        <div className="mx-auto max-w-[1024px] px-4 py-20 sm:px-6 sm:py-28">
          <h2 data-reveal className="display display-md text-center">สิ่งที่เราทำ</h2>
          <p data-reveal className="subhead mx-auto mt-3 max-w-2xl text-center text-steel">เลือกบริการเดียว หรือให้เราดูแลทั้งหมด</p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} data-reveal>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-[22px] bg-tile p-6 transition-transform hover:-translate-y-0.5">
                  {hasPublicFile(s.image) && (
                    <SiteImage src={s.image} alt="" width={600} height={400} sizes="320px" className="mb-4 w-full rounded-xl" />
                  )}
                  <h3 className="text-[1.15rem] font-semibold leading-snug">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-6 text-steel">{s.summary}</p>
                  <span className="link-more mt-4">เรียนรู้เพิ่มเติม</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Process: black tile */}
      <Reveal as="section" className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-3 pb-3">
          <div className="rounded-[28px] bg-board px-6 py-16 text-white sm:py-20">
            <h2 data-reveal className="display display-md text-center">จากคุยครั้งแรก ถึงดูแลหลังส่งมอบ</h2>
            <SiteImage src="/images/process.webp" alt="5 ขั้นตอนการทำงานของ GO Along: ปรึกษา วิเคราะห์ ออกแบบและพัฒนา ทดสอบ ส่งมอบและดูแล" width={1600} height={1200} sizes="(min-width: 1024px) 900px, 100vw" className="mx-auto mt-10 w-full max-w-4xl rounded-[22px]" />
            <ol className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-5">
              {workflowSteps.map((step, i) => (
                <li key={step.title} data-reveal className="border-t border-white/15 pt-4">
                  <span className="text-[0.85rem] tabular-nums text-brand">ขั้นที่ {i + 1}</span>
                  <h3 className="mt-1 font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-6 text-white/60">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <Reveal as="section" className="bg-paper">
          <div className="mx-auto max-w-[1024px] px-4 py-20 sm:px-6">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display display-sm">บทความล่าสุด</h2>
              <Link href="/blog" className="link-more">ดูบทความทั้งหมด</Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {latestPosts.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <PostCover src={p.coverImage} alt={p.title} className="rounded-2xl" />
                    <time dateTime={p.date} className="mt-4 block text-[0.85rem] text-steel">{formatThaiDate(p.date)}</time>
                    <h3 className="mt-1 font-semibold leading-snug group-hover:text-andon">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6">
          <h2 className="display display-sm text-center">คำถามที่พบบ่อย</h2>
          <div className="mt-8">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
