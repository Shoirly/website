import { CroppedMark } from "@/components/brand/CroppedMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/** The last section before the footer on every marketing page: ink, with the page's second cropped mark. */
export function ClosingCta({
  title = "Show your buyer what your agent did.",
  body = "Thirty minutes. We'll walk through a sample evidence pack and how it fits your next security review.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section
      aria-labelledby="closing-cta"
      className="sh-dark relative isolate overflow-hidden border-b border-sh-border py-[var(--sh-section-y)]"
    >
      <CroppedMark className="absolute -bottom-[30%] -right-[6%] -z-10 hidden w-[clamp(20rem,36vw,34rem)] md:block" />
      <Container>
        <h2 id="closing-cta" className="max-w-[22ch] text-3xl md:max-w-[55%]">
          {title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-sh-muted md:max-w-[55%]">{body}</p>
        <ButtonLink href="/demo" size="lg" className="mt-8">
          Book a demo
        </ButtonLink>
      </Container>
    </section>
  );
}
