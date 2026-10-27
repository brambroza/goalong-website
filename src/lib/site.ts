export const site = {
  url: "https://goalong.co.th",
  name: "GO Along",
  legalNameTh: "บริษัท โกอะลอง จำกัด",
  legalNameEn: "GO Along Co., Ltd.",
  tagline: "ไปด้วยกัน ไปได้ไกล ไปกับ GO Along",
  description:
    "GO Along รับเขียนโปรแกรมและพัฒนาซอฟต์แวร์ตามความต้องการธุรกิจ ทั้งเว็บแอปพลิเคชัน แอปมือถือ ระบบสำหรับโรงงาน และงาน Network, Firewall, Server ครบในทีมเดียว พร้อมดูแลหลังส่งมอบ",
  phone: "085 608 3298",
  phoneHref: "tel:+66856083298",
  email: "sales@goalong.co.th",
  line: "@goalong",
  lineHref: "https://line.me/R/ti/p/@goalong",
  address: {
    th: "918/288 หมู่ 10 ต.ในคลองบางปลากด อ.พระสมุทรเจดีย์ จ.สมุทรปราการ 10290",
    street: "918/288 Moo 10",
    locality: "Phra Samut Chedi",
    subLocality: "Nai Khlong Bang Pla Kot",
    region: "Samut Prakan",
    postalCode: "10290",
    country: "TH",
  },
  hours: [
    { label: "จันทร์ – ศุกร์", value: "9:00 – 18:00" },
    { label: "เสาร์", value: "9:00 – 12:00" },
    { label: "อาทิตย์", value: "ปิด" },
  ],
  supportNote: "ลูกค้าที่มีสัญญาดูแลระบบติดต่อทีมผ่าน Microsoft Teams ได้ตลอด",
} as const;

export const nav = [
  { href: "/services", label: "บริการ" },
  { href: "/solutions/factory", label: "ระบบโรงงาน" },
  { href: "/products", label: "ผลิตภัณฑ์" },
  { href: "/network-service", label: "Network & MA" },
  { href: "/blog", label: "บทความ" },
  { href: "/why-us", label: "ทำไมต้องเรา" },
] as const;
