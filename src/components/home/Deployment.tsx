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
          <p className="mt-5 max-w-[44ch] text-lg text-graphite">
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
            Inside your cloud or the bank&apos;s: your agent, Shoirly, and the action records and customer data, which
            stay put. Only signatures, hashes and coverage counts leave.
          </figcaption>

          {/* Boundary: where the agent runs */}
          <div className="rounded-md border-2 border-dashed border-rule-strong/70 bg-ledger/60 p-4 sm:p-5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-graphite">
              <LockSimple size={14} aria-hidden /> Your cloud, or the bank&apos;s
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5">
              <li className="flex items-center gap-2.5 rounded-md border border-rule bg-paper px-3 py-2.5 text-sm">
                <Robot size={18} aria-hidden className="text-graphite" /> Your agent
              </li>
              <li className="flex items-center gap-2.5 rounded-md border border-seal/50 bg-seal-wash/70 px-3 py-2.5 text-sm font-medium text-seal-deep">
                <SealCheck size={18} aria-hidden /> Shoirly
              </li>
              <li className="flex items-center gap-2.5 rounded-md border border-rule bg-paper px-3 py-2.5 text-sm">
                <Database size={18} aria-hidden className="text-graphite" />
                <span>
                  Records and customer data <span className="text-graphite">stay here</span>
                </span>
              </li>
            </ul>
          </div>

          <div aria-hidden className="flex justify-center text-seal">
            <ArrowRight size={22} className="rotate-90 sm:rotate-0" />
          </div>

          {/* What leaves */}
          <div className="rounded-md border border-rule bg-paper p-4 shadow-paper sm:p-5">
            <p className="text-xs font-medium text-graphite">Only this leaves</p>
            <ul className="mt-3 space-y-2">
              {leaves.map((l) => (
                <li key={l} className="font-mono text-sm text-ink">
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-rule pt-3 text-xs text-graphite">
              Enough to show records are unedited and whether any are missing. None of their contents.
            </p>
          </div>
        </figure>
      </div>
    </Section>
  );
}
