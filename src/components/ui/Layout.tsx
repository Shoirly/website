import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 min-[400px]:px-6 ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ledger";
  id?: string;
  labelledBy?: string;
};

export function Section({ children, className = "", tone = "paper", id, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 md:py-24 ${tone === "ledger" ? "bg-ledger" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Standard inner-page header: one heading, one lead paragraph. */
export function PageHeader({
  title,
  lead,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-rule pb-12 pt-14 md:pb-16 md:pt-20">
      <Container>
        <h1 className="max-w-[20ch] text-4xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-[60ch] text-lg text-graphite">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
