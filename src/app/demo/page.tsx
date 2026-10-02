import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/metadata";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { BookingActions } from "@/components/demo/BookingActions";
import { Container } from "@/components/ui/Layout";
import { site } from "@/config/site";

export const metadata: Metadata = pageMetadata(pageSeo["/demo"]);

const agenda = [
  ["Your stuck deals", "Where security reviews stall today, and what your customers have asked for."],
  ["A sample evidence pack", "What a risk team receives, and how verification will work."],
  ["Fit and next steps", "How Shoirly would connect to your agent, and what a pilot looks like."],
];

export default function DemoPage() {
  return (
    <section className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <h1 className="max-w-[20ch] text-4xl">See what your buyer&apos;s risk team would see</h1>
          <p className="mt-5 max-w-[50ch] text-lg text-graphite">
            Thirty minutes with the founding team. Bring a deal that&apos;s stuck in security review, or just your
            questions.
          </p>

          <h2 className="mt-12 text-sm font-medium text-graphite">What we&apos;ll cover</h2>
          {/* Orchestrated moment: the rules draw in sequence as the page opens (motion-safe CSS only).
              Numbering comes only from the list itself (styled 01, 02, 03), never duplicated in the text. */}
          <div className="relative mt-4">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left bg-ink motion-safe:animate-draw-x"
            />
            <ol className="list-[decimal-leading-zero] pl-10 marker:font-mono marker:text-sm marker:text-graphite">
              {agenda.map(([t, d], i) => (
                <li key={t} className="relative py-5">
                  <span
                    aria-hidden
                    className="absolute -left-10 right-0 bottom-0 h-px origin-left bg-rule motion-safe:animate-draw-x"
                    style={{ animationDelay: `${180 + i * 160}ms` }}
                  />
                  <span className="block font-semibold">{t}</span>
                  <span className="mt-1 block text-graphite">{d}</span>
                </li>
              ))}
            </ol>
          </div>
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
          <BookingActions />
        </aside>
      </Container>
    </section>
  );
}
