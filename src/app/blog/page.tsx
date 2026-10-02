import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHeader, Section } from "@/components/ui/Layout";
import { formatDate, publishedPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI agents, bank security reviews and DORA from the Shoirly team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = publishedPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        lead="Notes on AI agents, bank security reviews and DORA, for founders selling into financial services."
      />
      <Section labelledBy="posts-title">
        <h2 id="posts-title" className="sr-only">
          Posts
        </h2>
        {posts.length === 0 ? (
          <div className="max-w-[56ch] rounded-md border border-dashed border-rule-strong/70 p-8">
            <p className="text-xl font-semibold">First posts are on the way</p>
            <p className="mt-3 text-graphite">
              In the meantime, our{" "}
              <Link href="/dora" className="link">
                plain-English guide to DORA
              </Link>{" "}
              covers what banks will ask of AI agent vendors.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-rule border-y border-rule">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 gap-2 py-8 md:grid-cols-[12rem_1fr] md:gap-10"
                >
                  <time dateTime={p.date} className="text-sm text-graphite">
                    {formatDate(p.date)}
                  </time>
                  <span>
                    <span className="block text-2xl font-semibold group-hover:text-seal-deep">{p.title}</span>
                    <span className="mt-2 block max-w-[64ch] text-graphite">{p.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <ClosingCta />
    </>
  );
}
