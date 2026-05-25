"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { CONTACT_FORM_TYPES } from "@/data/contactForm";
import { ConsultationModal } from "@/components/ui/ConsultationModal";
import { PricingPlanCard } from "@/components/sections/services/PricingPlanCard";
import type { ServicePricingContent } from "@/data/services/servicePricing";
import { coreServicesGridStagger, sectionFadeUp } from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

export interface ServicePricingProps extends ServicePricingContent {
  headingId?: string;
  /** Default service slug for modal pre-select */
  defaultService?: string;
  className?: string;
}

export function ServicePricing({
  title,
  subtitle,
  plans,
  headingId = "service-pricing-heading",
  defaultService = "amazon",
  className,
}: ServicePricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; title: string } | null>(
    null
  );

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-pricing-orb]");
      const tweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 18 : -14,
            y: i % 2 === 0 ? -10 : 12,
            duration: 15 + i * 2,
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

  const openModal = (planId: string, planTitle: string) => {
    setSelectedPlan({ id: planId, title: planTitle });
    setModalOpen(true);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={cn(
          "relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20",
          className
        )}
        aria-labelledby={headingId}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            data-pricing-orb
            className="absolute -left-28 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
          />
          <div
            data-pricing-orb
            className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/12 blur-[90px]"
          />
        </div>

        <div className="site-container relative">
          <motion.header
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14"
          >
            <h2
              id={headingId}
              className={sectionHeadingClassName}
            >
              {title}
            </h2>
            <p className="font-primary mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </motion.header>

          <motion.div
            variants={coreServicesGridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
          >
            {plans.map((plan) => (
              <PricingPlanCard key={plan.id} plan={plan} onPurchase={openModal} />
            ))}
          </motion.div>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={defaultService}
        planName={selectedPlan?.title}
        formType={CONTACT_FORM_TYPES.PRICING_FORM}
      />
    </>
  );
}
