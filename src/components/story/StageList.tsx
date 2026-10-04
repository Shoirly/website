import type { ReactNode } from "react";
import { Section } from "@/components/ui/Layout";

export type Stage = { title: string; body: string; scene: ReactNode };

/**
 * A real numbered sequence drawn as the audit-trail motif (BRAND.md 7.4): a 1px line with
 * square nodes, the latest filled. Each stage sits beside its static product scene.
 */
export function StageList({ id, heading, intro, steps }: { id: string; heading: string; intro?: string; steps: Stage[] }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <h2 id={`${id}-title`} className="max-w-[24ch] text-3xl">
        {heading}
      </h2>
      {intro ? <p className="mt-4 max-w-[56ch] text-lg text-sh-muted">{intro}</p> : null}
      <ol className="ml-1 mt-12 border-l border-sh-border-strong">
        {steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-1 gap-6 pb-16 pl-8 last:pb-0 lg:grid-cols-12 lg:gap-8">
            <span
              aria-hidden
              className={`absolute -left-[4.5px] top-1 size-2 border border-sh-accent ${
                i === steps.length - 1 ? "bg-sh-accent" : "bg-sh-bg"
              }`}
            />
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-sh-muted">0{i + 1}</p>
              <h3 className="mt-1 max-w-[28ch] text-2xl">{s.title}</h3>
              <p className="mt-3 max-w-[48ch] text-sh-muted">{s.body}</p>
            </div>
            <div className="lg:col-span-7">{s.scene}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
