import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { CopyBlock } from "@/components/ui/CopyBlock";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "For banks: evidence of what your vendor's AI agent did",
  description:
    "What a bank's risk, procurement and third-party oversight teams receive from vendors using Shoirly, how to verify it, and how to ask for it.",
  alternates: { canonical: "/solutions/banks" },
};

const receive = [
  {
    title: "A record of every action, for your customers only",
    body: "What the agent did, when, and for which customer. Packs are scoped to your institution, so you never see another bank's data.",
  },
  {
    title: "Who or what authorised it",
    body: "A named approver or the specific policy version that allowed the action, captured when it happened rather than reconstructed later.",
  },
  {
    title: "A coverage check",
    body: "The number of actions the agent attempted against the number of signed records. A gap means something went unrecorded, and you can see it.",
  },
  {
    title: "A DORA mapping",
    body: "Evidence organised by the areas your team already works in: ICT third-party risk, ICT risk management and incident management.",
  },
];

const checks = [
  ["Signatures", "Each record is signed. A changed record no longer matches its signature."],
  ["Chain", "Each record references the one before it. A deleted record leaves a visible break."],
  ["Coverage", "Attempted actions are counted against signed records, so completeness is checked rather than assumed."],
];

const template = `Subject: Evidence of agent actions for our customers

Hello,

As part of our ICT third-party oversight under DORA, we'd like
evidence of the actions your AI agent takes for our customers.

For the period [start date] to [end date], please provide:

1. A record of each action the agent took for our customers
2. Who or what authorised each action (person or policy version)
3. A coverage check showing no actions went unrecorded
4. A way for us to verify the records independently

A per-customer evidence pack (for example from Shoirly) would meet
this request.

Thank you,
[Name], [Role]`;

export default function BanksPage() {
  return (
    <>
      <PageHeader
        title="See what your vendor's AI agent did, and check it yourself"
        lead="For risk, procurement and third-party oversight teams. When a vendor uses Shoirly, you get signed, per-customer evidence instead of reassurance."
      />

      <Section labelledBy="receive-title">
        <h2 id="receive-title" className="max-w-[22ch] text-3xl">
          What your team receives
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {receive.map((r) => (
            <div key={r.title} className="border-t border-ink pt-5">
              <h3 className="text-xl">{r.title}</h3>
              <p className="mt-2 text-graphite">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-graphite">
          <Link href="/#evidence-title" className="link">
            See a sample evidence pack
          </Link>
        </p>
      </Section>

      <Section tone="ledger" labelledBy="verify-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="verify-title" className="text-3xl">
              How you verify it
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-graphite">
              The point is that you don&apos;t have to take the vendor&apos;s word, or ours.
            </p>
            {/* TODO(team): link to verification docs or a verifier tool once it exists. */}
          </div>
          <dl className="divide-y divide-rule border-y border-rule">
            {checks.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-graphite">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section labelledBy="request-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="request-title" className="text-3xl">
              How to ask a vendor for it
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-graphite">
              Use this wording in a due diligence request, a contract schedule or a periodic review. Edit it to suit
              your process.
            </p>
            <p className="mt-6 text-graphite">
              New to DORA&apos;s third-party rules?{" "}
              <Link href="/dora" className="link">
                Read our plain-English guide
              </Link>
              .
            </p>
          </div>
          <CopyBlock label="Evidence request template" text={template} />
        </div>
      </Section>

      <ClosingCta
        title="Want your vendors to send you this?"
        body="We'll show your team a sample pack and how verification works, so you know what to ask for."
      />
    </>
  );
}
