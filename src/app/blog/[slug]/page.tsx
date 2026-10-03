import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Container } from "@/components/ui/Layout";
import { accessiblePosts, formatDate, getPost, relatedPosts } from "@/content/blog";
import { site } from "@/config/site";
import { readingTime } from "@/content/blog/reading-time";
import { PostCard } from "@/components/blog/PostCard";
import { articleComponents } from "@/components/blog/ArticleComponents";
import styles from "@/components/blog/Article.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return accessiblePosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    noindex: post.draft,
  });
  const image = { url: `${site.url}/blog/${post.slug}/og`, width: 1200, height: 630, alt: post.title };
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", images: [image], authors: [post.author] },
    twitter: { ...base.twitter, images: [image] },
    alternates: { ...base.alternates, types: { "application/rss+xml": "/blog/rss.xml" } },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await post.load();
  const related = relatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/blog/${post.slug}/og`,
  };

  return (
    <>
      {!post.draft ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      ) : null}
      <article className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-[65ch]">
            <Link href="/blog" className="link text-sm">
              All posts
            </Link>
            {post.draft ? (
              <p className="mt-6 rounded-md border border-fault/40 bg-fault/5 px-4 py-3 text-sm text-fault">
                Editorial draft. Only available in local development, never in production, RSS or search listings.
              </p>
            ) : null}
            <header>
              <p className="mt-8 text-sm font-semibold text-seal-deep">{post.topic}</p>
              <h1 className="mt-4 text-4xl">{post.title}</h1>
              <p className="mt-5 text-lg text-graphite">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-rule pb-8 text-sm text-graphite">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{await readingTime(post.slug)}</span>
                <span>{post.author}</span>
              </div>
            </header>
            <div className={`${styles.body} mt-10`}>
              <Body components={articleComponents} />
            </div>
            <aside aria-label="About the author" className="mt-12 border-y border-rule py-8">
              <p className="text-sm text-graphite">Written by</p>
              <h2 className="mt-2 text-xl">{post.author}</h2>
              <p className="mt-3 text-graphite">{post.authorBio}</p>
              <Link href="/about" className="link mt-4 inline-block text-sm">Meet the team</Link>
            </aside>
            {related.length ? (
              <section aria-labelledby="related-title" className="mt-12">
                <h2 id="related-title" className="mb-6 text-2xl">Related posts</h2>
                {related.map((other) => <PostCard key={other.slug} post={other} />)}
              </section>
            ) : null}
          </div>
        </Container>
      </article>
      <ClosingCta />
    </>
  );
}
