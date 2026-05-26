import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceOverview } from "@/components/sections/services/ServiceOverview";
import { walmartAutomationHero } from "@/data/services/walmartAutomation";
import { walmartServiceOverview } from "@/data/services/walmartOverview";

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
    </>
  );
}
