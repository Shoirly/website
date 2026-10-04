import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import Link from "next/link";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Faq, FaqJsonLd, type FaqItem } from "@/components/ui/Faq";
import { Container, PageHeader, Section } from "@/components/ui/Layout";
import { site } from "@/config/site";
import styles from "@/components/dora-about/ResponsivePage.module.css";

/*
 * TODO(team): have this page reviewed by someone with DORA expertise before
 * launch. It is written to be accurate at a plain-English level and avoids
 * claiming that Shoirly makes anyone "DORA compliant".
 */

export const metadata: Metadata = pageMetadata(pageSeo["/dora"]);

const pillars = [
  {
    name: "ICT risk management",
    ref: "Chapter II",
    body: "Banks need a framework to identify, protect against, detect and recover from technology risk, and to keep it under review.",
  },
  {
    name: "Incident management and reporting",
    ref: "Chapter III",
    body: "They must log and classify ICT-related incidents, and report major ones to their supervisor within set timeframes.",
  },
  {
    name: "Resilience testing",
    ref: "Chapter IV",
    body: "They must test their systems regularly. Some larger firms must also run threat-led penetration tests.",
  },
  {
    name: "ICT third-party risk",
    ref: "Chapter V",
    body: "They stay responsible for risk that comes from their technology suppliers, which includes you. This is the pillar vendors feel most.",
  },
  {
    name: "Information sharing",
    ref: "Chapter VI",
    body: "Firms may share cyber threat information with each other in trusted arrangements.",
  },
];

const asks = [
  {
    title: "A place in their register",
    body: "Banks must keep a register of information on every contract with an ICT third-party provider (Art. 28). Expect detailed questions about what you do, where, and for which of their functions.",
  },
  {
    title: "Contract terms you'll recognise",
    body: "DORA lists what these contracts must include (Art. 30): service descriptions, data locations, incident support, cooperation with supervisors and termination rights. Where you support a critical or important function, add audit, access and inspection rights, plus exit plans.",
  },
  {
    title: "Ongoing monitoring, not a one-off check",
    body: "Third-party risk is managed across the life of the contract. A bank needs to keep showing its supervisor that your service is under control.",
  },
  {
    title: "Proof that controls held",
    body: "With AI agents acting for customers, risk teams want to know what the agent actually did and who allowed it. Policies and certificates describe intent. Records show outcomes.",
  },
];

const mapping = [
  {
    area: "ICT third-party risk",
    ref: "Art. 28-30",
    need: "Monitor the provider's performance and keep access, inspection and audit rights in practice.",
    evidence: "Per-customer records of what the provider's agent did for the bank, delivered on a schedule.",
  },
  {
    area: "ICT risk management",
    ref: "Art. 5-16",
    need: "Know what systems do, control access and changes, and keep reliable logs.",
    evidence: "Each action tied to who or what authorised it, in signed, chained records.",
  },
  {
    area: "Incident management",
    ref: "Art. 17-23",
    need: "Reconstruct what happened during an incident and report it accurately.",
    evidence: "A signed timeline of agent actions, with a coverage check showing whether anything is missing.",
  },
];

