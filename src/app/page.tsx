import type { Metadata } from "next";
import { organisationSchema, pageMetadata, pageSeo } from "@/lib/metadata";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Audiences } from "@/components/home/Audiences";
import { Deployment } from "@/components/home/Deployment";
import { EvidencePreview } from "@/components/home/EvidencePreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks, type Step } from "@/components/home/HowItWorks";
import { Problem } from "@/components/home/Problem";
import { StalledDealCalculator } from "@/components/home/StalledDealCalculator";
import { ConnectVisual, CoverageVisual, ShareVisual, SignVisual } from "@/components/home/StepVisuals";
import { TrustCentre } from "@/components/home/TrustCentre";

export const metadata: Metadata = pageMetadata(pageSeo["/"]);

const steps: Step[] = [
  {
    title: "Connect your agent",
    body: "Shoirly sits alongside your agent and records each action it takes for a bank customer. Your agent's logic stays as it is.",
    visual: <ConnectVisual />,
  },
  {
    title: "Every action is signed and linked to who authorised it",
    body: "Each record names the person or the policy version that allowed the action, gets a signature, and is chained to the record before it, so edits show.",
    visual: <SignVisual />,
  },
  {
    title: "A coverage check shows whether anything went unrecorded",
    body: "Shoirly counts what your agent attempted against what it signed. If anything slipped through, the gap is visible, to you first.",
    visual: <CoverageVisual />,
  },
  {
    title: "Share a per-customer evidence pack, mapped to DORA",
    body: "Each bank, insurer or payment firm gets a pack about its own customers, organised by DORA area, that you can share through Vanta or your trust centre.",
    visual: <ShareVisual />,
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema).replace(/</g, "\\u003c") }} />
      <Hero />
      <Problem />
      <HowItWorks steps={steps} />
      <EvidencePreview />
      <Deployment />
      <StalledDealCalculator />
      <TrustCentre />
      <Audiences />
      <ClosingCta />
    </>
  );
}
