"use client";

import { useCallback, useId, useState } from "react";
import { AnimatedNumber } from "@/components/fx/AnimatedNumber";
import { Section } from "@/components/ui/Layout";

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

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
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-base font-medium tabular">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-2"
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

export function StalledDealCalculator() {
  const [deals, setDeals] = useState(4);
  const [acv, setAcv] = useState(120_000);
  const [weeks, setWeeks] = useState(16);
  const [cut, setCut] = useState(50);

  // Simple model, stated on the page: each deal's annual revenue starts `weeks`
  // later than it could, recognised evenly across the year.
  const delayed = deals * acv * (weeks / 52);
  const weeksSaved = Math.round(weeks * (cut / 100));
  const recovered = deals * acv * (weeksSaved / 52);

  const fmt = useCallback((n: number) => eur.format(Math.round(n / 1000) * 1000), []);

  return (
    <Section labelledBy="calc-title" className="border-t border-rule">
      <h2 id="calc-title" className="max-w-[22ch] text-3xl">
        What a stalled deal costs you
      </h2>
      <p className="mt-4 max-w-[52ch] text-lg text-graphite">
        Put in your own numbers to see what time in security review is worth to you.
      </p>

      <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-md border border-rule lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="grid grid-cols-1 gap-7 bg-ledger p-5 sm:p-8">
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
            label="Average contract value, per year"
            value={acv}
            min={20_000}
            max={500_000}
            step={10_000}
            onChange={setAcv}
            display={eur.format(acv)}
          />
          <Slider
            label="Weeks stuck in security review"
            value={weeks}
            min={2}
            max={40}
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
            hint="Your guess. We don't claim a figure."
          />
        </div>

        <div className="flex flex-col border-t border-rule bg-paper lg:border-l lg:border-t-0">
          <div className="grid flex-1 grid-cols-1 content-center gap-8 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-1 lg:gap-10">
            <div>
              <p className="text-sm text-graphite">Revenue delayed this year</p>
              <p className="mt-1 font-mono text-[2.25rem] font-medium leading-tight tracking-[-0.03em]">
                <AnimatedNumber value={delayed} format={fmt} />
              </p>
            </div>
            <div className="sm:border-l sm:border-rule sm:pl-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
              <p className="text-sm text-graphite">
                Brought forward with {weeksSaved} {weeksSaved === 1 ? "week" : "weeks"} less review
              </p>
              <p className="mt-1 font-mono text-[2.25rem] font-medium leading-tight tracking-[-0.03em] text-seal-deep">
                <AnimatedNumber value={recovered} format={fmt} />
              </p>
            </div>
          </div>
          <p className="border-t border-rule px-5 py-4 text-xs text-graphite sm:px-8">
            An estimate from your inputs, not a forecast. It assumes each deal&apos;s annual revenue starts when the
            contract signs and is earned evenly over the year, so every week in review is a week of revenue pushed
            out.
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          Revenue delayed this year: {fmt(delayed)}. Brought forward: {fmt(recovered)}.
        </p>
      </div>
    </Section>
  );
}
