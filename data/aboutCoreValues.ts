import type { LucideIcon } from "lucide-react";
import { Handshake, Lightbulb } from "lucide-react";

export type CoreValuesPanelTheme = "trust" | "innovation";

export interface CoreValuesPanelData {
  id: string;
  heading: string;
  content: string;
  icon: LucideIcon;
  theme: CoreValuesPanelTheme;
}

export const coreValuesPanels: CoreValuesPanelData[] = [
  {
    id: "core-values",
    heading: "Core Values",
    content:
      "At EcomScaled, our core values revolve around building real partnerships rooted in trust, growth, and transparency. We're not just here to manage your store — we're here to scale it with you. From full-service support across Amazon, Walmart, TikTok Shop, and more, to solving complex challenges like account reinstatements and ad inefficiencies, we're committed to making your e-commerce journey seamless and results-driven. What matters to you matters to us — that's why we value honest communication, expert-led execution, and strategies built around your success. With us, it's not just business — it's a shared mission to grow, together.",
    icon: Handshake,
    theme: "trust",
  },
  {
    id: "differentiators",
    heading: "What Makes Us Different",
    content:
      "We take time to understand your business. We don't just throw ads and apps at the problem — we offer solutions that fit. Our services are collaborative, strategic, and focused on long-term results. We treat your brand like it's our own.",
    icon: Lightbulb,
    theme: "innovation",
  },
];
