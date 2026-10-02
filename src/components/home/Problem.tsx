import { EvidenceLedger } from "@/components/ui/EvidenceLedger";
import { Section } from "@/components/ui/Layout";

export function Problem() {
  return (
    <Section tone="ledger" labelledBy="problem-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="problem-title" className="max-w-[24ch] text-2xl lg:text-[2.5rem] lg:leading-[1.1]">
            Banks want to let your agent do more. Their risk team needs proof it stayed inside the lines.
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-graphite">
            You already log everything. But a certificate says you have controls, and a log is only as complete as
            you say it is. Neither shows what happened on Tuesday, so the security review stalls, and your deal
            waits with it.
          </p>
        </div>
        <EvidenceLedger label="What a bank's risk team gets today" />
      </div>
    </Section>
  );
}
