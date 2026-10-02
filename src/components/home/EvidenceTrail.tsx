"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Pause, Play, SealCheck, ShieldCheck, User } from "@phosphor-icons/react";
import { ScrambleHash } from "@/components/fx/ScrambleHash";
import { sampleActions, samplePackDora } from "@/content/sample";

/*
 * The hero's evidence trail. A loop of five sample agent actions. Each one is
 * recorded, linked to the policy or person that authorised it, signed, and
 * chained to the one before. Coverage climbs to 100%, then the trail compiles
 * into a per-customer evidence pack.
 *
 * Timeline frames: for each action, 4 sub-phases (recorded, approved, signing,
 * signed), then "check", "pack" (hold) and "clear". The server renders the
 * finished state, so no-JS visitors, crawlers and reduced-motion users see the
 * whole story in one static frame. With motion allowed, the finished state
 * holds briefly, then the trail replays from the start.
 */

type Phase = 0 | 1 | 2 | 3; // recorded, approved, signing, signed
type Frame = { kind: "action"; index: number; phase: Phase } | { kind: "check" } | { kind: "pack" } | { kind: "clear" };

const N = sampleActions.length;
const PHASE_MS: Record<Phase, number> = { 0: 450, 1: 450, 2: 620, 3: 330 };

const frames: Frame[] = [
  ...sampleActions.flatMap((_, index) =>
    ([0, 1, 2, 3] as Phase[]).map((phase) => ({ kind: "action" as const, index, phase })),
  ),
  { kind: "check" },
  { kind: "pack" },
  { kind: "clear" },
];
const PACK_FRAME = frames.length - 2;

function frameDuration(f: Frame, firstPass: boolean) {
  if (f.kind === "action") return PHASE_MS[f.phase];
  if (f.kind === "check") return 900;
  if (f.kind === "pack") return firstPass ? 2200 : 4600;
  return 520;
}

const ease = [0.22, 1, 0.36, 1] as const;
const ROW_H = 78;

/** Rows that fit in the list window: 3 on phones, 4 from the sm breakpoint. */
function useRowCapacity() {
  const [cap, setCap] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setCap(mq.matches ? 4 : 3);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return cap;
}

function derive(frame: Frame) {
  if (frame.kind === "clear") return { visible: 0, latestPhase: 3 as Phase, signed: 0, check: false, pack: false };
  if (frame.kind === "check") return { visible: N, latestPhase: 3 as Phase, signed: N, check: true, pack: false };
  if (frame.kind === "pack") return { visible: N, latestPhase: 3 as Phase, signed: N, check: true, pack: true };
  const signed = frame.index + (frame.phase === 3 ? 1 : 0);
  return { visible: frame.index + 1, latestPhase: frame.phase, signed, check: false, pack: false };
}

