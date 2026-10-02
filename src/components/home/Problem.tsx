import { Section } from "@/components/ui/Layout";

const today = [
  {
    what: "Certificates",
    example: "SOC 2, ISO 27001",
    shows: "You have controls, as of the audit period.",
    misses: "Whether they held for this bank's customers last Tuesday.",
  },
  {
    what: "Questionnaires",
    example: "Vendor due diligence, DDQs",
    shows: "What you say your system does.",
    misses: "What it actually did, action by action.",
  },
  {
    what: "Gateway and app logs",
    example: "API logs, traces",
    shows: "That calls happened.",
    misses: "Who authorised them, and whether any went unrecorded.",
  },
];

export function Problem() {
  return (
    <Section tone="ledger" labelledBy="problem-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="problem-title" className="max-w-[24ch] text-2xl lg:text-[2.5rem] lg:leading-[1.1]">
            Banks want to let your agent do more. Their risk team needs proof it stayed inside the lines.
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-graphite">
            A certificate says you have controls. It doesn&apos;t show what happened on Tuesday. So the security
            review stalls, and your deal waits with it.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-graphite">What a bank&apos;s risk team gets today</p>
          <dl className="mt-4 border-t border-ink">
            {today.map((row) => (
              <div
                key={row.what}
                className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-rule py-6 sm:grid-cols-[minmax(0,10rem)_1fr]"
              >
                <dt>
                  <span className="block font-semibold">{row.what}</span>
                  <span className="mt-0.5 block font-mono text-xs text-graphite">{row.example}</span>
                </dt>
                <dd className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-6">
                  <p>
                    <span className="block text-xs text-graphite">Shows</span>
                    {row.shows}
                  </p>
                  <p>
                    <span className="block text-xs text-graphite">Misses</span>
                    {row.misses}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
