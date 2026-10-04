import { CroppedMark } from "@/components/brand/CroppedMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { EvidenceCard } from "./EvidenceCard";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden py-[var(--sh-section-y)]">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="label">for AI agent companies</p>
          <h1 id="hero-title" className="mt-5 max-w-[20ch] text-4xl">
            <span className="block">Certs show your AI agent passed tests.</span>
            <span className="block">Shoirly shows what it actually did.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-sh-muted">
            Shoirly gives AI agent companies per-customer evidence of every action, mapped to the controls regulated
            buyers check, so security reviews stop stalling your deals.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/demo" size="lg">
              Book a demo
            </ButtonLink>
            <ButtonLink href="#how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-sh-muted">We&apos;re early and taking on design partners.</p>
        </div>
        <div className="relative lg:col-span-5">
          <CroppedMark draw className="absolute -top-[20%] left-[10%] -z-10 w-[clamp(26rem,52vw,48rem)]" />
          <EvidenceCard className="relative max-w-[26rem]" />
        </div>
      </Container>
    </section>
  );
}
