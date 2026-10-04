import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Section } from "@/components/ui/Layout";

const leaves = ["Signatures", "Hashes", "Coverage counts"];

export function Deployment() {
  return (
    <Section labelledBy="deploy-title">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="deploy-title" className="max-w-[18ch] text-3xl">
            Your data never leaves. Only the proof does.
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg text-sh-muted">
            Shoirly is designed to run where your agent runs, in your cloud or your customer&apos;s. Action records and customer data
            stay there. Only signatures, hashes and coverage counts leave.
          </p>
          <p className="mt-6">
            <Link href="/security#where-title" className="link font-medium">
              Where Shoirly runs, in detail
            </Link>
          </p>
        </div>

        <figure
          aria-labelledby="deploy-caption"
          className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,13rem)] lg:col-span-7"
        >
          <figcaption id="deploy-caption" className="sr-only">
            Inside your cloud or your customer&apos;s: your agent, Shoirly, and the action records and customer data, which
            stay put. Only signatures, hashes and coverage counts leave.
          </figcaption>

          {/* Boundary: where the agent runs, drawn as a dashed construction line */}
          <div className="border border-dashed border-sh-border-strong p-4 sm:p-5">
            <p className="font-mono text-xs text-sh-muted">your cloud, or your customer&apos;s</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5">
              <li className="flex items-center gap-3 rounded-md border border-sh-border bg-sh-surface px-3 py-2.5 text-sm">
                <span aria-hidden className="size-2 shrink-0 border border-sh-border-strong" /> Your agent
              </li>
              <li className="flex items-center gap-3 rounded-md border border-sh-accent bg-sh-accent-soft px-3 py-2.5 text-sm font-medium text-sh-accent-text">
                <span aria-hidden className="square-bullet" /> Shoirly
              </li>
              <li className="flex items-center gap-3 rounded-md border border-sh-border bg-sh-surface px-3 py-2.5 text-sm">
                <span aria-hidden className="size-2 shrink-0 border border-sh-border-strong" />
                <span>
                  Records and customer data <span className="text-sh-muted">stay here</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Proof leaving the environment */}
          <div aria-hidden className="relative flex h-12 w-full justify-center text-sh-accent sm:h-auto sm:w-16 sm:self-stretch">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-sh-accent sm:inset-x-0 sm:inset-y-auto sm:left-0 sm:top-1/2 sm:h-px sm:w-full sm:translate-x-0" />
            <ArrowRight size={18} className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-90 bg-sh-bg sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0" />
          </div>

          {/* What leaves */}
          <div className="chamfer rounded-md border border-sh-border bg-sh-surface p-4 sm:p-5">
            <p className="font-mono text-xs text-sh-muted">only this leaves</p>
            <ul className="mt-3 space-y-2">
              {leaves.map((l) => (
                <li key={l} className="flex items-center gap-2.5 font-mono text-sm text-sh-text">
                  <span aria-hidden className="square-bullet" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-sh-border pt-3 text-xs text-sh-muted">
              Enough to show records are unedited and whether any are missing. None of their contents.
            </p>
          </div>
        </figure>
      </div>
    </Section>
  );
}
