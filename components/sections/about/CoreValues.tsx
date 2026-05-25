"use client";

import { motion } from "framer-motion";
import { AboutIconContent } from "@/components/sections/about/AboutIconContent";
import {
  coreValuesContent,
  whatMakesUsDifferentContent,
} from "@/data/aboutCoreValues";
import { sectionFadeUp, sectionStagger } from "@/lib/animations";

const viewport = { once: true, margin: "-80px" as const };

export default function CoreValues() {
  return (
    <section
      className="py-14 text-foreground sm:py-16 lg:py-20"
      aria-label="Core values and what makes us different"
    >
      <div className="site-container">
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-12 sm:gap-14 lg:gap-16"
        >
          <motion.div variants={sectionFadeUp}>
            <AboutIconContent
              data={coreValuesContent}
              headingId="core-values-heading"
            />
          </motion.div>

          <motion.div variants={sectionFadeUp}>
            <AboutIconContent
              data={whatMakesUsDifferentContent}
              headingId="what-makes-us-different-heading"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
