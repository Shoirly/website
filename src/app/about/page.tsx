import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = pageMetadata(pageSeo["/about"]);

// TODO(team): real names, roles, one-line backgrounds and photos for all four founders.
const team = [
  { name: "Founder name", role: "Role", bio: "One line on background and what they own at Shoirly." },
  { name: "Founder name", role: "Role", bio: "One line on background and what they own at Shoirly." },
  { name: "Founder name", role: "Role", bio: "One line on background and what they own at Shoirly." },
  { name: "Founder name", role: "Role", bio: "One line on background and what they own at Shoirly." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Agents should earn trust the way people do: by showing their work"
        lead="Shoirly exists so that regulated businesses can let AI agents do more, because they can see exactly what those agents did and who allowed it."
      />

      <Section labelledBy="why-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="why-title" className="text-3xl">
            Why we&apos;re building this
          </h2>
          <div className="space-y-5 text-lg text-graphite">
            <p>
              AI agents are starting to act inside regulated businesses, for example refunding, reviewing and updating
              accounts at banks. Those buyers are willing to give agents more autonomy, but only inside defined limits,
              and only with proof the limits held.
            </p>
            <p>
              Today that proof is thin. Certificates show a vendor has controls. Questionnaires record what a vendor
              says. Neither shows what the agent did on a given day, for a given customer. So security reviews drag on,
              and good products wait.
            </p>
            <p className="text-ink">
              We think the fix is simple to describe: sign every action, link it to who authorised it, show whether
              anything is missing, and hand the buyer evidence it can check for itself.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ledger" labelledBy="team-title">
        <h2 id="team-title" className="text-3xl">
          The team
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-graphite">Four founders, based in Dublin.</p>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <li key={i}>
              <div
                className="flex aspect-[4/5] items-end rounded-md border border-dashed border-rule-strong/70 bg-paper p-4"
                role="img"
                aria-label="Photo to come"
              >
                <span className="font-mono text-xs text-graphite">Photo to come</span>
              </div>
              <p className="mt-4 font-semibold">{p.name}</p>
              <p className="text-sm text-seal-deep">{p.role}</p>
              <p className="mt-2 text-sm text-graphite">{p.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="where-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="where-title" className="text-3xl">
            Made in Dublin
          </h2>
          <div className="space-y-5 text-lg text-graphite">
            <p>
              Dublin sits close to the regulated businesses we&apos;re starting with, banks, insurers and payment firms,
              and to the EU supervisors whose rules shape what they need.
            </p>
            <p>
              In October 2026 we&apos;re taking part in Baseline&apos;s Pressure Cooker during Dublin AI Week. If
              you&apos;re there, come and find us.
            </p>
          </div>
        </div>
      </Section>

      <ClosingCta title="Talk to the people building it." />
    </>
  );
}
