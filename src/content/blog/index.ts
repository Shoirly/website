import type { MDXContent } from "mdx/types";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  author: string;
  authorBio: string;
  topic: string;
  featured?: boolean;
  /** Drafts are accessible only in local development, never in production. */
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
    authorBio: "A four-person founding team in Dublin, building action-level evidence for AI agent companies selling to regulated buyers, starting with financial services.",
    topic: "DORA",
    featured: true,
    draft: true,
    load: () => import("./what-dora-means-for-ai-agent-vendors.mdx"),
  },
];

export const publishedPosts = () =>
  posts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

export const accessiblePosts = () =>
  posts.filter((p) => !p.draft || process.env.NODE_ENV === "development");

export const getPost = (slug: string) => accessiblePosts().find((p) => p.slug === slug);

export const featuredPost = () => {
  const published = publishedPosts();
  return published.find((p) => p.featured) ?? published[0];
};

export const relatedPosts = (post: PostMeta) =>
  publishedPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.topic === post.topic) - Number(a.topic === post.topic))
    .slice(0, 2);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`));
