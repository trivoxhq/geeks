import HeroBanner from "@/components/sections/HeroBanner";
import CoreServices from "@/components/sections/CoreServices";
import HowWeWork from "@/components/sections/HowWeWork";
import RealStoriesResults from "@/components/sections/RealStoriesResults";
import SpeakToExpert from "@/components/sections/SpeakToExpert";
import SuccessStories from "@/components/sections/SuccessStories";
import WhyWorkWithUs from "@/components/sections/WhyWorkWithUs";

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
