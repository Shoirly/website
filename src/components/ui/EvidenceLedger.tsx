import { evidenceToday } from "@/content/evidenceToday";

/** The "what they get today / what it shows / what it misses" ledger. */
export function EvidenceLedger({ label }: { label: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-sh-muted">{label}</p>
      <dl className="mt-4 border-t border-sh-text">
        {evidenceToday.map((row) => (
          <div
            key={row.what}
            className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-sh-border py-5 sm:grid-cols-[minmax(0,11rem)_1fr]"
          >
            <dt>
              <span className="block font-semibold">{row.what}</span>
              <span className="mt-0.5 block font-mono text-xs text-sh-muted">{row.example}</span>
            </dt>
            <dd className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-6">
              <p>
                <span className="block text-xs text-sh-muted">Shows</span>
                {row.shows}
              </p>
              <p>
                <span className="block text-xs text-sh-muted">Misses</span>
                {row.misses}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
