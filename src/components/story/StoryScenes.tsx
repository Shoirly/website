import { ArrowRight, CheckCircle, LinkSimple, SealCheck, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { sampleActions, samplePackControls } from "@/content/sample";

/*
 * Scenes for the scroll story. Each follows the same sample action (a €240
 * refund) one step further through the pipeline, so the sticky visual reads
 * as one record evolving rather than four unrelated cards. Entrance motion is
 * one-shot CSS (motion-safe only) that replays when a scene remounts.
 */

const action = sampleActions[0];
const previous = sampleActions[1];

function SceneFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-sh-border bg-sh-bg shadow-paper">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-sh-border px-4">
        <span className="text-xs font-semibold">{label}</span>
        <span className="font-mono text-[11px] text-sh-muted">Sample data</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Field({ k, children, className = "" }: { k: string; children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3 py-2 text-xs sm:grid-cols-[7rem_minmax(0,1fr)] ${className}`}>
      <dt className="text-sh-muted">{k}</dt>
      <dd className="min-w-0 truncate text-sh-text">{children}</dd>
    </div>
  );
}

export function SceneCapture() {
  return (
    <SceneFrame label="1. Capture">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-center text-xs">
        <span className="rounded-md border border-sh-border bg-sh-bg-subtle px-2 py-2.5">Your agent</span>
        <ArrowRight size={14} aria-hidden className="text-sh-muted" />
        <span className="rounded-md border border-sh-accent/50 bg-sh-accent-soft px-2 py-2.5 font-medium text-sh-accent-text">
          Shoirly proxy
        </span>
        <ArrowRight size={14} aria-hidden className="text-sh-muted" />
        <span className="rounded-md border border-sh-border bg-sh-bg-subtle px-2 py-2.5">Billing API</span>
      </div>
      <div className="rounded-md border border-sh-border p-3 motion-safe:animate-rise-in motion-safe:[animation-delay:100ms]">
        <p className="text-[11px] font-medium text-sh-muted">Captured as the call passes through</p>
        <dl className="mt-1 divide-y divide-sh-border">
          <Field k="Action">
            <span className="font-mono">{action.action}</span>
          </Field>
          <Field k="Customer">
            <span className="font-mono">#4471, sample customer</span>
          </Field>
          <Field k="Time">
            <span className="font-mono">2026-09-14 {action.time} UTC</span>
          </Field>
        </dl>
      </div>
    </SceneFrame>
  );
}

export function SceneSign() {
  return (
    <SceneFrame label="2. Authorise and sign">
      <dl className="divide-y divide-sh-border">
        <Field k="Action">
          <span className="font-mono">{action.action}</span>
        </Field>
        <Field k="Authorised by" className="motion-safe:animate-rise-in motion-safe:[animation-delay:80ms]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} aria-hidden /> {action.approver}
          </span>
        </Field>
        <Field k="Signature" className="motion-safe:animate-rise-in motion-safe:[animation-delay:200ms]">
          <span className="font-mono">{action.signature}</span>
        </Field>
        <Field k="Follows" className="motion-safe:animate-rise-in motion-safe:[animation-delay:300ms]">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <LinkSimple size={13} aria-hidden /> {previous.signature}
          </span>
        </Field>
      </dl>
      <p className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-sh-accent-soft px-2 py-1 text-xs font-medium text-sh-accent-text motion-safe:animate-stamp-in motion-safe:[animation-delay:420ms]">
        <CheckCircle size={14} weight="fill" aria-hidden /> Signed and chained
      </p>
    </SceneFrame>
  );
}

export function SceneCoverage() {
  const nodes = 7;
  return (
    <SceneFrame label="3. Coverage check">
      <div>
        <div className="relative flex items-center justify-between px-1">
          <span className="absolute inset-x-1 top-1/2 h-px origin-left bg-sh-accent motion-safe:animate-draw-x" />
          {Array.from({ length: nodes }).map((_, i) => (
            <span
              key={i}
              className={`relative size-3 rounded-full border-2 ${
                i === 4 ? "border-sh-accent bg-sh-bg ring-4 ring-sh-accent-soft" : "border-sh-accent bg-sh-accent"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-center font-mono text-[11px] text-sh-muted">
          The refund is one signed record in the chain
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t border-sh-border pt-4">
        {[
          ["Attempted", "1,284"],
          ["Signed", "1,284"],
          ["Unrecorded", "0"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="motion-safe:animate-rise-in"
            style={{ animationDelay: `${140 + i * 80}ms` }}
          >
            <dt className="text-[11px] text-sh-muted">{k}</dt>
            <dd className="mt-1 font-mono text-xl font-medium tabular">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-sh-muted">Attempted calls are counted against signed records, so a gap would show.</p>
    </SceneFrame>
  );
}

export function ScenePack() {
  return (
    <SceneFrame label="4. Evidence pack">
      <div className="rounded-md border border-sh-border p-4 motion-safe:animate-rise-in">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Sample customer</p>
            <p className="font-mono text-[11px] text-sh-muted">1-30 Sep 2026, 1,284 actions</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-sm bg-sh-accent-soft px-1.5 py-0.5 text-[11px] font-medium text-sh-accent-text motion-safe:animate-stamp-in motion-safe:[animation-delay:240ms]">
            <SealCheck size={13} weight="fill" aria-hidden /> Verified
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {samplePackControls.map((d) => (
            <li key={d} className="rounded-sm border border-sh-border px-1.5 py-0.5 text-[11px] text-sh-muted">
              {d}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-sh-muted">
        Share it through Vanta or your trust centre, or send it straight to your customer&apos;s risk team.
      </p>
    </SceneFrame>
  );
}
