"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { howWeWorkContent, howWeWorkSteps, type HowWeWorkStep } from "@/data/howWeWork";
import {
  animateCardHover,
  initHowWeWorkScroll,
  processStepItem,
  processStepsStagger,
  sectionFadeUp,
} from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

/** Serpentine connector path — desktop (viewBox 0 0 1000 260) */
const DESKTOP_FLOW_PATH =
  "M 48 56 C 148 56, 168 204, 268 204 S 468 56, 568 56 S 768 204, 868 204 L 952 204";

interface ProcessStepCardProps {
  step: HowWeWorkStep;
  isActive: boolean;
  variant: "desktop" | "mobile";
}

function ProcessStepCard({ step, isActive, variant }: ProcessStepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = step.icon;

  return (
    <motion.article
      ref={cardRef}
      data-process-step
      variants={processStepItem}
      onMouseEnter={() => animateCardHover(cardRef.current, true)}
      onMouseLeave={() => animateCardHover(cardRef.current, false)}
      className={cn(
        "group relative flex w-full flex-col transition-[transform,box-shadow] duration-300",
        variant === "desktop" && "max-w-[220px]",
        variant === "mobile" && "max-w-none pl-14"
      )}
    >
      <div
        className={cn(
          "relative rounded-2xl border bg-white/90 p-4 backdrop-blur-sm transition-all duration-300 sm:p-5",
          isActive
            ? "border-primary/35 shadow-[0_16px_40px_-14px_rgba(74,112,169,0.45)]"
            : "border-primary/10 shadow-card hover:border-primary/20"
        )}
      >
        <div className="flex items-start gap-3">
          <motion.span
            animate={isActive ? { scale: 1.06 } : { scale: 1 }}
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-white shadow-soft",
              step.accentClass
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </motion.span>

          <span
            className="mt-1 inline-flex min-w-[2.25rem] items-center justify-center rounded-md bg-primary px-2 py-1 text-xs font-bold tracking-wider text-white shadow-soft"
            aria-hidden
          >
            {step.step}
          </span>
        </div>

        <h3 className="font-secondary mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {step.title}
        </h3>
        <p className="font-primary mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const setStepRef = useCallback((index: number) => (el: HTMLElement | null) => {
    stepRefs.current[index] = el;
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const orbs = sectionRef.current?.querySelectorAll("[data-work-orb]");
      const orbTweens =
        !prefersReducedMotion && orbs?.length
          ? Array.from(orbs).map((orb, i) =>
              gsap.to(orb, {
                y: i % 2 === 0 ? -18 : 14,
                x: i % 2 === 0 ? 12 : -10,
                duration: 12 + i * 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              })
            )
          : [];

      const scrollCleanup = initHowWeWorkScroll(
        sectionRef.current,
        pathRef.current,
        progressRef.current,
        stepRefs.current.filter(Boolean) as HTMLElement[],
        setActiveStep,
        prefersReducedMotion
      );

      return () => {
        orbTweens.forEach((t) => t.kill());
        scrollCleanup();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-white via-[#f4f7fb] to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="how-we-work-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-work-orb
          className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[90px]"
        />
        <div
          data-work-orb
          className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-secondary/12 blur-[80px]"
        />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <motion.header
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-primary mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Our process
          </span>
          <h2
            id="how-we-work-heading"
            className={sectionHeadingClassName}
          >
            {howWeWorkContent.title}
          </h2>
          <p className="font-primary mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {howWeWorkContent.subtitle}
          </p>
        </motion.header>

        {/* Desktop — serpentine timeline */}
        <motion.div
          variants={processStepsStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mt-14 hidden lg:block lg:mt-16"
        >
          <svg
            className="pointer-events-none absolute inset-x-0 top-8 h-[220px] w-full"
            viewBox="0 0 1000 260"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={DESKTOP_FLOW_PATH}
              fill="none"
              stroke="rgba(74, 112, 169, 0.12)"
              strokeWidth="3"
              strokeDasharray="8 10"
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={pathRef}
              d={DESKTOP_FLOW_PATH}
              fill="none"
              stroke="url(#how-we-work-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="how-we-work-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a70a9" />
                <stop offset="50%" stopColor="#8fabd4" />
                <stop offset="100%" stopColor="#4a70a9" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid min-h-[420px] grid-cols-5 items-start gap-4">
            {howWeWorkSteps.map((step, index) => (
              <div
                key={step.id}
                ref={setStepRef(index)}
                className={cn(
                  "flex justify-center",
                  index % 2 === 0 ? "pt-0" : "pt-36"
                )}
              >
                <ProcessStepCard
                  step={step}
                  isActive={activeStep === index}
                  variant="desktop"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile / tablet — vertical stepper */}
        <motion.div
          variants={processStepsStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mt-12 lg:hidden"
        >
          <div
            className="absolute bottom-0 left-[1.125rem] top-0 w-px bg-primary/15"
            aria-hidden
          />
          <div
            ref={progressRef}
            className="absolute bottom-0 left-[1.125rem] top-0 w-0.5 origin-top bg-linear-to-b from-primary via-secondary to-primary"
            aria-hidden
          />

          <div className="flex flex-col gap-10">
            {howWeWorkSteps.map((step, index) => (
              <div key={step.id} ref={setStepRef(index)} className="relative">
                <span
                  className={cn(
                    "absolute left-0 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white text-xs font-bold transition-colors duration-300",
                    activeStep === index
                      ? "border-primary text-primary shadow-[0_0_20px_-4px_rgba(74,112,169,0.5)]"
                      : "border-primary/20 text-muted-foreground"
                  )}
                  aria-hidden
                >
                  {step.step}
                </span>
                <ProcessStepCard
                  step={step}
                  isActive={activeStep === index}
                  variant="mobile"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
