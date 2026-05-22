"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { CoreServiceItem } from "@/data/coreServices";
import { animateCardHover, coreServicesCardItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: CoreServiceItem;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  return (
    <motion.div variants={coreServicesCardItem} className={cn("h-full", className)}>
      <div
        ref={cardRef}
        role="article"
        onMouseEnter={() => animateCardHover(cardRef.current, true)}
        onMouseLeave={() => animateCardHover(cardRef.current, false)}
        className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white/90 p-5 shadow-card backdrop-blur-sm transition-[border-color] duration-300 hover:border-primary/25 sm:p-6"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-secondary/20 text-primary">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>
        <h3 className="font-secondary mt-4 text-lg font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>
        <p className="font-primary mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
