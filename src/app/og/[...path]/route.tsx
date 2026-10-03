import { getPost } from "@/content/blog";
import { pageSeo } from "@/lib/metadata";
import { socialImage } from "@/lib/ogImage";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pagePath = path.length === 1 && path[0] === "home" ? "/" : `/${path.join("/")}`;
  const page = Object.hasOwn(pageSeo, pagePath) ? pageSeo[pagePath] : undefined;
  if (page) return socialImage(page);

  const post = path.length === 2 && path[0] === "blog" ? getPost(path[1]) : undefined;
  if (post) return socialImage({ title: post.title, description: post.description, path: pagePath });

  return new Response("Not found", { status: 404 });
}
