"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/*
 * Page transitions. Next.js remounts a template on every navigation, so each
 * new page fades in briefly. The very first load is skipped (no delay to first
 * paint or LCP), and reduced-motion visitors get an instant swap. Opacity only:
 * no movement, so no layout shift.
 */
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [animateIn] = useState(() => hasNavigated && !reduce);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
