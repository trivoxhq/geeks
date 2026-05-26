import {
  BarChart3,
  LineChart,
  Megaphone,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { ServiceBenefitIconName } from "@/data/services/serviceBenefit";

export const serviceBenefitIcons: Record<ServiceBenefitIconName, LucideIcon> = {
  store: Store,
  "shopping-bag": ShoppingBag,
  megaphone: Megaphone,
  package: Package,
  "shield-check": ShieldCheck,
  search: Search,
  "bar-chart-3": BarChart3,
  "line-chart": LineChart,
};

export function getServiceBenefitIcon(name: ServiceBenefitIconName): LucideIcon {
  return serviceBenefitIcons[name];
}
