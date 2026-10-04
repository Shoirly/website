import { Section } from "@/components/ui/Layout";

const steps = [
  {
    title: "Connect your agent",
    body: "Your agent calls its tools through the Shoirly proxy, which records each action it takes for a customer. Your agent's logic stays as it is.",
  },
  {
    title: "Every action is signed and linked to who authorised it",
    body: "Each record names the person or the policy version that allowed the action, gets a signature, and is chained to the record before it, so edits show.",
  },
  {
    title: "A coverage check shows whether anything went unrecorded",
    body: "Shoirly counts what your agent attempted against what it signed. If anything slipped through, the gap is visible, to you first.",
  },
  {
    title: "Share a per-customer evidence pack, mapped to their controls",
    body: "Each customer gets a pack about its own accounts, organised by the controls its risk team checks. Share it through Vanta or your trust centre.",
  },
];

/** A real four-step sequence, drawn as the audit-trail motif (BRAND.md 7.4): square nodes, the latest filled. */
export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="how-title" className="text-3xl">
            How it works
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-sh-muted">
            Follow one action, a €240 refund, from your agent&apos;s tool call to a pack your customer&apos;s risk team
            can read.
          </p>
        </div>
        <ol className="ml-1 border-l border-sh-border-strong lg:col-span-7">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[4.5px] top-1 size-2 border border-sh-accent ${
                  i === steps.length - 1 ? "bg-sh-accent" : "bg-sh-bg"
                }`}
              />
              <p className="font-mono text-xs text-sh-muted">0{i + 1}</p>
              <h3 className="mt-1 max-w-[34ch] text-xl">{s.title}</h3>
              <p className="mt-2 max-w-[56ch] text-sh-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
