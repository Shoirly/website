import { ArrowRight, Database, LockSimple, Robot, SealCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Section } from "@/components/ui/Layout";

const leaves = ["Signatures", "Hashes", "Coverage counts"];

export function Deployment() {
  return (
    <Section labelledBy="deploy-title">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
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

        <figure aria-labelledby="deploy-caption" className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,13rem)]">
          <figcaption id="deploy-caption" className="sr-only">
            Inside your cloud or your customer&apos;s: your agent, Shoirly, and the action records and customer data, which
            stay put. Only signatures, hashes and coverage counts leave.
          </figcaption>

          {/* Boundary: where the agent runs */}
          <div className="rounded-md border-2 border-dashed border-sh-border-strong/70 bg-sh-bg-subtle/60 p-4 sm:p-5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-sh-muted">
              <LockSimple size={14} aria-hidden /> Your cloud, or your customer&apos;s
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5">
              <li className="flex items-center gap-2.5 rounded-md border border-sh-border bg-sh-bg px-3 py-2.5 text-sm">
                <Robot size={18} aria-hidden className="text-sh-muted" /> Your agent
              </li>
              <li className="flex items-center gap-2.5 rounded-md border border-sh-accent/50 bg-sh-accent-soft/70 px-3 py-2.5 text-sm font-medium text-sh-accent-text">
                <SealCheck size={18} aria-hidden /> Shoirly
              </li>
              <li className="flex items-center gap-2.5 rounded-md border border-sh-border bg-sh-bg px-3 py-2.5 text-sm">
                <Database size={18} aria-hidden className="text-sh-muted" />
                <span>
                  Records and customer data <span className="text-sh-muted">stay here</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Proof leaving the environment: three pulses flow towards the card (motion-safe CSS only) */}
          <div aria-hidden className="relative flex h-14 w-full justify-center text-sh-accent sm:h-auto sm:w-16 sm:self-stretch">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-sh-accent/25 sm:inset-x-0 sm:inset-y-auto sm:left-0 sm:top-1/2 sm:h-px sm:w-full sm:translate-x-0" />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="proof-pulse absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-sh-accent opacity-0 sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0"
                style={{ animationDelay: `${i * 0.8}s` }}
              />
            ))}
            <ArrowRight size={18} className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-90 bg-sh-bg sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0" />
          </div>

          {/* What leaves */}
          <div className="rounded-md border border-sh-border bg-sh-bg p-4 shadow-paper sm:p-5">
            <p className="text-xs font-medium text-sh-muted">Only this leaves</p>
            <ul className="mt-3 space-y-2">
              {leaves.map((l) => (
                <li key={l} className="font-mono text-sm text-sh-text">
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
