import {
  Megaphone,
  Package,
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
};

export function getServiceBenefitIcon(name: ServiceBenefitIconName): LucideIcon {
  return serviceBenefitIcons[name];
}
