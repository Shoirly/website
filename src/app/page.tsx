import type { Metadata } from "next";
import { organisationSchema, pageMetadata, pageSeo } from "@/lib/metadata";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Audiences } from "@/components/home/Audiences";
import { Deployment } from "@/components/home/Deployment";
import { EvidencePreview } from "@/components/home/EvidencePreview";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Problem } from "@/components/home/Problem";
import { SecurityTeaser } from "@/components/home/SecurityTeaser";
import { StalledDealCalculator } from "@/components/home/StalledDealCalculator";
import { TrustCentre } from "@/components/home/TrustCentre";

export const metadata: Metadata = pageMetadata(pageSeo["/"]);

// Section rhythm (BRAND.md 5): white / gray-25 alternate; ink only for the product proof and the closing CTA.
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema).replace(/</g, "\\u003c") }} />
      <Hero />
      <Problem />
      <HowItWorks />
      <EvidencePreview />
      <Deployment />
      <StalledDealCalculator />
      <TrustCentre />
      <Audiences />
      <SecurityTeaser />
      <ClosingCta />
    </>
  );
}
