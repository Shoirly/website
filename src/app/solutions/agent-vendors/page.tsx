import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { ButtonLink } from "@/components/ui/Button";
import { Faq, FaqJsonLd, type FaqItem } from "@/components/ui/Faq";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "For AI agent vendors: close bank deals faster",
  description:
    "Bank security reviews stall on one question: what did your agent actually do? Answer it with signed, per-customer evidence mapped to DORA.",
  alternates: { canonical: "/solutions/agent-vendors" },
};

const stages = [
  {
    stage: "Security questionnaire",
    asks: "How do you control what the agent can do?",
    answer: "Point to signed records showing each action and what authorised it, not only a policy document.",
  },
  {
    stage: "Vendor due diligence",
    asks: "Can you show us it works in practice?",
    answer: "Share a sample evidence pack for a pilot, with a coverage check showing nothing went unrecorded.",
  },
  {
    stage: "Contract",
    asks: "What audit and information rights do we get?",
    answer: "Offer per-customer evidence packs on a schedule, a concrete way to meet the bank's DORA access and audit expectations.",
  },
  {
    stage: "Ongoing oversight",
    asks: "How do we keep monitoring you?",
    answer: "Each period's pack lands in your trust centre. Their third-party risk team reviews it without a new questionnaire.",
  },
];

const faq: FaqItem[] = [
  {
    q: "We already have SOC 2. Why would a bank need more?",
    a: (
      <p>
        SOC 2 tells a bank you have sensible controls over a past audit period. It helps you get shortlisted. It
        doesn&apos;t show what your agent did for that bank&apos;s customers last week, which is the question a risk
        team asks before it lets an agent act with more autonomy.
      </p>
    ),
    plain:
      "SOC 2 shows you have sensible controls over a past audit period. It doesn't show what your agent did for a bank's customers last week, which is what a risk team asks before giving an agent more autonomy.",
  },
  {
    q: "Does Shoirly change how our agent behaves?",
    a: <p>No. It records what the agent does and what authorised it. Decisions stay with your agent and your policies.</p>,
    plain: "No. It records what the agent does and what authorised it. Decisions stay with your agent and your policies.",
  },
  {
    q: "Do we have to replace Vanta or our trust centre?",
    a: (
      <p>
        No. Shoirly plugs into Vanta and the trust centre you already use, and adds evidence they can&apos;t produce on
        their own.
      </p>
    ),
    plain: "No. Shoirly plugs into Vanta and the trust centre you already use, and adds evidence they can't produce on their own.",
  },
  {
    q: "Our customers are in the UK, not the EU. Is this still useful?",
    a: (
      <p>
        Yes. DORA is EU law, but UK banks work under their own operational resilience and outsourcing rules and ask the
        same practical question: what did your system do, and who allowed it? The evidence is the same; the mapping
        changes. {/* TODO(team): confirm whether we offer a UK-specific mapping. */}
      </p>
    ),
    plain:
      "Yes. UK banks work under their own operational resilience and outsourcing rules and ask the same practical question. The evidence is the same; the mapping changes.",
  },
];

export default function AgentVendorsPage() {
  return (
    <>
      <PageHeader
        title="Get through bank security review without the stall"
        lead="Banks want what your agent does. Their risk teams need proof it stayed inside the lines. Shoirly gives you that proof, per customer, before they ask."
      >
        <ButtonLink href="/demo" size="lg">
          Book a demo
        </ButtonLink>
      </PageHeader>

      <Section labelledBy="where-title">
        <h2 id="where-title" className="max-w-[24ch] text-3xl">
          Where deals stall, and what you can show instead
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-graphite">
          The questions change as a deal moves through a bank. The answer doesn&apos;t have to.
        </p>
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-2">
          {stages.map((s, i) => (
            <li key={s.stage} className="bg-paper p-6 sm:p-8">
              <p className="font-mono text-xs text-graphite">
                {String(i + 1).padStart(2, "0")} {s.stage}
              </p>
              <p className="mt-4 text-xl font-semibold">&ldquo;{s.asks}&rdquo;</p>
              <p className="mt-3 text-graphite">{s.answer}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ledger" labelledBy="get-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="get-title" className="text-3xl">
              What you get
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg text-graphite">
              One integration with your agent. After that, evidence builds up on its own, and every bank gets its own
              pack.
            </p>
            <p className="mt-6">
              <Link href="/product" className="link font-medium">
                See how the product works
              </Link>
            </p>
          </div>
          <ul className="space-y-6">
            {[
              ["Signed records of every action", "Linked to the person or policy that authorised it."],
              ["A coverage check", "Proof nothing your agent attempted went unrecorded."],
              ["Per-customer evidence packs", "Each bank sees its own customers only, mapped to DORA."],
              ["A home in your trust centre", "Packs sit next to your certifications, where buyers already look."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-rule pt-5">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-graphite">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <h2 id="faq-title" className="text-3xl">
          Questions vendors ask
        </h2>
        <div className="mt-10">
          <Faq items={faq} />
        </div>
        <FaqJsonLd items={faq} />
      </Section>

      <ClosingCta />
    </>
  );
}
