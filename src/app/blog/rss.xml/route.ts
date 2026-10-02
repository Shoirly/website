import { site } from "@/config/site";
import { publishedPosts } from "@/content/blog";

export const dynamic = "force-static";

const xml = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
})[char]!);

export function GET() {
  const items = publishedPosts().map((post) => {
    const url = `${site.url}/blog/${post.slug}`;
    return `<item><title>${xml(post.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.description)}</description><pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate><dc:creator>${xml(post.author)}</dc:creator><category>${xml(post.topic)}</category></item>`;
  }).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel><title>${xml(site.name)} blog</title><link>${site.url}/blog</link><description>Notes on AI agents, security reviews and DORA from the Shoirly team.</description><language>en-ie</language><atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "X-Content-Type-Options": "nosniff" },
  });
}
