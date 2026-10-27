import type { NextConfig } from "next";

/**
 * 301 redirects from the old WordPress URLs so existing Google rankings and
 * backlinks carry over. Query-string URLs (?alb_custom_layout=...) are handled
 * in src/proxy.ts.
 */
const legacyRedirects: [string, string][] = [
  ["/whyus-goalong", "/why-us"],
  ["/index.php/whyus-goalong", "/why-us"],
  ["/welcome-3", "/"],
  ["/privacy-policy-mail", "/privacy-policy"],
  ["/index.php/:path*", "/:path*"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/page-sitemap.xml", "/sitemap.xml"],
  ["/alb_custom_layout-sitemap.xml", "/sitemap.xml"],
  ["/sitemap_index.xml", "/sitemap.xml"],
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${from}/`, destination: to, permanent: true },
    ]);
  },
};

export default nextConfig;
