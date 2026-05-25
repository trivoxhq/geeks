"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { aboutHeroContent } from "@/data/about";
import { animateAboutHeroBackground, heroTextReveal } from "@/lib/animations";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      return animateAboutHeroBackground({
        sectionEl: sectionRef.current,
        imageEl: imageWrapRef.current,
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[max(56vh,56dvh)] w-full items-center justify-center overflow-hidden sm:min-h-[62dvh] lg:min-h-[68dvh]"
      aria-labelledby="about-hero-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
          <Image
            src={aboutHeroContent.image.src}
            alt={aboutHeroContent.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/25 via-transparent to-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Content */}
      <div className="site-container relative z-10 flex w-full flex-col items-center justify-center px-5 pb-14 pt-20 text-center sm:pb-16 sm:pt-24 lg:py-18">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.12 },
            },
          }}
          className="flex max-w-4xl flex-col items-center"
        >
          <motion.span
            variants={heroTextReveal}
            className="font-primary mb-6 inline-block h-px w-16 bg-linear-to-r from-transparent via-white/70 to-transparent sm:mb-8 sm:w-24"
            aria-hidden
          />

          <motion.h1
            id="about-hero-heading"
            variants={heroTextReveal}
            className="font-secondary text-5xl font-semibold tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[4.5rem] lg:leading-[1.08] xl:text-[5rem]"
          >
            {aboutHeroContent.heading}
          </motion.h1>

          <motion.span
            variants={heroTextReveal}
            className="font-primary mt-8 inline-block h-px w-16 bg-linear-to-r from-transparent via-primary/80 to-transparent sm:mt-10 sm:w-24"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
