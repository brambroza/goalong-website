import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContactBand, Container, JsonLd, PostCover } from "@/components/ui";
import { formatThaiDate, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="border-b border-rule bg-panel">
          <Container className="py-12 sm:py-16">
            <Breadcrumbs
              items={[
                { href: "/blog", label: "บทความ" },
                { href: `/blog/${post.slug}`, label: post.title },
              ]}
            />
            <h1 className="measure mt-5 text-[1.9rem] font-semibold leading-[1.35] tracking-tight sm:text-[2.4rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-[0.95rem] text-steel">
              โดยทีม GO Along ·{" "}
              <time dateTime={post.date}>{formatThaiDate(post.date)}</time>
            </p>
          </Container>
        </header>
        <Container className="py-12">
          {post.coverImage && (
            <PostCover src={post.coverImage} alt={post.title} className="measure mb-10" />
          )}
          <div
            className="prose-ga measure"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </article>
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          ...(post.coverImage ? { image: post.coverImage } : {}),
          inLanguage: "th",
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
