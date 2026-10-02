"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Layout";

export type Step = { title: string; body: string; visual: ReactNode };

const ease = [0.22, 1, 0.36, 1] as const;

function StepBlock({
  step,
  index,
  onActive,
  active,
}: {
  step: Step;
  index: number;
  onActive: (i: number) => void;
  active: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Active when the step crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="lg:flex lg:min-h-[46vh] lg:items-center">
      <div className="w-full">
        <div className="lg:hidden">
          <div className="mb-6 min-h-[240px]">{step.visual}</div>
        </div>
        <p
          className={`font-mono text-sm tabular transition-colors duration-300 ${
            active ? "text-seal" : "text-graphite"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={`mt-2 max-w-[22ch] text-2xl transition-colors duration-300 lg:text-3xl ${
            active ? "text-ink" : "lg:text-graphite"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`mt-4 max-w-[46ch] text-lg text-graphite transition-opacity duration-300 ${
            active ? "" : "lg:opacity-80"
          }`}
        >
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function HowItWorks({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-16 md:py-24">
      <Container>
        <h2 id="how-title" className="max-w-[22ch] text-3xl">
          How it works
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-graphite">
          Four steps, from your agent&apos;s first action to a pack a bank can check for itself.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <ol className="order-2 space-y-16 lg:space-y-0">
            {steps.map((s, i) => (
              <StepBlock key={s.title} step={s} index={i} onActive={setActive} active={active === i} />
            ))}
          </ol>

          <div aria-hidden className="order-1 hidden lg:block">
            <div className="sticky top-[calc(50vh-150px)] h-[300px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  className="h-full"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease }}
                >
                  {steps[active].visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
