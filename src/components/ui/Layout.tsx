import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[var(--sh-container)] px-[var(--sh-gutter)] ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ledger" | "ink";
  id?: string;
  labelledBy?: string;
};

export function Section({ children, className = "", tone = "paper", id, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-[var(--sh-section-y)] ${tone === "ledger" ? "bg-sh-bg-subtle" : tone === "ink" ? "sh-dark" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Standard inner-page header: one heading, one lead paragraph. */
export function PageHeader({
  label,
  title,
  lead,
  children,
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-sh-border pb-12 pt-14 md:pb-16 md:pt-20">
      <Container>
        {label ? <p className="label mb-4">{label}</p> : null}
        <h1 className="max-w-[20ch] text-4xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-[60ch] text-lg text-sh-muted">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
