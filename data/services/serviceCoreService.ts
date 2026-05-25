export const SERVICE_CORE_SERVICE_ICON_NAMES = [
  "package-search",
  "trending-up",
  "warehouse",
  "truck",
  "headphones",
  "star",
  "shield-check",
  "bar-chart-3",
] as const;

export type ServiceCoreServiceIconName =
  (typeof SERVICE_CORE_SERVICE_ICON_NAMES)[number];

export interface ServiceCoreServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceCoreServiceIconName;
}

export interface ServiceCoreServicesContent {
  title: string;
  services: readonly ServiceCoreServiceItem[];
}
