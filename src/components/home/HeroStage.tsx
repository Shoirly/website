"use client";

/*
 * Layered depth for the hero's evidence trail (after Apple's "materials and
 * depth" guidance): a second evidence sheet sits behind the panel, the panel
 * tilts towards the pointer on a critically damped spring, and the logo seal
 * floats in front. Each layer moves by a different amount, so they read as
 * physically stacked. On scroll the layers drift apart slightly.
 *
 * Tilt only runs for fine pointers that can hover; under reduced motion
 * everything is static. Transforms only, so there's no layout shift.
 */
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Critically damped (damping ratio ~1): follows the pointer without overshoot.
const spring = { stiffness: 150, damping: 26, mass: 1 };

export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const px = useMotionValue(0); // -1..1 across the hero
  const py = useMotionValue(0);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -56]);
  const liftBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);
  const liftSeal = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);

  const rotateY = useTransform(sx, (v) => v * 5);
  const rotateX = useTransform(sy, (v) => v * -4);
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform([sy, liftBack], ([v, l]: number[]) => v * -8 + l);
  const sealX = useTransform(sx, (v) => v * 16);
  const sealY = useTransform([sy, liftSeal], ([v, l]: number[]) => v * 12 + l);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const area = ref.current?.closest("section");
    if (!area || reduce || !finePointer) {
      px.set(0);
      py.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width) * 2 - 1);
      py.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, finePointer, px, py]);

  return (
    <div ref={ref} className="relative [perspective:1400px]">
      {/* Back layer: a second evidence sheet, offset and turned slightly */}
      <motion.div
        aria-hidden
        className="ledger-grid absolute inset-0 translate-x-4 translate-y-4 rotate-[2.5deg] rounded-md border border-rule bg-ledger shadow-paper"
        style={{ x: backX, y: backY }}
      />

      {/* Main layer: the live evidence trail */}
      <motion.div className="relative" style={{ rotateX, rotateY, y: lift, transformPerspective: 1400 }}>
        {children}
      </motion.div>

      {/* Front layer: the seal, floating above the pack corner (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-7 -left-7 hidden lg:block"
        style={{ x: sealX, y: sealY }}
      >
        <Image src="/brand/mark.svg" alt="" width={60} height={60} unoptimized />
      </motion.div>
    </div>
  );
}
