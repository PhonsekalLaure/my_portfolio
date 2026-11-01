"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  born: number;
};

const LIFETIME = 520;
const MAX_POINTS = 40;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preference = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: (() => void) | undefined;

    function configure() {
      dispose?.();
      dispose = undefined;
      if (!preference.matches || !canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // Keep pointer updates outside React and only animate a living trail.
      let points: TrailPoint[] = [];
      let frame = 0;
      let width = 0;
      let height = 0;
      let nextPoint: { x: number; y: number } | undefined;
      let color = "";

      function clear() {
        cancelAnimationFrame(frame);
        frame = 0;
        points = [];
        nextPoint = undefined;
        context!.clearRect(0, 0, width, height);
      }

      function resize() {
        clear();
        width = document.documentElement.clientWidth;
        height = window.innerHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas!.width = Math.round(width * ratio);
        canvas!.height = Math.round(height * ratio);
        context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      function draw(now: number) {
        frame = 0;
        context!.clearRect(0, 0, width, height);

        if (nextPoint) {
          const previous = points.at(-1);
          const distance = previous
            ? Math.hypot(nextPoint.x - previous.x, nextPoint.y - previous.y)
            : 0;
          // A jump between windows should start a fresh stroke.
          if (distance > 180) points = [];
          if (!previous || distance > 0.8) {
            points.push({ ...nextPoint, born: now });
          }
          nextPoint = undefined;
        }

        points = points
          .filter((point) => now - point.born < LIFETIME)
          .slice(-MAX_POINTS);
        context!.strokeStyle = color;
        context!.lineCap = "round";
        context!.lineJoin = "round";

        // Midpoint curves join into one soft, tapered ribbon.
        for (let index = 1; index < points.length; index++) {
          const previous = points[index - 1];
          const before = points[index - 2] ?? previous;
          const point = points[index];
          const freshness = 1 - (now - point.born) / LIFETIME;
          const taper = index / (points.length - 1);
          const strength = freshness ** 2 * taper;
          context!.beginPath();
          context!.moveTo(
            (before.x + previous.x) / 2,
            (before.y + previous.y) / 2,
          );
          context!.quadraticCurveTo(
            previous.x,
            previous.y,
            (previous.x + point.x) / 2,
            (previous.y + point.y) / 2,
          );
          if (index === points.length - 1) context!.lineTo(point.x, point.y);

          context!.globalAlpha = strength * 0.06;
          context!.lineWidth = 5 + taper * 9;
          context!.stroke();
          context!.globalAlpha = strength * 0.55;
          context!.lineWidth = 0.5 + taper * 2.5;
          context!.stroke();
        }

        context!.globalAlpha = 1;
        if (points.length) frame = requestAnimationFrame(draw);
      }

      function onMove(event: PointerEvent) {
        if (event.pointerType !== "mouse" || document.hidden) return;
        nextPoint = {
          x: event.clientX,
          y: event.clientY,
        };
        // Resolve the CSS accent on interaction so theme switches work too.
        color = getComputedStyle(canvas!).color;
        if (!frame) frame = requestAnimationFrame(draw);
      }

      function onLeave() {
        clear();
      }

      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", clear, { passive: true });
      window.addEventListener("blur", clear);
      document.addEventListener("visibilitychange", clear);

      dispose = () => {
        clear();
        window.removeEventListener("resize", resize);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("scroll", clear);
        window.removeEventListener("blur", clear);
        document.removeEventListener("visibilitychange", clear);
      };
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      dispose?.();
      preference.removeEventListener("change", configure);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}
