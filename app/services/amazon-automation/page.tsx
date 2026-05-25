import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceOverview } from "@/components/sections/services/ServiceOverview";
import { amazonAutomationHero } from "@/data/services/amazonAutomation";
import { amazonServiceBenefits } from "@/data/services/amazonBenefits";
import { amazonServiceOverview } from "@/data/services/amazonOverview";
import { ServiceBenefits } from "@/components/sections/services/ServiceBenefits";
import { ServicePricing } from "@/components/sections/services/ServicePricing";
import { amazonServicePricing } from "@/data/services/amazonPricing";
import { AmazonCoreServices } from "@/components/sections/services/AmazonCoreServices";
import HowWeWork from "@/components/sections/HowWeWork";

const SuccessStories = dynamic(() => import("@/components/sections/SuccessStories"));
const RealStoriesResults = dynamic(
  () => import("@/components/sections/RealStoriesResults")
);
const SpeakToExpert = dynamic(() => import("@/components/sections/SpeakToExpert"));

export const metadata: Metadata = {
  title: "Amazon Automation",
  description:
    "Scale your Amazon business with expert-led automation, listing optimization, and growth strategies built for sustainable marketplace success.",
};

export default function AmazonAutomationPage() {
  return (
    <>
      <ServiceHero
        title={amazonAutomationHero.title}
        subtitle={amazonAutomationHero.subtitle}
        backgroundImage={amazonAutomationHero.backgroundImage}
        imageAlt={amazonAutomationHero.imageAlt}
      />
      <ServiceOverview
        heading={amazonServiceOverview.heading}
        paragraphs={amazonServiceOverview.paragraphs}
        image={amazonServiceOverview.image}
        headingId="amazon-service-overview-heading"
      />
      <ServiceBenefits
        title={amazonServiceBenefits.title}
        benefits={amazonServiceBenefits.benefits}
        headingId="amazon-service-benefits-heading"
      />
      <HowWeWork />
      <ServicePricing
        {...amazonServicePricing}
        headingId="amazon-service-pricing-heading"
        defaultService="amazon"
      />
      <AmazonCoreServices />
      <SuccessStories />
      <RealStoriesResults />
      <SpeakToExpert />
    </>
  );
}
