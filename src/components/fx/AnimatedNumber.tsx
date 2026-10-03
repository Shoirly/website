"use client";

/**
 * Adapted from react-bits "CountUp" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/TextAnimations/CountUp). Changed from a one-shot count to a
 * value that springs to each new target, so calculator outputs settle rather
 * than jump. Writes to the DOM directly; React only renders once.
 */
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export function AnimatedNumber({
  value,
  format,
  className = "",
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 260, damping: 34 });

  useEffect(() => {
    if (reduce) {
      mv.jump(value);
      spring.jump(value);
    } else {
      mv.set(value);
    }
  }, [value, reduce, mv, spring]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = format(v);
      }),
    [spring, format],
  );

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {format(value)}
    </span>
  );
}
