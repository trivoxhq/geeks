"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ServicePricingPlan } from "@/data/services/servicePricing";
import { animateCardHover, coreServicesCardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface PricingPlanCardProps {
  plan: ServicePricingPlan;
  onPurchase: (planId: string, planTitle: string) => void;
}

export function PricingPlanCard({ plan, onPurchase }: PricingPlanCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      variants={coreServicesCardItem}
      className={cn("flex h-full", plan.highlighted && "lg:-mt-2 lg:mb-2")}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => animateCardHover(cardRef.current, true)}
        onMouseLeave={() => animateCardHover(cardRef.current, false)}
        className={cn(
          "relative flex h-full w-full flex-col rounded-2xl border bg-linear-to-b from-white via-white to-primary/[0.04] p-6 shadow-card backdrop-blur-sm transition-[border-color] sm:p-7",
          plan.highlighted
            ? "border-primary/35 shadow-[0_24px_56px_-24px_rgba(74,112,169,0.4)] ring-2 ring-primary/20"
            : "border-primary/12 hover:border-primary/28"
        )}
      >
        {plan.badge && (
          <span className="font-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
            {plan.badge}
          </span>
        )}

        <h3 className="font-secondary text-2xl font-semibold tracking-tight text-foreground">
          {plan.title}
        </h3>

        <ul className="font-primary mt-6 flex-1 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onPurchase(plan.id, plan.title)}
          className={cn(
            "btn btn-lg mt-8 w-full",
            plan.highlighted ? "btn-primary" : "btn-outline"
          )}
        >
          {plan.ctaLabel}
        </button>
      </div>
    </motion.article>
  );
}
