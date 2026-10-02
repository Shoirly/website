import { ImageResponse } from "next/og";
import { brand, loadBrandFont } from "@/lib/brandImage";

export const alt = "Shoirly: signed proof of what your AI agent did, and who approved it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "Schibsted",
          borderTop: `14px solid ${brand.seal}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", fontSize: 52, color: brand.ink, letterSpacing: "-0.03em" }}>
          <span>sho</span>
          <span style={{ display: "flex", position: "relative" }}>
            {"ı"}
            <span
              style={{
                position: "absolute",
                left: 2,
                top: 13,
                width: 11,
                height: 11,
                background: brand.seal,
                borderRadius: 1,
              }}
            />
          </span>
          <span>rly</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.04, color: brand.ink, letterSpacing: "-0.025em", maxWidth: 980 }}>
            Signed proof of what your AI agent did, and who approved it.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: brand.graphite }}>
            Per-customer evidence for security reviews at banks, insurers and payment firms.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Schibsted", data: await loadBrandFont(), weight: 600 }] },
  );
}
