"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ServiceBenefitCard } from "@/components/sections/services/ServiceBenefitCard";
import type { ServiceBenefitItem } from "@/data/services/serviceBenefit";
import { coreServicesGridStagger, sectionFadeUp } from "@/lib/animations";
import { sectionHeadingLargeTitleClassName } from "@/lib/sectionTypography";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

export interface ServiceBenefitsProps {
  title: string;
  benefits: readonly ServiceBenefitItem[];
  headingId?: string;
  className?: string;
}

export function ServiceBenefits({
  title,
  benefits,
  headingId = "service-benefits-heading",
  className,
}: ServiceBenefitsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-benefits-orb]");
      const tweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 16 : -14,
            y: i % 2 === 0 ? -12 : 10,
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
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-[#eef3fa] via-white to-[#f8fafc] py-14 text-foreground sm:py-16 lg:py-20",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-benefits-orb
          className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
        />
        <div
          data-benefits-orb
          className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-secondary/12 blur-[90px]"
        />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <motion.header
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mb-10 max-w-4xl text-center sm:mb-12 lg:mb-14"
        >
          <h2
            id={headingId}
            className={sectionHeadingLargeTitleClassName}
          >
            {title}
          </h2>
        </motion.header>

        <motion.div
          variants={coreServicesGridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7"
        >
          {benefits.map((benefit) => (
            <ServiceBenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
