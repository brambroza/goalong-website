export type Product = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  points: string[];
  url: string;
  cta: string;
};

export const products: Product[] = [
  {
    id: "queuebooking",
    name: "QueueBooking",
    kind: "ระบบจองคิวผ่าน LINE OA",
    summary:
      "ให้ลูกค้าจองคิวและรับการแจ้งเตือนผ่าน LINE ได้เอง ลดการรอหน้าร้านและสายโทรเข้าซ้ำ เหมาะกับร้านตัดผม คลินิก ร้านทำเล็บ ศูนย์บริการ ร้านซ่อม ร้านอาหาร และหน่วยงานที่ต้องจัดคิว",
    points: [
      "ลูกค้าจองผ่าน LINE OA ของร้านเอง ไม่ต้องโหลดแอปเพิ่ม",
      "แจ้งเตือนก่อนถึงคิวอัตโนมัติ",
      "ติดตั้งและตั้งค่าแบบออนไลน์ได้ ไม่ต้องซื้ออุปกรณ์",
      "มีแพ็กเกจทดลองใช้ฟรี",
    ],
    url: "https://queuebooking.com",
    cta: "ทดลองใช้ที่ queuebooking.com",
  },
  {
    id: "ai-production-partner",
    name: "AI Production Partner",
    kind: "บริการสำหรับแอปที่สร้างด้วย AI",
    summary:
      "สร้างระบบต้นแบบด้วย AI ได้แล้ว แต่ยังไม่กล้าเปิดให้ลูกค้าหรือพนักงานใช้จริง เราช่วยพาแอปนั้นขึ้นใช้งานจริงอย่างปลอดภัย และดูแลต่อในระยะยาว",
    points: [
      "ตรวจและแก้ช่องโหว่ด้านความปลอดภัย",
      "ติดตั้งขึ้นเซิร์ฟเวอร์หรือ Cloud ให้พร้อมใช้งานจริง",
      "เชื่อมกับระบบเดิมขององค์กร",
      "ดูแลและปรับปรุงระยะยาว",
    ],
    url: "https://ai-production-partner.vercel.app",
    cta: "ดูรายละเอียดบริการ",
  },
];
