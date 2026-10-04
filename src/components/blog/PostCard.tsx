import Link from "next/link";
import { formatDate, type PostMeta } from "@/content/blog";
import { readingTime } from "@/content/blog/reading-time";

/** One row of the blog list (BRAND.md 10): date in mono, title in Plex Sans 600 22px, one-line summary. */
export async function PostCard({ post }: { post: PostMeta }) {
  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-sh-border py-8 md:grid-cols-[10rem_minmax(0,1fr)]">
      <p className="font-mono text-xs text-sh-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="mt-1 block">{await readingTime(post.slug)}</span>
      </p>
      <div>
        <h3 className="text-[1.375rem] leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-[var(--sh-dur-fast)] hover:text-sh-accent-text"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-[68ch] text-sh-muted">{post.description}</p>
        <p className="mt-3 font-mono text-xs text-sh-muted">
          {post.topic} · {post.author}
        </p>
      </div>
    </li>
  );
}
