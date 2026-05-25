"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { ExpertContactForm } from "@/components/ui/ExpertContactForm";
import { speakToExpertContent } from "@/data/speakToExpert";
import { sectionFadeUp } from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

export default function SpeakToExpert() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-expert-orb]");
      const tweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 18 : -14,
            y: i % 2 === 0 ? -14 : 12,
            duration: 14 + i * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );

      return () => {
        if (Array.isArray(tweens)) tweens.forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="speak-to-expert"
      className="relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="speak-to-expert-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-expert-orb
          className="absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-primary/12 blur-[110px]"
        />
        <div
          data-expert-orb
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/14 blur-[100px]"
        />
      </div>

      <div className="site-container relative mx-auto flex max-w-3xl flex-col items-center">
        <motion.header
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-10 w-full text-center sm:mb-12"
        >
          <span className="font-primary mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Get in touch
          </span>
          <h2
            id="speak-to-expert-heading"
            className={sectionHeadingClassName}
          >
            {speakToExpertContent.title}
          </h2>
          <p className="font-primary mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {speakToExpertContent.panelDescription}
          </p>
        </motion.header>

        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full"
        >
          <ExpertContactForm idPrefix="expert" animationMode="inView" />
        </motion.div>
      </div>
    </section>
  );
}
