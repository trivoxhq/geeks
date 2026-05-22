"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { servicesMenu } from "@/data/navigation";
import {
  animateCardHover,
  animateMegaMenuCards,
  fadeSlideDown,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

interface MegaMenuTriggerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onTriggerEnter: () => void;
  onTriggerLeave: () => void;
  isLight?: boolean;
}

/** Services nav button — dropdown is rendered in Header for center alignment */
export function MegaMenuTrigger({
  isOpen,
  onClose,
  onToggle,
  onTriggerEnter,
  onTriggerLeave,
  isLight = false,
}: MegaMenuTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "font-primary group flex items-center gap-1.5 px-1 py-2 text-[0.9375rem] font-medium tracking-wide transition-colors duration-[400ms] ease-out",
        isOpen
          ? "text-primary"
          : isLight
            ? "text-white/85 hover:text-white"
            : "text-foreground/85 hover:text-primary"
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls="services-mega-menu"
      onMouseEnter={onTriggerEnter}
      onMouseLeave={onTriggerLeave}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      Services
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
      </motion.span>
    </button>
  );
}

interface MegaMenuDropdownProps {
  isOpen: boolean;
  onPanelEnter: () => void;
  onPanelLeave: () => void;
}

/** Centered mega menu panel — positioned relative to the header */
export function MegaMenuDropdown({
  isOpen,
  onPanelEnter,
  onPanelLeave,
}: MegaMenuDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MegaMenuPanel onMouseEnter={onPanelEnter} onMouseLeave={onPanelLeave} />
      )}
    </AnimatePresence>
  );
}

function MegaMenuPanel({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(
      "[data-service-card]"
    );
    if (cards?.length) {
      animateMegaMenuCards(Array.from(cards), true);
    }
    return () => {
      if (cards?.length) animateMegaMenuCards(Array.from(cards), false);
    };
  }, []);

  return (
    <motion.div
      id="services-mega-menu"
      role="region"
      aria-label="Services"
      variants={fadeSlideDown}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 right-0 top-full z-50 hidden justify-center pt-4 lg:flex"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="site-container w-full">
        <div
          ref={panelRef}
          className="mx-auto w-full overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-elevated backdrop-blur-2xl"
        >
          {/* Gradient accent bar */}
          <div className="h-1 w-full bg-linear-to-r from-primary via-secondary to-primary-light" />

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-secondary text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Our Services
                </p>
                <h3 className="font-secondary mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                  Digital automation solutions
                </h3>
              </div>
              <Link
                href="/services"
                className="font-primary hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark sm:inline-flex"
              >
                View all services
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <motion.div
              ref={cardsRef}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
            >
              {servicesMenu.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.id} variants={staggerItem}>
                    <ServiceCard service={service} Icon={Icon} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  Icon,
}: {
  service: (typeof servicesMenu)[number];
  Icon: (typeof servicesMenu)[number]["icon"];
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={cardRef}
      href={service.href}
      data-service-card
      className="group relative flex gap-4 rounded-xl border border-border/60 bg-white/50 p-4 transition-colors duration-300 hover:border-primary/30 hover:bg-white/90 sm:p-5"
      onMouseEnter={() => animateCardHover(cardRef.current, true)}
      onMouseLeave={() => animateCardHover(cardRef.current, false)}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-secondary text-base font-semibold text-foreground group-hover:text-primary">
            {service.title}
          </h4>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </div>
        <p className="font-primary mt-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
    </Link>
  );
}
