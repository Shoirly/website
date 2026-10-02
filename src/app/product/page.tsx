import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { ConnectVisual, CoverageVisual, ShareVisual, SignVisual } from "@/components/home/StepVisuals";
import { PipelineDiagram, type Stage } from "@/components/product/PipelineDiagram";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = pageMetadata({
  title: "Product: how Shoirly works",
  description:
    "Capture each agent action, sign it with who authorised it, check coverage, and share a per-customer evidence pack mapped to DORA.",
  path: "/product",
});

const stages: Stage[] = [
  {
    key: "capture",
    name: "Capture",
    short: "Record every action",
    detail: (
      <>
        <p>
          Connect Shoirly to your agent and it records each action the agent takes on behalf of a bank&apos;s
          customer: what was attempted, for which customer, and when.
        </p>
        <p>Your agent keeps making its own decisions. Shoirly adds the record; it doesn&apos;t change the behaviour.</p>
        {/* TODO(team): describe the integration method (SDK languages, proxy, supported frameworks) once fixed. */}
      </>
    ),
    visual: <ConnectVisual />,
  },
  {
    key: "sign",
    name: "Sign",
    short: "Link to who authorised it",
    detail: (
      <>
        <p>
          Each record names what allowed the action: a named person who approved it, or the exact version of the
          policy that permitted it. Then it&apos;s signed.
        </p>
        <p>
          Records are chained, each one referencing the one before it, so a deleted or edited record breaks the chain
          and shows.
        </p>
      </>
    ),
    visual: <SignVisual />,
  },
  {
    key: "coverage",
    name: "Coverage check",
    short: "Show whether anything is missing",
    detail: (
      <>
        <p>
          A log can only show what it caught. The coverage check compares what your agent attempted with what was
          signed, so a missing record is a visible gap rather than a silent one.
        </p>
        <p>You see a gap first, with time to fix it before any bank does.</p>
      </>
    ),
    visual: <CoverageVisual />,
  },
  {
    key: "pack",
    name: "Evidence pack",
    short: "Share per customer",
    detail: (
      <>
        <p>
          For each bank, Shoirly compiles a pack covering only that bank&apos;s customers, for the period it asks
          about, organised by the DORA areas its risk team reports against.
        </p>
        <p>
          Share it through Vanta or your trust centre, or send it directly. Once our verification guide is published,
          the bank will be able to check the signatures itself.
        </p>
      </>
    ),
    visual: <ShareVisual />,
  },
];

const recordFields = [
  ["Action", "What the agent did, in plain words, with the inputs that matter."],
  ["Customer", "Which of the bank's customers it was for. Packs are split on this."],
  ["Authorised by", "The person who approved it, or the policy and version that allowed it."],
  ["Time", "When it happened, in UTC."],
  ["Signature", "Proof the record hasn't changed since it was written."],
  ["Previous record", "A link to the record before it, so gaps and edits show."],
];

const notThis = [
  {
    title: "Not a compliance platform",
    body: "Keep Vanta or your existing tool for policies, certifications and questionnaires. Shoirly adds evidence of what actually happened.",
  },
  {
    title: "Not a gateway or observability tool",
    body: "Logs tell you calls happened. Shoirly ties each action to its authorisation and shows whether anything went unrecorded.",
  },
  {
    title: "Not a guardrail",
    body: "Guardrail tools block actions. Shoirly doesn't approve or block anything. It proves what was allowed, by whom, and what happened.",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="Evidence of every action, from capture to the bank's desk"
        lead="Four stages turn what your agent does into a pack a risk team at a bank, insurer or payment firm can read."
      />

      <Section labelledBy="pipeline-title">
        <h2 id="pipeline-title" className="sr-only">
          The four stages
        </h2>
        <PipelineDiagram stages={stages} />
      </Section>

      <Section tone="ledger" labelledBy="record-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="record-title" className="text-3xl">
              What&apos;s in a record
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-graphite">
              Every action becomes one record with the same six fields, so a bank reads them the same way every time.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {recordFields.map(([k, v]) => (
              <div key={k} className="border-t border-ink pt-4">
                <dt className="font-semibold">{k}</dt>
                <dd className="mt-1.5 text-graphite">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section labelledBy="scope-title">
        <h2 id="scope-title" className="max-w-[22ch] text-3xl">
          Where Shoirly fits, and where it doesn&apos;t
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rule">
          {notThis.map((n, i) => (
            <div key={n.title} className={i === 0 ? "md:pr-8" : i === 1 ? "md:px-8" : "md:pl-8"}>
              <h3 className="text-xl">{n.title}</h3>
              <p className="mt-3 text-graphite">{n.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-graphite">
          Selling into EU banks?{" "}
          <Link href="/dora" className="link">
            Read our plain-English guide to DORA
          </Link>
          .
        </p>
      </Section>

      <ClosingCta />
    </>
  );
}
