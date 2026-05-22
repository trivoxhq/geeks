"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { HeroServiceCard } from "@/components/ui/HeroServiceCard";
import { HeroStatsPanel } from "@/components/sections/HeroStatsPanel";
import { HeroWaveHeading } from "@/components/sections/HeroWaveHeading";
import { heroContent, heroServices } from "@/data/hero";
import { animateHeroEntrance, heroStagger, heroTextReveal } from "@/lib/animations";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateHeroEntrance(contentRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-center overflow-x-hidden bg-transparent text-white"
      aria-label="Hero"
    >
      <div className="site-container relative z-10 w-full px-5 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Left — copy & services */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col items-start text-left"
          >
            <motion.span
              variants={heroTextReveal}
              className="font-primary mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-secondary"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              E-commerce automation agency
            </motion.span>

            <HeroWaveHeading
              text={heroContent.heading}
              align="left"
              className="mt-1 max-w-none"
            />

            <div ref={contentRef} className="w-full">
              <motion.p
                variants={heroTextReveal}
                className="font-primary mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg sm:leading-relaxed"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                variants={heroTextReveal}
                className="mt-10 w-full sm:mt-12"
              >
                <h2 className="font-secondary mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                  <span
                    className="h-px w-8 bg-linear-to-r from-transparent to-primary"
                    aria-hidden
                  />
                  {heroContent.servicesHeading}
                </h2>

                <motion.div
                  variants={heroStagger}
                  initial="hidden"
                  animate="visible"
                  className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {heroServices.map((service) => (
                    <HeroServiceCard key={service.id} service={service} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — stats, charts & client slider */}
          <div className="w-full lg:max-h-[min(720px,85vh)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1 lg:[scrollbar-width:thin]">
            <HeroStatsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
