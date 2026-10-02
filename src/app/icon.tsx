import { ImageResponse } from "next/og";
import { MarkSquare, loadBrandFont } from "@/lib/brandImage";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<MarkSquare size={32} />, {
    ...size,
    fonts: [{ name: "Schibsted", data: await loadBrandFont(), weight: 600 }],
  });
}
