"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateAboutHeroBackground, heroStagger, heroTextReveal } from "@/lib/animations";

export interface ServiceHeroProps {
  title: string;
  subtitle: string;
  /** Public path e.g. `/services/amazon-banner.webp` */
  backgroundImage: string;
  imageAlt?: string;
}

export function ServiceHero({
  title,
  subtitle,
  backgroundImage,
  imageAlt,
}: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const headingId = "service-hero-heading";

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const orbCleanup = (() => {
        const orbs = sectionRef.current?.querySelectorAll("[data-service-hero-orb]");
        if (!orbs?.length) return () => {};

        const tweens = Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 20 : -18,
            y: i % 2 === 0 ? -14 : 12,
            duration: 16 + i * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );

        return () => tweens.forEach((t) => t.kill());
      })();

      const bgCleanup = animateAboutHeroBackground({
        sectionEl: sectionRef.current,
        imageEl: imageWrapRef.current,
      });

      return () => {
        orbCleanup();
        bgCleanup();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[max(56vh,56dvh)] w-full items-center justify-center overflow-hidden sm:min-h-[62dvh] lg:min-h-[68dvh]"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0" aria-hidden>
        <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
          <Image
            src={backgroundImage}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-transparent to-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_35%,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          data-service-hero-orb
          className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/25 blur-[100px]"
        />
        <div
          data-service-hero-orb
          className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-[90px]"
        />
      </div>

      <div className="site-container relative z-10 flex w-full flex-col items-center justify-center px-5 pb-14 pt-20 text-center sm:pb-16 sm:pt-24 lg:py-18">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={heroStagger}
          className="mx-auto flex max-w-4xl flex-col items-center"
        >
          <motion.span
            variants={heroTextReveal}
            className="font-primary mb-6 inline-block h-px w-16 bg-linear-to-r from-transparent via-white/70 to-transparent sm:mb-8 sm:w-24"
            aria-hidden
          />

          <motion.h1
            id={headingId}
            variants={heroTextReveal}
            className="font-secondary text-5xl font-semibold tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[4.5rem] lg:leading-[1.08] xl:text-[5rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={heroTextReveal}
            className="font-primary mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg sm:leading-relaxed"
          >
            {subtitle}
          </motion.p>

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
