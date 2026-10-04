import { MARK_FRAME, MARK_TICK } from "./Logo";

/**
 * The cropped oversized mark (BRAND.md 7.1): decorative, sized and cropped by its parent.
 * `draw` adds the hero's one signature moment: the tick's outline draws in, then fills.
 */
export function CroppedMark({ className = "", draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 116 102" className={`pointer-events-none fill-sh-accent ${className}`}>
      <path d={MARK_FRAME} />
      {draw ? (
        <>
          <path d={MARK_TICK} pathLength={1} strokeWidth={1.5} className="tick-draw fill-none stroke-sh-accent" />
          <path d={MARK_TICK} className="tick-fill" />
        </>
      ) : (
        <path d={MARK_TICK} />
      )}
    </svg>
  );
}

/** The tick from the mark, used for the verified state (BRAND.md 8, evidence card). */
export function TickGlyph({ className = "", label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="38 36 78 66"
      className={`shrink-0 fill-current ${className}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <path d={MARK_TICK} />
    </svg>
  );
}
