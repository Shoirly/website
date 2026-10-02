import { ImageResponse } from "next/og";
import { LOGO_RATIO, brand, loadBrandFonts, loadLogoDataUrl } from "@/lib/brandImage";

export const alt = "Shoirly: signed proof of what your AI agent did, and who approved it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_H = 72;

export default async function OpengraphImage() {
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
          padding: "68px 80px 72px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logo} width={Math.round(LOGO_H * LOGO_RATIO)} height={LOGO_H} alt="Shoirly" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 74,
              lineHeight: 1.04,
              color: brand.ink,
              letterSpacing: "-0.025em",
              maxWidth: 1000,
            }}
          >
            Signed proof of what your AI agent did, and who approved it.
          </div>
          <div style={{ fontFamily: "Schibsted", marginTop: 28, fontSize: 30, color: brand.graphite }}>
            Per-customer evidence for security reviews at banks, insurers and payment firms.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
