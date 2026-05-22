export interface TestimonialStory {
  id: string;
  name: string;
  role: string;
  metric: string;
  metricLabel: string;
  quote: string;
  initials: string;
  accent: string;
  /** Soft gradient for inactive carousel cards */
  cardTint: string;
}

export const realStoriesContent = {
  title: "Real Stories, Real Results",
  subtitle:
    "Discover how we've transformed businesses and built lasting partnerships across marketplaces.",
};

export const testimonialStories: TestimonialStory[] = [
  {
    id: "chloe",
    name: "Chloe M.",
    role: "Amazon FBA Brand Owner",
    metric: "+142%",
    metricLabel: "Revenue growth",
    quote:
      "EcomScaled rebuilt our listing strategy and fulfillment flow. Within months we scaled profitably without adding headcount — the team feels like an extension of ours.",
    initials: "CM",
    accent: "from-primary to-primary-light",
    cardTint: "from-primary/14 via-white to-primary/6",
  },
  {
    id: "alyssa",
    name: "Alyssa R.",
    role: "Etsy Handmade Shop",
    metric: "3.2×",
    metricLabel: "Order volume",
    quote:
      "From SEO to customer support automation, everything was customized to our brand voice. Our shop finally runs smoothly while we focus on product design.",
    initials: "AR",
    accent: "from-secondary to-primary-light",
    cardTint: "from-secondary/20 via-white to-primary/8",
  },
  {
    id: "maddie",
    name: "Maddie K.",
    role: "TikTok Shop Seller",
    metric: "+89%",
    metricLabel: "ROAS improvement",
    quote:
      "Their content and ads playbook turned our viral moments into repeatable sales. Transparent reporting and fast communication made all the difference.",
    initials: "MK",
    accent: "from-[#5a7fa8] to-secondary",
    cardTint: "from-[#8fabd4]/25 via-white to-primary/10",
  },
  {
    id: "james",
    name: "James T.",
    role: "Shopify DTC Brand",
    metric: "+67%",
    metricLabel: "Conversion rate",
    quote:
      "Cart recovery flows and CRO updates paid for themselves in the first quarter. We trust them with the systems that drive our growth.",
    initials: "JT",
    accent: "from-primary-dark to-primary",
    cardTint: "from-primary-dark/12 via-[#f4f7fb] to-primary/10",
  },
  {
    id: "priya",
    name: "Priya S.",
    role: "Walmart Marketplace",
    metric: "+210%",
    metricLabel: "Buy Box wins",
    quote:
      "Inventory sync, WFS setup, and sponsored ads were handled end-to-end. We went from reactive firefighting to a clear scaling plan.",
    initials: "PS",
    accent: "from-[#6b8fc4] to-primary",
    cardTint: "from-primary/12 via-white to-secondary/18",
  },
];
