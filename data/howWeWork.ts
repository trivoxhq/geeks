import {
  BarChart3,
  Search,
  Sparkles,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface HowWeWorkStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient stops for icon ring */
  accentClass: string;
}

export const howWeWorkContent = {
  title: "That's How We Work",
  subtitle:
    "A proven five-step framework — from discovery to data — designed to launch, optimize, and scale your commerce operations with clarity.",
};

export const howWeWorkSteps: HowWeWorkStep[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery Session",
    description:
      "We learn about your business, expectations, and the pain points you're experiencing today.",
    icon: Search,
    accentClass: "from-primary to-primary-light",
  },
  {
    id: "customized-solution",
    step: "02",
    title: "Customized Solution",
    description:
      "Our specialists craft tailored solutions considering market trends, competitors, and industry best practices.",
    icon: Sparkles,
    accentClass: "from-[#5a7fa8] to-secondary",
  },
  {
    id: "implementation-plan",
    step: "03",
    title: "Implementation Plan",
    description:
      "We deliver a detailed roadmap covering timelines, milestones, and resource allocation after finalization.",
    icon: Store,
    accentClass: "from-[#6b7280] to-[#9ca3af]",
  },
  {
    id: "execution-monitoring",
    step: "04",
    title: "Execution and Monitoring",
    description:
      "We execute against the plan, continuously improving and adjusting our approach for maximum efficiency.",
    icon: BarChart3,
    accentClass: "from-[#e07a3a] to-[#f59e0b]",
  },
  {
    id: "data-analysis",
    step: "05",
    title: "Data Collection & Analysis",
    description:
      "We gather performance data to measure results and course-correct when needed for sustained growth.",
    icon: TrendingUp,
    accentClass: "from-[#c45c3e] to-[#e07a3a]",
  },
];
