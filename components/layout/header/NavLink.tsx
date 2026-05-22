"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navUnderline } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  className?: string;
  /** Light text for dark/transparent header */
  isLight?: boolean;
}

export function NavLink({
  href,
  label,
  isActive,
  className,
  isLight = false,
}: NavLinkProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn("relative", className)}
    >
      <Link
        href={href}
        className={cn(
          "font-primary relative inline-block px-1 py-2 text-[0.9375rem] font-medium tracking-wide transition-colors duration-[400ms] ease-out",
          isActive
            ? "text-primary"
            : isLight
              ? "text-white/85 hover:text-white"
              : "text-foreground/85 hover:text-primary"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
      <motion.span
        variants={navUnderline}
        initial="rest"
        animate={isActive ? "hover" : "rest"}
        whileHover="hover"
        className={cn(
          "absolute bottom-0 left-0 right-0 mx-auto h-[2px] w-full rounded-full",
          isActive ? "bg-primary" : "bg-primary/90"
        )}
        aria-hidden
      />
    </motion.div>
  );
}
