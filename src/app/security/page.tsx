import type { Metadata } from "next";
import { ArrowUpRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHeader, Section } from "@/components/ui/Layout";
import { site } from "@/config/site";
import { pageMetadata, pageSeo } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(pageSeo["/security"]);

const signing = [
  {
    title: "Record",
    body: "An action is written as a structured record: what happened, for which customer, when, and what authorised it.",
  },
  {
    title: "Sign",
    body: "The record is signed. Any later change to it, however small, means the signature no longer matches.",
  },
  {
    title: "Chain",
    body: "Each record includes a reference to the one before it. Removing or reordering records breaks the chain.",
  },
  {
    title: "Verify",
    body: "Once we publish the verification guide, banks will be able to check signatures and the chain independently.",
  },
];

const stays = [
  "Action records and everything in them",
  "Customer data and identifiers",
  "Prompts, model inputs and outputs",
  "Who approved each action: names and policy versions",
];

const leaves = ["Signatures", "Hashes", "Coverage counts"];

// Roadmap. Never present these as shipped.
const next = [
  {
    title: "Hardware-isolated signing",
    body: "Signing inside a hardware-isolated environment, so signing keys can't be extracted or used outside it.",
  },
  {
    title: "eIDAS qualified timestamps",
    body: "Timestamps from an EU qualified trust service provider, giving each record legally recognised proof of time.",
  },
  {
    title: "Trust-centre integrations",
    body: "Publishing packs directly to trust centres and vendor-risk tools. Today you share packs through Vanta or your trust centre yourself.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Evidence is only useful if it can be trusted"
        lead="We hold ourselves to the standard we ask of agents: say what happens, show it, and let others check. Here's how records are protected, where Shoirly runs and what leaves."
      />

      <Section labelledBy="signing-title">
        <h2 id="signing-title" className="max-w-[24ch] text-3xl">
          How evidence is signed and verified
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {signing.map((s, i) => (
            <li key={s.title} className="relative lg:pr-8">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full border border-seal font-mono text-xs text-seal-deep">
                  {i + 1}
                </span>
                {i < signing.length - 1 ? <span aria-hidden className="hidden h-px flex-1 bg-rule lg:block" /> : null}
              </div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-graphite">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[70ch] text-sm text-graphite">
          {/* TODO(team): publish the signing algorithm, key management approach and a verification guide. */}
          We&apos;ll publish the technical details of our signing scheme and a verification guide for bank teams.
          Ask us for the current draft.
        </p>
      </Section>

      <Section tone="ledger" labelledBy="where-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="where-title" className="text-3xl">
              Where Shoirly runs
            </h2>
            <p className="mt-4 max-w-[42ch] text-lg text-graphite">
              Shoirly is designed to run where your agent runs: in your cloud, or in the bank&apos;s. Raw data stays there.
            </p>
            <p className="mt-6 text-xl font-semibold">Your data never leaves. Only the proof does.</p>
            {/* TODO(team): list the supported deployment targets (clouds, regions, Kubernetes, etc.). */}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="rounded-md border-2 border-dashed border-rule-strong/70 bg-paper p-5">
              <h3 className="flex items-center gap-2 text-lg">
                <LockSimple size={18} aria-hidden className="text-graphite" /> Stays where your agent runs
              </h3>
              <ul className="mt-4 space-y-3 text-graphite">
                {stays.map((s) => (
                  <li key={s} className="border-t border-rule pt-3 first:border-t-0 first:pt-0">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-rule bg-paper p-5 shadow-paper">
              <h3 className="flex items-center gap-2 text-lg">
                <ArrowUpRight size={18} aria-hidden className="text-seal" /> Leaves
              </h3>
              <ul className="mt-4 space-y-3">
                {leaves.map((l) => (
                  <li key={l} className="border-t border-rule pt-3 font-mono text-sm first:border-t-0 first:pt-0">
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-graphite">
                Enough to show records are unedited and whether any are missing. None of their contents.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="status-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="status-title" className="text-3xl">
            Where we are today
          </h2>
          <dl className="divide-y divide-rule border-y border-rule">
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Stage</dt>
              <dd className="text-graphite">We&apos;re early and taking on design partners.</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Certifications</dt>
              <dd className="text-graphite">
                {/* TODO(team): confirm certification status and any audit timeline. */}
                We don&apos;t hold SOC 2 or ISO 27001 certification yet. When we start an audit, we&apos;ll say so
                here.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Our hosted service</dt>
              <dd className="text-graphite">
                {/* TODO(team): add hosting provider, regions and subprocessors for the service that receives proofs. */}
                The signatures, hashes and coverage counts that leave your environment are held by Shoirly. We&apos;ll
                publish where that service is hosted, and our subprocessors, before the first customer goes live.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Reporting an issue</dt>
              <dd className="text-graphite">
                {/* TODO(team): set up a dedicated security@ address and a disclosure policy. */}
                Found a security problem? Email{" "}
                <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent("Security report")}`}>
                  {site.email}
                </a>{" "}
                with &ldquo;Security report&rdquo; in the subject. We&apos;ll reply within two working days.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section tone="ledger" labelledBy="next-title">
        <h2 id="next-title" className="max-w-[24ch] text-3xl">
          What we&apos;re building next
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-graphite">
          On our roadmap. None of these is available yet, and we&apos;ll say clearly when one is.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {next.map((n) => (
            <li key={n.title} className="border-t border-ink pt-5">
              <span className="inline-block rounded-sm border border-rule-strong/70 px-1.5 py-0.5 text-xs text-graphite">
                Not yet available
              </span>
              <h3 className="mt-3 text-xl">{n.title}</h3>
              <p className="mt-2 text-graphite">{n.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta
        title="Want the detail for your security review?"
        body="Book a call and we'll walk your team through signing, deployment and what leaves your environment."
      />
    </>
  );
}