const faq: FaqItem[] = [
  {
    q: "When did DORA start to apply?",
    a: <p>DORA (Regulation (EU) 2022/2554) has applied since 17 January 2025.</p>,
    plain: "DORA, Regulation (EU) 2022/2554, has applied since 17 January 2025.",
  },
  {
    q: "Does DORA apply directly to my startup?",
    a: (
      <p>
        Mostly through your customers. DORA places obligations on financial entities, and they pass requirements to
        you through due diligence and contracts. A small number of providers designated as critical are overseen
        directly by EU supervisors, which is unlikely to include an early-stage startup.
      </p>
    ),
    plain:
      "Mostly through your customers. DORA places obligations on financial entities, which pass requirements to suppliers through due diligence and contracts. Only providers designated as critical are overseen directly by EU supervisors.",
  },
  {
    q: "Is an AI agent an ICT service under DORA?",
    a: (
      <p>
        DORA defines ICT services broadly, covering digital and data services provided through ICT systems on an
        ongoing basis. An AI agent that acts in a bank&apos;s processes will usually be treated as one. Ask your
        customer how they classify you, especially whether you support a critical or important function.
      </p>
    ),
    plain:
      "DORA defines ICT services broadly, so an AI agent acting in a bank's processes will usually be treated as one. Ask your customer how they classify you.",
  },
  {
    q: "Does using Shoirly make us or our customers DORA compliant?",
    a: (
      <p>
        No single tool does that. DORA compliance belongs to the bank and covers far more than one supplier. Shoirly
        gives the bank evidence about your agent that supports its third-party oversight, risk management and incident
        work.
      </p>
    ),
    plain:
      "No single tool does that. Compliance belongs to the bank. Shoirly gives the bank evidence about your agent that supports its third-party oversight, risk management and incident work.",
  },
  {
    q: "What about UK banks?",
    a: (
      <p>
        DORA is EU law. UK firms follow the UK&apos;s own operational resilience and outsourcing rules, which ask
        similar questions about suppliers. The same evidence helps; the mapping is different.
      </p>
    ),
    plain:
      "DORA is EU law. UK firms follow the UK's own operational resilience and outsourcing rules, which ask similar questions about suppliers.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DORA explained for AI agent vendors selling to banks",
  description: metadata.description,
  author: { "@type": "Organization", name: site.name, url: site.url },
  publisher: { "@type": "Organization", name: site.name, url: site.url },
  mainEntityOfPage: `${site.url}/dora`,
  dateModified: "2026-10-02",
};

export default function DoraPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PageHeader
        title="DORA, explained for AI agent vendors"
        lead="The EU's Digital Operational Resilience Act changes what banks must know about their technology suppliers. Here's what it asks, what it means when you sell an AI agent to a bank, and what evidence helps."
      >
        <p className="text-sm text-graphite">Plain-English guide. Not legal advice.</p>
      </PageHeader>

      <Section labelledBy="what-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="what-title" className="text-3xl">
              What DORA is
            </h2>
          </div>
          <div className="space-y-5 text-lg text-graphite">
            <p>
              DORA, formally Regulation (EU) 2022/2554, sets one set of rules for how financial firms in the EU manage
              technology risk. It has applied since <strong className="font-semibold text-ink">17 January 2025</strong>.
            </p>
            <p>
              It covers about twenty kinds of financial entity, including banks, insurers, payment and e-money
              institutions, investment firms and crypto-asset service providers. If you sell to them, their DORA
              obligations become your sales process.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ledger" labelledBy="pillars-title">
        <h2 id="pillars-title" className="max-w-[22ch] text-3xl">
          The five areas DORA covers
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <li
              key={p.name}
              className={`bg-paper p-6 ${i === 3 ? "ring-2 ring-inset ring-seal" : ""} ${i === 4 ? "sm:col-span-2" : ""}`}
            >
              <p className="font-mono text-xs text-graphite">{p.ref}</p>
              <h3 className="mt-2 text-xl">{p.name}</h3>
              <p className="mt-2 text-graphite">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="asks-title">
        <h2 id="asks-title" className="max-w-[26ch] text-3xl">
          What banks will ask of you as an AI agent vendor
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {asks.map((a) => (
            <div key={a.title} className="border-t border-ink pt-5">
              <h3 className="text-xl">{a.title}</h3>
              <p className="mt-2 text-graphite">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section aria-labelledby="map-title" className="bg-ledger py-16 md:py-24">
        <Container>
          <h2 id="map-title" className="max-w-[24ch] text-3xl">
            How Shoirly evidence maps to DORA
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg text-graphite">
            Shoirly supports the bank&apos;s obligations. It doesn&apos;t discharge them. The mapping below is
            indicative.
          </p>
          <ul className="mt-10 space-y-4 md:hidden">
            {mapping.map((m) => (
              <li key={m.area} className="rounded-md border border-rule bg-paper p-5">
                <h3>{m.area}</h3>
                <p className="mt-1 font-mono text-xs text-graphite">{m.ref}</p>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="font-semibold">What the bank needs</dt>
                    <dd className="mt-1 text-graphite">{m.need}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Shoirly evidence</dt>
                    <dd className="mt-1">{m.evidence}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mt-10 hidden rounded-md border border-rule bg-paper md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <caption className="sr-only">DORA areas, what banks need, and the Shoirly evidence that supports it</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    DORA area
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    What the bank needs
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Shoirly evidence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {mapping.map((m) => (
                  <tr key={m.area} className="align-top">
                    <th scope="row" className="px-5 py-4 font-medium">
                      {m.area}
                      <span className="mt-0.5 block font-mono text-xs font-normal text-graphite">{m.ref}</span>
                    </th>
                    <td className="px-5 py-4 text-graphite">{m.need}</td>
                    <td className="px-5 py-4">{m.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-graphite">
            Want to see it as a bank would?
          </p>
          <Link href="/solutions/banks" className="link inline-flex min-h-11 items-center py-2">
            What a risk team receives
          </Link>
        </Container>
      </section>

      <Section labelledBy="faq-title">
        <h2 id="faq-title" className="text-3xl">
          Common questions
        </h2>
        <div className="mt-10">
          <Faq items={faq} />
        </div>
        <FaqJsonLd items={faq} />
      </Section>

      <ClosingCta
        title="Make DORA questions easier to answer."
        body="We'll show you how per-customer evidence fits into a bank's third-party review."
      />
    </div>
  );
}
