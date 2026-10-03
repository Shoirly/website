import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
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
    body: "A digital signature acts like a seal on the record. Verification checks that seal against the record: if the signed content changes, the check fails.",
  },
  {
    title: "Chain",
    body: "Each record links to the one before it using a hash, a digital fingerprint of its contents. Checking those links helps reveal changes to the recorded sequence.",
  },
  {
    title: "Verify",
    body: "Check the signatures and links, then review the coverage check, which shows whether anything went unrecorded. Your customers will be able to verify independently once the verification guide is published.",
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
    body: "We plan to add a hardware-isolated environment for signing, to strengthen protection of signing keys. The implementation and its guarantees are still to be confirmed.",
  },
  {
    title: "eIDAS qualified timestamps",
    body: "We plan to add qualified timestamps from an EU qualified trust service provider, to support evidence of when a record existed. The provider and implementation are still to be confirmed.",
  },
  {
    title: "Trust-centre integrations",
    body: "We plan to connect evidence packs to trust centres and vendor-risk tools. Packs you can share through Vanta or your trust centre are not the same as a shipped integration.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Evidence is only useful if it can be trusted"
        lead="A log says what happened. Signed, linked records make changes detectable. Here is how the evidence works, what stays in your environment and what is still on our roadmap."
      >
        <p className="text-sm text-graphite">We&apos;re early and taking on design partners.</p>
      </PageHeader>

      <Section labelledBy="signing-title">
        <h2 id="signing-title" className="max-w-[24ch] text-3xl">
          How evidence is signed and verified
        </h2>
        <p className="mt-4 max-w-[64ch] text-lg text-graphite">
          Each action is linked to who or what authorised it, signed and added to a chain of records.
          Signing protects the record; the chain connects it to the wider trail.
        </p>
        <figure className="mt-8 rounded-md border border-rule bg-ledger p-5 sm:p-6" aria-labelledby="chain-caption">
          <figcaption id="chain-caption" className="text-sm font-semibold">
            A linked evidence trail
          </figcaption>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {["Earlier action", "Next action", "Following action"].map((label, i) => (
              <li key={label} className="relative rounded-sm border border-rule bg-paper p-4 md:mr-4">
                <p className="font-semibold">{label}</p>
                <p className="mt-1 text-sm text-graphite">Action + authorisation</p>
                <p className="mt-3 border-t border-rule pt-3 font-mono text-xs text-seal-deep">Digital signature</p>
                <p className="mt-2 text-xs text-graphite">
                  {i === 0 ? "Part of the recorded trail" : "Linked to the previous record’s hash"}
                </p>
                {i < 2 ? (
                  <ArrowRight size={20} aria-hidden className="absolute -right-8 top-1/2 hidden -translate-y-1/2 text-graphite md:block" />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-graphite">Simplified diagram, not customer data. Read in order: each new record links back to the previous one.</p>
        </figure>
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
        <aside className="mt-10 max-w-[70ch] border-l-2 border-seal pl-5" aria-label="Verification limits and pending details">
          <p className="font-semibold">A valid signature is not the whole story</p>
          <p className="mt-2 text-sm text-graphite">
            It checks the integrity of a signed record, not whether the action itself was correct or authorised
            appropriately. A chain check does not replace the coverage check.
          </p>
          {/* TODO(team): publish the signing algorithm, key management approach and a verification guide. */}
          <p className="mt-3 text-sm text-graphite">
            The signing algorithm, key management details and independent verification guide are not yet published.
            We won&apos;t ask buyers&apos; risk teams to take those details on trust.
          </p>
        </aside>
      </Section>

      <Section tone="ledger" labelledBy="where-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="where-title" className="text-3xl">
              Where Shoirly runs
            </h2>
            <p className="mt-4 max-w-[42ch] text-lg text-graphite">
              Shoirly is designed to run where your agent runs: in your cloud, or in your customer&apos;s. Raw data stays there.
            </p>
            <p className="mt-6 text-xl font-semibold">Your data never leaves. Only the proof does.</p>
            {/* TODO(team): list the supported deployment targets (clouds, regions, Kubernetes, etc.). */}
            <p className="mt-4 text-sm text-graphite">
              This is the deployment design, not a claim of live deployments. Supported clouds and regions are
              still to be confirmed.
            </p>
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
                <ArrowUpRight size={18} aria-hidden className="text-seal" /> Only proof leaves
              </h3>
              <ul className="mt-4 space-y-3">
                {leaves.map((l) => (
                  <li key={l} className="border-t border-rule pt-3 font-mono text-sm first:border-t-0 first:pt-0">
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-graphite">
                Proof for integrity and coverage checks, not the contents of your action records.
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
                Certification status and any audit timeline are awaiting confirmation. We make no SOC 2 or
                ISO 27001 certification claim here.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Our hosted service</dt>
              <dd className="text-graphite">
                {/* TODO(team): add hosting provider, regions and subprocessors for the service that receives proofs. */}
                Hosting details for the service receiving proofs, including provider, regions and subprocessors,
                are not yet published.
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold">Reporting an issue</dt>
              <dd className="text-graphite">
                {/* TODO(team): confirm the security contact, disclosure policy and response target. */}
                Found a security problem? Email{" "}
                <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent("Security report")}`}>
                  {site.email}
                </a>{" "}
                with &ldquo;Security report&rdquo; in the subject. A dedicated disclosure policy and response
                target are not yet published. Please do not include sensitive data in your initial email.
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
          {/* TODO(team): confirm hardware isolation design, qualified timestamp provider and integration scope. */}
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
