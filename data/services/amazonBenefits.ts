import type { ServiceBenefitItem } from "@/data/services/serviceBenefit";

export const amazonServiceBenefits = {
  title:
    "Benefits of launching Amazon Account & Listing Management Services with EcomScaled",
  benefits: [
    {
      id: "storefront",
      title: "Fully optimized Amazon storefront",
      description:
        "We design your storefront to reflect your brand and boost customer trust, leading to higher engagement and sales.",
      icon: "store",
    },
    {
      id: "product-pages",
      title: "High-converting product pages",
      description:
        "Each product page is crafted with compelling copy, optimized images, and strategic SEO to drive conversions.",
      icon: "shopping-bag",
    },
    {
      id: "advertising",
      title: "Strategic advertising campaigns",
      description:
        "From Sponsored Ads to DSP, we manage data-driven campaigns that deliver measurable ROI and scalable growth.",
      icon: "megaphone",
    },
    {
      id: "fulfillment",
      title: "Inventory and fulfillment support",
      description:
        "Never go out of stock or overspend. We streamline your inventory and fulfillment to match demand and reduce waste.",
      icon: "package",
    },
  ] satisfies readonly ServiceBenefitItem[],
} as const;
