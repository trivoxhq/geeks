import type { LucideIcon } from "lucide-react";
import { Handshake, Rocket, Search } from "lucide-react";

export type InfoBannerCardVariant = "tall" | "medium" | "compact";

export interface AboutInfoCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  variant: InfoBannerCardVariant;
}

export const aboutInfoBannerContent = {
  heading: "Who We Are",
  paragraphs: [
    "We started Ecomscaled with one goal — to make growth in e-commerce less messy. We've worked behind the scenes with small brands and scaling stores alike, and one thing's clear: success happens when tech, timing, and creativity work together.",
    "We're not just service providers. We're partners who care about where your brand is going. Whether you're stuck at the setup phase or trying to break into new platforms, our job is to make the process clearer, faster, and easier for you.",
  ],
} as const;

export const aboutInfoCards: AboutInfoCard[] = [
  {
    id: "commit",
    title: "We Commit",
    description:
      "Our team of specialists is committed to producing the best results in order to make your product a success.",
    icon: Handshake,
    variant: "tall",
  },
  {
    id: "research",
    title: "We Research",
    description:
      "Our experts know how important market research is. No work is done without extensive research of market trends.",
    icon: Search,
    variant: "medium",
  },
  {
    id: "deliver",
    title: "We Deliver",
    description:
      "The quality of our work and your time are both of tremendous importance to us. We deliver the best results promptly!",
    icon: Rocket,
    variant: "compact",
  },
];
