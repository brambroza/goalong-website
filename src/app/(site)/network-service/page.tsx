import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, Container, PageHeader, SiteImage, hasPublicFile } from "@/components/ui";

export const metadata: Metadata = {
  title: "IT Support, Network Service, MA และ PM สำหรับสำนักงานและโรงงาน",
  description:
    "บริการไอทีครบวงจรจาก GO Along: ออกแบบและดูแล Network, Firewall, Server, Storage, IT Support แบบ Remote และ Onsite, PM ตามรอบ และต่ออายุ MA FortiGate, Cisco, Dell Server พร้อมจำหน่ายอุปกรณ์",
  alternates: { canonical: "/network-service" },
};

const heroImage = "/images/network/network-service.png";
const brandsImage = "/images/network/it-hardware.svg";

const groups = [
  {
    title: "System Infrastructure",
    icon: "/images/network/system-infrastructure.svg",
    items: [
      "ออกแบบและดูแลระบบ Network, Security, Server, Storage และซอฟต์แวร์",
      "ระบบไฟฟ้าและความเย็นสำหรับห้องเซิร์ฟเวอร์",
    ],
  },
  {
    title: "IT Support",
    icon: "/images/network/it-service.svg",
    items: [
      "ดูแลแบบ Remote และ Onsite",
      "Monitor ระบบเครือข่าย",
      "ระบบป้องกันไวรัสและภัยคุกคาม",
      "ระบบสำรองข้อมูล",
    ],
  },
  {
    title: "Network Security",
    icon: "/images/network/network-security.svg",
    items: [
      "Firewall และ VPN",
      "Antivirus / Anti-malware",
      "IDS/IPS และ Access Control",
      "ยืนยันตัวตนหลายขั้น (MFA)",
    ],
  },
  {
    title: "Structured Cabling",
    icon: "/images/network/structured-cabling.svg",
    items: ["เดินสาย LAN และ Fiber Optic", "สายสำหรับคอมพิวเตอร์และกล้อง CCTV"],
  },
  {
    title: "Network Service",
    icon: "/images/network/network-service.svg",
    items: [
      "ติดตั้งและดูแล Router, Switch, Firewall",
      "ออกแบบ VLAN แยกเครือข่ายตามการใช้งาน",
      "ปรับความเร็ว และหาสาเหตุเน็ตล่มหรือหลุด",
    ],
  },
  {
    title: "Preventive Maintenance (PM)",
    icon: "/images/network/pm.svg",
    items: [
      "ตรวจเช็ก Server ระบบไฟ และอุปกรณ์เครือข่ายตามรอบ",
      "ทำความสะอาด อัปเดตซอฟต์แวร์และแอนตี้ไวรัส",
    ],
  },
];

const brands = [
  { group: "Server / Storage", names: "Dell PowerEdge, HPE ProLiant" },
  { group: "Network", names: "Cisco Catalyst, HPE Aruba Switch, FortiGate Firewall" },
  { group: "Wireless", names: "Aruba Instant AP, Cisco Meraki" },
  { group: "อุปกรณ์เสริม", names: "SFP Module, UPS, ตู้ Rack, สาย Fiber และ UTP" },
];

export default function NetworkServicePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/network-service", label: "Network & MA" }]}
        title="IT Support และ Network Service สำหรับสำนักงานและโรงงาน"
        lead="ดูแลโครงสร้างไอทีที่ระบบงานของคุณใช้อยู่ ตั้งแต่สาย LAN, Firewall ไปจนถึงเซิร์ฟเวอร์ พร้อมต่ออายุ MA อุปกรณ์และตรวจเช็กตามรอบ"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/ma-fortigate"
            className="rounded-full bg-andon px-5 py-3 font-medium text-white hover:bg-andon-deep"
          >
            ต่ออายุ MA FortiGate
          </Link>
          <Link
            href="/ma-cisco"
            className="rounded-full border border-ink/30 px-5 py-3 font-medium hover:bg-ink hover:text-white"
          >
            ต่ออายุ MA Cisco
          </Link>
        </div>
      </PageHeader>

      <Container className="py-14">
        <div className="mb-14 grid gap-4 md:grid-cols-2">
          <SiteImage src="/images/network/it-service.webp" alt="IT Service: IT support, network services และ preventive maintenance" width={1500} height={1000} sizes="(min-width: 768px) 500px, 100vw" priority className="w-full rounded-[22px] bg-tile" />
          <SiteImage src="/images/network/network-security.webp" alt="ระบบรักษาความปลอดภัยระบบเครือข่าย (Network Security)" width={1500} height={1000} sizes="(min-width: 768px) 500px, 100vw" priority className="w-full rounded-[22px] bg-tile" />
        </div>
        {hasPublicFile(heroImage) && (
          <SiteImage src={heroImage} alt="บริการ Network และ IT Support โดย GO Along" width={1500} height={700} sizes="(min-width: 1024px) 1100px, 100vw" className="mb-14 w-full rounded-[22px] bg-tile" />
        )}
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <section key={g.title} className="border-t-2 border-ink pt-4">
              {hasPublicFile(g.icon) && (
                <SiteImage src={g.icon} alt="" width={96} height={96} sizes="56px" className="mb-3 size-14" />
              )}
              <h2 className="font-semibold">{g.title}</h2>
              <ul className="mt-2 space-y-1.5 text-steel">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-[1.5rem] font-semibold">อุปกรณ์ที่จำหน่ายและติดตั้ง</h2>
          {hasPublicFile(brandsImage) && (
            <SiteImage src={brandsImage} alt="อุปกรณ์ Server, Network, Wireless ที่ GO Along จำหน่าย" width={1500} height={1000} sizes="(min-width: 1024px) 1100px, 100vw" className="mt-6 w-full rounded-[22px] bg-tile" />
          )}
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {brands.map((b) => (
              <div key={b.group} className="grid gap-1 py-3 sm:grid-cols-[200px_1fr]">
                <dt className="font-medium">{b.group}</dt>
                <dd className="text-steel">{b.names}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
      <ContactBand title="อุปกรณ์ใกล้หมด MA หรือเน็ตในออฟฟิศมีปัญหา ส่งรายละเอียดมาให้เราดู" />
    </>
  );
}
