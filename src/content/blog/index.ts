import type { MDXContent } from "mdx/types";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  author: string;
  /** Drafts render at their URL (noindex) but never appear in the listing or sitemap. */
  draft: boolean;
  load: () => Promise<{ default: MDXContent }>;
};

/**
 * Register each post here. Metadata lives in this file rather than MDX
 * frontmatter so it is type-checked and available without loading the post.
 */
export const posts: PostMeta[] = [
  {
    slug: "what-dora-means-for-ai-agent-vendors",
    title: "What DORA means for AI agent vendors selling to banks",
    description:
      "DORA puts the burden of third-party oversight on banks. Here's how that lands on an AI agent startup, from the first questionnaire to the contract, and what evidence actually helps.",
    date: "2026-10-02",
    // TODO(team): set the real author before publishing.
    author: "The Shoirly team",
    draft: true,
    load: () => import("./what-dora-means-for-ai-agent-vendors.mdx"),
  },
];

export const publishedPosts = () =>
  posts.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`));
