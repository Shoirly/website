import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { ButtonLink } from "@/components/ui/Button";
import { Faq, FaqJsonLd, type FaqItem } from "@/components/ui/Faq";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = pageMetadata(pageSeo["/solutions/agent-vendors"]);

const stages = [
  {
    stage: "Security questionnaire",
    asks: "How do you control what the agent can do?",
    answer: "Point to signed records showing each action and what authorised it, not only a policy document.",
  },
  {
    stage: "Vendor due diligence",
    asks: "Can you show us it works in practice?",
    answer: "Share a sample evidence pack for a pilot, with a coverage check showing whether anything went unrecorded.",
  },
  {
    stage: "Contract",
    asks: "What audit and information rights do we get?",
    answer: "Offer per-customer evidence packs on a schedule, a concrete way to meet the bank's DORA access and audit expectations.",
  },
  {
    stage: "Ongoing oversight",
    asks: "How do we keep monitoring you?",
    answer: "Share each period's pack through Vanta or your trust centre. Their third-party risk team reviews it without a new questionnaire.",
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
    q: "We already log everything. Why isn't that enough?",
    a: (
      <p>
        Because the bank has to take your word that the logs are complete and unchanged. Shoirly signs and chains each
        record, and a coverage check shows whether anything went unrecorded, so your logs become evidence someone else
        can rely on.
      </p>
    ),
    plain:
      "Because the bank has to take your word that the logs are complete and unchanged. Shoirly signs and chains each record, and a coverage check shows whether anything went unrecorded.",
  },
  {
    q: "We have an AI agent certification such as AIUC-1. Isn't that the same thing?",
    a: (
      <p>
        It&apos;s complementary. A certification shows your agent passed tests at a point in time. Shoirly shows what it
        actually did, for each customer, every day after that.
      </p>
    ),
    plain:
      "It's complementary. A certification shows your agent passed tests at a point in time. Shoirly shows what it actually did, for each customer, every day after that.",
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
        No. Trust centres run on documents. Shoirly packs are live evidence you can share through Vanta or the trust
        centre you already use.
      </p>
    ),
    plain: "No. Trust centres run on documents. Shoirly packs are live evidence you can share through Vanta or the trust centre you already use.",
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
        title="Get through security review without the stall"
        lead="Banks, insurers and payment firms want what your agent does. Their risk teams need proof it stayed inside the lines. Shoirly gives you that proof, per customer, before they ask."
      >
        <ButtonLink href="/demo" size="lg">
          Book a demo
        </ButtonLink>
        <p className="mt-5 text-sm text-graphite">We&apos;re early and taking on design partners.</p>
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
              ["A coverage check", "Shows whether anything your agent attempted went unrecorded."],
              ["Per-customer evidence packs", "Each customer sees its own records only, mapped to DORA."],
              ["Ready to share", "Packs you can share through Vanta or your trust centre, next to your certifications."],
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
