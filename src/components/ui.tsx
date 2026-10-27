import Link from "next/link";
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
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
  );
}

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ href: "/", label: "หน้าแรก" }, ...items];
  return (
    <>
      <nav aria-label="breadcrumb" className="text-[0.9rem] text-steel">
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
    <section className="border-b border-rule bg-panel">
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.3] tracking-tight sm:text-[2.6rem]">
          {title}
        </h1>
        {lead && (
          <p className="measure mt-4 text-[1.125rem] leading-8 text-steel">{lead}</p>
        )}
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

/** Closing call-to-action used at the bottom of most pages. */
export function ContactBand({
  title = "เล่าปัญหาให้เราฟัง แล้วเราจะบอกว่าควรเริ่มจากตรงไหน",
  note = "ปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย ทีมงานจะติดต่อกลับเพื่อนัดคุยรายละเอียด",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section className="mt-20">
      <Container>
        <div className="grid gap-8 rounded-lg border border-rule bg-panel p-6 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h2 className="text-[1.6rem] font-semibold leading-snug">{title}</h2>
            <p className="mt-3 text-steel">{note}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={site.lineHref}
              className="rounded-md bg-andon px-5 py-3 text-center font-medium text-white hover:bg-andon-deep"
            >
              แชทผ่าน LINE {site.line}
            </a>
            <a
              href={site.phoneHref}
              className="rounded-md border border-ink px-5 py-3 text-center font-medium hover:bg-ink hover:text-white"
            >
              โทร {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-center text-[0.95rem] text-steel underline underline-offset-4 hover:text-ink"
            >
              หรืออีเมล {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
