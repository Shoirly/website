"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowElbowDownRight, CheckCircle, Pause, Play, SealCheck, ShieldCheck, User } from "@phosphor-icons/react";
import { AnimatedNumber } from "@/components/fx/AnimatedNumber";
import { ScrambleHash } from "@/components/fx/ScrambleHash";
import { sampleActions, samplePackDora, type SampleAction } from "@/content/sample";

/*
 * The hero's evidence trail: a loop of five sample agent actions. Each one
 * arrives, is linked to the policy or person that authorised it, is signed,
 * and joins the chain. The coverage meter fills as signatures land, the
 * coverage check passes, and the trail resolves into a per-customer evidence
 * pack.
 *
 * Timeline: for each action, four phases (arrive, authorised, signing,
 * signed), then "check", "pack" (hold) and "fade". At the end of "fade" the
 * cycle counter increments and the body remounts empty, so loops never show
 * rows unwinding.
 *
 * The server renders the finished frame (cycle 0, "pack"), so no-JS
 * visitors, crawlers and reduced-motion users get the whole story in one
 * static frame. Mount animations only run from cycle 1 onwards.
 */

type Phase = 0 | 1 | 2 | 3; // arrive, authorised, signing, signed
type Frame =
  | { kind: "action"; index: number; phase: Phase }
  | { kind: "check" }
  | { kind: "pack" }
  | { kind: "fade" };

const N = sampleActions.length;
const PHASE_MS: Record<Phase, number> = { 0: 800, 1: 950, 2: 700, 3: 800 };

const frames: Frame[] = [
  ...sampleActions.flatMap((_, index) =>
    ([0, 1, 2, 3] as Phase[]).map((phase) => ({ kind: "action" as const, index, phase })),
  ),
  { kind: "check" },
  { kind: "pack" },
  { kind: "fade" },
];
const PACK_FRAME = frames.length - 2;

function frameDuration(f: Frame, firstPass: boolean) {
  if (f.kind === "action") return PHASE_MS[f.phase];
  if (f.kind === "check") return 1300;
  if (f.kind === "pack") return firstPass ? 2800 : 5200;
  return 650;
}

type TrailState = {
  visible: number;
  latestPhase: Phase;
  signed: number;
  check: boolean;
  pack: boolean;
  fading: boolean;
};

function derive(frame: Frame): TrailState {
  if (frame.kind === "action") {
    return {
      visible: frame.index + 1,
      latestPhase: frame.phase,
      signed: frame.index + (frame.phase === 3 ? 1 : 0),
      check: false,
      pack: false,
      fading: false,
    };
  }
  return {
    visible: N,
    latestPhase: 3,
    signed: N,
    check: true,
    pack: frame.kind !== "check",
    fading: frame.kind === "fade",
  };
}

const ease = [0.22, 1, 0.36, 1] as const;
const ROW_H = 80;
const pct = (n: number) => `${Math.round(n)}%`;
const count = (n: number) => String(Math.round(n));

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

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}

/** False while the browser tab is hidden. */
function useDocumentVisible() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

/** A single ring that expands and fades once when `show` turns true. */
function Pulse({ show, animateIn, className }: { show: boolean; animateIn: boolean; className: string }) {
  return (
    <AnimatePresence initial={false}>
      {show && animateIn ? (
        <motion.span
          key="pulse"
          aria-hidden
          className={`pointer-events-none absolute rounded-full border border-seal ${className}`}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        />
      ) : null}
    </AnimatePresence>
  );
}

