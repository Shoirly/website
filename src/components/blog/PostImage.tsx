import { ImageResponse } from "next/og";
import { brand, loadBrandFonts, loadLogoDataUrl, LOGO_RATIO } from "@/lib/brandImage";
import { formatDate, type PostMeta } from "@/content/blog";

export async function postImage(post: PostMeta) {
  const [fonts, logo] = await Promise.all([loadBrandFonts(), loadLogoDataUrl()]);
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 64, background: brand.paper, color: brand.ink, fontFamily: "Schibsted", borderTop: `12px solid ${brand.seal}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: brand.graphite }}>
        {/* next/og embeds the local SVG without Next.js image optimisation. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="Shoirly" width={Math.round(48 * LOGO_RATIO)} height={48} />
        <span>Blog / {post.topic}</span>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", fontFamily: "Bricolage", fontWeight: 700, fontSize: 60, lineHeight: 1.15, letterSpacing: "-0.025em" }}>{post.title}</div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${brand.graphite}`, paddingTop: 24, fontSize: 22, color: brand.graphite }}>
        <span>{post.author}</span><span>{formatDate(post.date)}</span>
      </div>
    </div>,
    { width: 1200, height: 630, fonts },
  );
}
