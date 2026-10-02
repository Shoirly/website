import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/** The last section before the footer on every marketing page. */
export function ClosingCta({
  title = "Show your buyer what your agent did.",
  body = "Thirty minutes. We'll walk through a sample evidence pack and how it fits your next security review.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="closing-cta" className="border-t border-rule py-16 md:py-24">
      <Container className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h2 id="closing-cta" className="max-w-[22ch] text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-graphite">{body}</p>
        </div>
        <ButtonLink href="/demo" size="lg">
          Book a demo
        </ButtonLink>
      </Container>
    </section>
  );
}
