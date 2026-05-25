/** Routes where the header overlays the hero (transparent, light nav at top) */
export const HERO_OVERLAY_ROUTES = ["/", "/about"] as const;

export type HeroOverlayRoute = (typeof HERO_OVERLAY_ROUTES)[number];

export function normalizeRoutePath(path: string): string {
  const base = path.split("?")[0]?.split("#")[0] || "/";
  return base.endsWith("/") && base.length > 1 ? base.slice(0, -1) : base || "/";
}

export function isHeroOverlayRoute(path: string): boolean {
  const normalized = normalizeRoutePath(path);
  if ((HERO_OVERLAY_ROUTES as readonly string[]).includes(normalized)) return true;
  return normalized.startsWith("/services/");
}
