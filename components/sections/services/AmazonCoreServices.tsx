"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ServiceCoreServiceCard } from "@/components/sections/services/ServiceCoreServiceCard";
import { amazonCoreServicesContent } from "@/data/services/amazonCoreServices";
import type { ServiceCoreServicesContent } from "@/data/services/serviceCoreService";
import { coreServicesGridStagger, sectionFadeUp } from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

export interface ServiceCoreServicesProps extends ServiceCoreServicesContent {
  headingId?: string;
  className?: string;
}

/** Reusable core services grid — pass page-specific data from `data/services/*`. */
export function ServiceCoreServices({
  title,
  services,
  headingId = "service-core-services-heading",
  className,
}: ServiceCoreServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-core-services-orb]");
      const tweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 20 : -16,
            y: i % 2 === 0 ? -14 : 12,
            duration: 16 + i * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );

      return () => {
        if (Array.isArray(tweens)) tweens.forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-14 text-foreground sm:py-16 lg:py-20",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-core-services-orb
          className="absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
        />
        <div
          data-core-services-orb
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/12 blur-[90px]"
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <motion.header
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14"
        >
          <h2
            id={headingId}
            className={sectionHeadingClassName}
          >
            {title}
          </h2>
        </motion.header>

        <motion.div
          variants={coreServicesGridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {services.map((service) => (
            <ServiceCoreServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export interface AmazonCoreServicesProps {
  headingId?: string;
  className?: string;
}

/** Amazon Automation — core operational services grid. */
export function AmazonCoreServices({
  headingId = "amazon-core-services-heading",
  className,
}: AmazonCoreServicesProps) {
  return (
    <ServiceCoreServices
      title={amazonCoreServicesContent.title}
      services={amazonCoreServicesContent.services}
      headingId={headingId}
      className={className}
    />
  );
}
