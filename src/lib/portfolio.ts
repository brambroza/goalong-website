export type PortfolioItem = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  bullets: string[];
  url: string;
  /** Screenshot under /public/images/portfolio (16:10). When missing, a drawn mock is shown. */
  image?: string;
  /** Short label of what kind of thing it is */
  kind: string;
  /** Who it's for */
  audience: string;
  accent: string;
  theme: "dark" | "light";
};

export const portfolio: PortfolioItem[] = [
  {
    id: "statusdesk",
    name: "StatusDesk",
    kind: "AI agent บน LINE",
    audience: "โรงงานที่มีคนโทรตามสถานะงานทั้งวัน",
    tagline: "งานนี้ถึงไหนแล้ว? ถาม bot แทนการโทรตาม",
    summary:
      "บอทประจำแต่ละฝ่าย (จัดซื้อ คลัง QC ผลิต จัดส่ง) คุยกันเองเพื่อรวบรวมคำตอบ แล้วตอบผู้ถามทาง LINE ตามสิทธิ์ที่เห็นได้ โดยไม่ต้องเปลี่ยน ERP หรือคีย์ข้อมูลเพิ่ม",
    bullets: [
      "ตัดข้อมูลที่ผู้ถามไม่มีสิทธิ์เห็นออกก่อนให้ AI ตอบ",
      "แจ้งเตือนเชิงรุก: QC ไม่ผ่าน, PO ค้าง, งานไม่ขยับ 3 วัน",
      "เปิดใช้ทีละชั้น: พนักงาน → สาขา/ซัพพลายเออร์ → ลูกค้า",
    ],
    url: "https://goalong-statusdesk-tawny.vercel.app/",
    accent: "#0C1A3A",
    theme: "dark",
  },
  {
    id: "factory-os",
    name: "Factory OS",
    kind: "ERP โมดูลาร์ 21+ โมดูล",
    audience: "โรงงาน สำนักงาน ธุรกิจบริการ และผู้ค้าส่ง SME",
    tagline: "ระบบงานบริษัทที่เห็นภาพ สั่งงานเป็นภาษาไทย และมีบอทเฝ้าให้",
    summary:
      "ERP ที่ซื้อเป็นโมดูลได้ทีละส่วน ดูภาพรวมบริษัทในจอเดียวพร้อมผังโรงงาน 3 มิติ พิมพ์สั่งงานเป็นภาษาไทยผ่านแถบ ⌘K แล้วระบบกรอกฟอร์มให้ ออกใบกำกับภาษีและสรุป ภ.พ.30 ได้",
    bullets: [
      "ผังโรงงาน 3 มิติ เครื่องเสียขึ้นสีแดงทันที",
      "อนุมัติเอกสารจากมือถือ แจ้งเตือนในแอปและ LINE",
      "ซื้อขาดพร้อมซอร์สโค้ด หรือเช่ารายเดือน มี pilot 60 วัน",
    ],
    url: "https://template-core-ten.vercel.app/",
    accent: "#1d7f54",
    theme: "light",
  },
  {
    id: "queuebooking",
    name: "QueueBooking",
    kind: "SaaS จองคิวบน LINE OA",
    audience: "ร้านตัดผม คลินิก ร้านอาหาร ศูนย์บริการ สนามกีฬา",
    tagline: "เปลี่ยนทุกแชท ให้กลายเป็นคิวที่จัดการง่าย",
    summary:
      "ลูกค้าจองคิวและจ่ายมัดจำผ่าน LINE ได้เอง พนักงานเห็นทุกคิวแบบเรียลไทม์บน Queue Board ทุกสาขาใช้ข้อมูลชุดเดียวกัน พร้อมจอเรียกคิวสำหรับ Smart TV",
    bullets: [
      "มัดจำผ่าน PromptPay QR ส่งใบเสร็จใน LINE",
      "จอเรียกคิว 11 แบบ และ sync Google Calendar",
      "เริ่มฟรี 50 คิว/เดือน แพ็กเกจเริ่ม 990 บาท",
    ],
    url: "https://queuebooking.com/",
    accent: "#0b0f16",
    theme: "dark",
  },
  {
    id: "ai-production-partner",
    name: "AI Production Partner",
    kind: "บริการสำหรับแอปที่สร้างด้วย AI",
    audience: "ทีมที่สร้างแอปด้วย Cursor, Claude Code, Lovable, Bolt",
    tagline: "AI builds the system. We make it work for real.",
    summary:
      "รับแอปที่สร้างด้วย AI มาตรวจความปลอดภัย เชื่อมกับ ERP บัญชี LINE และอุปกรณ์หน้างาน แล้วดูแลการโฮสต์และ backup ระยะยาว ทีมคุณพัฒนาต่อ เราดูแลชั้น production ให้",
    bullets: [
      "AI App Rescue: ตรวจความปลอดภัย ข้อมูล สิทธิ์ backup ราคาเดียว",
      "เชื่อม ERP, e-Tax, payment gateway, เครื่องจักร",
      "Managed hosting + care plan รายเดือน บน cloud หรือ server ของคุณ",
    ],
    url: "https://ai-production-partner.vercel.app/",
    accent: "#13583a",
    theme: "light",
  },
];
