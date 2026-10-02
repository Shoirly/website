import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { ArchitectureDiagram } from "@/components/product/ArchitectureDiagram";
import { PackCard } from "@/components/product/PackCard";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { SceneCapture, ScenePack, SceneCoverage, SceneSign } from "@/components/story/StoryScenes";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = pageMetadata(pageSeo["/product"]);

const steps: StoryStep[] = [
  {
    title: "Capture every tool call",
    body: "Your agent calls its tools through the Shoirly proxy. Each call is captured as it passes: what was attempted, for which customer, and when. Your agent's decisions stay its own.",
    scene: <SceneCapture />,
  },
  {
    title: "Link it to who authorised it, then sign it",
    body: "Each action is linked to the person who approved it or the policy version that allowed it. The record is signed and chained to the one before, so edits and deletions show.",
    scene: <SceneSign />,
  },
  {
    title: "Check coverage",
    body: "Shoirly counts the calls that passed through the proxy against the signed records, so it shows whether anything went unrecorded. You see a gap first, with time to fix it.",
    scene: <SceneCoverage />,
  },
  {
    title: "Compile a pack per customer",
    body: "For each bank, insurer or payment firm, Shoirly compiles a pack for the period they ask about, organised by DORA area. Share it through Vanta or your trust centre, or send it directly.",
    scene: <ScenePack />,
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

      <ScrollStory
        id="stages"
        heading="Four stages, one record"
        intro="Scroll to follow a single €240 refund through each stage."
        steps={steps}
      />

      <Section tone="ledger" labelledBy="architecture-title">
        <h2 id="architecture-title" className="max-w-[24ch] text-3xl">
          How the pieces fit
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-graphite">
          Shoirly is designed to run where your agent runs. Raw data stays in your environment. Only proof leaves.
        </p>
        <div className="mt-10">
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section labelledBy="pack-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="pack-title" className="text-3xl">
              What a pack contains
            </h2>
            <p className="mt-4 max-w-[42ch] text-lg text-graphite">
              One pack per customer, per period. A risk team sees what was covered, whether every signature verifies,
              whether anything went unrecorded, and which DORA areas it supports.
            </p>
            <p className="mt-6 text-sm text-graphite">The example on this page uses illustrative data.</p>
          </div>
          <PackCard />
        </div>
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
          Selling into EU financial services?{" "}
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
