"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { usePageTransitionOptional } from "@/components/layout/PageTransitionProvider";
import { getPageTransitionDirection } from "@/lib/pageTransition";

type TransitionLinkProps = ComponentProps<typeof Link>;

/**
 * Link that routes through View Transitions + GSAP when the provider is mounted.
 */
export function TransitionLink({
  href,
  onClick,
  scroll = true,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();
  const transition = usePageTransitionOptional();

  const resolveHref = (): string => {
    if (typeof href === "string") return href;
    return href.pathname ?? "/";
  };

  return (
    <Link
      href={href}
      scroll={scroll}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !transition) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

        const target = resolveHref();
        const targetPath = target.split("?")[0]?.split("#")[0] ?? target;

        if (targetPath === pathname && !target.includes("?") && !target.includes("#")) {
          return;
        }

        e.preventDefault();
        transition.navigateWithTransition(target, {
          scroll,
          direction: getPageTransitionDirection(pathname, targetPath),
        });
      }}
    />
  );
}
