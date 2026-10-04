import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import { ClosingCta } from "@/components/layout/ClosingCta";
import Image from "next/image";
import { PageHeader, Section } from "@/components/ui/Layout";
import styles from "@/components/dora-about/ResponsivePage.module.css";

export const metadata: Metadata = pageMetadata(pageSeo["/about"]);

type Founder = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/laura-gonzalez.jpg". Shows a placeholder until set. */
  photo?: string;
};

// Photos: public/team/*.jpg, cropped to 4:5 head-and-shoulders, 680x850, metadata stripped.
const team: Founder[] = [
  {
    name: "Liam Maher",
    role: "Co-founder & CEO",
    photo: "/team/liam-maher.jpg",
    bio: "Worked on Bank of America's rates trading technology team and in EY's technology resilience practice, so he's seen first-hand how banks vet the systems they let near their operations. Founded Skillz Camps at 18, now Ireland's largest field hockey academy. Leads strategy, fundraising and product direction.",
  },
  {
    name: "Laura Gonzalez",
    role: "Co-founder & CTO",
    photo: "/team/laura-gonzalez.jpg",
    bio: "Shipped a product at Workday that companies buy to meet a legal reporting requirement, which is the same job Shoirly does for AI agents. Owns the signed evidence platform end to end.",
  },
  {
    name: "Josephine Burke",
    role: "Co-founder & COO",
    photo: "/team/josephine-burke.jpg",
    bio: "Built trading analytics on Scotiabank's support desk and an investigative dashboard for the US Marshals Service under a Public Trust designation. Runs operations and the security and trust programme customers and auditors rely on.",
  },
  {
    name: "Danny Dowling",
    role: "Co-founder & Chief Commercial Officer",
    photo: "/team/danny-dowling.jpg",
    bio: "Built a production agent at Microsoft that fixed security issues with a human approving every change, exactly the kind of workflow Shoirly makes provable. Owns sales, marketing and partnerships with agent vendors.",
  },
];

// Keep incomplete team profiles off the page.
const showTeam = team.every((founder) => founder.bio.trim() && founder.photo);

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        label="about"
        title="Agents should earn trust the way people do: by showing their work"
        lead="Shoirly exists so that regulated businesses can let AI agents do more, because they can see exactly what those agents did and who allowed it."
      />

      <Section labelledBy="why-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="why-title" className="text-3xl">
            Why we&apos;re building this
          </h2>
          <div className="space-y-5 text-lg text-sh-muted">
            <p>
              AI agents are starting to act inside regulated businesses: refunding, reviewing, updating, escalating.
              Those businesses are willing to give agents more autonomy, but only inside defined limits, and only with
              proof the limits held.
            </p>
            <p>
              Today that proof is thin. Certificates show a vendor has controls. Questionnaires record what a vendor
              says. Neither shows what the agent did on a given day, for a given customer. So security reviews drag on,
              and good products wait.
            </p>
            <p className="text-sh-text">
              We think the fix is simple to describe: sign every action, link it to who authorised it, show whether
              anything is missing, and hand the buyer evidence it can check for itself.
            </p>
          </div>
        </div>
      </Section>

      {showTeam && (
      <Section tone="ledger" labelledBy="team-title">
        <h2 id="team-title" className="text-3xl">
          The team
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-sh-muted">Four founders, based in Dublin.</p>
        <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-14">
          {team.map((p) => (
            <li key={p.name} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt={`Portrait of ${p.name}`}
                  width={340}
                  height={425}
                  sizes="(min-width: 640px) 136px, 104px"
                  className="aspect-[4/5] w-full border border-sh-border object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[4/5] items-end border border-dashed border-sh-border-strong bg-sh-bg p-3"
                  role="img"
                  aria-label={`Photo of ${p.name} to come`}
                >
                  <span className="font-mono text-micro text-sh-muted">Photo to come</span>
                </div>
              )}
              <div>
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-sh-accent-text">{p.role}</p>
                <p className="mt-3 text-sh-muted">{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      )}

      <Section labelledBy="where-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="where-title" className="text-3xl">
            Made in Dublin
          </h2>
          <div className="space-y-5 text-lg text-sh-muted">
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
    </div>
  );
}