export function EvidenceTrail() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [frameIndex, setFrameIndex] = useState(PACK_FRAME);
  const [firstPass, setFirstPass] = useState(true);
  const [paused, setPaused] = useState(false);

  const running = !reduce && !paused && inView;
  const capacity = useRowCapacity();

  useEffect(() => {
    if (!running) return;
    const frame = frames[frameIndex];
    const id = window.setTimeout(() => {
      if (frames[frameIndex].kind === "pack" && firstPass) setFirstPass(false);
      setFrameIndex((i) => (i + 1) % frames.length);
    }, frameDuration(frame, firstPass));
    return () => window.clearTimeout(id);
  }, [running, frameIndex, firstPass]);

  const state = derive(reduce ? frames[PACK_FRAME] : frames[frameIndex]);
  const coverage = state.visible === 0 ? 0 : Math.round((state.signed / state.visible) * 100);
  const rows = sampleActions.slice(0, state.visible);
  // Rows fill from the top; once the window is full, the list scrolls up one row at a time.
  const scrollY = -Math.max(0, rows.length - capacity) * ROW_H;

  return (
    <figure
      ref={rootRef}
      className="relative overflow-hidden rounded-md border border-rule bg-paper shadow-paper"
      aria-labelledby="trail-caption"
    >
      <figcaption id="trail-caption" className="sr-only">
        Animated sample of an evidence trail. Five agent actions, such as a €240 refund and a credit limit change,
        are each linked to the policy or person who approved them, signed, and chained together. Coverage reaches
        100 percent and the trail compiles into an evidence pack for one bank customer, tagged with the DORA areas
        it covers.
      </figcaption>

      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-rule px-4">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold">Evidence trail</span>
          <span className="rounded-sm bg-ledger px-1.5 py-0.5 font-mono text-[11px] leading-4 text-graphite">
            Sample data
          </span>
        </div>
        {!reduce ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-graphite transition-colors duration-150 hover:bg-ink-soft hover:text-ink"
          >
            {paused ? <Play size={14} weight="fill" aria-hidden /> : <Pause size={14} weight="fill" aria-hidden />}
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>

      <div aria-hidden className="ledger-grid">
        {/* Rows: newest at the bottom. Fixed height, older rows slide out under the top fade. */}
        <div className="relative h-[234px] overflow-hidden px-4 sm:h-[312px]">
          <div className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-paper to-transparent transition-opacity duration-300 ${rows.length > capacity ? "opacity-100" : "opacity-0"}`} />
          <motion.ol
            className="absolute inset-x-4 top-0 flex flex-col"
            initial={false}
            animate={{ y: scrollY }}
            transition={{ duration: reduce ? 0 : 0.42, ease }}
          >
            <AnimatePresence initial={false}>
              {rows.map((a, i) => {
                const isLatest = i === rows.length - 1;
                const phase: Phase = isLatest ? state.latestPhase : 3;
                const approved = phase >= 1;
                const sigState = phase === 3 ? "signed" : phase === 2 ? "signing" : "idle";
                return (
                  <motion.li
                    key={a.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.42, ease }}
                    className="relative h-[78px] shrink-0 pl-7"
                  >
                    {/* chain link to the previous record */}
                    {i > 0 ? (
                      <span
                        className={`absolute left-[7px] top-[-51px] h-[69px] w-px transition-colors duration-300 ${
                          phase === 3 ? "bg-seal" : "bg-rule-strong/60"
                        }`}
                      />
                    ) : null}
                    <span
                      className={`absolute left-[3px] top-[18px] size-[9px] rounded-full border transition-colors duration-300 ${
                        phase === 3 ? "border-seal bg-seal" : "border-rule-strong bg-paper"
                      }`}
                    />
                    <div className="flex items-baseline justify-between gap-3 pt-3">
                      <p className="truncate font-mono text-[13px] font-medium leading-5 text-ink">{a.action}</p>
                      <span className="hidden shrink-0 font-mono text-[11px] text-graphite sm:inline">{a.time}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-3 text-xs">
                      <motion.span
                        className="flex min-w-0 items-center gap-1.5 text-graphite"
                        animate={{ opacity: approved ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {a.approverKind === "person" ? (
                          <User size={13} aria-hidden className="shrink-0" />
                        ) : (
                          <ShieldCheck size={13} aria-hidden className="shrink-0" />
                        )}
                        <span className="truncate">{a.approver}</span>
                      </motion.span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="hidden text-graphite min-[420px]:inline">sig</span>
                        <ScrambleHash
                          value={a.signature.slice(0, 8)}
                          state={sigState}
                          className={phase === 3 ? "text-ink" : "text-graphite"}
                        />
                        <span className="relative size-[14px]">
                          <AnimatePresence>
                            {phase === 3 ? (
                              <motion.span
                                className="absolute inset-0 text-seal"
                                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                              >
                                <CheckCircle size={14} weight="fill" />
                              </motion.span>
                            ) : null}
                          </AnimatePresence>
                        </span>
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ol>
        </div>

        {/* Coverage */}
        <div className="border-t border-rule bg-paper px-4 py-3">
          <div className="flex items-baseline justify-between text-xs">
            <span className="font-medium text-ink">
              {state.check ? "Coverage check passed" : "Coverage"}
            </span>
            <span className="font-mono tabular text-graphite">
              {state.signed} of {state.visible} actions signed
              <span className="ml-2 font-medium text-ink">{coverage}%</span>
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-rule/70">
            <motion.div
              className="h-full origin-left rounded-full bg-seal"
              initial={false}
              animate={{ scaleX: coverage / 100 }}
              transition={{ duration: reduce ? 0 : 0.4, ease }}
            />
          </div>
        </div>

        {/* Pack: a faded outline while the trail builds, solid once coverage reaches 100% */}
        <div className="relative h-[168px] border-t border-rule bg-ledger/60 p-3 sm:h-[146px]">
          <motion.div
            initial={false}
            animate={state.pack ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 0.985 }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
            className={`flex h-full flex-col justify-between rounded-md border px-3.5 py-3 transition-[background-color,border-color,box-shadow] duration-500 ${
              state.pack ? "border-rule bg-paper shadow-paper" : "border-dashed border-rule-strong/60 bg-transparent"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-sm font-semibold leading-5 transition-colors duration-500 ${state.pack ? "text-ink" : "text-graphite"}`}>
                  Evidence pack
                </p>
                <p className="font-mono text-[11px] leading-4 text-graphite">Sample bank, Sep 2026</p>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {state.pack ? (
                  <motion.span
                    key="verified"
                    initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className="flex items-center gap-1 rounded-sm bg-seal-wash px-1.5 py-0.5 text-[11px] font-medium text-seal-deep"
                  >
                    <SealCheck size={13} weight="fill" aria-hidden />
                    Verified
                  </motion.span>
                ) : (
                  <motion.span
                    key="waiting"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[11px] text-graphite"
                  >
                    {state.check ? "Compiling" : "Waiting for 100%"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {samplePackDora.map((d, i) => (
                <motion.li
                  key={d}
                  initial={false}
                  animate={{ opacity: state.pack ? 1 : 0.45 }}
                  transition={{ duration: reduce ? 0 : 0.35, delay: state.pack && !reduce ? 0.15 + i * 0.08 : 0 }}
                  className={`rounded-sm border px-1.5 py-0.5 text-[11px] leading-4 text-graphite ${
                    state.pack ? "border-rule" : "border-dashed border-rule-strong/60"
                  }`}
                >
                  DORA: {d}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </figure>
  );
}
