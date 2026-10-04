import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Magnetic } from "@/components/fx/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { LedgerGrid } from "@/components/fx/LedgerGrid";
import { EvidenceTrail } from "./EvidenceTrail";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <LedgerGrid className="-z-10 [mask-image:radial-gradient(ellipse_95%_55%_at_50%_80%,black_20%,transparent_72%)] lg:[mask-image:radial-gradient(ellipse_60%_85%_at_76%_48%,black_25%,transparent_72%)]" />
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-14">
        <div>
          <h1 id="hero-title" className="max-w-[20ch] text-[clamp(2.25rem,1.25rem+3vw,3.5rem)] leading-[1.05]">
            Signed proof of what your AI agent did, and who approved it.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-sh-muted">
            Shoirly gives AI agent companies per-customer evidence of every action, mapped to the controls regulated
            buyers check, so security reviews stop stalling your deals.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <ButtonLink href="/demo" size="lg">
                Book a demo
              </ButtonLink>
            </Magnetic>
            <a
              href="#how-it-works"
              className="group inline-flex h-12 items-center gap-2 text-base font-medium text-sh-text"
            >
              See how it works
              <ArrowDown
                size={16}
                aria-hidden
                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              />
            </a>
          </div>
          <p className="mt-6 text-sm text-sh-muted">We&apos;re early and taking on design partners.</p>
        </div>
        <HeroStage>
          <EvidenceTrail />
        </HeroStage>
      </Container>
    </section>
  );
}
