import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, Container, FaqList, JsonLd, PageHeader, SiteImage, hasPublicFile } from "@/components/ui";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.seoTitle, description: s.seoDescription },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = services.filter((o) => o.slug !== s.slug && o.group === s.group);

  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/services", label: "บริการ" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
        title={s.name}
        lead={s.intro}
      >
        {hasPublicFile(s.image) && (
          <SiteImage
            src={s.image}
            alt={`${s.name} โดย GO Along`}
            width={1500}
            height={1000}
            priority
            className="mx-auto mt-8 w-full max-w-xl rounded-[22px] bg-tile"
          />
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-andon px-6 py-3 font-medium text-white hover:bg-andon-deep"
          >
            ปรึกษางานนี้
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-full border border-ink/30 px-6 py-3 font-medium hover:bg-ink hover:text-white"
          >
            โทร {site.phone}
          </a>
        </div>
      </PageHeader>

      <Container className="grid gap-14 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="text-[1.5rem] font-semibold">สิ่งที่ได้จากบริการนี้</h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {s.includes.map((item) => (
              <li key={item} className="flex gap-3 py-3">
                <span aria-hidden="true" className="mt-[0.7rem] size-2 shrink-0 rounded-full bg-andon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-[1.5rem] font-semibold">คำถามที่พบบ่อย</h2>
          <div className="mt-4">
            <FaqList faqs={s.faqs} />
          </div>
        </div>

        <aside className="space-y-10">
          <div>
            <h2 className="font-semibold">เหมาะกับคุณ ถ้า</h2>
            <ul className="mt-3 space-y-3 text-steel">
              {s.fitsWhen.map((f) => (
                <li key={f} className="border-l-2 border-amber pl-3">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {s.tech && (
            <div>
              <h2 className="font-semibold">เทคโนโลยีที่ใช้</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded bg-tile px-2.5 py-1 text-[0.9rem]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h2 className="font-semibold">บริการที่เกี่ยวข้อง</h2>
              <ul className="mt-3 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="text-andon-deep underline underline-offset-4"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>

      <ContactBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          alternateName: s.nameEn,
          description: s.seoDescription,
          url: `${site.url}/services/${s.slug}`,
          areaServed: { "@type": "Country", name: "Thailand" },
          provider: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
