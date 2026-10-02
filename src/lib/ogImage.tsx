import { ImageResponse } from "next/og";
import { brand, loadBrandFont } from "@/lib/brandImage";
import { site } from "@/config/site";

export async function socialImage({ title, description, path }: { title?: string; description: string; path: string }) {
  const headline = title ?? "Signed proof of what your AI agent did, and who approved it.";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: brand.paper, padding: "56px 72px", fontFamily: "Schibsted", borderTop: `14px solid ${brand.seal}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 48, color: brand.ink, letterSpacing: "-0.03em" }}>{site.name.toLowerCase()}</div>
          <div style={{ display: "flex", fontSize: 22, color: brand.graphite }}>{`${new URL(site.url).hostname}${path === "/" ? "" : path}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: headline.length > 70 ? 56 : 68, lineHeight: 1.08, color: brand.ink, letterSpacing: "-0.025em" }}>{headline}</div>
          <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.35, color: brand.graphite }}>{description}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Schibsted", data: await loadBrandFont(), weight: 600 }] },
  );
}
