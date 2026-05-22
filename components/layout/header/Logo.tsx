"use client";

import Link from "next/link";
import { useRef } from "react";
import { animateLogoHover } from "@/lib/animations";

interface LogoProps {
  /** Light text for dark/transparent header (hero) */
  isLight?: boolean;
}

export function Logo({ isLight = false }: LogoProps) {
  const logoRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={logoRef}
      href="/"
      aria-label="Geeks — Home"
      className="group relative inline-flex shrink-0 items-center"
      onMouseEnter={() => animateLogoHover(logoRef.current, true)}
      onMouseLeave={() => animateLogoHover(logoRef.current, false)}
    >
      <span className="font-secondary text-[1.65rem] font-bold leading-none tracking-tight sm:text-[1.85rem]">
        <span className="bg-linear-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
          Ge
        </span>
        <span
          className={
            isLight
              ? "text-white transition-colors duration-[400ms] ease-out group-hover:text-secondary"
              : "text-black transition-colors duration-[400ms] ease-out group-hover:text-primary"
          }
        >
          eks
        </span>
      </span>
      <span
        className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full"
        aria-hidden
      />
    </Link>
  );
}
