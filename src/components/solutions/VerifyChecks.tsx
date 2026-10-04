import { TickGlyph } from "@/components/brand/CroppedMark";

/** /solutions/banks: the checks a risk team can run, each marked with the tick from the mark. */
export function VerifyChecks({ checks }: { checks: [string, string][] }) {
  return (
    <dl className="divide-y divide-sh-border border-y border-sh-border">
      {checks.map(([k, v]) => (
        <div
          key={k}
          className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 gap-y-2 py-5 sm:grid-cols-[1.75rem_9rem_1fr] sm:gap-x-6"
        >
          <TickGlyph className="mt-1.5 size-4 text-sh-accent-text" />
          <dt className="font-semibold">{k}</dt>
          <dd className="col-start-2 text-sh-muted sm:col-start-auto">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
