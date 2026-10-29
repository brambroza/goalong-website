import type { Metadata } from "next";
import Link from "next/link";
import { TechHero } from "@/components/hero/TechHero";
import { DataFlow } from "@/components/motion/DataFlow";
import { Showcase } from "@/components/portfolio/Showcase";
import { Reveal } from "@/components/motion/Reveal";
import { LiveOps } from "@/components/live/LiveOps";
import { NetOps } from "@/components/live/NetOps";
import { ProductShot } from "@/components/ProductShot";
import { formatThaiDate, getAllPosts } from "@/lib/blog";
import { ContactBand, FaqList, PostCover } from "@/components/ui";
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


const capabilities = [
  { t: "Custom software", d: "ERP, WMS, CMMS, HR, ระบบเฉพาะธุรกิจ", stack: "Next.js · .NET · PostgreSQL", href: "/services/software-development" },
  { t: "Web & mobile apps", d: "เว็บแอป, PWA, แอปพนักงานบนเครื่องสแกน", stack: "React · Flutter · Supabase", href: "/services/web-application" },
  { t: "LINE & integrations", d: "LINE OA, e-Tax, payment, เชื่อม ERP เดิม", stack: "Messaging API · REST · webhooks", href: "/services/web-application" },
  { t: "AI-assisted engineering", d: "ใช้ AI เร่งงานทุกขั้น และพาแอปที่สร้างด้วย AI ขึ้น production", stack: "Claude · agents · CI/CD", href: "/products#ai-production-partner" },
  { t: "Network & security", d: "Firewall, VLAN, VPN, Wi-Fi, ต่ออายุ MA", stack: "FortiGate · Cisco · Aruba", href: "/services/network-security" },
  { t: "Server, cloud & backup", d: "On-premise, cloud, hybrid, backup ที่กู้คืนได้จริง", stack: "Dell · HPE · Docker · Proxmox", href: "/services/server-cloud-backup" },
];

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div className="bg-[#0a0c0e] text-white">
      <TechHero />

      {/* Two panels: software (ops dashboard) + infrastructure (NOC console) */}
      <Reveal as="section" className="relative">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1200px] gap-6 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <article data-reveal>
            <p className="font-mono text-[0.78rem] text-brand">01 · software</p>
            <h2 className="display display-sm mt-2">ระบบโรงงานที่เห็นสถานะได้แบบเรียลไทม์</h2>
            <p className="mt-3 max-w-md text-white/60">ERP, คลังสินค้า, ซ่อมบำรุง, ต้นทุน สร้างจากโมดูลที่มีอยู่แล้ว ปรับตามไลน์ผลิตของคุณ</p>
            <Link href="/solutions/factory" className="link-more mt-4 text-brand">ดูระบบโรงงาน</Link>
            <LiveOps className="mt-8" />
          </article>
          <article data-reveal>
            <p className="font-mono text-[0.78rem] text-brand">02 · infrastructure</p>
            <h2 className="display display-sm mt-2">เครือข่ายและเซิร์ฟเวอร์ที่มีคนเฝ้า</h2>
            <p className="mt-3 max-w-md text-white/60">Firewall, VLAN, Server, Backup และ MA FortiGate/Cisco ดูแลโดยทีมเดียวกับที่เขียนโค้ด</p>
            <Link href="/network-service" className="link-more mt-4 text-brand">ดูบริการ Network</Link>
            <NetOps className="mt-8" />
          </article>
        </div>
      </Reveal>

      {/* Real product, light tile so the screenshot reads true */}
      <Reveal as="section" className="px-3 pb-3">
        <div className="mx-auto max-w-[1200px] rounded-[28px] bg-paper px-6 pb-12 pt-16 text-center text-ink sm:pt-20">
          <p data-reveal className="font-mono text-[0.78rem] text-andon">03 · in production</p>
          <h2 data-reveal className="display display-md mx-auto mt-2 max-w-3xl">ของจริงที่ลูกค้าใช้อยู่ทุกวัน</h2>
          <p data-reveal className="subhead mx-auto mt-4 max-w-2xl text-steel">GO HR: หน้า Insight สรุปกำลังคน ต้นทุน และสัญญาณการลาออกให้ผู้บริหาร รันบนเซิร์ฟเวอร์ที่ทีมเราดูแลเอง</p>
          <ProductShot
            src="/images/go-hr-insight.webp"
            alt="หน้า Insight วิเคราะห์ข้อมูลของระบบ GO HR แสดงจำนวนพนักงาน อัตราลาออก และกราฟสรุปตามหน่วยงาน"
            width={1707}
            height={1231}
            className="mx-auto mt-12 max-w-4xl"
          />
        </div>
      </Reveal>

      <Showcase />

      <DataFlow />

      {/* Capabilities + stack */}
      <Reveal as="section" className="relative">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
          <p data-reveal className="font-mono text-[0.78rem] text-brand">04 · capabilities</p>
          <h2 data-reveal className="display display-md mt-2 max-w-3xl">ตั้งแต่โค้ด ถึง Firewall</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.t} data-reveal>
                <Link href={c.href} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/50 hover:bg-white/[0.06]">
                  <h3 className="text-[1.1rem] font-semibold">{c.t}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-6 text-white/60">{c.d}</p>
                  <p className="mt-4 font-mono text-[0.72rem] text-brand/80">{c.stack}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Process */}
      <Reveal as="section" className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <p data-reveal className="font-mono text-[0.78rem] text-brand">05 · how we ship</p>
          <h2 data-reveal className="display display-md mt-2">จากคุยครั้งแรก ถึงดูแลหลังส่งมอบ</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <li key={step.title} data-reveal className="border-t border-white/15 pt-4">
                <span className="font-mono text-[0.78rem] text-brand">0{i + 1}</span>
                <h3 className="mt-1 font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-6 text-white/55">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <Reveal as="section" className="border-t border-white/10">
          <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.78rem] text-brand">06 · notes</p>
                <h2 className="display display-sm mt-2">บทความล่าสุด</h2>
              </div>
              <Link href="/blog" className="link-more text-brand">ดูบทความทั้งหมด</Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {latestPosts.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <PostCover src={p.coverImage} alt={p.title} className="rounded-2xl ring-1 ring-white/10" />
                    <time dateTime={p.date} className="mt-4 block font-mono text-[0.75rem] text-white/50">{formatThaiDate(p.date)}</time>
                    <h3 className="mt-1 font-semibold leading-snug group-hover:text-brand">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* FAQ */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6">
          <h2 className="display display-sm text-center">คำถามที่พบบ่อย</h2>
          <div className="faq-dark mt-8">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
