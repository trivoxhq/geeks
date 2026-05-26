import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceOverview } from "@/components/sections/services/ServiceOverview";
import { ServiceBenefits } from "@/components/sections/services/ServiceBenefits";
import { walmartAutomationHero } from "@/data/services/walmartAutomation";
import { walmartServiceBenefits } from "@/data/services/walmartBenefits";
import { walmartServiceOverview } from "@/data/services/walmartOverview";
import HowWeWork from "@/components/sections/HowWeWork";

export const metadata: Metadata = {
  title: "Walmart Automation",
  description: walmartAutomationHero.subtitle,
};

export default function WalmartAutomationPage() {
  return (
    <>
      <ServiceHero
        title={walmartAutomationHero.title}
        subtitle={walmartAutomationHero.subtitle}
        backgroundImage={walmartAutomationHero.backgroundImage}
        imageAlt={walmartAutomationHero.imageAlt}
      />
      <ServiceOverview
        heading={walmartServiceOverview.heading}
        paragraphs={walmartServiceOverview.paragraphs}
        image={walmartServiceOverview.image}
        headingId="walmart-service-overview-heading"
      />
      <ServiceBenefits
        title={walmartServiceBenefits.title}
        benefits={walmartServiceBenefits.benefits}
        headingId="walmart-service-benefits-heading"
      />
      <HowWeWork />
    </>
  );
}
