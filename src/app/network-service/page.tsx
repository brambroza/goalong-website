import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "IT Support, Network Service, MA และ PM สำหรับสำนักงานและโรงงาน",
  description:
    "บริการไอทีครบวงจรจาก GO Along: ออกแบบและดูแล Network, Firewall, Server, Storage, IT Support แบบ Remote และ Onsite, PM ตามรอบ และต่ออายุ MA FortiGate, Cisco, Dell Server พร้อมจำหน่ายอุปกรณ์",
  alternates: { canonical: "/network-service" },
};

const groups = [
  {
    title: "System Infrastructure",
    items: [
      "ออกแบบและดูแลระบบ Network, Security, Server, Storage และซอฟต์แวร์",
      "ระบบไฟฟ้าและความเย็นสำหรับห้องเซิร์ฟเวอร์",
    ],
  },
  {
    title: "IT Support",
    items: [
      "ดูแลแบบ Remote และ Onsite",
      "Monitor ระบบเครือข่าย",
      "ระบบป้องกันไวรัสและภัยคุกคาม",
      "ระบบสำรองข้อมูล",
    ],
  },
  {
    title: "Network Security",
    items: [
      "Firewall และ VPN",
      "Antivirus / Anti-malware",
      "IDS/IPS และ Access Control",
      "ยืนยันตัวตนหลายขั้น (MFA)",
    ],
  },
  {
    title: "Structured Cabling",
    items: ["เดินสาย LAN และ Fiber Optic", "สายสำหรับคอมพิวเตอร์และกล้อง CCTV"],
  },
  {
    title: "Network Service",
    items: [
      "ติดตั้งและดูแล Router, Switch, Firewall",
      "ออกแบบ VLAN แยกเครือข่ายตามการใช้งาน",
      "ปรับความเร็ว และหาสาเหตุเน็ตล่มหรือหลุด",
    ],
  },
  {
    title: "Preventive Maintenance (PM)",
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/ma-fortigate"
            className="rounded-md bg-andon px-5 py-3 font-medium text-white hover:bg-andon-deep"
          >
            ต่ออายุ MA FortiGate
          </Link>
          <Link
            href="/ma-cisco"
            className="rounded-md border border-ink px-5 py-3 font-medium hover:bg-ink hover:text-white"
          >
            ต่ออายุ MA Cisco
          </Link>
        </div>
      </PageHeader>

      <Container className="py-14">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <section key={g.title} className="border-t-2 border-ink pt-4">
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
