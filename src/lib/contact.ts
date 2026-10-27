export const contactTopics = [
  "พัฒนาซอฟต์แวร์ / ระบบโรงงาน",
  "เว็บแอป / แอปมือถือ",
  "Network, Firewall, Server",
  "ต่ออายุ MA FortiGate / Cisco",
  "QueueBooking ระบบจองคิว",
  "AI Production Partner",
  "อื่น ๆ",
] as const;

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  /** honeypot — must stay empty */
  website: string;
  /** ms timestamp when the form was rendered */
  startedAt: number;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const data: ContactInput = {
    name: s(input.name, 100),
    company: s(input.company, 150),
    email: s(input.email, 200),
    phone: s(input.phone, 30),
    topic: s(input.topic, 80),
    message: s(input.message, 5000),
    website: s(input.website, 200),
    startedAt: Number(input.startedAt) || 0,
  };
  const errors: ContactErrors = {};
  if (!data.name) errors.name = "กรอกชื่อของคุณ";
  if (!EMAIL_RE.test(data.email)) errors.email = "กรอกอีเมลให้ถูกต้อง เพื่อให้เราตอบกลับได้";
  if (data.phone && !/^[0-9+\-\s()]{6,30}$/.test(data.phone)) errors.phone = "เบอร์โทรใช้ได้เฉพาะตัวเลข";
  if (data.message.length < 10) errors.message = "เล่ารายละเอียดอย่างน้อย 10 ตัวอักษร";
  if (data.topic && !(contactTopics as readonly string[]).includes(data.topic)) data.topic = "อื่น ๆ";
  return { data, errors };
}
