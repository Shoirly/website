import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/blog";
import { site } from "@/config/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/product", priority: 0.9 },
  { path: "/solutions/agent-vendors", priority: 0.8 },
  { path: "/solutions/banks", priority: 0.8 },
  { path: "/dora", priority: 0.9 },
  { path: "/security", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/blog", priority: 0.6 },
  { path: "/demo", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, priority: r.priority })),
    // Drafts and the draft legal pages are deliberately excluded.
    ...publishedPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
  ];
}
