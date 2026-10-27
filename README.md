# goalong.co.th

เว็บไซต์บริษัท GO Along Co., Ltd. (บริษัท โกอะลอง จำกัด) — Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + GSAP

- บทความจัดการได้เองที่ **`/admin`** (Supabase) ไม่ต้องแก้โค้ด
- ฟอร์มติดต่อที่ **`/contact`** ส่งอีเมลเข้า **info@goalong.co.th** ผ่าน SMTP ของบริษัท และเก็บสำเนาไว้ใน `/admin`

## เริ่มใช้งาน

```bash
npm install
cp .env.example .env.local   # ใส่ค่าจริง
npm run dev                  # http://localhost:3000
```

Deploy บน Vercel: import repo นี้ แล้วใส่ Environment Variables ตาม `.env.example`

## ตั้งค่าครั้งแรก

### 1. Supabase (ระบบบทความ)

1. สร้างโปรเจกต์ที่ [supabase.com](https://supabase.com) (แพ็กเกจฟรีพอ) เลือก region Singapore
2. **SQL Editor** → วางเนื้อหา `supabase/schema.sql` แล้วกด Run
   (สร้างตาราง `posts`, `admins`, `contact_messages`, bucket รูป `blog` และสิทธิ์ทั้งหมด)
3. ถ้าต้องการนำบทความตัวอย่าง 2 เรื่องเข้าไปด้วย รัน `supabase/seed.sql`
4. **Authentication → Users → Add user** สร้างบัญชีผู้ดูแล (อีเมล + รหัสผ่าน, ติ๊ก Auto Confirm)
5. กลับไป SQL Editor ให้สิทธิ์บัญชีนั้น:
   ```sql
   insert into public.admins (email) values ('info@goalong.co.th');
   ```
   เพิ่มผู้ดูแลคนอื่นได้ด้วยคำสั่งเดียวกัน
6. **Project Settings → API** คัดลอก Project URL และ anon key ไปใส่
   `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` ใน Vercel แล้ว Redeploy
7. **Authentication → URL Configuration** ตั้ง Site URL เป็น `https://goalong.co.th`

> ถ้ายังไม่ตั้งค่า Supabase เว็บจะใช้บทความจากไฟล์ใน `src/content/blog/` แทน

### 2. SMTP (ฟอร์มติดต่อ)

ใส่ค่าเมลเซิร์ฟเวอร์ของบริษัทใน Vercel:

| ตัวแปร | ตัวอย่าง |
| --- | --- |
| `SMTP_HOST` | `mail.goalong.co.th` |
| `SMTP_PORT` | `465` (SSL) หรือ `587` (ตั้ง `SMTP_SECURE=false`) |
| `SMTP_USER` / `SMTP_PASS` | บัญชีอีเมลที่ใช้ส่ง |
| `SMTP_FROM` | ปกติให้ตรงกับ `SMTP_USER` |
| `CONTACT_TO` | `info@goalong.co.th` (ค่าเริ่มต้น) |

อีเมลที่ได้รับตั้ง Reply-To เป็นอีเมลลูกค้า กด "ตอบกลับ" ได้ทันที
ถ้าส่งอีเมลไม่สำเร็จ ข้อความยังถูกเก็บไว้ในแท็บ "ข้อความติดต่อ" ที่ `/admin` (เมื่อเชื่อม Supabase แล้ว)
มีกันสแปมด้วย honeypot, ตรวจเวลากรอก และจำกัด 5 ครั้ง/10 นาทีต่อ IP

## จัดการบทความ (ไม่ต้องแก้โค้ด)

เข้า `https://goalong.co.th/admin` → เข้าสู่ระบบ →

- **เขียนบทความใหม่**: ชื่อ, เนื้อหา (Markdown มีปุ่มหัวข้อ/ตัวหนา/รายการ/ลิงก์/แทรกรูป), ลิงก์ (slug), คำอธิบายสั้นสำหรับ Google, รูปปก
- ติ๊ก **เผยแพร่บนเว็บไซต์** แล้วกด **บันทึก** หน้าเว็บอัปเดตทันที (ไม่ติ๊ก = ฉบับร่าง)
- แก้ไข / ลบบทความเดิมได้จากรายการ
- รูปอัปโหลดเก็บใน Supabase Storage (ไม่เกิน 5 MB ต่อรูป)

## แก้เนื้อหาส่วนอื่น (ในโค้ด)

| อยากแก้ | ไฟล์ |
| --- | --- |
| เบอร์โทร อีเมล ที่อยู่ เวลาทำการ เมนู | `src/lib/site.ts` |
| บริการ 6 หน้า (/services/[slug]) รวม FAQ | `src/lib/services.ts` |
| ระบบสำหรับโรงงาน | `src/lib/solutions.ts` |
| ผลิตภัณฑ์ | `src/lib/products.ts` |
| ขั้นตอนการทำงาน | `src/lib/process.ts` |
| หัวข้อในฟอร์มติดต่อ | `src/lib/contact.ts` |

## Animation (GSAP)

- `src/components/hero/` — hero หน้าแรก: โครงข่ายจุดบน canvas ที่ตอบสนองเมาส์ (`NetworkCanvas`), แผง terminal ที่พิมพ์คำสั่งสร้างระบบแล้วแผนผังประกอบขึ้นเอง (`SystemDeck`), หัวข้อแยกคำเลื่อนเข้า และตัวเลขนับขึ้น (`TechHero`)
- `src/components/motion/DataFlow.tsx` — ส่วน "ข้อมูลเข้าครั้งเดียว": ตรึงหน้าจอแล้วเส้นข้อมูลวาดตามการเลื่อน (เฉพาะจอใหญ่)
- `src/components/motion/Reveal.tsx` — เนื้อหาค่อย ๆ ปรากฏเมื่อเลื่อนถึง, เส้นขั้นตอนการทำงานวาดตามการเลื่อน
- `src/components/illustrations/` — ภาพ SVG เคลื่อนไหว (สายพานโรงงาน, ระบบ → Firewall → Server) เล่นเฉพาะตอนอยู่บนจอ
- ผู้ใช้ที่ตั้งค่า "ลดการเคลื่อนไหว" ในเครื่องจะเห็นหน้าแบบนิ่ง

## SEO / GEO

- `metadata` + canonical ทุกหน้า, OG image ภาษาไทย, JSON-LD (Organization, Service, FAQ, Breadcrumb, BlogPosting)
- `/sitemap.xml`, `/robots.txt` (อนุญาต AI crawler, ปิด `/admin`), `/llms.txt` — บทความใหม่ถูกเพิ่มอัตโนมัติ
- เก็บ Google Search Console verification เดิมไว้ใน `src/app/layout.tsx`

## Redirect จาก WordPress เดิม (301)

- `/whyus-goalong` → `/why-us`, `/privacy-policy-mail` → `/privacy-policy`, `/welcome-3` → `/`, `/index.php/*` → `/*`, sitemap เดิม → `/sitemap.xml` (`next.config.ts`)
- `/?alb_custom_layout=…` → `/network-service`, `/ma-cisco`, `/ma-fortigate` (`src/proxy.ts`)

หลังชี้โดเมนมาที่เว็บใหม่ ส่ง `https://goalong.co.th/sitemap.xml` ใน Google Search Console อีกครั้ง
