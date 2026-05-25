"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { InfoBannerCard } from "@/components/sections/about/InfoBannerCard";
import { aboutInfoBannerContent, aboutInfoCards } from "@/data/aboutInfoBanner";
import {
  infoBannerMasonryStagger,
  initInfoBannerCardsMotion,
  sectionFadeUp,
  sectionStagger,
} from "@/lib/animations";

const viewport = { once: true, margin: "-80px" as const };

export default function InfoBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = masonryRef.current?.querySelectorAll<HTMLElement>(
        "[data-info-card]"
      );
      if (!cards?.length) return () => {};

      return initInfoBannerCardsMotion(
        sectionRef.current,
        Array.from(cards),
        prefersReducedMotion
      );
    },
    { scope: sectionRef }
  );

  const [commitCard, researchCard, deliverCard] = aboutInfoCards;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="about-info-banner-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-secondary/14 blur-[90px]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Left — editorial content */}
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col lg:max-w-xl"
          >
            <motion.span
              variants={sectionFadeUp}
              className="font-primary mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Our story
            </motion.span>

            <motion.h2
              id="about-info-banner-heading"
              variants={sectionFadeUp}
              className="font-secondary text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              {aboutInfoBannerContent.heading}
            </motion.h2>

            <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
              {aboutInfoBannerContent.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={sectionFadeUp}
                  className="font-primary text-base leading-[1.75] text-muted-foreground sm:text-lg sm:leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right — masonry cards */}
          <motion.div
            ref={masonryRef}
            variants={infoBannerMasonryStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex w-full justify-center"
          >
            {/* Desktop / tablet masonry */}
            <div className="hidden w-full max-w-lg gap-4 sm:grid sm:grid-cols-2 sm:items-center sm:gap-5 lg:max-w-none">
              {commitCard && <InfoBannerCard card={commitCard} />}
              <div className="flex flex-col justify-center gap-4 sm:gap-5">
                {researchCard && <InfoBannerCard card={researchCard} />}
                {deliverCard && <InfoBannerCard card={deliverCard} />}
              </div>
            </div>

            {/* Mobile — vertical stack */}
            <div className="flex w-full max-w-md flex-col gap-4 sm:hidden">
              {aboutInfoCards.map((card) => (
                <InfoBannerCard key={card.id} card={card} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
