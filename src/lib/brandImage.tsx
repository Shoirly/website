import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Static font cuts for next/og image routes (variable fonts aren't supported there). */
export async function loadBrandFonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [display, text] = await Promise.all([
    readFile(join(dir, "BricolageGrotesque-Bold.ttf")),
    readFile(join(dir, "SchibstedGrotesk-SemiBold.ttf")),
  ]);
  return [
    { name: "Bricolage", data: display, weight: 700 as const },
    { name: "Schibsted", data: text, weight: 600 as const },
  ];
}

/** A logo file from public/brand as a data URL, for use in <img> inside ImageResponse. */
export async function loadLogoDataUrl(file: "logo.svg" | "logo-white.svg" | "mark.svg" = "logo.svg") {
  const svg = await readFile(join(process.cwd(), "public/brand", file));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export const brand = {
  paper: "#fcfdfc",
  ledger: "#eef2f0",
  ink: "#0f1b17",
  graphite: "#4d5c59",
  seal: "#3157f0",
};

/** logo.svg viewBox is 3115 x 971. */
export const LOGO_RATIO = 3115 / 971;
