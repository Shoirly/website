"use client";

import { useState } from "react";
import { CheckCircle, SealCheck, ShieldCheck, User } from "@phosphor-icons/react";
import { Spotlight } from "@/components/fx/Spotlight";
import { Section } from "@/components/ui/Layout";
import { sampleActions } from "@/content/sample";

type Region = "header" | "approval" | "coverage" | "mapping";

const notes: { id: Region; title: string; body: string }[] = [
  {
    id: "header",
    title: "One pack per customer",
    body: "Each buyer gets evidence about its own customers only, for the period it asks about.",
  },
  {
    id: "approval",
    title: "Who approved each action",
    body: "A named person or a versioned policy, recorded at the moment the agent acted.",
  },
  {
    id: "coverage",
    title: "Gaps would show",
    body: "Attempted actions are counted against signed records, so anything unrecorded stands out.",
  },
  {
    id: "mapping",
    title: "Mapped to their controls",
    body: "Organised by the areas the buyer's risk team already reports against, for example DORA for EU banks.",
  },
];

// Framework-neutral control areas; the references show DORA as the example framework.
const mapping = [
  { area: "Third-party oversight", ref: "DORA 28-30", what: "What the provider's system did for this customer, action by action." },
  { area: "Access and authorisation", ref: "DORA 5-16", what: "Attributable actions with their authorisation and a tamper-evident record." },
  { area: "Incident response", ref: "DORA 17-23", what: "A signed timeline to reconstruct events if something goes wrong." },
];

function regionClass(active: Region | null, id: Region) {
  return `rounded-[5px] transition-[box-shadow,background-color] duration-200 ${
    active === id ? "bg-seal-wash/50 shadow-[0_0_0_2px_var(--color-seal)]" : "shadow-[0_0_0_0_transparent]"
  }`;
}

export function EvidencePreview() {
  const [active, setActive] = useState<Region | null>(null);

  return (
    <Section tone="ledger" labelledBy="evidence-title">
      <h2 id="evidence-title" className="max-w-[22ch] text-3xl">
        What the evidence looks like
      </h2>
      <p className="mt-4 max-w-[54ch] text-lg text-graphite">
        A pack your customer&apos;s risk team can read in minutes, with any gaps already counted.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <Spotlight className="rounded-md">
          <article
            aria-label="Sample evidence pack"
            className="relative rounded-md border border-rule bg-paper p-5 shadow-paper sm:p-8"
          >
            {/* Header */}
            <div className={`-m-2 p-2 ${regionClass(active, "header")}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-graphite">Evidence pack, sample data</p>
                  <h3 className="mt-1 text-xl">Sample customer</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-seal-wash px-2 py-1 text-xs font-medium text-seal-deep">
                  <SealCheck size={15} weight="fill" aria-hidden /> All records verify
                </span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-4">
                {[
                  ["Period", "1-30 Sep 2026"],
                  ["Agent", "Customer ops agent"],
                  ["Prepared", "1 Oct 2026"],
                  ["Pack ID", "ep_7f21c9"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-graphite">{k}</dt>
                    <dd className="mt-0.5 font-mono text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Coverage */}
            <div className={`mt-7 -mx-2 p-2 ${regionClass(active, "coverage")}`}>
              <dl className="grid grid-cols-3 gap-4 border-y border-rule py-4">
                {[
                  ["Attempted", "1,284"],
                  ["Signed", "1,284"],
                  ["Unrecorded", "0"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-graphite">{k}</dt>
                    <dd className="mt-1 font-mono text-lg font-medium tabular sm:text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Records */}
            <div className={`mt-6 -mx-2 p-2 ${regionClass(active, "approval")}`}>
              <p className="text-xs font-semibold">Records (4 of 1,284 shown)</p>
              <ul className="mt-3 divide-y divide-rule">
                {sampleActions.slice(0, 4).map((a) => (
                  <li key={a.id} className="grid grid-cols-1 gap-x-4 gap-y-1 py-2.5 text-xs sm:grid-cols-[4.5rem_1fr_minmax(0,13rem)_auto] sm:items-center">
                    <span className="font-mono text-graphite">{a.time}</span>
                    <span className="truncate font-mono text-ink">{a.action}</span>
                    <span className="flex min-w-0 items-center gap-1.5 text-graphite">
                      {a.approverKind === "person" ? (
                        <User size={13} aria-hidden className="shrink-0" />
                      ) : (
                        <ShieldCheck size={13} aria-hidden className="shrink-0" />
                      )}
                      <span className="truncate">{a.approver}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-graphite">
                      {a.signature.slice(0, 6)}
                      <CheckCircle size={13} weight="fill" className="text-seal" aria-label="verified" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Control mapping */}
            <div className={`mt-6 -mx-2 p-2 ${regionClass(active, "mapping")}`}>
              <p className="text-xs font-semibold">Control mapping (shown against DORA as an example)</p>
              <dl className="mt-3 space-y-3">
                {mapping.map((d) => (
                  <div key={d.area} className="grid grid-cols-1 gap-x-4 gap-y-0.5 text-xs sm:grid-cols-[15rem_1fr]">
                    <dt className="text-ink">
                      {d.area} <span className="whitespace-nowrap font-mono text-graphite">{d.ref}</span>
                    </dt>
                    <dd className="text-graphite">{d.what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Spotlight>

        <ul className="grid grid-cols-1 content-start gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="What to look for">
          {notes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                aria-pressed={active === n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((v) => (v === n.id ? null : n.id))}
                className={`w-full rounded-md border px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] ${
                  active === n.id ? "border-seal bg-paper" : "border-transparent hover:bg-paper/60"
                }`}
              >
                <span className="block font-semibold">{n.title}</span>
                <span className="mt-1 block text-sm text-graphite">{n.body}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 max-w-[70ch] text-xs text-graphite">
        Sample pack. Names, figures and the mapping are illustrative.
        {/* TODO(team): have the DORA references reviewed before launch. */}
      </p>
    </Section>
  );
}
