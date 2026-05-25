import { revenueOptions, serviceOptions } from "@/data/speakToExpert";
import type { ExpertFormData } from "@/data/speakToExpert";

/** Identifies which form submitted the lead — shown in admin emails */
export const CONTACT_FORM_TYPES = {
  CONTACT_PAGE: "Contact Page",
  SPEAK_TO_EXPERT: "Speak To Expert",
  PRICING_FORM: "Pricing Form",
  SERVICE_LEAD: "Service Lead",
} as const;

export type ContactFormType =
  (typeof CONTACT_FORM_TYPES)[keyof typeof CONTACT_FORM_TYPES];

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  type: ContactFormType;
}

export function formatServiceLabel(value: string): string {
  if (!value.trim()) return "Not specified";
  const match = serviceOptions.find((opt) => opt.value === value);
  return match?.label ?? value;
}

export function buildExpertFormMessage(form: ExpertFormData): string {
  const parts = [form.message.trim()];

  if (form.businessName.trim()) {
    parts.push(`Business name: ${form.businessName.trim()}`);
  }
  if (form.websiteUrl.trim()) {
    parts.push(`Website: ${form.websiteUrl.trim()}`);
  }
  if (form.monthlyRevenue) {
    const revenue = revenueOptions.find((opt) => opt.value === form.monthlyRevenue);
    parts.push(`Monthly revenue: ${revenue?.label ?? form.monthlyRevenue}`);
  }

  return parts.join("\n\n");
}

export function expertFormToPayload(
  form: ExpertFormData,
  type: ContactFormType
): ContactFormPayload {
  return {
    name: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || undefined,
    service: formatServiceLabel(form.service),
    message: buildExpertFormMessage(form),
    type,
  };
}
