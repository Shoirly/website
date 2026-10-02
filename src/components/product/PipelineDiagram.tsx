"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type Stage = {
  key: string;
  name: string;
  short: string;
  detail: ReactNode;
  visual: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Interactive four-stage diagram for /product. Implemented as an accessible
 * tab list: arrow keys move between stages, the panel below swaps content.
 */
export function PipelineDiagram({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = stages.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Stages" className="relative grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-0">
        {/* connecting rule behind the stage buttons */}
        <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[26px] hidden h-px bg-rule sm:block" />
        <motion.span
          aria-hidden
          className="absolute left-[12.5%] top-[26px] hidden h-px origin-left bg-seal sm:block"
          style={{ width: "75%" }}
          initial={false}
          animate={{ scaleX: active / (stages.length - 1) }}
          transition={{ duration: reduce ? 0 : 0.45, ease }}
        />
        {stages.map((s, i) => {
          const selected = i === active;
          const done = i <= active;
          return (
            <button
              key={s.key}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative flex items-center gap-3 rounded-md px-3 py-3 text-left transition-colors duration-150 sm:flex-col sm:items-center sm:gap-2 sm:text-center ${
                selected ? "bg-ledger sm:bg-transparent" : "hover:bg-ledger/70 sm:hover:bg-transparent"
              }`}
            >
              <span
                className={`relative z-10 flex size-[26px] shrink-0 items-center justify-center rounded-full border font-mono text-xs tabular transition-colors duration-200 ${
                  done ? "border-seal bg-seal text-paper" : "border-rule-strong bg-paper text-graphite"
                } ${selected ? "ring-4 ring-seal-wash" : ""}`}
              >
                {i + 1}
              </span>
              <span>
                <span className={`block font-semibold ${selected ? "text-ink" : "text-graphite group-hover:text-ink"}`}>
                  {s.name}
                </span>
                <span className="block text-xs text-graphite sm:mt-0.5">{s.short}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-8 rounded-md border border-rule bg-ledger p-5 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stages[active].key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
          >
            <div>
              <h3 className="text-2xl">{stages[active].name}</h3>
              <div className="mt-4 space-y-4 text-graphite">{stages[active].detail}</div>
            </div>
            <div className="min-h-[260px]">{stages[active].visual}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
