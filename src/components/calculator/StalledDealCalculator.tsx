"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/fx/AnimatedNumber";
import { ButtonLink } from "@/components/ui/Button";

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const MAX_WEEKS = 40;
const ease = [0.22, 1, 0.36, 1] as const;

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  hint?: string;
};

function Slider({ label, value, min, max, step, onChange, display, hint }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLOutputElement>();
  const first = useRef(true);

  // A small "pop" on the value when it changes: feedback that the input registered.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce || !scope.current) return;
    animate(scope.current, { scale: [1.08, 1] }, { duration: 0.22, ease });
  }, [value, reduce, animate, scope]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <output
          ref={scope}
          htmlFor={id}
          className="inline-block origin-right font-mono text-base font-medium tabular"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-1"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        aria-describedby={hint ? `${id}-hint` : undefined}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-graphite">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Before/after review time as two bars on the same scale, no background track. */
function ReviewTimeBars({ before, after }: { before: number; after: number }) {
  const reduce = useReducedMotion();
  const rows = [
    { label: "Today", weeks: before, className: "bg-rule-strong" },
    { label: "With evidence", weeks: after, className: "bg-seal" },
  ];
  return (
    <figure>
      <figcaption className="text-sm text-graphite">Time in security review</figcaption>
      <div className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)_4.5rem] items-center gap-3 text-xs">
            <span className="text-graphite">{r.label}</span>
            <span className="relative h-2.5">
              <motion.span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-full origin-left rounded-full ${r.className}`}
                initial={false}
                animate={{ scaleX: Math.max(0.02, r.weeks / MAX_WEEKS) }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 26 }}
              />
            </span>
            <span className="text-right font-mono tabular text-ink">
              {r.weeks} {r.weeks === 1 ? "week" : "weeks"}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

const ASSUMPTION =
  "Estimate only. Assumes each deal's annual revenue starts at signature and accrues evenly, so every week in review delays a week of revenue.";

export function StalledDealCalculator({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [deals, setDeals] = useState(4);
  const [acv, setAcv] = useState(120_000);
  const [weeks, setWeeks] = useState(16);
  const [cut, setCut] = useState(50);

  const delayed = deals * acv * (weeks / 52);
  const weeksSaved = Math.round(weeks * (cut / 100));
  const recovered = deals * acv * (weeksSaved / 52);

  const fmt = useCallback((n: number) => eur.format(Math.round(n / 1000) * 1000), []);

  // Screen readers hear the result once input settles, not on every step of a drag.
  const [announce, setAnnounce] = useState("");
  useEffect(() => {
    const id = window.setTimeout(
      () =>
        setAnnounce(
          `Revenue delayed this year: ${fmt(delayed)}. Brought forward with ${weeksSaved} weeks less review: ${fmt(recovered)}.`,
        ),
      700,
    );
    return () => window.clearTimeout(id);
  }, [delayed, recovered, weeksSaved, fmt]);

  const compact = variant === "compact";

  const sliders = (
    <>
      <Slider
        label="Deals in your pipeline with banks"
        value={deals}
        min={1}
        max={20}
        step={1}
        onChange={setDeals}
        display={String(deals)}
      />
      <Slider
        label="Annual contract value"
        value={acv}
        min={20_000}
        max={500_000}
        step={10_000}
        onChange={setAcv}
        display={eur.format(acv)}
      />
      <Slider
        label="Weeks in security review"
        value={weeks}
        min={2}
        max={MAX_WEEKS}
        step={1}
        onChange={setWeeks}
        display={`${weeks} weeks`}
      />
      <Slider
        label="If evidence cut review time by"
        value={cut}
        min={10}
        max={80}
        step={5}
        onChange={setCut}
        display={`${cut}%`}
        hint={compact ? undefined : "Your guess. We don't claim a figure."}
      />
    </>
  );

  const results = (
    <>
      <div>
        <p className="text-sm text-graphite">Revenue delayed this year</p>
        <p className={`mt-1 font-mono font-medium leading-tight tracking-[-0.03em] ${compact ? "text-[1.75rem]" : "text-[2.25rem]"}`}>
          <AnimatedNumber value={delayed} format={fmt} />
        </p>
      </div>
      <div>
        <p className="text-sm text-graphite">
          Brought forward with {weeksSaved} {weeksSaved === 1 ? "week" : "weeks"} less review
        </p>
        <p
          className={`mt-1 font-mono font-medium leading-tight tracking-[-0.03em] text-seal-deep ${compact ? "text-[1.75rem]" : "text-[2.25rem]"}`}
        >
          <AnimatedNumber value={recovered} format={fmt} />
        </p>
      </div>
    </>
  );

  return (
    <div>
      <div
        className={`grid grid-cols-1 overflow-hidden rounded-md border border-rule ${
          compact ? "" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
        }`}
      >
        <div
          className={`grid grid-cols-1 gap-6 bg-ledger p-5 sm:p-8 ${compact ? "sm:grid-cols-2 sm:gap-x-10" : "gap-7"}`}
        >
          {sliders}
        </div>

        <div
          className={`flex flex-col gap-8 border-t border-rule bg-paper p-5 sm:p-8 ${
            compact ? "" : "justify-center lg:border-l lg:border-t-0"
          }`}
        >
          <div className={`grid grid-cols-1 gap-6 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-1"}`}>
            {results}
          </div>
          <ReviewTimeBars before={weeks} after={weeks - weeksSaved} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="max-w-[72ch] text-xs text-graphite">{ASSUMPTION}</p>
        <ButtonLink href="/demo" size="md" className="shrink-0 self-start sm:self-auto">
          Book a demo
        </ButtonLink>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
