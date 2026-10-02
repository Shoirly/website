import type { ReactNode } from "react";
import { Container } from "@/components/ui/Layout";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container>
        <div className="mx-auto max-w-[68ch]">
          <p className="rounded-md border border-fault/40 bg-fault/5 px-4 py-3 text-sm text-fault">
            Draft placeholder. This page has not been reviewed by a lawyer and is not yet in force.
          </p>
          <h1 className="mt-8 text-4xl">{title}</h1>
          <p className="mt-4 text-sm text-graphite">Last updated {updated}</p>
          <div className="prose-shoirly mt-10">{children}</div>
        </div>
      </Container>
    </article>
  );
}
