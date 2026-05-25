"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { successStoriesContent } from "@/data/successStories";
import {
  animateButtonHover,
  bulletStaggerItem,
  sectionFadeUp,
  sectionStagger,
} from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

export default function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const { title, description, calendlyUrl, buttons } = successStoriesContent;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-success-orb]");
      const orbTweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 20 : -16,
            y: i % 2 === 0 ? -12 : 10,
            duration: 16 + i * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );

      return () => {
        if (Array.isArray(orbTweens)) orbTweens.forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-[#eef3fa] via-white to-[#f8fafc] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="success-stories-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-success-orb
          className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
        />
        <div
          data-success-orb
          className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-secondary/12 blur-[90px]"
        />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(74,112,169,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.035)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left — content + CTAs */}
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col lg:max-w-xl lg:py-4"
          >
            <motion.span
              variants={bulletStaggerItem}
              className="font-primary mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Client results
            </motion.span>

            <motion.h2
              id="success-stories-heading"
              variants={bulletStaggerItem}
              className={sectionHeadingClassName}
            >
              {title}
            </motion.h2>

            <motion.p
              variants={bulletStaggerItem}
              className="font-primary mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              variants={bulletStaggerItem}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  ref={primaryBtnRef}
                  href={buttons.primary.href}
                  className="btn btn-primary btn-lg group inline-flex w-full gap-2 shadow-[0_0_40px_-10px_rgba(74,112,169,0.55)] transition-shadow duration-300 hover:shadow-[0_0_48px_-8px_rgba(74,112,169,0.65)] sm:w-auto"
                  onMouseEnter={() =>
                    animateButtonHover(primaryBtnRef.current, true)
                  }
                  onMouseLeave={() =>
                    animateButtonHover(primaryBtnRef.current, false)
                  }
                >
                  {buttons.primary.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>

              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  ref={secondaryBtnRef}
                  href={buttons.secondary.href}
                  className="btn btn-outline btn-lg group inline-flex w-full gap-2 border-primary/40 bg-white/70 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_28px_-10px_rgba(74,112,169,0.35)] sm:w-auto"
                  onMouseEnter={() =>
                    animateButtonHover(secondaryBtnRef.current, true)
                  }
                  onMouseLeave={() =>
                    animateButtonHover(secondaryBtnRef.current, false)
                  }
                >
                  {buttons.secondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Calendly */}
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="w-full"
          >
            <div className="rounded-2xl border border-primary/10 bg-white/80 p-3 backdrop-blur-sm sm:rounded-3xl sm:p-4">
              <div className="mb-3 flex items-center gap-2 border-b border-primary/10 pb-3 sm:mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Calendar className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-secondary text-sm font-semibold text-foreground">
                    Book a free consultation
                  </p>
                  <p className="font-primary text-xs text-muted-foreground">
                    Pick a time that works for you
                  </p>
                </div>
              </div>

              <CalendlyEmbed
                url={calendlyUrl}
                className="h-[580px] sm:h-[630px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
