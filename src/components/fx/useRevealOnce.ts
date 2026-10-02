"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/**
 * For one-shot "orchestrated moments". The server renders the finished state
 * (so no-JS and reduced-motion visitors see everything). After hydration, if
 * motion is allowed, the element is "armed" (hidden state) and plays once when
 * it scrolls into view. If it's already on screen at hydration, it stays put
 * rather than replaying content the visitor is already looking at.
 */
export function useRevealOnce(ref: RefObject<Element | null>, amount = 0.4) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    if (!onScreen) setArmed(true);
  }, [reduce, ref]);

  return {
    /** True when the finished state should show. */
    shown: !armed || inView,
    /** True when the reveal should animate (armed, motion allowed). */
    animated: armed && !reduce,
  };
}
