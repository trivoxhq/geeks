"use client";

import { createElement, useRef } from "react";
import { motion } from "framer-motion";
import { getServiceBenefitIcon } from "@/components/sections/services/serviceBenefitIcons";
import type { ServiceBenefitItem } from "@/data/services/serviceBenefit";
import { animateCardHover, coreServicesCardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ServiceBenefitCardProps {
  benefit: ServiceBenefitItem;
  className?: string;
}

export function ServiceBenefitCard({ benefit, className }: ServiceBenefitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <motion.article variants={coreServicesCardItem} className={cn("h-full", className)}>
      <div
        ref={cardRef}
        onMouseEnter={() => animateCardHover(cardRef.current, true)}
        onMouseLeave={() => animateCardHover(cardRef.current, false)}
        className="group flex h-full flex-col rounded-2xl border border-primary/12 bg-linear-to-br from-white/95 via-white/88 to-primary/[0.05] p-6 shadow-card backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 sm:p-7"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-secondary/22 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
          {createElement(getServiceBenefitIcon(benefit.icon), {
            className: "h-5 w-5",
            strokeWidth: 2,
            "aria-hidden": true,
          })}
        </span>
        <h3 className="font-secondary mt-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {benefit.title}
        </h3>
        <p className="font-primary mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {benefit.description}
        </p>
      </div>
    </motion.article>
  );
}
