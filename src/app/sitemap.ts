import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/blog";
import { site } from "@/config/site";
import { pageSeo } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.values(pageSeo).filter((page) => !page.noindex).map((page) => ({
      url: page.path === "/" ? site.url : `${site.url}${page.path}`,
    })),
    // Drafts and the draft legal pages are deliberately excluded.
    ...publishedPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
  ];
}
