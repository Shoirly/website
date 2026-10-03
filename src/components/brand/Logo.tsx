import Image from "next/image";
import Link from "next/link";

/**
 * The Shoirly logo. Files live in public/brand (see its README.md for usage
 * rules). This is the only component that draws the logo on the site.
 *
 * - `logo.svg`: dark ink on light backgrounds (every surface on the site today)
 * - `logo-white.svg`: for dark backgrounds
 *
 * The README asks for the mark alone below ~48px tall. The header deliberately
 * overrides that at 36px, because a mark-only header loses the name; see
 * DECISIONS.md.
 */
const RATIO = 3115 / 971; // viewBox of logo.svg

export function LogoImage({
  height = 36,
  tone = "light",
  priority = false,
  decorative = false,
}: {
  height?: number;
  tone?: "light" | "dark";
  priority?: boolean;
  /** True when a parent already provides the accessible name. */
  decorative?: boolean;
}) {
  return (
    <Image
      src={tone === "dark" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt={decorative ? "" : "Shoirly"}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      unoptimized
      className="block"
    />
  );
}

export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={`inline-flex min-h-11 items-center rounded-sm ${className}`} aria-label="Shoirly home">
      <LogoImage height={36} tone={tone} priority decorative />
    </Link>
  );
}
