import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CalendarBlank, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { site } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a demo",
  description:
    "See a sample evidence pack and how Shoirly fits into a bank's security review. Thirty minutes with the founding team.",
  path: "/demo",
});

const agenda = [
  ["Your bank deals", "Where your security reviews stall today, and what the bank has asked for."],
  ["A sample evidence pack", "What a bank's risk team receives, and how verification will work."],
  ["Fit and next steps", "How Shoirly would connect to your agent, and what a pilot looks like."],
];

export default function DemoPage() {
  return (
    <section className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <h1 className="max-w-[16ch] text-4xl">See what a bank would see</h1>
          <p className="mt-5 max-w-[50ch] text-lg text-graphite">
            Thirty minutes with the founding team. Bring a deal that&apos;s stuck in security review, or just your
            questions.
          </p>

          <h2 className="mt-12 text-sm font-medium text-graphite">What we&apos;ll cover</h2>
          <ol className="mt-4 border-t border-ink">
            {agenda.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-5">
                <span className="font-mono text-sm text-graphite">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="mt-1 block text-graphite">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-labelledby="book-title"
          className="h-fit rounded-md border border-rule bg-ledger p-6 sm:p-8 lg:sticky lg:top-24"
        >
          <CalendarBlank size={28} className="text-seal" aria-hidden />
          <h2 id="book-title" className="mt-4 text-2xl">
            Pick a time
          </h2>
          {/* TODO(team): replace with an embedded Cal.com scheduler once site.bookingUrl points to Cal.com. */}
          <p className="mt-3 text-graphite">
            {site.bookingIsMailto
              ? "Send us a short note with your company and a couple of times that suit. We'll reply within one working day."
              : "Choose a slot that suits you. You'll get a calendar invite straight away."}
          </p>
          <ButtonLink href={site.bookingUrl} size="lg" className="mt-7 w-full">
            Book a demo
          </ButtonLink>
          {site.bookingIsMailto ? (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-graphite">
              <EnvelopeSimple size={16} aria-hidden />
              Opens your email app. Or write to{" "}
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          ) : null}
        </aside>
      </Container>
    </section>
  );
}
