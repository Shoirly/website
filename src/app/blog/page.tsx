import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHeader, Section } from "@/components/ui/Layout";
import { publishedPosts } from "@/content/blog";
import { PostCard } from "@/components/blog/PostCard";

const baseMetadata = pageMetadata(pageSeo["/blog"]);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: { ...baseMetadata.alternates, types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const posts = publishedPosts();

  return (
    <>
      <PageHeader
        label="blog"
        title="Blog"
        lead="Notes on AI agents, security reviews and the rules regulated buyers work under, for founders selling to them."
      >
        <Link href="/blog/rss.xml" className="link text-sm">Subscribe via RSS</Link>
      </PageHeader>
      <Section labelledBy="posts-title">
        <h2 id="posts-title" className="sr-only">
          Posts
        </h2>
        {posts.length === 0 ? (
          <div className="max-w-[68ch] rounded-md border border-sh-border bg-sh-bg-subtle p-6 md:p-10">
            <p className="text-xl font-semibold">First posts are on the way</p>
            <p className="mt-3 text-sh-muted">
              In the meantime, for example, our{" "}
              <Link href="/dora" className="link">
                plain-English guide to DORA
              </Link>{" "}
              covers what EU banks ask of AI agent vendors.
            </p>
          </div>
        ) : (
          <ol className="border-b border-sh-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ol>
        )}
      </Section>
      <ClosingCta />
    </>
  );
}
