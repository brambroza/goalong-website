import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans-thai/thai-400.css";
import "@fontsource/ibm-plex-sans-thai/thai-500.css";
import "@fontsource/ibm-plex-sans-thai/thai-600.css";
import "@fontsource/ibm-plex-sans-thai/latin-400.css";
import "@fontsource/ibm-plex-sans-thai/latin-500.css";
import "@fontsource/ibm-plex-sans-thai/latin-600.css";
import "./globals.css";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "รับเขียนโปรแกรม รับพัฒนาซอฟต์แวร์ครบวงจร | GO Along",
    template: "%s | GO Along",
  },
  description: site.description,
  applicationName: "GO Along",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "GO Along รับเขียนโปรแกรม รับพัฒนาระบบครบวงจร",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  verification: {
    // Kept from the old WordPress site so Search Console stays verified.
    google: "Ojo5RvRsYq_dfoikRqd5lKrz4XxexFJga-CyIKihCzA",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1d7f54",
};

const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${site.url}/#organization`,
  name: site.legalNameEn,
  alternateName: [site.legalNameTh, "GO Along", "โกอะลอง"],
  url: site.url,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: "+66-85-608-3298",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "Thailand" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
  knowsAbout: [
    "Custom software development",
    "Web application development",
    "Mobile application development",
    "ERP for manufacturers",
    "LINE OA integration",
    "FortiGate",
    "Cisco",
    "Network infrastructure",
    "Server and backup",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "บริการของ GO Along",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so the hero can wait for its GSAP entrance; falls back after 3s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.remove('js')},3000);",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
