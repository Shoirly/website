import { CheckCircle, SealCheck } from "@phosphor-icons/react/dist/ssr";

/** Illustrative evidence pack summary card for /product. Every value is example data and says so. */
export function PackCard() {
  const stats = [
    { k: "Period", v: "1-30 Sep 2026" },
    { k: "Actions covered", v: "1,284" },
    { k: "Signatures verified", v: "1,284 of 1,284", ok: true },
    { k: "Unrecorded", v: "0" },
  ];
  const dora = [
    { area: "ICT third-party risk", ref: "Art. 28-30" },
    { area: "ICT risk management", ref: "Art. 5-16" },
    { area: "Incident management", ref: "Art. 17-23" },
  ];

  return (
    <article
      aria-label="Illustrative evidence pack"
      className="overflow-hidden rounded-md border border-rule bg-paper shadow-paper"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-xs text-graphite">Evidence pack</p>
          <h3 className="mt-1 text-xl">Example Bank</h3>
          <p className="text-xs text-graphite">Illustrative customer</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-sm border border-dashed border-rule-strong px-1.5 py-0.5 text-[11px] text-graphite">
            Illustrative data
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-seal-wash px-1.5 py-0.5 text-[11px] font-medium text-seal-deep">
            <SealCheck size={13} weight="fill" aria-hidden /> All signatures verify
          </span>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 sm:grid-cols-4 sm:px-6">
        {stats.map((s) => (
          <div key={s.k}>
            <dt className="text-xs text-graphite">{s.k}</dt>
            <dd className="mt-1 flex items-center gap-1.5 whitespace-nowrap font-mono text-[15px] font-medium tabular sm:text-base">
              {s.v}
              {s.ok ? <CheckCircle size={15} weight="fill" className="text-seal" aria-label="verified" /> : null}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-rule px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold">DORA areas covered</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {dora.map((d) => (
            <li key={d.area} className="rounded-sm border border-rule px-2 py-1 text-xs">
              {d.area} <span className="font-mono text-graphite">{d.ref}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-rule bg-ledger px-5 py-3 font-mono text-[11px] text-graphite sm:px-6">
        <span>Pack ep_example_7f21</span>
        <span>Generated 1 Oct 2026</span>
      </footer>
    </article>
  );
}
