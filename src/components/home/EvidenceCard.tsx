import { Fragment } from "react";
import { TickGlyph } from "@/components/brand/CroppedMark";
import { sampleActions } from "@/content/sample";

const a = sampleActions[0];

const rows: [string, string][] = [
  ["action", a.action],
  ["agent", "Customer ops agent"],
  ["approved", a.approver],
  ["time", `${a.time} UTC`],
  ["sig", `${a.signature.slice(0, 4)}…${a.signature.slice(-4)}`],
];

/** The signature component (BRAND.md 8): one agent action shown as a record. Sample data. */
export function EvidenceCard({ className = "" }: { className?: string }) {
  return (
    <figure className={`chamfer rounded-md border border-sh-border bg-sh-surface p-5 font-mono text-sm sm:p-6 ${className}`}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-sh-border pb-4 text-xs text-sh-muted">
        <span className="flex items-center gap-2 text-sh-text">
          <span aria-hidden className="square-bullet" />
          evidence record
        </span>
        sample data
      </figcaption>
      <dl className="mt-4 grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5">
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt className="text-sh-muted">{k}</dt>
            <dd className="text-sh-text">{v}</dd>
          </Fragment>
        ))}
        <dt className="text-sh-muted">status</dt>
        <dd className="flex items-center gap-2 text-sh-accent-text">
          <TickGlyph className="size-3.5" />
          verified
        </dd>
      </dl>
    </figure>
  );
}
