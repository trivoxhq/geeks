import {
  BarChart3,
  Boxes,
  Headphones,
  Mail,
  Music2,
  Package,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface CoreServiceTab {
  id: string;
  label: string;
}

export interface CoreServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const coreServicesHeader = {
  title: "Our Core Services",
  subtitle:
    "End-to-end marketplace automation built to launch faster, operate smarter, and scale revenue across every channel.",
};

export const coreServiceTabs: CoreServiceTab[] = [
  { id: "amazon", label: "Amazon Automation" },
  { id: "etsy", label: "Etsy Automation" },
  { id: "tiktok", label: "TikTok Shop Automation" },
  { id: "walmart", label: "Walmart Automation" },
  { id: "shopify", label: "Shopify Automation" },
  { id: "performance", label: "Performance Marketing" },
];

export const DEFAULT_CORE_TAB_ID = "amazon";

export const amazonAutomationServices: CoreServiceItem[] = [
  {
    id: "supplier-sourcing",
    title: "Supplier Sourcing",
    description:
      "Identifying trustworthy suppliers (Alibaba, local wholesalers), verifying quality, and negotiating best prices.",
    icon: Search,
  },
  {
    id: "listing-optimization",
    title: "Listing Optimization (SEO)",
    description:
      "Regularly updating keywords, images, A+ content, and videos to maintain top search rankings and better CTR.",
    icon: TrendingUp,
  },
  {
    id: "inventory-management",
    title: "Inventory & Stock Management",
    description:
      "Monitoring stock levels, automating restocking, and managing FBA or warehouse shipments to avoid stockouts.",
    icon: Boxes,
  },
  {
    id: "order-fulfillment",
    title: "Order Fulfillment",
    description:
      "Using Amazon FBA or FBM methods to handle order processing, packing, and shipping.",
    icon: Package,
  },
  {
    id: "customer-support",
    title: "Customer Support",
    description:
      "Automating responses to FAQs, reviews, returns, and complaints using software or trained virtual assistants.",
    icon: Headphones,
  },
  {
    id: "review-strategy",
    title: "Review & Rating Strategy",
    description:
      "Encouraging positive reviews through follow-up emails and inserts, and managing negative feedback.",
    icon: Star,
  },
  {
    id: "account-health",
    title: "Account Health Monitoring",
    description:
      "Keeping the Amazon account in good standing by monitoring performance metrics like ODR, late shipment rate, etc.",
    icon: ShieldCheck,
  },
  {
    id: "data-reporting",
    title: "Data Analysis & Reporting",
    description:
      "Analyzing sales, profits, advertising spend, and customer behavior for continuous business improvement.",
    icon: BarChart3,
  },
];

export const ETSY_TAB_ID = "etsy";

export const etsyAutomationServices: CoreServiceItem[] = [
  {
    id: "etsy-supplier-sourcing",
    title: "Supplier Sourcing",
    description:
      "Identifying reliable suppliers and negotiating the best prices for your Etsy products.",
    icon: Search,
  },
  {
    id: "etsy-listing-optimization",
    title: "Listing Optimization (SEO)",
    description:
      "Regular updates to keywords, images, and descriptions to enhance product visibility and sales.",
    icon: TrendingUp,
  },
  {
    id: "etsy-inventory-management",
    title: "Inventory & Stock Management",
    description:
      "Manage inventory levels, automate restocking, and ensure stock availability to avoid losing sales.",
    icon: Boxes,
  },
  {
    id: "etsy-order-fulfillment",
    title: "Order Fulfillment",
    description:
      "Efficient order processing, packaging, and shipping, including using Etsy's integrated systems for timely deliveries.",
    icon: Package,
  },
  {
    id: "etsy-customer-support",
    title: "Customer Support",
    description:
      "Automating responses to customer inquiries, reviews, and returns to provide seamless support.",
    icon: Headphones,
  },
  {
    id: "etsy-review-strategy",
    title: "Review & Rating Strategy",
    description:
      "Encouraging positive feedback through follow-up emails and managing customer ratings for continuous improvement.",
    icon: Star,
  },
  {
    id: "etsy-account-health",
    title: "Account Health Monitoring",
    description:
      "Keeping your Etsy shop in good standing by monitoring performance metrics, sales trends, and customer satisfaction.",
    icon: ShieldCheck,
  },
  {
    id: "etsy-data-reporting",
    title: "Data Analysis & Reporting",
    description:
      "Analyzing sales, advertising spend, and customer behavior to optimize your Etsy business operations.",
    icon: BarChart3,
  },
];

export const TIKTOK_TAB_ID = "tiktok";

export const tiktokShopAutomationServices: CoreServiceItem[] = [
  {
    id: "tiktok-product-selection",
    title: "Product Selection",
    description:
      "Choosing trending or viral products that fit well with TikTok's fast-paced and visual nature — usually impulse-buy items.",
    icon: ShoppingBag,
  },
  {
    id: "tiktok-supplier-inventory",
    title: "Supplier & Inventory Management",
    description:
      "Partnering with reliable suppliers (e.g., CJdropshipping, private suppliers), syncing inventory, and automating restocks.",
    icon: Boxes,
  },
  {
    id: "tiktok-content-creation",
    title: "Content Creation",
    description:
      "Creating engaging short-form videos that showcase the product in action, often using UGC (User-Generated Content) or influencers.",
    icon: Music2,
  },
  {
    id: "tiktok-listing-optimization",
    title: "Product Listing Optimization",
    description:
      "Writing catchy titles, descriptions, adding trending hashtags, and using high-quality thumbnails for maximum visibility.",
    icon: TrendingUp,
  },
  {
    id: "tiktok-order-fulfillment",
    title: "Order Processing & Fulfillment",
    description:
      "Automating backend operations so orders are processed, packed, and shipped on time via dropshipping or fulfillment systems.",
    icon: Package,
  },
  {
    id: "tiktok-customer-service",
    title: "Customer Service",
    description:
      "Handling inquiries, complaints, and returns through automated chat systems or virtual assistants.",
    icon: Headphones,
  },
  {
    id: "tiktok-ads-management",
    title: "TikTok Shop Ads Management",
    description:
      "Running Spark Ads or TikTok in-feed ads to boost visibility and optimize performance using analytics.",
    icon: BarChart3,
  },
  {
    id: "tiktok-engagement-moderation",
    title: "Comment & Engagement Moderation",
    description:
      "Automatically managing comments, removing spam, and improving engagement on viral content.",
    icon: ShieldCheck,
  },
];

export const WALMART_TAB_ID = "walmart";

export const walmartAutomationServices: CoreServiceItem[] = [
  {
    id: "walmart-product-research",
    title: "Product Research",
    description:
      "Identifying high-demand, low-competition products suitable for Walmart Marketplace using tools like Zik Analytics or Walmart Seller Center insights.",
    icon: Search,
  },
  {
    id: "walmart-supplier-sourcing",
    title: "Supplier Sourcing",
    description:
      "Finding reliable wholesale or dropshipping suppliers with fast shipping and Walmart-compliant products.",
    icon: ShoppingCart,
  },
  {
    id: "walmart-listing-optimization",
    title: "Listing Creation & Optimization",
    description:
      "Writing optimized titles, descriptions, and product attributes following Walmart SEO best practices for better rankings.",
    icon: TrendingUp,
  },
  {
    id: "walmart-wfs-setup",
    title: "WFS (Walmart Fulfillment Services) Setup",
    description:
      "Setting up Walmart Fulfillment Services for storage, packaging, and delivery to improve shipping speed and customer experience.",
    icon: Store,
  },
  {
    id: "walmart-price-inventory-sync",
    title: "Price & Inventory Sync",
    description:
      "Automating pricing updates and real-time inventory syncing using integrations like Sellbrite or CedCommerce.",
    icon: Boxes,
  },
  {
    id: "walmart-order-management",
    title: "Order Management",
    description:
      "Automating order processing, fulfillment workflows, and shipment tracking through Walmart systems or logistics partners.",
    icon: Package,
  },
  {
    id: "walmart-buy-box-optimization",
    title: "Buy Box Optimization",
    description:
      "Optimizing pricing and fulfillment strategies to increase chances of winning the Walmart Buy Box.",
    icon: Star,
  },
  {
    id: "walmart-advertising-campaigns",
    title: "Advertising Campaigns",
    description:
      "Running Walmart Sponsored Product campaigns and optimizing keyword bidding strategies for higher conversions.",
    icon: BarChart3,
  },
];

export const SHOPIFY_TAB_ID = "shopify";

export const shopifyAutomationServices: CoreServiceItem[] = [
  {
    id: "shopify-product-niche-research",
    title: "Product & Niche Research",
    description:
      "Finding trending, high-margin products using tools like Oberlo, Dropship Spy, or TikTok Trends. Niche selection is key for branding.",
    icon: Search,
  },
  {
    id: "shopify-supplier-integration",
    title: "Supplier Integration",
    description:
      "Connecting to suppliers via apps like DSers, Spocket, Printful, or CJdropshipping — automating product import and fulfillment.",
    icon: Boxes,
  },
  {
    id: "shopify-theme-ux",
    title: "Theme Customization & UX Optimization",
    description:
      "Designing a fast, mobile-responsive, and conversion-optimized Shopify store layout with improved navigation, cart flow, and trust elements.",
    icon: Palette,
  },
  {
    id: "shopify-seo-optimization",
    title: "SEO Optimization",
    description:
      "Optimizing product pages, meta titles, descriptions, alt tags, and blog content to boost organic Google traffic.",
    icon: TrendingUp,
  },
  {
    id: "shopify-product-page-cro",
    title: "Product Page Optimization (CRO)",
    description:
      "Using persuasive copy, high-quality images, GIFs, reviews, and trust badges to maximize conversion rate.",
    icon: Star,
  },
  {
    id: "shopify-cart-abandonment",
    title: "Cart Abandonment Recovery",
    description:
      "Setting up automated email/SMS flows using tools like Klaviyo, Omnisend, or Shopify Email to recover lost sales.",
    icon: ShoppingCart,
  },
  {
    id: "shopify-email-sms-automation",
    title: "Email & SMS Marketing Automation",
    description:
      "Creating welcome flows, post-purchase follow-ups, win-back campaigns, and promotional automation to increase lifetime value.",
    icon: Mail,
  },
  {
    id: "shopify-upsell-cross-sell",
    title: "Upsell & Cross-Sell Automation",
    description:
      "Using apps like OneClick Upsell or ReConvert to increase average order value through smart upsell offers.",
    icon: ShoppingBag,
  },
];

export const PERFORMANCE_TAB_ID = "performance";

export const performanceMarketingServices: CoreServiceItem[] = [
  {
    id: "performance-goal-kpis",
    title: "Goal Setting & KPIs",
    description:
      "Defining clear business objectives like leads, purchases, app installs, or ROAS and setting measurable KPIs.",
    icon: BarChart3,
  },
  {
    id: "performance-audience-research",
    title: "Audience Research",
    description:
      "Identifying target demographics, psychographics, interests, and online behavior using Meta, Google, and TikTok insights.",
    icon: Users,
  },
  {
    id: "performance-channel-selection",
    title: "Channel Selection",
    description:
      "Choosing platforms based on target audience and goals such as Meta Ads, Google Ads, TikTok, YouTube, or native ads.",
    icon: Store,
  },
  {
    id: "performance-ad-creative",
    title: "Ad Creative Development",
    description:
      "Creating high-performing visual or video ads with strong hooks, value propositions, and clear CTAs tailored for each platform.",
    icon: Palette,
  },
  {
    id: "performance-landing-page",
    title: "Landing Page Optimization",
    description:
      "Ensuring landing pages are fast, mobile-optimized, persuasive, and aligned with ad messaging to maximize conversions.",
    icon: TrendingUp,
  },
  {
    id: "performance-campaign-setup",
    title: "Campaign Structure & Setup",
    description:
      "Structuring campaigns with A/B testing, proper budgeting, bidding strategies, and audience segmentation.",
    icon: Boxes,
  },
  {
    id: "performance-conversion-tracking",
    title: "Conversion Tracking Setup",
    description:
      "Implementing tracking systems like Meta Pixel, Google Tag Manager, GA4, and server-side tracking for full funnel visibility.",
    icon: ShieldCheck,
  },
  {
    id: "performance-campaign-monitoring",
    title: "Campaign Launch & Monitoring",
    description:
      "Launching campaigns and continuously monitoring key metrics like CTR, CPC, CPA, and ROAS for optimization.",
    icon: Star,
  },
];

/** Tab id → service cards (null = coming soon) */
export const coreServicesByTab: Record<string, CoreServiceItem[] | null> = {
  amazon: amazonAutomationServices,
  etsy: etsyAutomationServices,
  tiktok: tiktokShopAutomationServices,
  walmart: walmartAutomationServices,
  shopify: shopifyAutomationServices,
  performance: performanceMarketingServices,
};

/** Placeholder skeleton count for coming-soon tabs */
export const COMING_SOON_CARD_COUNT = 6;