function TrailRow({
  action,
  index,
  phase,
  animateIn,
}: {
  action: SampleAction;
  index: number;
  phase: Phase;
  animateIn: boolean;
}) {
  const authorised = phase >= 1;
  const signed = phase === 3;
  const sigState = signed ? "signed" : phase === 2 ? "signing" : "idle";

  return (
    <motion.li
      initial={animateIn ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="relative h-[80px] shrink-0 pl-8"
    >
      {/* Chain link back to the previous record: grey base, seal overlay drawn when this record is signed */}
      {index > 0 ? (
        <>
          <span className="absolute left-[7px] top-[-53px] h-[71px] w-px bg-rule" />
          <motion.span
            className="absolute left-[7px] top-[-53px] h-[71px] w-px origin-top bg-seal"
            initial={false}
            animate={{ scaleY: signed ? 1 : 0 }}
            transition={{ duration: animateIn ? 0.55 : 0, ease }}
          />
        </>
      ) : null}

      {/* Chain node */}
      <span className="absolute left-[3px] top-[18px] size-[9px]">
        <span
          className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
            signed ? "border-seal bg-seal" : "border-rule-strong bg-paper"
          }`}
        />
        <Pulse show={signed} animateIn={animateIn} className="inset-0" />
      </span>

      <div className="flex items-baseline justify-between gap-3 pt-3">
        <p className="truncate font-mono text-[13px] font-medium leading-5 text-ink">{action.action}</p>
        <span className="hidden shrink-0 font-mono text-[11px] text-graphite sm:inline">{action.time}</span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        {/* Authoriser link: slides in, with a brief seal highlight as it lands */}
        <motion.span
          className="relative flex min-w-0 items-center gap-1.5 rounded-sm py-0.5 pl-0.5 pr-1.5 text-graphite"
          initial={false}
          animate={{ opacity: authorised ? 1 : 0, x: authorised ? 0 : -8 }}
          transition={{ duration: animateIn ? 0.5 : 0, ease }}
        >
          <AnimatePresence initial={false}>
            {authorised && animateIn ? (
              <motion.span
                key="flash"
                aria-hidden
                className="absolute inset-0 rounded-sm bg-seal-wash"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.25, ease }}
              />
            ) : null}
          </AnimatePresence>
          <ArrowElbowDownRight size={12} aria-hidden className="relative shrink-0 text-rule-strong" />
          {action.approverKind === "person" ? (
            <User size={13} aria-hidden className="relative shrink-0" />
          ) : (
            <ShieldCheck size={13} aria-hidden className="relative shrink-0" />
          )}
          <span className="relative truncate">{action.approver}</span>
        </motion.span>

        {/* Signature: resolves from noise, then the check mark stamps in */}
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="hidden text-graphite min-[420px]:inline">sig</span>
          <ScrambleHash
            value={action.signature.slice(0, 8)}
            state={sigState}
            stepMs={62}
            className={`transition-colors duration-300 ${signed ? "text-ink" : "text-graphite"}`}
          />
          <span className="relative size-[14px]">
            <AnimatePresence initial={false}>
              {signed ? (
                <motion.span
                  key="tick"
                  className="absolute inset-0 text-seal"
                  initial={animateIn ? { scale: 0.3, rotate: -25, opacity: 0 } : false}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                >
                  <CheckCircle size={14} weight="fill" />
                </motion.span>
              ) : null}
            </AnimatePresence>
            <Pulse show={signed} animateIn={animateIn} className="inset-[1px]" />
          </span>
        </span>
      </div>
    </motion.li>
  );
}

function TrailBody({
  state,
  capacity,
  animateIn,
}: {
  state: TrailState;
  capacity: number;
  animateIn: boolean;
}) {
  const rows = sampleActions.slice(0, state.visible);
  const coverage = (state.signed / N) * 100;
  // Rows fill from the top; once the window is full, the list scrolls up one row at a time.
  const scrolled = Math.max(0, rows.length - capacity);

  return (
    <>
      {/* Rows */}
      <div className="ledger-grid relative h-[240px] overflow-hidden px-4 sm:h-[320px]">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-paper to-transparent transition-opacity duration-300 ${
            scrolled > 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <motion.ol
          className="absolute inset-x-4 top-0 flex flex-col"
          initial={false}
          animate={{ y: -scrolled * ROW_H }}
          transition={{ duration: animateIn ? 0.7 : 0, ease: [0.65, 0, 0.35, 1] }}
        >
          {rows.map((a, i) => (
            <TrailRow
              key={a.id}
              action={a}
              index={i}
              phase={i === rows.length - 1 ? state.latestPhase : 3}
              animateIn={animateIn}
            />
          ))}
        </motion.ol>
      </div>

      {/* Coverage */}
      <div className="relative border-t border-rule bg-paper px-4 py-3">
        <div className="flex items-baseline justify-between gap-3 text-xs">
          <span className="whitespace-nowrap font-medium text-ink">
            {state.check ? (
              <>
                <span className="hidden min-[420px]:inline">Coverage check </span>
                <span className="min-[420px]:hidden">Check </span>passed
              </>
            ) : (
              "Coverage"
            )}
          </span>
          <span className="font-mono tabular text-graphite">
            <AnimatedNumber value={state.signed} format={count} /> of {N}<span className="hidden min-[420px]:inline"> actions</span> signed
            <AnimatedNumber value={coverage} format={pct} className="ml-2 inline-block w-[4ch] text-right font-medium text-ink" />
          </span>
        </div>
        <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-rule/70">
          <motion.div
            className="h-full origin-left rounded-full bg-seal"
            initial={false}
            animate={{ scaleX: coverage / 100 }}
            transition={{ duration: animateIn ? 0.8 : 0, ease }}
          />
          <AnimatePresence initial={false}>
            {state.check && animateIn ? (
              <motion.span
                key="flash"
                aria-hidden
                className="absolute inset-0 bg-seal-wash"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Pack: a faded outline while the trail builds, a solid verified card once it resolves */}
      <div className="relative h-[168px] border-t border-rule bg-ledger/60 p-3 sm:h-[150px]">
        <div className="relative h-full overflow-hidden rounded-md border border-dashed border-rule-strong/60">
          <div className="flex h-full flex-col justify-between px-3.5 py-3 opacity-60">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold leading-5 text-graphite">Evidence pack</p>
                <p className="font-mono text-[11px] leading-4 text-graphite">Sample bank, Sep 2026</p>
              </div>
              <span className="whitespace-nowrap text-[11px] text-graphite">
                {state.check ? "Compiling" : "Waiting for 100%"}
              </span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {samplePackDora.map((d) => (
                <li
                  key={d}
                  className="rounded-sm border border-dashed border-rule-strong/60 px-1.5 py-0.5 text-[11px] leading-4 text-graphite"
                >
                  DORA: {d}
                </li>
              ))}
            </ul>
          </div>
          {/* One-pass sheen while the pack compiles */}
          <AnimatePresence initial={false}>
            {state.check && !state.pack && animateIn ? (
              <motion.span
                key="sheen"
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-paper/90 to-transparent"
                initial={{ x: "-110%" }}
                animate={{ x: "330%" }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {state.pack ? (
            <motion.div
              key="pack"
              className="absolute inset-3 flex flex-col justify-between rounded-md border border-rule bg-paper px-3.5 py-3 shadow-paper"
              initial={animateIn ? { opacity: 0, y: 10, scale: 0.97 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold leading-5">Evidence pack</p>
                  <p className="font-mono text-[11px] leading-4 text-graphite">
                    Sample bank, Sep 2026<span className="hidden sm:inline">, {N} of {N} signatures verified</span>
                  </p>
                </div>
                <motion.span
                  className="flex items-center gap-1 rounded-sm bg-seal-wash px-1.5 py-0.5 text-[11px] font-medium text-seal-deep"
                  initial={animateIn ? { opacity: 0, scale: 1.5, rotate: -12 } : false}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18, delay: animateIn ? 0.35 : 0 }}
                >
                  <SealCheck size={13} weight="fill" aria-hidden />
                  Verified
                </motion.span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {samplePackDora.map((d, i) => (
                  <motion.li
                    key={d}
                    className="rounded-sm border border-rule px-1.5 py-0.5 text-[11px] leading-4 text-graphite"
                    initial={animateIn ? { opacity: 0, y: 4 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: animateIn ? 0.5 + i * 0.09 : 0 }}
                  >
                    DORA: {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

export function EvidenceTrail() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const tabVisible = useDocumentVisible();
  const capacity = useRowCapacity();
  const [frameIndex, setFrameIndex] = useState(PACK_FRAME);
  const [cycle, setCycle] = useState(0);
  const [firstPass, setFirstPass] = useState(true);
  const [paused, setPaused] = useState(false);

  const running = !reduce && !paused && inView && tabVisible;

  useEffect(() => {
    if (!running) return;
    const frame = frames[frameIndex];
    const id = window.setTimeout(() => {
      if (frame.kind === "pack" && firstPass) setFirstPass(false);
      if (frame.kind === "fade") {
        setCycle((c) => c + 1);
        setFrameIndex(0);
      } else {
        setFrameIndex((i) => i + 1);
      }
    }, frameDuration(frame, firstPass));
    return () => window.clearTimeout(id);
  }, [running, frameIndex, firstPass]);

  const state = derive(reduce ? frames[PACK_FRAME] : frames[frameIndex]);
  const animateIn = cycle > 0 && !reduce;
  const status = state.pack ? "Pack ready" : state.check ? "Checking coverage" : "Recording";

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
      <div className="flex h-12 items-center justify-between gap-3 border-b border-rule pl-4 pr-1.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-sm font-semibold">Evidence trail</span>
          <span className="rounded-sm bg-ledger px-1.5 py-0.5 font-mono text-[11px] leading-4 text-graphite">
            Sample data
          </span>
          <span aria-hidden className="hidden truncate text-xs text-graphite sm:inline">
            {reduce ? "" : status}
          </span>
        </div>
        {!reduce ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play animation" : "Pause animation"}
            className="inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-xs text-graphite transition-colors duration-150 hover:bg-ink-soft hover:text-ink"
          >
            {paused ? <Play size={14} weight="fill" aria-hidden /> : <Pause size={14} weight="fill" aria-hidden />}
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>

      {/* Body: cross-fades between cycles; remounting on each cycle keeps loops clean */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: state.fading ? 0 : 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <TrailBody key={cycle} state={state} capacity={capacity} animateIn={animateIn} />
      </motion.div>
    </figure>
  );
}
