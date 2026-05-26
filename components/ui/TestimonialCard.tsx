"use client";

import { useRef } from "react";
import { Quote, Star, TrendingUp } from "lucide-react";
import type { TestimonialStory } from "@/data/realStories";
import { animateCardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  story: TestimonialStory;
  isActive?: boolean;
}

export function TestimonialCard({ story, isActive = false }: TestimonialCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => isActive && animateCardHover(cardRef.current, true)}
      onMouseLeave={() => isActive && animateCardHover(cardRef.current, false)}
      className={cn(
        "relative flex h-full min-h-[300px] w-full max-w-[360px] flex-col rounded-2xl border p-6 transition-all duration-500 sm:min-h-[340px] sm:rounded-3xl sm:p-8",
        isActive
          ? "z-10 scale-100 border-primary/25 bg-white shadow-[0_20px_50px_-12px_rgba(74,112,169,0.3)]"
          : cn(
              "scale-[0.94] border-primary/10 bg-linear-to-br shadow-[0_10px_28px_-10px_rgba(74,112,169,0.2)]",
              story.cardTint
            )
      )}
    >
      <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden />
        {story.metric} {story.metricLabel}
      </span>

      <div className="flex gap-0.5 pt-1" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
            aria-hidden
          />
        ))}
      </div>

      <Quote
        className="mt-5 h-auto w-7 text-primary/25"
        strokeWidth={1.5}
        aria-hidden
      />

      <blockquote
        className={cn(
          "font-primary mt-4 flex-1 text-sm leading-relaxed sm:text-base",
          isActive
            ? "italic text-foreground/90"
            : "text-muted-foreground"
        )}
      >
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
        <span className="relative shrink-0">
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br text-sm font-semibold text-white",
              story.accent
            )}
          >
            {story.initials}
          </span>
          {isActive && (
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400"
              aria-hidden
            />
          )}
        </span>
        <div>
          <p className="font-secondary text-base font-semibold text-foreground">
            {story.name}
          </p>
          <p className="font-primary text-xs text-muted-foreground sm:text-sm">
            {story.role}
          </p>
        </div>
      </footer>
    </article>
  );
}
