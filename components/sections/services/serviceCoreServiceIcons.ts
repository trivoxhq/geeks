import {
  BarChart3,
  Headphones,
  PackageSearch,
  ShieldCheck,
  Star,
  TrendingUp,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCoreServiceIconName } from "@/data/services/serviceCoreService";

export const serviceCoreServiceIcons: Record<ServiceCoreServiceIconName, LucideIcon> =
  {
    "package-search": PackageSearch,
    "trending-up": TrendingUp,
    warehouse: Warehouse,
    truck: Truck,
    headphones: Headphones,
    star: Star,
    "shield-check": ShieldCheck,
    "bar-chart-3": BarChart3,
  };

export function getServiceCoreServiceIcon(
  name: ServiceCoreServiceIconName
): LucideIcon {
  return serviceCoreServiceIcons[name];
}
