import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Container } from "@/components/ui/Layout";
import { formatDate, getPost, posts } from "@/content/blog";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    noindex: post.draft,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await post.load();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      {!post.draft ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <article className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-[68ch]">
            <Link href="/blog" className="text-sm text-graphite hover:text-ink">
              Blog
            </Link>
            {post.draft ? (
              <p className="mt-6 rounded-md border border-fault/40 bg-fault/5 px-4 py-3 text-sm text-fault">
                Draft. Not listed on the blog and hidden from search engines.
              </p>
            ) : null}
            <h1 className="mt-6 text-4xl">{post.title}</h1>
            <p className="mt-5 text-lg text-graphite">{post.description}</p>
            <p className="mt-6 border-b border-rule pb-8 text-sm text-graphite">
              <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.author}
            </p>
            <div className="prose-shoirly mt-10">
              <Body />
            </div>
          </div>
        </Container>
      </article>
      <ClosingCta />
    </>
  );
}
