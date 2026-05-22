import {
  CheckCircle2,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface WhyWorkBullet {
  id: string;
  text: string;
  icon: LucideIcon;
}

export const whyWorkWithUsContent = {
  heading: "Why Work With Us",
  image: {
    src: "/home/whhy-work-with-us.webp",
    alt: "E-commerce automation team collaboration",
    width: 640,
    height: 720,
  },
  bullets: [
    {
      id: "platforms",
      text: "We know the backend of every major platform",
      icon: CheckCircle2,
    },
    {
      id: "custom",
      text: "No cookie-cutter playbooks — everything's customized",
      icon: Sparkles,
    },
    {
      id: "transparent",
      text: "Transparent communication, always",
      icon: ShieldCheck,
    },
    {
      id: "team",
      text: "A lean team with deep expertise",
      icon: Users,
    },
    {
      id: "growth",
      text: "Built to support brands at every growth stage",
      icon: LineChart,
    },
  ] satisfies WhyWorkBullet[],
  buttons: {
    primary: { label: "Get Started", href: "/contact" },
    secondary: { label: "Get A Quote", href: "/contact" },
  },
};
