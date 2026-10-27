import { getAllPosts } from "@/lib/blog";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { factorySystems } from "@/lib/solutions";

export const revalidate = 300;

/** llms.txt — a plain summary for AI assistants (https://llmstxt.org). */
export async function GET() {
  const posts = await getAllPosts();
  const lines = [
    `# ${site.legalNameEn} (${site.legalNameTh})`,
    "",
    `> ${site.description}`,
    "",
    `Thai software house in Samut Prakan, Thailand. Builds custom software (web, mobile, Windows), systems for Thai SME manufacturers, and runs IT infrastructure (network, firewall, server, backup) for the same clients. Contact: ${site.phone}, ${site.email}, LINE ${site.line}. Address: ${site.address.th}.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name} (${s.nameEn})](${site.url}/services/${s.slug}): ${s.summary}`),
    `- [IT Support, Network Service, MA และ PM](${site.url}/network-service): IT support, preventive maintenance, Dell/HPE/Cisco/Aruba/FortiGate equipment`,
    `- [ต่ออายุ MA FortiGate](${site.url}/ma-fortigate): FortiCare and FortiGuard renewal for all non-EOL FortiGate models`,
    `- [ต่ออายุ MA Cisco](${site.url}/ma-cisco): Cisco partner; SmartNet (SNTC) renewal, 8x5 NBD or 24x7x4`,
    "",
    "## Systems for factories",
    ...factorySystems.map((f) => `- ${f.name} (${f.nameEn}): ${f.does.join("; ")}`),
    `- Details: ${site.url}/solutions/factory`,
    "",
    "## Products",
    ...products.map((p) => `- [${p.name}](${p.url}): ${p.kind}. ${p.summary}`),
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`),
    "",
    "## Company",
    `- [Why GO Along](${site.url}/why-us)`,
    `- [Contact](${site.url}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
