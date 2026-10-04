type Stage = { stage: string; asks: string; answer: string };

/** /solutions/agent-vendors: the deal moving through the buyer's review, as a static numbered grid. */
export function StallStages({ stages }: { stages: Stage[] }) {
  return (
    <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-sh-border bg-sh-border md:grid-cols-2">
      {stages.map((s, i) => (
        <li key={s.stage} className="relative bg-sh-surface p-6 sm:p-8">
          <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-sh-accent" />
          {/* The list provides the numbering for assistive tech; the 01-04 label is visual only. */}
          <p className="font-mono text-xs text-sh-muted">
            <span aria-hidden>{String(i + 1).padStart(2, "0")} </span>
            {s.stage}
          </p>
          <p className="mt-4 text-xl font-semibold">&ldquo;{s.asks}&rdquo;</p>
          <p className="mt-3 text-sh-muted">{s.answer}</p>
        </li>
      ))}
    </ol>
  );
}
