import type { ServiceBenefitItem } from "@/data/services/serviceBenefit";

export const walmartServiceBenefits = {
  title:
    "Benefits of launching Walmart Marketplace Services with EcomScaled",
  benefits: [
    {
      id: "compliant-store",
      title: "A compliant and fully set up Walmart store",
      description:
        "We ensure your Walmart store is set up correctly, following all compliance standards so you can start selling without delays.",
      icon: "shield-check",
    },
    {
      id: "seo-listings",
      title: "SEO-optimized listings with strategic pricing",
      description:
        "Product listings are fully optimized with high-ranking keywords and competitive pricing strategies to boost visibility and conversions.",
      icon: "search",
    },
    {
      id: "competitive-analysis",
      title: "Competitive analysis for product positioning",
      description:
        "We analyze top competitors to position your products effectively, giving you a strong edge in a crowded marketplace.",
      icon: "bar-chart-3",
    },
    {
      id: "insights-reporting",
      title: "Insights and reporting to track sales",
      description:
        "Stay informed with clear, actionable reports that help you monitor performance and make smarter business decisions.",
      icon: "line-chart",
    },
  ] satisfies readonly ServiceBenefitItem[],
} as const;
