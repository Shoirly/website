import Link from "next/link";
import { Section } from "@/components/ui/Layout";

const columns = [
  {
    id: "vendors",
    who: "For AI agent vendors",
    title: "Get through security review faster",
    points: [
      "Answer \"what did your agent do?\" with records, not reassurances.",
      "Give each buyer evidence about its own customers, ready before they ask.",
      "Keep your existing certifications and trust centre. This sits on top.",
    ],
    href: "/solutions/agent-vendors",
    link: "How vendors use Shoirly",
  },
  {
    id: "banks",
    who: "For risk teams at regulated buyers",
    title: "Evidence of what happened, not reassurance",
    points: [
      "See each action your vendor's agent took for your customers, and who approved it.",
      "A coverage check shows whether anything went unrecorded.",
      "Organised by the controls you report against, starting with DORA for EU financial services.",
    ],
    href: "/solutions/banks",
    link: "What your risk team receives",
  },
];

export function Audiences() {
  return (
    <Section tone="ledger" labelledBy="audiences-title">
      <h2 id="audiences-title" className="sr-only">
        Who Shoirly is for
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {columns.map((c, i) => (
          <div
            key={c.id}
            className={
              i === 0
                ? "pb-12 md:pb-0 md:pr-12 lg:pr-16"
                : "border-t border-rule pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0 lg:pl-16"
            }
          >
            <p className="text-sm font-medium text-seal-deep">{c.who}</p>
            <h3 className="mt-3 max-w-[20ch] text-2xl">{c.title}</h3>
            <ul className="mt-6 space-y-3">
              {c.points.map((p) => (
                <li key={p} className="grid grid-cols-[1rem_1fr] gap-3 text-graphite">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 bg-rule-strong" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href={c.href} className="link mt-5 inline-flex min-h-11 items-center font-medium">
              {c.link}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
