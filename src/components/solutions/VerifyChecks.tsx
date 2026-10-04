"use client";

import { useEffect, useRef, useState } from "react";
import { StatusMark, type StatusMarkStatus } from "@/components/fx/StatusMark";
import { useRevealOnce } from "@/components/fx/useRevealOnce";

/**
 * /solutions/banks orchestrated moment: when the list first scrolls into
 * view, each check runs (spinning arc) then resolves to a drawn check, one
 * after another. Server render and reduced motion show all three done.
 */
export function VerifyChecks({ checks }: { checks: [string, string][] }) {
  const ref = useRef<HTMLDListElement>(null);
  const { shown, animated } = useRevealOnce(ref, 0.5);
  // Advances 0..2n: check i is running at 2i+1 and done from 2i+2.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!animated || !shown) return;
    const timers = Array.from({ length: checks.length * 2 }, (_, k) =>
      window.setTimeout(() => setTick(k + 1), 150 + Math.floor(k / 2) * 450 + (k % 2) * 420),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [animated, shown, checks.length]);

  const statusFor = (i: number): StatusMarkStatus => {
    if (!animated) return "done";
    if (tick >= 2 * i + 2) return "done";
    if (tick === 2 * i + 1) return "running";
    return "pending";
  };

  return (
    <dl ref={ref} className="divide-y divide-sh-border border-y border-sh-border">
      {checks.map(([k, v], i) => (
        <div
          key={k}
          className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 gap-y-2 py-5 sm:grid-cols-[1.75rem_9rem_1fr] sm:gap-x-6"
        >
          <StatusMark status={statusFor(i)} className="mt-0.5" />
          <dt className="font-semibold">{k}</dt>
          <dd className="col-start-2 text-sh-muted sm:col-start-auto">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
