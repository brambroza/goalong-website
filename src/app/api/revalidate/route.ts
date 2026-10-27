import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/admin-auth";

/** Called by /admin after a post is saved or deleted so the public pages update right away. */
export async function POST(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return Response.json({ ok: false, error: "ต้องเข้าสู่ระบบด้วยบัญชีผู้ดูแล" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as { slug?: string };
    slug = body.slug;
  } catch {
    /* body is optional */
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");

  return Response.json({ ok: true });
}
