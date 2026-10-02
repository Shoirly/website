import Link from "next/link";

/**
 * Temporary typographic wordmark. The tittle of the "i" is a small square seal
 * in the accent colour, a nod to a stamped, verified record.
 *
 * TODO(team): replace with the real logo when it arrives. This is the only
 * place the logo is drawn (icon.tsx and opengraph-image.tsx echo it for the
 * favicon and social card).
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-sans font-semibold tracking-[-0.03em] text-ink ${className}`}
    >
      <span aria-hidden="true">sho</span>
      <span aria-hidden="true" className="relative inline-block">
        {"ı"}
        <span className="absolute left-1/2 top-[0.08em] block size-[0.2em] -translate-x-1/2 rounded-[1px] bg-seal" />
      </span>
      <span aria-hidden="true">rly</span>
      <span className="sr-only">Shoirly</span>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex min-h-11 items-center rounded-sm ${className}`} aria-label="Shoirly home">
      <Wordmark className="text-[1.5rem] leading-none" />
    </Link>
  );
}
