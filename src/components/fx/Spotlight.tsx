"use client";

/**
 * Adapted from react-bits "SpotlightCard" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/Components/SpotlightCard). Rewritten with motion values instead
 * of useState so the highlight follows the cursor without re-rendering, recoloured
 * to a faint Seal tint for a light page. Mouse only; nothing on touch or reduced motion.
 */
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const o = useSpring(0, { stiffness: 200, damping: 30 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(49 87 240 / 0.07), transparent 70%)`;

  return (
    <div
      className={`relative ${className}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        o.set(1);
      }}
      onPointerLeave={() => o.set(0)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: bg, opacity: o }}
      />
      {children}
    </div>
  );
}
