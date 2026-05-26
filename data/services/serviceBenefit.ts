export const SERVICE_BENEFIT_ICON_NAMES = [
  "store",
  "shopping-bag",
  "megaphone",
  "package",
  "shield-check",
  "search",
  "bar-chart-3",
  "line-chart",
] as const;

export type ServiceBenefitIconName = (typeof SERVICE_BENEFIT_ICON_NAMES)[number];

export interface ServiceBenefitItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceBenefitIconName;
}
