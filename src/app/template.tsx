"use client";

import { motion, useReducedMotion } from "motion/react";
import { ViewTransition, useEffect, useState, type ReactNode } from "react";

/*
 * Page transitions. Next.js remounts a template on every navigation, and route
 * changes run as React transitions, so the <ViewTransition> below gives each
 * page an exit and an enter animation via the browser's View Transitions API.
 * The choreography lives in globals.css (::view-transition-*(.page)): the old
 * page recedes and blurs, the new one rises into place, the header stays put.
 *
 * Browsers without the API get a short opacity fade instead. The very first
 * load never animates, so first paint and LCP aren't delayed.
 */
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [fallbackFade] = useState(
    () => hasNavigated && !reduce && typeof document !== "undefined" && !("startViewTransition" in document),
  );

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <ViewTransition enter="page" exit="page" default="none">
      <motion.div
        initial={fallbackFade ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </ViewTransition>
  );
}
