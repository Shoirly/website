import { Fragment } from "react";
import { Section } from "@/components/ui/Layout";

// What travels along each link, in order.
const flows = ["Actions", "Signed packs", "Shared evidence"];

const nodes = [
  { name: "Your agent", detail: "Acts for your customers" },
  { name: "Shoirly", detail: "Records, signs, checks coverage", accent: true },
  { name: "Vanta or your trust centre", detail: "Shared where buyers already look" },
  { name: "Your customer's risk team", detail: "Reviews the evidence" },
];

export function TrustCentre() {
  return (
    <Section labelledBy="trust-title">
      <h2 id="trust-title" className="max-w-[24ch] text-3xl">
        Vanta proves you have controls. We prove they held.
      </h2>
      <p className="mt-4 max-w-[56ch] text-lg text-sh-muted">
        Trust centres and vendor-risk tools run on documents. Shoirly packs are live evidence you can share through
        Vanta or your trust centre. They add to what&apos;s there; they don&apos;t replace it.
      </p>
      {/* Trust-centre integrations are roadmap (see /security). Only say packs can be shared through Vanta or a trust centre. */}

      <ol
        className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch"
        aria-label="Where the evidence goes"
      >
        {nodes.map((n, i) => (
          <Fragment key={n.name}>
            {i > 0 ? (
              <li className="flex h-12 items-center gap-3 pl-5 md:h-auto md:w-32 md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:px-2">
                <span aria-hidden className="block h-full w-px bg-sh-accent md:order-2 md:h-px md:w-full" />
                <span className="whitespace-nowrap font-mono text-micro text-sh-muted md:order-1 md:text-center">
                  {flows[i - 1]}
                </span>
              </li>
            ) : null}
            <li
              className={`rounded-md border p-4 ${
                n.accent ? "border-sh-accent bg-sh-accent-soft" : "border-sh-border bg-sh-surface"
              }`}
            >
              <p className={`flex items-center gap-2 font-semibold ${n.accent ? "text-sh-accent-text" : ""}`}>
                {n.accent ? <span aria-hidden className="square-bullet" /> : null}
                {n.name}
              </p>
              <p className="mt-1 text-sm text-sh-muted">{n.detail}</p>
            </li>
          </Fragment>
        ))}
      </ol>
    </Section>
  );
}
