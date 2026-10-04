"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const id = window.setTimeout(() => setStatus("idle"), 2400);
    return () => window.clearTimeout(id);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <figure className="rounded-md border border-sh-border bg-sh-bg">
      <div className="flex items-center justify-between gap-4 border-b border-sh-border px-4 py-2.5">
        <figcaption className="text-sm font-medium">{label}</figcaption>
        <button
          type="button"
          onClick={copy}
          className="-my-1.5 inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm text-sh-text transition-colors duration-150 hover:bg-sh-ink-soft sm:my-0 sm:h-8 sm:px-2.5"
        >
          {status === "copied" ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
          {status === "copied" ? "Copied" : status === "failed" ? "Select and copy" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-6 text-sh-text sm:p-5">
        {text}
      </pre>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Copied to clipboard" : status === "failed" ? "Copy failed, select the text instead" : ""}
      </span>
    </figure>
  );
}
