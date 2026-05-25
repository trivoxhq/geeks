import type { ServicePricingContent } from "@/data/services/servicePricing";

export const amazonServicePricing: ServicePricingContent = {
  title: "Choose the right plan to scale your Amazon business",
  subtitle:
    "Whether you're launching, growing, or dominating the market — we have a package tailored for every stage.",
  plans: [
    {
      id: "starter",
      title: "Starter",
      features: [
        "Product research & niche selection",
        "Account setup assistance",
        "Storefront branding & listing creation",
        "Basic inventory & order management support",
        "Weekly progress updates",
      ],
      ctaLabel: "PURCHASE NOW",
    },
    {
      id: "growth",
      title: "Growth",
      highlighted: true,
      badge: "Recommended",
      features: [
        "Everything in Starter",
        "Advanced product sourcing",
        "Automated pricing & stock sync",
        "Monthly performance reviews",
        "Access to curated supplier network",
      ],
      ctaLabel: "PURCHASE NOW",
    },
    {
      id: "premium",
      title: "Premium",
      features: [
        "Everything in Growth",
        "Full account management",
        "Order processing & returns handled",
        "Premium supplier integration",
        "Dedicated account manager",
        "Priority support + 24/7 dashboard access",
      ],
      ctaLabel: "PURCHASE NOW",
    },
  ],
};
