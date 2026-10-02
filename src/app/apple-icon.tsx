import { ImageResponse } from "next/og";
import { MarkSquare, loadBrandFont } from "@/lib/brandImage";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<MarkSquare size={180} />, {
    ...size,
    fonts: [{ name: "Schibsted", data: await loadBrandFont(), weight: 600 }],
  });
}
