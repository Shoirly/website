import type { Metadata } from "next";
import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHeader, Section } from "@/components/ui/Layout";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Security: how evidence is signed, verified and handled",
  description:
    "How Shoirly signs and chains evidence records, how banks verify them, what data we store and what we don't.",
  alternates: { canonical: "/security" },
};

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
    body: "A bank can check signatures and the chain itself, without relying on the vendor's word or on ours.",
  },
];

// TODO(team): confirm every line in both lists against the actual architecture.
const stored = [
  "Action records: action type, time, the customer reference you choose, and the authoriser",
  "Signatures and chain references for each record",
  "Coverage counts per period",
  "Who in your team and your customers' teams can access which packs",
];

const notStored = [
  "Your model weights, prompts or system instructions",
  "Full conversation transcripts, unless you choose to attach them",
  "Card numbers, passwords or authentication secrets",
  "Data about one bank's customers in another bank's pack",
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Evidence is only useful if it can be trusted"
        lead="We hold ourselves to the standard we ask of agents: say what happens, show it, and let others check. Here's how records are protected and what we keep."
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

      <Section tone="ledger" labelledBy="data-title">
        <h2 id="data-title" className="max-w-[24ch] text-3xl">
          What we store, and what we don&apos;t
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-graphite">
          We keep what&apos;s needed to prove what happened, and as little else as possible.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="text-xl">We store</h3>
            <ul className="mt-5 space-y-4">
              {stored.map((s) => (
                <li key={s} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  <Check size={18} className="mt-1 text-seal" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl">We don&apos;t store</h3>
            <ul className="mt-5 space-y-4">
              {notStored.map((s) => (
                <li key={s} className="grid grid-cols-[1.25rem_1fr] gap-3 text-graphite">
                  <Minus size={18} className="mt-1" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
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
              <dt className="font-semibold">Certifications</dt>
              <dd className="text-graphite">
                {/* TODO(team): confirm certification status and any audit timeline. */}
                We&apos;re an early-stage company and don&apos;t hold SOC 2 or ISO 27001 certification yet. When we
                start an audit, we&apos;ll say so here.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Hosting and data location</dt>
              <dd className="text-graphite">
                {/* TODO(team): add hosting provider and regions. */}
                We&apos;ll publish our hosting regions and subprocessors here before the first customer goes live.
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

      <ClosingCta
        title="Want the detail for your security review?"
        body="Book a call and we'll walk your team through signing, verification and data handling."
      />
    </>
  );
}
