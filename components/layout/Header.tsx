"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiMenu2Line } from "react-icons/ri";
import { Logo } from "@/components/layout/header/Logo";
import {
  MegaMenuDropdown,
  MegaMenuTrigger,
} from "@/components/layout/header/MegaMenu";
import { MobileMenu } from "@/components/layout/header/MobileMenu";
import { NavLink } from "@/components/layout/header/NavLink";
import { contactCta, mainNavLinks } from "@/data/navigation";
import { animateButtonHover } from "@/lib/animations";
import { usePageTransitionOptional } from "@/components/layout/PageTransitionProvider";
import { isHeroOverlayRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;

export default function Header() {
  const pathname = usePathname();
  const pageTransition = usePageTransitionOptional();
  const visualPathname = pageTransition?.visualPathname ?? pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const megaCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelMegaClose = useCallback(() => {
    if (megaCloseTimeoutRef.current) {
      clearTimeout(megaCloseTimeoutRef.current);
      megaCloseTimeoutRef.current = null;
    }
  }, []);

  const scheduleMegaClose = useCallback(() => {
    cancelMegaClose();
    megaCloseTimeoutRef.current = setTimeout(() => setIsMegaOpen(false), 120);
  }, [cancelMegaClose]);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
  }, []);

  /* rAF-throttled scroll listener — avoids flicker and excess re-renders */
  useEffect(() => {
    handleScroll();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        /* Close mega menu only when the user scrolls, not because isScrolled is true */
        setIsMegaOpen((open) => (open ? false : open));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (megaCloseTimeoutRef.current) clearTimeout(megaCloseTimeoutRef.current);
    };
  }, []);

  const closeMega = () => setIsMegaOpen(false);
  const openMega = () => setIsMegaOpen(true);
  const toggleMega = () => setIsMegaOpen((prev) => !prev);

  const openMobile = () => {
    setIsMegaOpen(false);
    setIsMobileOpen(true);
  };

  const closeMobile = () => setIsMobileOpen(false);

  const isHeroOverlay = isHeroOverlayRoute(visualPathname);
  const isSolidHeader = isScrolled || !isHeroOverlay;
  const isLightHeader = isHeroOverlay && !isScrolled;

  return (
    <>
      <header
        className={cn(
          /* Absolute over hero at top; fixed when scrolled for sticky feel */
          "left-0 right-0 top-0 z-50 w-full",
          "transition-[padding,background-color,box-shadow,border-color,backdrop-filter,color] duration-(--page-transition-duration,480ms) ease-(--page-transition-ease,cubic-bezier(0.22,1,0.36,1))",
          isSolidHeader ? "fixed" : "absolute",
          isSolidHeader
            ? "border-b border-black/[0.06] bg-white/80 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_20px_-4px_rgba(0,0,0,0.08)] backdrop-blur-md backdrop-saturate-150 sm:py-3"
            : "border-b border-transparent bg-transparent py-4 sm:py-5"
        )}
        role="banner"
      >
        <div className="site-container">
          {/* Desktop: logo | center nav | CTA — Mobile: logo | menu */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            {/* Logo */}
            <div className="justify-self-start">
              <Logo isLight={isLightHeader} />
            </div>

            {/* Desktop navigation — centered */}
            <nav
              className="relative hidden items-center justify-center gap-8 lg:flex lg:gap-10"
              aria-label="Main navigation"
            >
              {mainNavLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  isLight={isLightHeader}
                />
              ))}

              <MegaMenuTrigger
                isOpen={isMegaOpen}
                onOpen={openMega}
                onClose={closeMega}
                onToggle={toggleMega}
                isLight={isLightHeader}
                onTriggerEnter={() => {
                  cancelMegaClose();
                  openMega();
                }}
                onTriggerLeave={scheduleMegaClose}
              />
            </nav>

            {/* Right actions */}
            <div className="flex items-center justify-end gap-3 justify-self-end">
              <Link
                ref={ctaRef}
                href={contactCta.href}
                className="btn btn-primary hidden shadow-soft lg:inline-flex"
                onMouseEnter={() => animateButtonHover(ctaRef.current, true)}
                onMouseLeave={() => animateButtonHover(ctaRef.current, false)}
              >
                {contactCta.label}
              </Link>

              {/* Mobile menu toggle */}
              <motion.button
                type="button"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border border-transparent bg-transparent transition-[color,opacity] duration-[400ms] ease-out lg:hidden",
                  isLightHeader
                    ? "text-white hover:opacity-80"
                    : "text-foreground hover:text-primary"
                )}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                onClick={() => (isMobileOpen ? closeMobile() : openMobile())}
                whileTap={{ scale: 0.94 }}
              >
                <motion.span
                  animate={isMobileOpen ? { rotate: 90, opacity: 0.6 } : { rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <RiMenu2Line className="h-5 w-5" aria-hidden />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Centered mega menu — full header width */}
        <MegaMenuDropdown
          isOpen={isMegaOpen}
          onPanelEnter={cancelMegaClose}
          onPanelLeave={scheduleMegaClose}
        />
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
}
