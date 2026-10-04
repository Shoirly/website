import { ImageResponse } from "next/og";
import { LOGO_RATIO, brand, loadBrandFonts, loadLogoDataUrl } from "@/lib/brandImage";
import { site } from "@/config/site";

const LOGO_H = 64; // the logo README asks for the full wordmark at 48px or taller

/**
 * Per-page social card, served from /og/[...path]. Real logo (public/brand/logo.svg)
 * top left, page URL top right, then the page title in Bricolage and the
 * description in Schibsted.
 */
export async function socialImage({ title, description, path }: { title?: string; description: string; path: string }) {
  const headline = title ?? "Signed proof of what your AI agent did, and who approved it.";
  const [fonts, logo] = await Promise.all([loadBrandFonts(), loadLogoDataUrl("logo.svg")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.paper,
          padding: "60px 72px 64px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={logo} width={Math.round(LOGO_H * LOGO_RATIO)} height={LOGO_H} alt="Shoirly" />
          <div style={{ display: "flex", fontFamily: "Schibsted", fontSize: 22, color: brand.graphite }}>
            {`${new URL(site.url).hostname}${path === "/" ? "" : path}`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: headline.length > 70 ? 56 : 68,
              lineHeight: 1.06,
              color: brand.ink,
              letterSpacing: "-0.025em",
            }}
          >
            {headline}
          </div>
          <div style={{ fontFamily: "Schibsted", marginTop: 24, fontSize: 26, lineHeight: 1.35, color: brand.graphite }}>
            {description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
