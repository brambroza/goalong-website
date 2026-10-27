# goalong.co.th

เว็บไซต์บริษัท GO Along Co., Ltd. (บริษัท โกอะลอง จำกัด) — Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 แทนเว็บ WordPress เดิม

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # ตรวจ build ก่อน deploy
```

แนะนำ deploy บน Vercel (import repo นี้ได้เลย ไม่ต้องตั้งค่าเพิ่ม)

## แก้เนื้อหาที่ไหน

| อยากแก้ | ไฟล์ |
| --- | --- |
| เบอร์โทร อีเมล ที่อยู่ เวลาทำการ เมนู | `src/lib/site.ts` |
| บริการ 6 หน้า (/services/[slug]) รวม FAQ | `src/lib/services.ts` |
| ระบบสำหรับโรงงาน | `src/lib/solutions.ts` |
| ผลิตภัณฑ์ (QueueBooking, AI Production Partner) | `src/lib/products.ts` |
| ขั้นตอนการทำงาน | `src/lib/process.ts` |
| บทความ | เพิ่มไฟล์ `.md` ใน `src/content/blog/` (มี frontmatter `title`, `description`, `date`) |

หน้าใหม่, sitemap และ `llms.txt` จะอัปเดตตามข้อมูลเหล่านี้อัตโนมัติ

## SEO / GEO

- `metadata` และ canonical ทุกหน้า, Open Graph image ภาษาไทย (`src/app/opengraph-image.tsx`)
- JSON-LD: Organization/LocalBusiness, Service, FAQPage, BreadcrumbList, BlogPosting
- `/sitemap.xml`, `/robots.txt` (อนุญาต AI crawler), `/llms.txt` สรุปบริษัทสำหรับ AI
- เก็บ Google Search Console verification เดิมไว้ใน `src/app/layout.tsx`

## Redirect จาก WordPress เดิม (301)

- `/whyus-goalong` → `/why-us`, `/privacy-policy-mail` → `/privacy-policy`, `/welcome-3` → `/`, `/index.php/*` → `/*`, sitemap เดิม → `/sitemap.xml` (ใน `next.config.ts`)
- `/?alb_custom_layout=network-service | ma-cisco | บริการต่ออายุ-ma-fortigate` → `/network-service`, `/ma-cisco`, `/ma-fortigate` (ใน `src/proxy.ts`)

หลังย้ายโดเมนมาที่เว็บใหม่: ส่ง `https://goalong.co.th/sitemap.xml` ใน Google Search Console อีกครั้ง

## สิ่งที่ยังควรเพิ่ม

- รูปผลงาน / case study ลูกค้า (หน้าใหม่ช่วย SEO มากที่สุด)
- โลโก้จริงของบริษัท (ตอนนี้ใช้ wordmark ใน `src/components/Logo.tsx` และ `src/app/icon.svg`)
- Google Analytics / Tag Manager ถ้ายังต้องการเก็บสถิติต่อจาก Site Kit เดิม
