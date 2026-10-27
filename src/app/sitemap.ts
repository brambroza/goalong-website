import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/solutions/factory", priority: 0.9 },
    { path: "/products", priority: 0.8 },
    { path: "/network-service", priority: 0.8 },
    { path: "/ma-fortigate", priority: 0.8 },
    { path: "/ma-cisco", priority: 0.8 },
    { path: "/why-us", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.2 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
