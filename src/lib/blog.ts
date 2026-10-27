import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { createPublicClient, type PostRow } from "./supabase";

/**
 * Blog posts come from Supabase (managed at /admin). When Supabase isn't
 * configured yet, the Markdown files in src/content/blog are used instead.
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  coverImage?: string | null;
};

export type Post = PostMeta & { html: string };

const dir = path.join(process.cwd(), "src/content/blog");

function fromRow(r: PostRow): PostMeta {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    date: r.published_at ?? r.created_at,
    updated: r.updated_at,
    coverImage: r.cover_image,
  };
}

function readLocal(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    coverImage: data.cover ? String(data.cover) : null,
    html: marked.parse(content, { async: false }),
  };
}

function localPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(readLocal);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const sb = createPublicClient();
  if (!sb) {
    return localPosts()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ html, ...meta }) => meta)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  const { data, error } = await sb
    .from("posts")
    .select("id,slug,title,description,cover_image,published,published_at,created_at,updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[blog] list failed:", error.message);
    return [];
  }
  return (data as PostRow[]).map(fromRow);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const sb = createPublicClient();
  if (!sb) return localPosts().find((p) => p.slug === slug);

  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[blog] get failed:", error.message);
    return undefined;
  }
  if (!data) return undefined;
  const row = data as PostRow;
  return { ...fromRow(row), html: marked.parse(row.content, { async: false }) };
}

export function formatThaiDate(iso: string) {
  return new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Bangkok",
  });
}
