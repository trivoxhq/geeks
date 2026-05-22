"use client";

import { useEffect, useRef } from "react";
import { initHeroWaveCanvas } from "@/lib/animations";

/** Full-viewport fixed wave canvas — sits behind header and hero on home */
export function HeroWaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanup = initHeroWaveCanvas(canvas, container, prefersReducedMotion);
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 top-0 left-0 z-0 h-[100dvh] min-h-screen w-full"
      aria-hidden
    >
      <div className="absolute inset-0 h-full min-h-full w-full bg-black" />
      <div className="absolute inset-0 h-full min-h-full w-full bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,rgba(74,112,169,0.16),transparent_65%)]" />
      <div className="absolute inset-0 h-full min-h-full w-full bg-[radial-gradient(ellipse_80%_60%_at_50%_85%,rgba(143,171,212,0.1),transparent_60%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full min-h-full w-full"
      />
      <div className="absolute inset-0 h-full min-h-full w-full opacity-[0.025] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[3rem_3rem]" />
    </div>
  );
}
