export const speakToExpertContent = {
  title: "Speak To An Expert",
  panelDescription:
    "Whether you're launching or scaling, get direct access to strategists who live and breathe marketplace automation.",
};

export const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "amazon", label: "Amazon Automation" },
  { value: "etsy", label: "Etsy Automation" },
  { value: "tiktok", label: "TikTok Shop Automation" },
  { value: "walmart", label: "Walmart Automation" },
  { value: "shopify", label: "Shopify Automation" },
  { value: "performance", label: "Performance Marketing" },
  { value: "multiple", label: "Multiple Services" },
];

export const revenueOptions = [
  { value: "", label: "Monthly revenue (optional)" },
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-50k", label: "$10,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-500k", label: "$100,000 – $500,000" },
  { value: "500k-plus", label: "$500,000+" },
];

export interface ExpertFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  websiteUrl: string;
  service: string;
  monthlyRevenue: string;
  message: string;
}

export const initialExpertFormData: ExpertFormData = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  websiteUrl: "",
  service: "",
  monthlyRevenue: "",
  message: "",
};
