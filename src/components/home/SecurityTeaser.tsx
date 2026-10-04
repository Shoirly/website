import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";

export function SecurityTeaser() {
  return (
    <Section labelledBy="security-teaser-title">
      <p className="label">security</p>
      <h2 id="security-teaser-title" className="mt-4 max-w-[24ch] text-3xl">
        Evidence is only useful if it can be trusted
      </h2>
      <p className="mt-5 max-w-[56ch] text-lg text-sh-muted">
        A log says what happened. Signed, linked records make changes detectable. The security overview covers how the
        evidence works, what stays in your environment and what is still on our roadmap.
      </p>
      <ButtonLink href="/security" variant="secondary" size="lg" className="mt-8">
        Read the security overview
      </ButtonLink>
    </Section>
  );
}
