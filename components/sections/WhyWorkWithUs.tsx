"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { whyWorkWithUsContent } from "@/data/whyWorkWithUs";
import {
  animateButtonHover,
  bulletStaggerItem,
  initWhyWorkImageMotion,
  sectionFadeUp,
  sectionStagger,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "-80px" as const };

export default function WhyWorkWithUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  const { heading, image, bullets, buttons } = whyWorkWithUsContent;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      return initWhyWorkImageMotion(
        floatRef.current,
        parallaxRef.current,
        imageWrapperRef.current,
        prefersReducedMotion
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-12 text-foreground sm:py-14 lg:py-16"
      aria-labelledby="why-work-with-us-heading"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -left-32 top-1/4 h-112 w-md rounded-full bg-primary/10 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-secondary/15 blur-[90px]"
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,rgba(74,112,169,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10"
        >
          {/* Left — image (stacked first on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full items-center justify-center"
          >
            <div
              ref={imageWrapperRef}
              className="relative flex w-full items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <div
                ref={parallaxRef}
                className="relative flex w-full items-center justify-center will-change-transform"
              >
                <div
                  ref={floatRef}
                  className="relative w-full max-w-full overflow-hidden rounded-xl shadow-[0_16px_48px_-20px_rgba(74,112,169,0.28)] sm:rounded-2xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="mx-auto h-auto w-full max-w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col"
          >
            <motion.h2
              id="why-work-with-us-heading"
              variants={bulletStaggerItem}
              className="font-secondary text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {heading}
            </motion.h2>

            <ul className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
              {bullets.map((bullet, index) => {
                const Icon = bullet.icon;
                const isLast = index === bullets.length - 1;
                return (
                  <motion.li
                    key={bullet.id}
                    variants={bulletStaggerItem}
                    className={cn("list-none", isLast && "sm:col-span-2")}
                  >
                    <motion.div
                      className="group flex items-start gap-2.5 transition-colors duration-300"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="font-primary pt-1 text-sm leading-snug text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        {bullet.text}
                      </span>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              variants={bulletStaggerItem}
              className="mt-10 flex flex-col gap-2.5 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  ref={primaryBtnRef}
                  href={buttons.primary.href}
                  className="btn btn-primary group inline-flex w-full gap-2 sm:w-auto"
                  onMouseEnter={() =>
                    animateButtonHover(primaryBtnRef.current, true)
                  }
                  onMouseLeave={() =>
                    animateButtonHover(primaryBtnRef.current, false)
                  }
                >
                  {buttons.primary.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>

              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  ref={secondaryBtnRef}
                  href={buttons.secondary.href}
                  className="btn btn-outline group inline-flex w-full gap-2 border-primary/40 sm:w-auto"
                  onMouseEnter={() =>
                    animateButtonHover(secondaryBtnRef.current, true)
                  }
                  onMouseLeave={() =>
                    animateButtonHover(secondaryBtnRef.current, false)
                  }
                >
                  {buttons.secondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
