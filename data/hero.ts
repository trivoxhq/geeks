export interface HeroServiceItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

export const heroContent = {
  heading: "Scale smarter sell bigger.",
  description:
    "We build automated e-commerce systems across Amazon, Etsy, Shopify, and TikTok Shop — so you can launch faster, operate leaner, and scale revenue without the manual grind.",
  servicesHeading: "Automation Services",
};

/** Hero banner image — primary asset from /public/home */
export const heroImage = {
  src: "/home/banner-hero.webp",
  alt: "E-commerce automation growth dashboard",
  width: 720,
  height: 640,
};

/** Service logos displayed below hero left content */
export const heroServices: HeroServiceItem[] = [
  {
    id: "amazon-fba",
    title: "Amazon FBA Automation",
    image: "/home/amazon.webp",
    href: "/services/amazon-automation",
  },
  {
    id: "etsy",
    title: "Etsy Automation",
    image: "/home/etsy.webp",
    href: "/services/etsy-automation",
  },
  {
    id: "shopify",
    title: "Shopify Dropshipping Automation",
    image: "/home/shopify.webp",
    href: "/services/shopify-automation",
  },
  {
    id: "tiktok",
    title: "TikTok Shop Automation",
    image: "/home/tiktok.webp",
    href: "/services/tiktok-shop-automation",
  },
];
