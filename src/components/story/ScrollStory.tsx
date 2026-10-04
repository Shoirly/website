"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Layout";

export type StoryStep = { title: string; body: ReactNode; scene: ReactNode };

const ease = [0.22, 1, 0.36, 1] as const;

function StepBlock({
  step,
  index,
  active,
  reached,
  onActive,
}: {
  step: StoryStep;
  index: number;
  active: boolean;
  reached: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A step becomes active when it crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative pl-12 lg:flex lg:min-h-[52vh] lg:items-center">
      <div className="relative w-full lg:py-6">
        {/* Step marker on the rail, level with the step title */}
        <span
          aria-hidden
          className={`absolute -left-12 top-1 flex size-[23px] items-center justify-center rounded-full border font-mono text-[11px] tabular transition-colors duration-300 lg:top-[calc(1.5rem+0.4rem)] ${
            reached ? "border-seal bg-seal text-paper" : "border-rule-strong bg-paper text-graphite"
          }`}
        >
          {index + 1}
        </span>
        <h3
          className={`max-w-[24ch] text-2xl transition-colors duration-300 lg:text-[1.875rem] lg:leading-tight ${
            active ? "text-ink" : "lg:text-graphite"
          }`}
        >
          <span className="sr-only">Step {index + 1}: </span>
          {step.title}
        </h3>
        <div className="mt-3 max-w-[46ch] text-lg text-graphite">{step.body}</div>
        {/* Mobile: each step carries its own scene, static */}
        <div className="mt-6 min-h-[300px] lg:hidden [&_*]:animate-none!">{step.scene}</div>
      </div>
    </li>
  );
}

/**
 * Scroll-driven story. Desktop: a sticky scene on the left updates as the
 * steps scroll past on the right, with a rail that fills with scroll
 * progress. Mobile: a stacked sequence, each step with its own scene.
 */
export function ScrollStory({
  id,
  heading,
  intro,
  steps,
}: {
  id: string;
  heading: string;
  intro: string;
  steps: StoryStep[];
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 md:py-24">
      <Container>
        <h2 id={`${id}-title`} className="max-w-[22ch] text-3xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-graphite">{intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Desktop: sticky scene */}
          <div aria-hidden className="hidden lg:block">
            <div className="sticky top-[calc(50vh-190px)]">
              <ol className="grid grid-cols-4 gap-2">
                {steps.map((s, i) => (
                  <li key={s.title} className="h-1 overflow-hidden rounded-full bg-rule">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-seal"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease }}
                    />
                  </li>
                ))}
              </ol>
              <div className="relative mt-4 h-[340px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, transition: { duration: 0.16 } }}
                    transition={{ duration: 0.26, ease }}
                  >
                    {steps[active].scene}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Steps, with a rail that fills as you scroll */}
          <div className="relative">
            <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-rule lg:bottom-[26vh] lg:top-[26vh]">
              <motion.div
                className="h-full w-full origin-top bg-seal"
                style={{ scaleY: reduce ? 1 : scrollYProgress }}
              />
            </div>
            <ol ref={listRef} className="space-y-16 lg:space-y-0">
              {steps.map((s, i) => (
                <StepBlock
                  key={s.title}
                  step={s}
                  index={i}
                  active={active === i}
                  reached={i <= active}
                  onActive={setActive}
                />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
