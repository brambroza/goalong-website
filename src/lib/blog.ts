import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const dir = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
};

export type Post = PostMeta & { html: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    html: marked.parse(content, { async: false }),
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { html, ...meta } = read(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(dir, file))) return undefined;
  return read(file);
}

export function formatThaiDate(iso: string) {
  return new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Bangkok",
  });
}
