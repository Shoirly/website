"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useRef } from "react";
import { Section } from "@/components/ui/Layout";

// What travels along each link, in order.
const flows = ["Actions", "Signed packs", "Shared evidence"];

const nodes = [
  { name: "Your agent", detail: "Acts for your bank customers" },
  { name: "Shoirly", detail: "Records, signs, checks coverage", accent: true },
  { name: "Vanta or your trust centre", detail: "Where buyers already look" },
  { name: "The bank's risk team", detail: "Reviews and verifies" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TrustCentre() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const drawn = reduce || inView;

  return (
    <Section labelledBy="trust-title" className="border-t border-rule">
      <h2 id="trust-title" className="max-w-[24ch] text-3xl">
        Vanta proves you have controls. We prove they held.
      </h2>
      <p className="mt-4 max-w-[56ch] text-lg text-graphite">
        Shoirly plugs into Vanta and the trust centre you already use. It adds the evidence they can&apos;t produce
        on their own, and it doesn&apos;t replace them.
      </p>
      {/* TODO(team): confirm which trust-centre products we integrate with today and name them here. */}

      <ol
        ref={ref}
        className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch"
        aria-label="Where the evidence goes"
      >
        {nodes.map((n, i) => (
          <Fragment key={n.name}>
            {i > 0 ? (
              <li className="flex h-12 items-center gap-3 pl-5 md:h-auto md:w-32 md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:px-2 md:pl-2">
                <motion.span
                  aria-hidden
                  className="block h-full w-px origin-top bg-seal md:order-2 md:h-px md:w-full md:origin-left"
                  initial={false}
                  animate={{ scale: drawn ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.15 + i * 0.22, ease }}
                />
                <motion.span
                  className="whitespace-nowrap font-mono text-[11px] text-graphite md:order-1 md:text-center"
                  initial={false}
                  animate={{ opacity: drawn ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.35 + i * 0.22 }}
                >
                  {flows[i - 1]}
                </motion.span>
              </li>
            ) : null}
            <motion.li
              className={`rounded-md border px-4 py-4 ${
                n.accent ? "border-seal bg-seal-wash/60" : "border-rule bg-paper"
              }`}
              initial={false}
              animate={{ opacity: drawn ? 1 : 0.35 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.22, ease }}
            >
              <p className={`font-semibold ${n.accent ? "text-seal-deep" : ""}`}>{n.name}</p>
              <p className="mt-1 text-sm text-graphite">{n.detail}</p>
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </Section>
  );
}
