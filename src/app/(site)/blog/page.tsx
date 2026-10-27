import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand, Container, PageHeader, PostCover } from "@/components/ui";
import { formatThaiDate, getAllPosts } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "บทความ ซอฟต์แวร์ ระบบโรงงาน และไอที",
  description:
    "บทความจาก GO Along เรื่องการพัฒนาซอฟต์แวร์ ระบบสำหรับโรงงาน ความปลอดภัยไอที และการดูแลระบบเครือข่าย อธิบายแบบเข้าใจง่ายสำหรับเจ้าของธุรกิจ",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/blog", label: "บทความ" }]}
        title="บทความ"
        lead="ความรู้ด้านซอฟต์แวร์และไอทีที่เจ้าของธุรกิจใช้ตัดสินใจได้จริง"
      />
      <Container className="py-14">
        {!first && <p className="text-steel">ยังไม่มีบทความในตอนนี้</p>}

        {first && (
          <Link
            href={`/blog/${first.slug}`}
            className="group grid items-center gap-8 border-b border-rule pb-12 lg:grid-cols-[1.2fr_1fr]"
          >
            <PostCover src={first.coverImage} alt={first.title} />
            <div>
              <time dateTime={first.date} className="text-[0.9rem] text-steel">
                {formatThaiDate(first.date)}
              </time>
              <h2 className="mt-2 text-[1.7rem] font-semibold leading-snug group-hover:text-andon-deep">
                {first.title}
              </h2>
              <p className="mt-3 text-steel">{first.description}</p>
              <span className="mt-5 inline-block font-medium text-andon-deep underline underline-offset-4">
                อ่านบทความ
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <PostCover src={p.coverImage} alt={p.title} />
                  <time dateTime={p.date} className="mt-4 block text-[0.9rem] text-steel">
                    {formatThaiDate(p.date)}
                  </time>
                  <h2 className="mt-1 text-[1.15rem] font-semibold leading-snug group-hover:text-andon-deep">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[0.95rem] leading-7 text-steel">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <ContactBand />
    </>
  );
}
