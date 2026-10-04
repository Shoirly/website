"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

type NodeId = "agent" | "proxy" | "tool" | "auth" | "sign" | "chain" | "coverage" | "pack";

const nodes: Record<NodeId, { n: number; label: string; title: string; body: string }> = {
  agent: {
    n: 1,
    label: "Your agent",
    title: "Your agent",
    body: "Your AI agent, unchanged. It decides what to do, then calls a tool to do it, such as issuing a refund or updating an account.",
  },
  proxy: {
    n: 2,
    label: "Shoirly proxy",
    title: "The Shoirly proxy",
    body: "Your agent calls its tools through the proxy, so every action is captured as it happens: what was attempted, for which customer, and when. It doesn't change or block the call.",
  },
  tool: {
    n: 3,
    label: "Tool or system",
    title: "The tool or system",
    body: "The API or system the agent acts on: a CRM, a ticketing tool or a billing system. It receives the call exactly as your agent sent it.",
  },
  auth: {
    n: 4,
    label: "Authoriser link",
    title: "Linking the authoriser",
    body: "Each action is linked to what allowed it: a named person's approval, or the exact version of the policy that permits it.",
  },
  sign: {
    n: 5,
    label: "Signature",
    title: "Signing the record",
    body: "The record is signed. If anyone edits it later, however slightly, the signature stops matching.",
  },
  chain: {
    n: 6,
    label: "Chain",
    title: "Adding it to the chain",
    body: "Each signed record points to the one before it. Remove or reorder a record and the chain visibly breaks.",
  },
  coverage: {
    n: 7,
    label: "Coverage check",
    title: "The coverage check",
    body: "Counts the calls that went through the proxy against the signed records, so it shows whether anything went unrecorded.",
  },
  pack: {
    n: 8,
    label: "Evidence pack",
    title: "Only proof leaves",
    // TODO(team): explain how readable records reach the customer alongside the proof, once settled.
    body: "Only signatures, hashes and coverage counts leave your environment. That proof is what makes each per-customer evidence pack verifiable. Share packs through Vanta or your trust centre.",
  },
};

const order: NodeId[] = ["agent", "proxy", "tool", "auth", "sign", "chain", "coverage", "pack"];

function NodeButton({
  id,
  selected,
  onSelect,
  tone = "default",
}: {
  id: NodeId;
  selected: boolean;
  onSelect: (id: NodeId) => void;
  tone?: "default" | "shoirly";
}) {
  const node = nodes[id];
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={`group relative flex min-h-12 w-full items-center gap-2.5 rounded-md border px-3 py-2.5 text-left text-sm transition-[border-color,background-color] duration-[var(--sh-dur-fast)] ${
        selected
          ? "border-sh-accent bg-sh-accent-soft text-sh-accent-text"
          : tone === "shoirly"
            ? "border-sh-accent bg-sh-bg"
            : "border-sh-border bg-sh-bg hover:border-sh-border-strong"
      }`}
    >
      <span
        className={`flex size-5 shrink-0 items-center justify-center font-mono text-micro tabular transition-colors duration-[var(--sh-dur-fast)] ${
          selected ? "bg-sh-accent text-sh-on-accent" : "bg-sh-bg-subtle text-sh-muted group-hover:text-sh-text"
        }`}
      >
        {node.n}
      </span>
      <span className="font-medium">{node.label}</span>
    </button>
  );
}

function Arrow({ down = false, className = "" }: { down?: boolean; className?: string }) {
  const Icon = down ? ArrowDown : ArrowRight;
  return (
    <span aria-hidden className={`flex items-center justify-center text-sh-border-strong ${className}`}>
      <Icon size={16} />
    </span>
  );
}

/**
 * Interactive architecture diagram for /product. Nodes are toggle buttons;
 * the panel below explains the selected one in plain language. Static: no
 * entrance or signal animation (BRAND.md 9).
 */
export function ArchitectureDiagram() {
  const [selected, setSelected] = useState<NodeId>("proxy");
  const node = (id: NodeId, tone?: "default" | "shoirly") => (
    <NodeButton id={id} selected={selected === id} onSelect={setSelected} tone={tone} />
  );

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,1fr)_9.5rem_minmax(0,10.5rem)] lg:gap-0">
        {/* The environment boundary */}
        <div
          role="group"
          aria-label="Inside your environment: your cloud or your customer's"
          className="border border-dashed border-sh-border-strong bg-sh-bg p-4 sm:p-5"
        >
          <p className="font-mono text-xs text-sh-muted">your environment: your cloud or your customer&apos;s</p>

          {/* Request path */}
          <div className="mt-4 grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)_1.5rem_minmax(0,1fr)]">
            {node("agent")}
            <Arrow className="rotate-90 sm:rotate-0" />
            {node("proxy", "shoirly")}
            <Arrow className="rotate-90 sm:rotate-0" />
            {node("tool")}
          </div>

          <div className="my-2 flex justify-center sm:my-3">
            <span className="inline-flex items-center gap-1.5 text-micro text-sh-muted">
              <ArrowDown size={14} aria-hidden className="text-sh-border-strong" /> Each captured call
            </span>
          </div>

          {/* Evidence pipeline */}
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]">
            {node("auth")}
            <Arrow className="rotate-90 sm:rotate-0" />
            {node("sign")}
            <Arrow className="rotate-90 sm:rotate-0" />
            {node("chain")}
            <Arrow className="rotate-90 sm:rotate-0" />
            {node("coverage")}
          </div>
        </div>

        {/* Crossing the boundary */}
        <div className="flex flex-col items-center justify-center gap-1 py-1 text-center lg:px-2">
          <span className="font-mono text-micro leading-4 text-sh-accent-text">Only proof leaves</span>
          <Arrow down className="text-sh-accent lg:hidden" />
          <span aria-hidden className="hidden h-px w-full bg-sh-accent lg:block" />
          <span className="text-micro leading-4 text-sh-muted">signatures, hashes, coverage counts</span>
        </div>

        <div>{node("pack")}</div>
      </div>

      {/* Explanation of the selected node */}
      <div className="mt-6 min-h-32 rounded-md border border-sh-border bg-sh-surface p-5 sm:p-6" aria-live="polite">
        <div>
            <p className="font-mono text-xs text-sh-muted">
              {nodes[selected].n} of {order.length}
            </p>
            <h3 className="mt-1 text-xl">{nodes[selected].title}</h3>
            <p className="mt-2 max-w-[68ch] text-sh-muted">{nodes[selected].body}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-sh-muted">Select any part of the diagram to see what it does.</p>
    </div>
  );
}
