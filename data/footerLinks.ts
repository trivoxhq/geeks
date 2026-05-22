import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Camera,
  Link2,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface ContactItem {
  label: string;
  href?: string;
  icon: LucideIcon;
}

export const brand = {
  tagline: "Scale smarter sell bigger.",
  copyright: "© Amzgeeks. All Rights Reserved.",
  cta: {
    headline: "Ready to automate your growth?",
    subline: "Book a free strategy call with our automation experts.",
    button: "Get Started",
    href: "/consultation",
  },
};

export const companyLinks: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Free Consultation", href: "/consultation" },
  { label: "About Us", href: "/about" },
];

export const serviceLinks: FooterLinkItem[] = [
  { label: "Amazon", href: "/services/amazon-automation" },
  { label: "TikTok Shop", href: "/services/tiktok-shop-automation" },
  { label: "Walmart", href: "/services/walmart-automation" },
  { label: "Shopify", href: "/services/shopify-automation" },
  { label: "Marketing", href: "/services/performance-marketing" },
  { label: "Etsy", href: "/services/etsy-automation" },
];

export const contactItems: ContactItem[] = [
  {
    label: "+1 (908) 315-0277",
    href: "tel:+19083150277",
    icon: Phone,
  },
  {
    label: "contact@ecomscaled.com",
    href: "mailto:contact@ecomscaled.com",
    icon: Mail,
  },
  {
    label: "1208 Putnam Avenue Plainfield New Jersey",
    icon: MapPin,
  },
];

export const socialLinks: SocialLinkItem[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Link2 },
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "X (Twitter)", href: "https://twitter.com", icon: AtSign },
  { label: "Facebook", href: "https://facebook.com", icon: Users },
];

/** Partner/platform logos shown in the footer bottom bar */
export interface FooterPartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const footerPartnerLogos: FooterPartnerLogo[] = [
  { src: "/footer/amazon.webp", alt: "Amazon", width: 104, height: 34 },
  { src: "/footer/walmart.webp", alt: "Walmart", width: 104, height: 34 },
  { src: "/footer/shopify.webp", alt: "Shopify", width: 104, height: 34 },
  { src: "/footer/tiktok.webp", alt: "TikTok Shop", width: 104, height: 34 },
  { src: "/footer/etsy.png", alt: "Etsy", width: 88, height: 34 },
];
