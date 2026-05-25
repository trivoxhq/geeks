import type { ServiceCoreServicesContent } from "@/data/services/serviceCoreService";

export const amazonCoreServicesContent: ServiceCoreServicesContent = {
  title: "Our Core Services",
  services: [
    {
      id: "supplier-sourcing",
      title: "Supplier Sourcing",
      description:
        "Identifying trustworthy suppliers (Alibaba, local wholesalers), verifying quality, and negotiating best prices.",
      icon: "package-search",
    },
    {
      id: "listing-optimization",
      title: "Listing Optimization (SEO)",
      description:
        "Regularly updating keywords, images, A+ content, and videos to maintain top search rankings and better CTR.",
      icon: "trending-up",
    },
    {
      id: "inventory-management",
      title: "Inventory & Stock Management",
      description:
        "Monitoring stock levels, automating restocking, and managing FBA or warehouse shipments to avoid stockouts.",
      icon: "warehouse",
    },
    {
      id: "order-fulfillment",
      title: "Order Fulfillment",
      description:
        "Using Amazon FBA or FBM methods to handle order processing, packing, and shipping.",
      icon: "truck",
    },
    {
      id: "customer-support",
      title: "Customer Support",
      description:
        "Automating responses to FAQs, reviews, returns, and complaints using software or trained virtual assistants.",
      icon: "headphones",
    },
    {
      id: "review-strategy",
      title: "Review & Rating Strategy",
      description:
        "Encouraging positive reviews through follow-up emails and inserts, and managing negative feedback.",
      icon: "star",
    },
    {
      id: "account-health",
      title: "Account Health Monitoring",
      description:
        "Keeping the Amazon account in good standing by monitoring performance metrics like ODR, late shipment rate, etc.",
      icon: "shield-check",
    },
    {
      id: "data-reporting",
      title: "Data Analysis & Reporting",
      description:
        "Analyzing sales, profits, advertising spend, and customer behavior for continuous business improvement.",
      icon: "bar-chart-3",
    },
  ],
};
