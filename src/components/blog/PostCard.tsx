import Link from "next/link";
import { formatDate, type PostMeta } from "@/content/blog";
import { readingTime } from "@/content/blog/reading-time";

export async function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={featured ? "rounded-lg border border-sh-border bg-sh-bg-subtle p-6 md:p-10" : "border-t border-sh-border py-8"}>
      <p className="text-sm font-semibold text-sh-accent-text">{featured ? "Featured post" : post.topic}</p>
      <h2 className={`mt-4 ${featured ? "max-w-[26ch] text-3xl" : "text-2xl"}`}>
        <Link href={`/blog/${post.slug}`} className="hover:text-sh-accent-text">{post.title}</Link>
      </h2>
      <p className="mt-4 max-w-[60ch] text-sh-muted">{post.description}</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-sh-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{await readingTime(post.slug)}</span>
        <span>{post.author}</span>
      </div>
      {featured ? <Link href={`/blog/${post.slug}`} className="link mt-6 inline-block">Read the article</Link> : null}
    </article>
  );
}
