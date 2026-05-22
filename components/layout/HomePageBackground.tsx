"use client";

import { usePathname } from "next/navigation";
import { usePageTransitionOptional } from "@/components/layout/PageTransitionProvider";
import { HeroWaveBackground } from "@/components/sections/HeroWaveBackground";

/** Global full-viewport hero wave layer — home page only */
export function HomePageBackground() {
  const pathname = usePathname();
  const pageTransition = usePageTransitionOptional();
  const visualPathname = pageTransition?.visualPathname ?? pathname;

  if (visualPathname !== "/") return null;

  return <HeroWaveBackground />;
}
