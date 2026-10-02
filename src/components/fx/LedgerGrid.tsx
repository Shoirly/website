"use client";

/**
 * Adapted from react-bits "ShapeGrid" (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind/Backgrounds/ShapeGrid). Trimmed to squares and rebuilt for a
 * light page: a faint ledger grid that drifts slowly, cells under the pointer
 * light up in Seal blue and fade (a short trail), and now and then a cell lights
 * on its own, like a record being signed. Grid lines are drawn as long strokes
 * rather than per cell, and the canvas is DPR-aware.
 *
 * It only runs while on screen and the tab is visible. Under reduced motion it
 * draws one static grid. Decorative: aria-hidden, pointer-events none (pointer
 * input is read from the parent element).
 */
import { useEffect, useRef } from "react";

const LINE = "rgba(15, 27, 23, 0.07)";
const FILL = [49, 87, 240] as const; // Seal blue
const DRIFT = { x: -7, y: -4 }; // px per second
const FADE_MS = 900;
const AMBIENT_EVERY_MS = 1100;

export function LedgerGrid({ cell = 44, className = "" }: { cell?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const offset = { x: 0, y: 0 };
    const lit = new Map<string, number>(); // "col,row" in world grid -> intensity 0..1
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;
    let sinceAmbient = 0;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = ((offset.x % cell) + cell) % cell;
      const oy = ((offset.y % cell) + cell) % cell;

      for (const [key, a] of lit) {
        const [c, r] = key.split(",").map(Number);
        const x = c * cell + offset.x;
        const y = r * cell + offset.y;
        if (x < -cell || y < -cell || x > w || y > h) continue;
        ctx.fillStyle = `rgba(${FILL[0]}, ${FILL[1]}, ${FILL[2]}, ${(a * 0.16).toFixed(3)})`;
        ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1);
      }

      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = ox; x <= w; x += cell) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
      }
      for (let y = oy; y <= h; y += cell) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
      }
      ctx.stroke();
    };

    const cellAt = (px: number, py: number) =>
      `${Math.floor((px - offset.x) / cell)},${Math.floor((py - offset.y) / cell)}`;

    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) : 16;
      last = t;
      offset.x += (DRIFT.x * dt) / 1000;
      offset.y += (DRIFT.y * dt) / 1000;

      if (pointer) lit.set(cellAt(pointer.x, pointer.y), 1);

      sinceAmbient += dt;
      if (sinceAmbient > AMBIENT_EVERY_MS) {
        sinceAmbient = 0;
        // Ambient cells favour the right-hand side, where the evidence trail sits.
        const px = w * (0.45 + Math.random() * 0.55);
        const py = h * Math.random();
        const key = cellAt(px, py);
        if (!lit.has(key)) lit.set(key, 0.6);
      }

      for (const [key, a] of lit) {
        const next = a - dt / FADE_MS;
        if (next <= 0) lit.delete(key);
        else lit.set(key, next);
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduce || raf || !onScreen || document.visibilityState !== "visible") return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      pointer = null;
    };
    const onVisibility = () => (document.visibilityState === "visible" ? start() : stop());

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(parent);
    resize();

    if (!reduce) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [cell]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
