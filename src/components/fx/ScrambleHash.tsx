"use client";

/**
 * Adapted from react-bits "DecryptedText" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/TextAnimations/DecryptedText). Trimmed to the one behaviour we
 * need: a signature hash resolving left to right from hex noise when `signed`
 * flips true. Reserved width (monospace, fixed length) means no layout shift.
 */
import { useEffect, useState } from "react";

const HEX = "0123456789abcdef";

function noise(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) s += HEX[Math.floor(Math.random() * 16)];
  return s;
}

export function ScrambleHash({
  value,
  state,
  className = "",
  stepMs = 34,
}: {
  value: string;
  /** idle: dots, signing: noise resolving, signed: final value */
  state: "idle" | "signing" | "signed";
  className?: string;
  /** Time per resolved character. */
  stepMs?: number;
}) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (state !== "signing") return;
    let revealed = 0;
    const id = window.setInterval(() => {
      revealed += 1;
      setShown(value.slice(0, revealed) + noise(value.length - revealed));
      if (revealed >= value.length) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [state, value, stepMs]);

  const text = state === "idle" ? "·".repeat(value.length) : state === "signed" ? value : shown;
  return <span className={`font-mono tabular ${className}`}>{text}</span>;
}
