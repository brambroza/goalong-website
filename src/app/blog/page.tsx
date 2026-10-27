import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, Container, PageHeader } from "@/components/ui";
import { formatThaiDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "บทความ ซอฟต์แวร์ ระบบโรงงาน และไอที",
  description:
    "บทความจาก GO Along เรื่องการพัฒนาซอฟต์แวร์ ระบบสำหรับโรงงาน ความปลอดภัยไอที และการดูแลระบบเครือข่าย อธิบายแบบเข้าใจง่ายสำหรับเจ้าของธุรกิจ",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/blog", label: "บทความ" }]}
        title="บทความ"
        lead="ความรู้ด้านซอฟต์แวร์และไอทีที่เจ้าของธุรกิจใช้ตัดสินใจได้จริง"
      />
      <Container className="py-14">
        <ul className="divide-y divide-rule border-y border-rule">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-7">
                <time dateTime={p.date} className="text-[0.9rem] text-steel">
                  {formatThaiDate(p.date)}
                </time>
                <h2 className="mt-1 text-[1.3rem] font-semibold leading-snug group-hover:text-andon-deep">
                  {p.title}
                </h2>
                <p className="measure mt-2 text-steel">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <ContactBand />
    </>
  );
}
