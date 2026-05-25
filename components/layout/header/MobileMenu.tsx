"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import {
  contactCta,
  mainNavLinks,
  servicesMenu,
} from "@/data/navigation";
import {
  chevronRotate,
  fadeSlideUp,
  mobileDrawer,
  overlayFade,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { lockBodyScroll } from "@/lib/scrollLock";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={mobileDrawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-70 flex h-full w-full max-w-[min(100%,22rem)] flex-col border-l border-white/20 bg-white/95 shadow-elevated backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-5">
              <span className="font-secondary text-lg font-bold tracking-tight">
                <span className="text-primary">Ge</span>
                <span className="text-black">eks</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1"
              >
                {mainNavLinks.map((link) => (
                  <motion.li key={link.href} variants={staggerItem}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="font-primary block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}

                {/* Collapsible Services */}
                <motion.li variants={staggerItem} className="mt-2">
                  <button
                    type="button"
                    className="font-primary flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    aria-expanded={servicesExpanded}
                    onClick={() => setServicesExpanded((prev) => !prev)}
                  >
                    Services
                    <motion.span
                      variants={chevronRotate}
                      animate={servicesExpanded ? "open" : "closed"}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {servicesExpanded && (
                      <motion.ul
                        variants={fadeSlideUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 space-y-1 border-l-2 border-primary/20 pl-4"
                      >
                        {servicesMenu.map((service) => {
                          const Icon = service.icon;
                          return (
                            <li key={service.id}>
                              <Link
                                href={service.href}
                                onClick={onClose}
                                className="flex gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  <Icon className="h-4 w-4" aria-hidden />
                                </span>
                                <span className="min-w-0">
                                  <span className="font-secondary block text-sm font-semibold text-foreground">
                                    {service.title}
                                  </span>
                                  <span className="font-primary mt-0.5 block text-xs leading-snug text-muted-foreground line-clamp-2">
                                    {service.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              </motion.ul>

              <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="mt-auto pt-8"
              >
                <Link
                  href={contactCta.href}
                  onClick={onClose}
                  className={cn("btn btn-primary w-full justify-center")}
                >
                  {contactCta.label}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
