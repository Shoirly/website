import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { CopyBlock } from "@/components/ui/CopyBlock";
import { EvidenceLedger } from "@/components/ui/EvidenceLedger";
import { VerifyChecks } from "@/components/solutions/VerifyChecks";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = pageMetadata(pageSeo["/solutions/banks"]);

const receive = [
  {
    title: "A record of every action, for your customers only",
    body: "What the agent did, when, and for which customer. Packs are scoped to your institution, so you never see another institution's data.",
  },
  {
    title: "Who or what authorised it",
    body: "A named approver or the specific policy version that allowed the action, captured when it happened rather than reconstructed later.",
  },
  {
    title: "A coverage check",
    body: "The number of actions the agent attempted against the number of signed records. It shows whether anything went unrecorded.",
  },
  {
    title: "A mapping to your controls",
    body: "Evidence organised by the areas your team already reports against, such as third-party oversight, access and incident response.",
  },
];

const checks: [string, string][] = [
  ["Signatures", "Each record is signed. A changed record no longer matches its signature."],
  ["Chain", "Each record references the one before it. A deleted record leaves a visible break."],
  ["Coverage", "Attempted actions are counted against signed records, so completeness is checked rather than assumed."],
];

const template = `Subject: Evidence of agent actions for our customers

Hello,

As part of our third-party oversight, we'd like evidence of the actions your AI agent takes for our customers.

For the period [start date] to [end date], please provide:

1. A record of each action the agent took for our customers
2. Who or what authorised each action (person or policy version)
3. A coverage check showing whether any actions went unrecorded
4. A way for us to verify the records independently

A per-customer evidence pack (for example from Shoirly) would meet this request.

Thank you,
[Name], [Role]`;

// URL kept as /solutions/banks so existing links keep working; the page now serves any regulated buyer's risk team.
export default function BanksPage() {
  return (
    <>
      <PageHeader
        title="See what your vendor's AI agent did for your customers"
        lead="For risk, procurement and third-party oversight teams at regulated businesses, starting with banks, insurers and payment firms. When a vendor uses Shoirly, you get signed, per-customer evidence instead of reassurance."
      />

      <Section labelledBy="today-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="today-title" className="text-3xl">
              What you rely on today
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-sh-muted">
              Each source answers a real question. None of them shows what your vendor&apos;s agent did on a given day,
              for a given customer.
            </p>
          </div>
          <EvidenceLedger label="Evidence your team gets from an AI agent vendor today" />
        </div>
      </Section>

      <Section tone="ledger" labelledBy="receive-title">
        <h2 id="receive-title" className="max-w-[22ch] text-3xl">
          What your team receives
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {receive.map((r) => (
            <div key={r.title} className="border-t border-sh-text pt-5">
              <h3 className="text-xl">{r.title}</h3>
              <p className="mt-2 text-sh-muted">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sh-muted">
          <Link href="/#evidence-title" className="link">
            See a sample evidence pack
          </Link>
        </p>
      </Section>

      <Section labelledBy="verify-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="verify-title" className="text-3xl">
              How verification will work
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-sh-muted">
              Once we publish our verification guide, your team will be able to check signatures and the chain
              independently, without relying on the vendor&apos;s word or ours.
            </p>
            {/* TODO(team): link to verification docs or a verifier tool once it exists. */}
          </div>
          <VerifyChecks checks={checks} />
        </div>
      </Section>

      <Section tone="ledger" labelledBy="request-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="request-title" className="text-3xl">
              How to ask a vendor for it
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-sh-muted">
              Use this wording in a due diligence request, a contract schedule or a periodic review. Edit it to suit
              your process.
            </p>
            <p className="mt-6 text-sh-muted">
              In EU financial services, for example, DORA sets the third-party rules.{" "}
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
