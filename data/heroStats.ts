export interface HeroClientSlide {
  id: string;
  name: string;
  sales: string;
  period: string;
}

export interface HeroProgressMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface HeroBarPoint {
  label: string;
  value: number;
}

export const heroCircleMetric = {
  value: 78,
  label: "Revenue target",
  sublabel: "Q1 achieved",
};

export const heroBarChart: HeroBarPoint[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 71 },
  { label: "Apr", value: 65 },
  { label: "May", value: 88 },
  { label: "Jun", value: 94 },
];

export const heroClientSlides: HeroClientSlide[] = [
  { id: "1", name: "Chloe M.", sales: "$124K", period: "Monthly sales" },
  { id: "2", name: "James T.", sales: "$89K", period: "Monthly sales" },
  { id: "3", name: "Alyssa R.", sales: "$156K", period: "Monthly sales" },
  { id: "4", name: "Maddie K.", sales: "$203K", period: "Monthly sales" },
  { id: "5", name: "Priya S.", sales: "$178K", period: "Monthly sales" },
];

export const heroProgressMetrics: HeroProgressMetric[] = [
  { id: "roas", label: "ROAS uplift", value: 89, suffix: "%" },
  { id: "conv", label: "Conversion rate", value: 67, suffix: "%" },
  { id: "ret", label: "Retention", value: 94, suffix: "%" },
  { id: "sku", label: "SKU velocity", value: 52, suffix: "%" },
];
