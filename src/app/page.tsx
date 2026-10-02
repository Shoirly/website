import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { Audiences } from "@/components/home/Audiences";
import { Deployment } from "@/components/home/Deployment";
import { EvidencePreview } from "@/components/home/EvidencePreview";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { StalledDealCalculator } from "@/components/home/StalledDealCalculator";
import { TrustCentre } from "@/components/home/TrustCentre";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { SceneCapture, ScenePack, SceneCoverage, SceneSign } from "@/components/story/StoryScenes";

export const metadata: Metadata = pageMetadata({
  description: site.description,
  path: "/",
});

const steps: StoryStep[] = [
  {
    title: "Connect your agent",
    body: "Your agent calls its tools through the Shoirly proxy, which records each action it takes for a bank customer. Your agent's logic stays as it is.",
    scene: <SceneCapture />,
  },
  {
    title: "Every action is signed and linked to who authorised it",
    body: "Each record names the person or the policy version that allowed the action, gets a signature, and is chained to the record before it, so edits show.",
    scene: <SceneSign />,
  },
  {
    title: "A coverage check shows whether anything went unrecorded",
    body: "Shoirly counts what your agent attempted against what it signed. If anything slipped through, the gap is visible, to you first.",
    scene: <SceneCoverage />,
  },
  {
    title: "Share a per-customer evidence pack, mapped to DORA",
    body: "Each bank, insurer or payment firm gets a pack about its own customers, organised by DORA area, that you can share through Vanta or your trust centre.",
    scene: <ScenePack />,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ScrollStory
        id="how-it-works"
        heading="How it works"
        intro="Follow one action, a €240 refund, from your agent's tool call to a pack your customer's risk team can read."
        steps={steps}
      />
      <EvidencePreview />
      <Deployment />
      <StalledDealCalculator />
      <TrustCentre />
      <Audiences />
      <ClosingCta />
    </>
  );
}
