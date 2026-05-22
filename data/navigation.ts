import {
  BarChart3,
  Music2,
  Palette,
  ShoppingBag,
  ShoppingCart,
  Store,
  type LucideIcon,
} from "lucide-react";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

/** Primary navigation links (excluding mega menu) */
export const mainNavLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

/** Services mega menu items */
export const servicesMenu: ServiceItem[] = [
  {
    id: "amazon-automation",
    title: "Amazon Automation",
    description:
      "End-to-end Amazon store setup, listing optimization, and hands-free operations.",
    href: "/services/amazon-automation",
    icon: ShoppingBag,
  },
  {
    id: "walmart-automation",
    title: "Walmart Automation",
    description:
      "Scale on Walmart Marketplace with automated inventory and fulfillment workflows.",
    href: "/services/walmart-automation",
    icon: Store,
  },
  {
    id: "shopify-automation",
    title: "Shopify Automation",
    description:
      "Launch and grow Shopify brands with automated catalog and order management.",
    href: "/services/shopify-automation",
    icon: ShoppingCart,
  },
  {
    id: "tiktok-shop-automation",
    title: "TikTok Shop Automation",
    description:
      "Capture social commerce demand with TikTok Shop listing and sales automation.",
    href: "/services/tiktok-shop-automation",
    icon: Music2,
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description:
      "Data-driven paid media across Amazon, Meta, and Google for measurable ROAS.",
    href: "/services/performance-marketing",
    icon: BarChart3,
  },
  {
    id: "etsy-automation",
    title: "Etsy Automation",
    description:
      "Creative marketplace growth with automated listings, SEO, and order flows.",
    href: "/services/etsy-automation",
    icon: Palette,
  },
];

export const contactCta = {
  label: "Contact Us",
  href: "/contact",
};
