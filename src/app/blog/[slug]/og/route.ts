import { getPost } from "@/content/blog";
import { postImage } from "@/components/blog/PostImage";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return new Response(null, { status: 404 });
  const response = await postImage(post);
  if (post.draft) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
