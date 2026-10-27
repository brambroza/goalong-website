import Link from "next/link";
import { Container } from "@/components/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
    <Container className="py-24">
      <h1 className="text-[2rem] font-semibold">ไม่พบหน้านี้</h1>
      <p className="mt-3 text-steel">
        หน้าที่คุณเปิดอาจถูกย้ายไปแล้วหลังเราปรับปรุงเว็บไซต์ ลองเริ่มจากหน้าเหล่านี้
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/" className="text-andon-deep underline underline-offset-4">หน้าแรก</Link>
        </li>
        <li>
          <Link href="/services" className="text-andon-deep underline underline-offset-4">บริการทั้งหมด</Link>
        </li>
        <li>
          <Link href="/contact" className="text-andon-deep underline underline-offset-4">ติดต่อเรา</Link>
        </li>
      </ul>
    </Container>
      </main>
      <Footer />
    </>
  );
}
