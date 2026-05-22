import gsap from "gsap";

export type PageTransitionDirection = "forward" | "back" | "neutral";

const EASE_SMOOTH = "power2.inOut";
const DURATION = 0.42;

export function prefersReducedPageMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

export function getPageTransitionDirection(
  fromPath: string,
  toPath: string
): PageTransitionDirection {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);

  if (to === "/contact" && from !== "/contact") return "forward";
  if (from === "/contact" && to !== "/contact") return "back";
  return "neutral";
}

function normalizePath(path: string): string {
  const base = path.split("?")[0]?.split("#")[0] || "/";
  return base.endsWith("/") && base.length > 1 ? base.slice(0, -1) : base || "/";
}

/** Sets direction on <html> for CSS view-transition variants */
export function applyTransitionDirection(direction: PageTransitionDirection) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.vtDirection = direction;
  document.documentElement.dataset.vtActive = "true";
}

export function clearTransitionDirection() {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset.vtDirection;
  delete document.documentElement.dataset.vtActive;
}

/**
 * GSAP fallback when View Transitions API is unavailable.
 * Kept minimal — transform + opacity only (no blur/3D).
 */
export function gsapPageEnterFallback(root: HTMLElement) {
  if (prefersReducedPageMotion()) {
    gsap.set(root, { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.killTweensOf(root);
  gsap.fromTo(
    root,
    { opacity: 0 },
    {
      opacity: 1,
      duration: DURATION,
      ease: EASE_SMOOTH,
      clearProps: "opacity",
    }
  );
}

export function gsapPageExitFallback(root: HTMLElement) {
  if (prefersReducedPageMotion()) return;

  gsap.killTweensOf(root);
  return gsap.to(root, {
    opacity: 0,
    duration: DURATION * 0.85,
    ease: EASE_SMOOTH,
  });
}
