import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { StalledDealCalculator } from "@/components/calculator/StalledDealCalculator";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { StallStages } from "@/components/solutions/StallStages";
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
    answer: "Offer per-customer evidence packs on a schedule, a concrete way to meet your buyer's audit and access rights, for example under DORA.",
  },
  {
    stage: "Ongoing oversight",
    asks: "How do we keep monitoring you?",
    answer: "Share each period's pack through Vanta or your trust centre. Their third-party risk team reviews it without a new questionnaire.",
  },
];

const faq: FaqItem[] = [
  {
    q: "We already have SOC 2. Why would a regulated buyer need more?",
    a: (
      <p>
        SOC 2 tells a buyer you have sensible controls over a past audit period. It helps you get shortlisted. It
        doesn&apos;t show what your agent did for that buyer&apos;s customers last week, which is the question a risk
        team asks before it lets an agent act with more autonomy.
      </p>
    ),
    plain:
      "SOC 2 shows you have sensible controls over a past audit period. It doesn't show what your agent did for a buyer's customers last week, which is what a risk team asks before giving an agent more autonomy.",
  },
  {
    q: "We already log everything. Why isn't that enough?",
    a: (
      <p>
        Because your buyer has to take your word that the logs are complete and unchanged. Shoirly signs and chains each
        record, and a coverage check shows whether anything went unrecorded, so your logs become evidence someone else
        can rely on.
      </p>
    ),
    plain:
      "Because your buyer has to take your word that the logs are complete and unchanged. Shoirly signs and chains each record, and a coverage check shows whether anything went unrecorded.",
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
    q: "Is this only for financial services?",
    a: (
      <p>
        No. Every regulated buyer asks the same practical question: what did your system do, and who allowed it? The
        evidence is the same; only the mapping changes. DORA, for EU financial services, is where we&apos;re starting.
        {/* TODO(team): confirm which other frameworks and regions (e.g. UK operational resilience) we map to next. */}
      </p>
    ),
    plain:
      "No. Every regulated buyer asks the same practical question: what did your system do, and who allowed it? The evidence is the same; only the mapping changes. DORA, for EU financial services, is where we're starting.",
  },
];

export default function AgentVendorsPage() {
  return (
    <>
      <PageHeader
        title="Get through security review without the stall"
        lead="Regulated buyers want what your agent does. Their risk teams need proof it stayed inside the lines. Shoirly gives you that proof, per customer, before they ask."
      >
        <ButtonLink href="/demo" size="lg">
          Book a demo
        </ButtonLink>
        <p className="mt-5 text-sm text-sh-muted">We&apos;re early and taking on design partners.</p>
      </PageHeader>

      <Section labelledBy="where-title">
        <h2 id="where-title" className="max-w-[24ch] text-3xl">
          Where deals stall, and what you can show instead
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-sh-muted">
          The questions change as a deal moves through your buyer&apos;s review. The answer doesn&apos;t have to.
        </p>
        <StallStages stages={stages} />
      </Section>

      <Section tone="ledger" labelledBy="get-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="get-title" className="text-3xl">
              What you get
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg text-sh-muted">
              One integration with your agent. After that, evidence builds up on its own, and every customer gets its own
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
              ["Per-customer evidence packs", "Each customer sees its own records only, mapped to the controls it reports against."],
              ["Ready to share", "Packs you can share through Vanta or your trust centre, next to your certifications."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-sh-border pt-5">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sh-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="cost-title">
        <h2 id="cost-title" className="max-w-[24ch] text-3xl">
          What the wait costs you
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-sh-muted">
          Your numbers, your estimate. Move the sliders to see what time in security review is worth.
        </p>
        <div className="mt-10">
          <StalledDealCalculator variant="compact" />
        </div>
      </Section>

      <Section tone="ledger" labelledBy="faq-title">
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
