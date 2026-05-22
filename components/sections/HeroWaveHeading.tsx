"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateHeroWaveHeading } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroWaveHeadingProps {
  text: string;
  className?: string;
  align?: "center" | "left";
}

/** Main hero heading with GSAP word wave / ripple motion */
export function HeroWaveHeading({ text, className, align = "center" }: HeroWaveHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      const wordEls = headingRef.current?.querySelectorAll<HTMLElement>(
        "[data-wave-word]"
      );
      if (!wordEls?.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      return animateHeroWaveHeading(Array.from(wordEls), prefersReducedMotion);
    },
    { scope: headingRef, dependencies: [text] }
  );

  return (
    <h1
      ref={headingRef}
      className={cn(
        "font-secondary max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-[3.5rem]",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1",
          align === "left" ? "justify-start" : "justify-center"
        )}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            data-wave-word
            className="bg-linear-to-r from-white via-[#d4e2f4] to-secondary bg-clip-text text-transparent will-change-transform"
          >
            {word}
          </span>
        ))}
      </span>
    </h1>
  );
}
