"use client";

import { usePathname } from "next/navigation";
import { usePageTransitionOptional } from "@/components/layout/PageTransitionProvider";
import { HeroWaveBackground } from "@/components/sections/HeroWaveBackground";
import { cn } from "@/lib/utils";

/** Global full-viewport hero wave layer — fades with page transitions */
export function HomePageBackground() {
  const pathname = usePathname();
  const pageTransition = usePageTransitionOptional();
  const visualPathname = pageTransition?.visualPathname ?? pathname;
  const showHome = visualPathname === "/";

  return (
    <div
      data-chrome-fade
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-(--page-transition-duration,480ms) ease-(--page-transition-ease,cubic-bezier(0.22,1,0.36,1))",
        showHome ? "opacity-100" : "opacity-0"
      )}
    >
      <HeroWaveBackground />
    </div>
  );
}
