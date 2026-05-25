"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  serviceOverviewContentReveal,
  serviceOverviewTextItem,
  serviceOverviewTextStagger,
} from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "-80px" as const };

export interface ServiceOverviewImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ServiceOverviewProps {
  heading: string;
  paragraphs: readonly string[];
  image: ServiceOverviewImage;
  /** Unique id for heading (accessibility) */
  headingId?: string;
  /** Image column position on desktop */
  imagePosition?: "left" | "right";
  className?: string;
}

export function ServiceOverview({
  heading,
  paragraphs,
  image,
  headingId = "service-overview-heading",
  imagePosition = "left",
  className,
}: ServiceOverviewProps) {
  const imageColumn = (
    <div
      className={cn(
        "relative w-full min-w-0",
        imagePosition === "right" && "lg:order-2"
      )}
    >
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-primary/10 opacity-60 blur-2xl sm:-inset-3"
          aria-hidden
        />
        <div className="relative w-full overflow-hidden rounded-2xl border border-primary/10 bg-white/80 p-1.5 shadow-[0_20px_50px_-24px_rgba(74,112,169,0.35)] backdrop-blur-sm sm:rounded-3xl">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl sm:rounded-[1.25rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const contentColumn = (
    <motion.div
      variants={serviceOverviewContentReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(
        "flex flex-col justify-center",
        imagePosition === "right" && "lg:order-1"
      )}
    >
      <motion.div
        variants={serviceOverviewTextStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-full"
      >
        <motion.h2
          id={headingId}
          variants={serviceOverviewTextItem}
          className={sectionHeadingClassName}
        >
          {heading}
        </motion.h2>

        <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={serviceOverviewTextItem}
              className="font-primary text-base leading-[1.75] text-muted-foreground sm:text-lg sm:leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-28 top-1/3 h-96 w-96 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/12 blur-[90px]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {imageColumn}
          {contentColumn}
        </div>
      </div>
    </section>
  );
}
