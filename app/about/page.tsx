import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import InfoBanner from "@/components/sections/about/InfoBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Amazon Geeks — a premium e-commerce automation agency helping brands scale on global marketplaces.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <InfoBanner />
    </>
  );
}
