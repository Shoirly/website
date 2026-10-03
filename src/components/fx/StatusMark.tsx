"use client";

/**
 * Adapted from react-bits "StatusMark" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/Micro/StatusMark). Trimmed to pending, running and done: a
 * dashed ring that closes into a spinning arc while running, then fills and
 * draws a check when done. Recoloured to our tokens. Motion values drive the
 * ring, so React doesn't re-render per frame. Under reduced motion it jumps
 * straight to each state.
 */
import { animate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";

export type StatusMarkStatus = "pending" | "running" | "done";

const UI = { type: "spring" as const, duration: 0.3, bounce: 0 };
const MORPH = { duration: 0.3, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] };
const CHECK = "M7.5 12.25 10.5 15.25 16.75 8.75";
const IDLE_DASH = 0.3;
const SPOKEN: Record<StatusMarkStatus, string> = { pending: "Pending", running: "Checking", done: "Verified" };

export function StatusMark({
  status = "pending",
  size = 22,
  strokeWidth = 2,
  dashes = 8,
  arcLength = 0.68,
  className = "",
}: {
  status?: StatusMarkStatus;
  size?: number;
  strokeWidth?: number;
  dashes?: number;
  arcLength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const r = 10 - strokeWidth / 2;
  const C = 2 * Math.PI * r;
  const P = C / Math.max(1, dashes);
  const running = status === "running";
  const solid = status !== "pending";
  const targetArc = running ? arcLength : 1;

  const mode = useMotionValue(solid ? 1 : 0);
  const arc = useMotionValue(targetArc);
  const travel = useMotionValue(0);
  const ringRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const write = () => {
      const m = mode.get();
      const a = arc.get();
      const dash = IDLE_DASH * P + (a * C - IDLE_DASH * P) * m;
      const gap = (1 - IDLE_DASH) * P + ((1 - a) * C - (1 - IDLE_DASH) * P) * m;
      ringRef.current?.setAttribute("stroke-dasharray", `${Math.max(0, dash)} ${Math.max(0, gap)}`);
    };
    write();
    const offs = [
      mode.on("change", write),
      arc.on("change", write),
      travel.on("change", (v: number) => ringRef.current?.setAttribute("stroke-dashoffset", String(v))),
    ];
    return () => offs.forEach((off) => off());
  }, [C, P, mode, arc, travel]);

  useEffect(() => {
    if (reduce) {
      mode.jump(solid ? 1 : 0);
      arc.jump(targetArc);
      travel.jump(0);
      return;
    }
    if (mode.get() === 0) arc.jump(targetArc);
    const controls = [animate(mode, solid ? 1 : 0, MORPH), animate(arc, targetArc, UI)];
    if (running) {
      const t0 = travel.get();
      controls.push(animate(travel, [t0, t0 - C], { duration: 1.1, ease: "linear", repeat: Infinity }));
    } else {
      controls.push(animate(travel, Math.floor(travel.get() / P) * P, UI));
    }
    return () => controls.forEach((c) => c.stop());
  }, [status, solid, running, targetArc, reduce, C, P, mode, arc, travel]);

  return (
    <span
      className={`group inline-flex shrink-0 ${className}`}
      data-status={status}
      style={{ "--sm-stroke": strokeWidth } as CSSProperties}
    >
      <svg
        className="overflow-visible text-rule-strong transition-colors duration-200 group-data-[status=done]:text-seal group-data-[status=running]:text-seal"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        role="img"
        aria-label={SPOKEN[status]}
      >
        <circle
          className="fill-current stroke-current [fill-opacity:0] [stroke-opacity:0] [stroke-width:var(--sm-stroke)] [transition:fill-opacity_180ms_ease] group-data-[status=done]:[fill-opacity:0.1] group-data-[status=running]:[stroke-opacity:0.2]"
          cx="12"
          cy="12"
          r={r}
          transform="rotate(-90 12 12)"
        />
        <circle
          ref={ringRef}
          className="fill-none stroke-current [stroke-linecap:round] [stroke-width:var(--sm-stroke)]"
          cx="12"
          cy="12"
          r={r}
          transform="rotate(-90 12 12)"
        />
        <path
          className="fill-none stroke-current opacity-0 [stroke-dasharray:1_2] [stroke-dashoffset:1.05] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:var(--sm-stroke)] [transition:stroke-dashoffset_160ms_cubic-bezier(0.23,1,0.32,1),opacity_0ms_linear_160ms] group-data-[status=done]:opacity-100 group-data-[status=done]:[stroke-dashoffset:0] group-data-[status=done]:[transition:stroke-dashoffset_260ms_cubic-bezier(0.23,1,0.32,1)_120ms,opacity_0ms_linear_120ms] motion-reduce:[stroke-dashoffset:0] motion-reduce:transition-none"
          d={CHECK}
          pathLength="1"
        />
      </svg>
    </span>
  );
}
