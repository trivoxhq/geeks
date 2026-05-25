"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { AboutInfoCard } from "@/data/aboutInfoBanner";
import { animateCardHover, infoBannerCardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const variantStyles: Record<
  AboutInfoCard["variant"],
  { padding: string }
> = {
  tall: { padding: "p-6 sm:p-7" },
  medium: { padding: "p-5 sm:p-6" },
  compact: { padding: "p-5 sm:p-6" },
};

interface InfoBannerCardProps {
  card: AboutInfoCard;
  className?: string;
}

export function InfoBannerCard({ card, className }: InfoBannerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;
  const styles = variantStyles[card.variant];

  return (
    <motion.article
      variants={infoBannerCardItem}
      data-info-card
      className={cn(className)}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => animateCardHover(cardRef.current, true)}
        onMouseLeave={() => animateCardHover(cardRef.current, false)}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-primary/12",
          "bg-linear-to-br from-white/95 via-white/85 to-primary/[0.06]",
          "shadow-card backdrop-blur-md transition-[border-color] duration-300",
          "hover:border-primary/28",
          styles.padding
        )}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-secondary/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-80"
          aria-hidden
        />

        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/18 to-secondary/25 text-primary shadow-soft ring-1 ring-primary/10">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>

        <h3 className="font-secondary relative mt-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {card.title}
        </h3>
        <p className="font-primary relative mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}
