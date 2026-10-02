import { ArrowRight, CheckCircle, LinkSimple, Plugs, SealCheck, ShieldCheck, User } from "@phosphor-icons/react/dist/ssr";
import { sampleActions, samplePackDora } from "@/content/sample";

/*
 * Small, real component previews for each "how it works" step. They render
 * actual markup (not screenshots) using the shared sample data, and each is
 * labelled as sample data.
 */

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-rule bg-paper shadow-paper">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-rule px-4">
        <span className="text-xs font-semibold">{title}</span>
        <span className="font-mono text-[11px] text-graphite">Sample data</span>
      </div>
      <div className="flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function ConnectVisual() {
  const calls = sampleActions.slice(0, 4);
  return (
    <Frame title="Connect your agent">
      <div className="grid h-full grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)]">
        <div className="rounded-md border border-rule bg-ledger p-3">
          <p className="text-xs font-semibold">Your agent</p>
          <ul className="mt-2 space-y-1.5">
            {calls.map((c) => (
              <li key={c.id} className="truncate font-mono text-[11px] text-graphite">
                {c.action}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-1 text-graphite sm:flex-col">
          <Plugs size={20} aria-hidden />
          <ArrowRight size={14} aria-hidden className="rotate-90 sm:rotate-0" />
        </div>
        <div className="rounded-md border border-seal/40 bg-seal-wash/60 p-3">
          <p className="text-xs font-semibold text-seal-deep">Shoirly recorder</p>
          {/* TODO(team): confirm how the integration works (SDK, proxy, both) and say so here. */}
          <p className="mt-2 text-[11px] leading-4 text-graphite">
            Records each action as your agent takes it. How your agent decides stays the same.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function SignVisual() {
  const a = sampleActions[2];
  const prev = sampleActions[1];
  const rows: [string, React.ReactNode][] = [
    ["Action", <span key="a" className="font-mono">{a.action}</span>],
    [
      "Authorised by",
      <span key="b" className="inline-flex items-center gap-1.5">
        <User size={13} aria-hidden /> {a.approver}
      </span>,
    ],
    ["Time", <span key="t" className="font-mono">2026-09-14 {a.time} UTC</span>],
    ["Signature", <span key="s" className="font-mono">{a.signature}</span>],
    [
      "Follows",
      <span key="p" className="inline-flex items-center gap-1.5 font-mono">
        <LinkSimple size={13} aria-hidden /> {prev.signature}
      </span>,
    ],
  ];
  return (
    <Frame title="Signed record">
      <dl className="divide-y divide-rule text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 first:pt-0">
            <dt className="text-graphite">{k}</dt>
            <dd className="min-w-0 truncate text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-seal-wash px-2 py-1 text-xs font-medium text-seal-deep">
        <CheckCircle size={14} weight="fill" aria-hidden /> Signature verifies
      </p>
    </Frame>
  );
}

export function CoverageVisual() {
  const figures = [
    { label: "Attempted", value: "1,284" },
    { label: "Signed", value: "1,284" },
    { label: "Unrecorded", value: "0" },
  ];
  return (
    <Frame title="Coverage check, September">
      <div className="flex h-full flex-col justify-between gap-5">
        <dl className="grid grid-cols-3 gap-3">
          {figures.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] leading-4 text-graphite">{f.label}</dt>
              <dd className="mt-1.5 font-mono text-xl font-medium tabular text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div>
          <div className="h-1 rounded-full bg-seal" />
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-seal-deep">
            <ShieldCheck size={15} weight="fill" aria-hidden />
            Every attempted action has a signed record
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function ShareVisual() {
  return (
    <Frame title="Evidence pack">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Sample bank</p>
            <p className="font-mono text-[11px] text-graphite">1-30 Sep 2026, 1,284 actions</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-sm bg-seal-wash px-1.5 py-0.5 text-[11px] font-medium text-seal-deep">
            <SealCheck size={13} weight="fill" aria-hidden /> Verified
          </span>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {samplePackDora.map((d) => (
            <li key={d} className="rounded-sm border border-rule px-1.5 py-0.5 text-[11px] text-graphite">
              DORA: {d}
            </li>
          ))}
        </ul>
        <div className="border-t border-rule pt-3">
          <p className="text-[11px] text-graphite">Share it through</p>
          <p className="mt-1 text-xs font-medium">Vanta or your trust centre, or send it to the risk team</p>
        </div>
      </div>
    </Frame>
  );
}
