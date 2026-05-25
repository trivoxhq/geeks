export interface ServicePricingPlan {
  id: string;
  title: string;
  features: readonly string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export interface ServicePricingContent {
  title: string;
  subtitle: string;
  plans: readonly ServicePricingPlan[];
}
