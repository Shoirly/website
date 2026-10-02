import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Magnetic } from "@/components/fx/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { EvidenceTrail } from "./EvidenceTrail";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-14">
        <div>
          <h1 id="hero-title" className="max-w-[20ch] text-[clamp(2.25rem,1.25rem+3vw,3.5rem)] leading-[1.05]">
            Signed proof of what your AI agent did, and who approved it.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-graphite">
            Shoirly gives AI agent vendors per-customer evidence of every action, mapped to DORA, so security reviews
            at banks, insurers and payment firms stop stalling your deals.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <ButtonLink href="/demo" size="lg">
                Book a demo
              </ButtonLink>
            </Magnetic>
            <a
              href="#how-it-works"
              className="group inline-flex h-12 items-center gap-2 text-base font-medium text-ink"
            >
              See how it works
              <ArrowDown
                size={16}
                aria-hidden
                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              />
            </a>
          </div>
          <p className="mt-6 text-sm text-graphite">We&apos;re early and taking on design partners.</p>
        </div>
        <EvidenceTrail />
      </Container>
    </section>
  );
}
