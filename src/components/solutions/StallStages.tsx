"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useRevealOnce } from "@/components/fx/useRevealOnce";

type Stage = { stage: string; asks: string; answer: string };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * /solutions/agent-vendors orchestrated moment: the deal moves through the
 * buyer's review. When the grid first scrolls into view, a seal rule draws across the
 * top of each stage in order, questionnaire to ongoing oversight.
 */
export function StallStages({ stages }: { stages: Stage[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { shown, animated } = useRevealOnce(ref, 0.35);

  return (
    <ol
      ref={ref}
      className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-2"
    >
      {stages.map((s, i) => (
        <li key={s.stage} className="relative bg-paper p-6 sm:p-8">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] origin-left bg-seal"
            initial={false}
            animate={{ scaleX: shown ? 1 : 0 }}
            transition={animated && shown ? { duration: 0.4, ease, delay: 0.1 + i * 0.2 } : { duration: 0 }}
          />
          {/* The list provides the numbering for assistive tech; the 01-04 label is visual only. */}
          <p className="font-mono text-xs text-graphite">
            <span aria-hidden>{String(i + 1).padStart(2, "0")} </span>
            {s.stage}
          </p>
          <p className="mt-4 text-xl font-semibold">&ldquo;{s.asks}&rdquo;</p>
          <p className="mt-3 text-graphite">{s.answer}</p>
        </li>
      ))}
    </ol>
  );
}
