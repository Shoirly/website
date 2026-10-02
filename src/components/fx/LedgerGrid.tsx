"use client";

/**
 * Adapted from react-bits "ShapeGrid" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/Backgrounds/ShapeGrid). Trimmed to squares and rebuilt for a
 * light page: a faint ledger grid that drifts slowly, cells under the pointer
 * light up in Seal blue and fade (a short trail), and now and then a cell lights
 * on its own, like a record being signed.
 *
 * Built for smoothness:
 * - The grid lines are a CSS background on a layer the compositor slides one
 *   cell diagonally and loops seamlessly, so no main-thread drawing per frame.
 * - The canvas rides on that same layer, so lit cells move with the grid for
 *   free, and it only redraws while a cell is actually lit or fading.
 * - Paused off screen and when the tab is hidden. Under reduced motion: a
 *   static grid, no drift, no lighting.
 */
import { useEffect, useRef, type CSSProperties } from "react";

const FILL = [49, 87, 240] as const; // Seal blue
const FADE_MS = 800;
const AMBIENT_EVERY_MS = 1100;

export function LedgerGrid({ cell = 44, className = "" }: { cell?: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const area = wrap?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !layer || !canvas || !area || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    const lit = new Map<string, number>(); // "col,row" in layer cells -> intensity 0..1
    let raf = 0;
    let last = 0;
    let ambient = 0;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = layer.offsetWidth;
      h = layer.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const [key, a] of lit) {
        const [c, r] = key.split(",").map(Number);
        ctx.fillStyle = `rgba(${FILL[0]}, ${FILL[1]}, ${FILL[2]}, ${(a * 0.16).toFixed(3)})`;
        ctx.fillRect(c * cell + 1, r * cell + 1, cell - 1, cell - 1);
      }
    };

    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) : 16;
      last = t;
      for (const [key, a] of lit) {
        const next = a - dt / FADE_MS;
        if (next <= 0) lit.delete(key);
        else lit.set(key, next);
      }
      draw();
      raf = lit.size ? requestAnimationFrame(tick) : 0;
      if (!raf) last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Map a viewport point to a cell on the moving layer (its rect includes the drift).
    const light = (clientX: number, clientY: number, intensity: number) => {
      const r = layer.getBoundingClientRect();
      const key = `${Math.floor((clientX - r.left) / cell)},${Math.floor((clientY - r.top) / cell)}`;
      if ((lit.get(key) ?? 0) < intensity) lit.set(key, intensity);
      kick();
    };

    const onMove = (e: PointerEvent) => light(e.clientX, e.clientY, 1);

    const running = () => onScreen && document.visibilityState === "visible";
    const setPlaying = () => {
      layer.style.animationPlayState = running() ? "running" : "paused";
      window.clearInterval(ambient);
      if (!running()) return;
      ambient = window.setInterval(() => {
        // Ambient cells favour the right-hand side, where the evidence trail sits.
        const r = area.getBoundingClientRect();
        light(r.left + r.width * (0.45 + Math.random() * 0.55), r.top + r.height * Math.random(), 0.6);
      }, AMBIENT_EVERY_MS);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(layer);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      setPlaying();
    });
    io.observe(area);
    area.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", setPlaying);
    resize();
    setPlaying();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(ambient);
      ro.disconnect();
      io.disconnect();
      area.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", setPlaying);
    };
  }, [cell]);

  const line = "rgba(15, 27, 23, 0.07)";
  return (
    <div ref={wrapRef} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={layerRef}
        className="ledger-drift absolute"
        style={
          {
            inset: -cell,
            "--cell": `${cell}px`,
            backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
            backgroundSize: `${cell}px ${cell}px`,
          } as CSSProperties
        }
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
