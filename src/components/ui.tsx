import Link from "next/link";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/services";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1024px] px-4 sm:px-6 ${className}`}>{children}</div>
  );
}

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ href: "/", label: "หน้าแรก" }, ...items];
  return (
    <>
      <nav aria-label="breadcrumb" className="text-[0.85rem] text-steel">
        <ol className="flex flex-wrap gap-x-2">
          {all.map((c, i) => (
            <li key={c.href} className="flex gap-x-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

export function PageHeader({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-paper">
      <Container className="py-14 text-center sm:py-20">
        <div className="flex justify-center">
          <Breadcrumbs items={crumbs} />
        </div>
        <h1 className="display display-md mx-auto mt-5 max-w-3xl">{title}</h1>
        {lead && <p className="subhead mx-auto mt-4 max-w-2xl text-steel">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <div className="divide-y divide-rule border-y border-rule">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium">
              <h3 className="text-[1.05rem]">{f.q}</h3>
              <span
                aria-hidden="true"
                className="mt-1 text-andon transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="measure mt-2 text-steel">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}

/** Closing call-to-action: black tile, centered. */
export function ContactBand({
  title = "เล่าปัญหาให้เราฟัง แล้วเราจะบอกว่าควรเริ่มจากตรงไหน",
  note = "ปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย ทีมงานจะติดต่อกลับเพื่อนัดคุยรายละเอียด",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section className="mt-20 pb-3">
      <div className="mx-auto max-w-[1200px] px-3">
        <div className="rounded-[28px] border border-white/10 bg-[#0e1114] px-6 py-16 text-center text-white sm:py-24">
          <h2 className="display display-md mx-auto max-w-3xl">{title}</h2>
          <p className="subhead mx-auto mt-4 max-w-xl text-white/60">{note}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={site.lineHref} className="rounded-full bg-brand px-6 py-3 font-medium text-board hover:bg-[#5fd47b]">
              แชทผ่าน LINE {site.line}
            </a>
            <a href={site.phoneHref} className="rounded-full border border-white/25 px-6 py-3 font-medium text-white hover:bg-white/10">
              โทร {site.phone}
            </a>
          </div>
          <Link href="/contact" className="link-more mt-6 text-brand">หรือกรอกฟอร์มติดต่อ</Link>
        </div>
      </div>
    </section>
  );
}

/** Article cover: the uploaded image, or a branded placeholder when none is set. */
export function PostCover({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`aspect-[16/9] w-full rounded-2xl bg-tile object-cover ${className}`}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-board ${className}`}
    >
      <svg viewBox="0 0 990 672" className="w-1/4 opacity-90">
        <polygon points="2,325 332,2 444,115 234,326 458,558 343,670" fill="#40bd5f" />
        <polygon points="988,325 658,2 546,115 756,326 532,558 647,670" fill="#40bd5f" />
      </svg>
    </div>
  );
}


/** True when a /public asset exists — lets pages reference original-site images before they are uploaded. */
export function hasPublicFile(publicPath?: string | null): publicPath is string {
  if (!publicPath) return false;
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

/** Image from /public, rendered only when the file is present. */
export function SiteImage({
  src,
  alt,
  width,
  height,
  className = "",
  sizes = "(min-width: 1024px) 480px, 100vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!hasPublicFile(src)) return null;
  return (
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />
  );
}
