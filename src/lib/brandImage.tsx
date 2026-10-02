import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Loads the static semibold cut of Schibsted Grotesk for next/og image routes. */
export async function loadBrandFont() {
  return readFile(join(process.cwd(), "src/assets/fonts/SchibstedGrotesk-SemiBold.ttf"));
}

export const brand = {
  paper: "#fcfdfc",
  ledger: "#eef2f0",
  ink: "#0d1b1e",
  graphite: "#4d5c59",
  seal: "#0a7350",
};

/** Square mark: the wordmark's "s" in paper on ink, with the seal square from the wordmark's tittle. */
export function MarkSquare({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.ink,
        borderRadius: size * 0.2,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "Schibsted",
          fontSize: size * 0.82,
          lineHeight: 1,
          color: brand.paper,
          marginTop: -size * 0.12,
          letterSpacing: "-0.04em",
        }}
      >
        s
      </div>
      <div
        style={{
          position: "absolute",
          right: size * 0.14,
          top: size * 0.14,
          width: size * 0.16,
          height: size * 0.16,
          background: "#2fb37f",
          borderRadius: size * 0.02,
        }}
      />
    </div>
  );
}
