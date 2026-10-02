import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode; plain?: string };

/** Native details/summary: keyboard and screen-reader friendly with no JS. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-ink">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              size={18}
              aria-hidden
              className="mt-1.5 shrink-0 text-graphite transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <div className="max-w-[68ch] pb-6 text-graphite">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/** FAQPage structured data, built from items that provide a plain-text answer. */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((i) => i.plain)
      .map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.plain } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
