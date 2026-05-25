import dynamic from "next/dynamic";
import HeroBanner from "@/components/sections/HeroBanner";
import WhyWorkWithUs from "@/components/sections/WhyWorkWithUs";
import CoreServices from "@/components/sections/CoreServices";
import HowWeWork from "@/components/sections/HowWeWork";

const SuccessStories = dynamic(() => import("@/components/sections/SuccessStories"));
const RealStoriesResults = dynamic(
  () => import("@/components/sections/RealStoriesResults")
);
const SpeakToExpert = dynamic(() => import("@/components/sections/SpeakToExpert"));

export default function Home() {
  return (
    <>
      <HeroBanner />
      <WhyWorkWithUs />
      <CoreServices />
      <HowWeWork />
      <SuccessStories />
      <RealStoriesResults />
      <SpeakToExpert />
    </>
  );
}
