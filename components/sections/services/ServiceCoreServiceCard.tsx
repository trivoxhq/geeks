"use client";

import { createElement, useRef } from "react";
import { motion } from "framer-motion";
import { getServiceCoreServiceIcon } from "@/components/sections/services/serviceCoreServiceIcons";
import type { ServiceCoreServiceItem } from "@/data/services/serviceCoreService";
import { animateCardHover, coreServicesCardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ServiceCoreServiceCardProps {
  service: ServiceCoreServiceItem;
  className?: string;
}

export function ServiceCoreServiceCard({
  service,
  className,
}: ServiceCoreServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <motion.article variants={coreServicesCardItem} className={cn("h-full", className)}>
      <div
        ref={cardRef}
        onMouseEnter={() => animateCardHover(cardRef.current, true)}
        onMouseLeave={() => animateCardHover(cardRef.current, false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/12 bg-linear-to-br from-white/95 via-white/90 to-primary/[0.06] p-6 shadow-[0_4px_24px_-8px_rgba(74,112,169,0.12)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/28 sm:p-7"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/8 blur-2xl transition-opacity duration-500 group-hover:bg-primary/14"
          aria-hidden
        />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/18 to-secondary/25 text-primary shadow-[0_0_24px_-6px_rgba(74,112,169,0.35)] ring-1 ring-primary/12 transition-transform duration-300 group-hover:scale-105">
          {createElement(getServiceCoreServiceIcon(service.icon), {
            className: "h-5 w-5",
            strokeWidth: 2,
            "aria-hidden": true,
          })}
        </span>
        <h3 className="font-secondary relative mt-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {service.title}
        </h3>
        <p className="font-primary relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}
