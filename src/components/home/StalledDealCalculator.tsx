import { StalledDealCalculator as Calculator } from "@/components/calculator/StalledDealCalculator";
import { Section } from "@/components/ui/Layout";

export function StalledDealCalculator() {
  return (
    <Section tone="ledger" labelledBy="calc-title">
      <h2 id="calc-title" className="max-w-[22ch] text-3xl">
        What a stalled deal costs you
      </h2>
      <p className="mt-4 max-w-[52ch] text-lg text-sh-muted">
        Put in your own numbers to see what time in security review is worth to you.
      </p>
      <div className="mt-10">
        <Calculator />
      </div>
    </Section>
  );
}
