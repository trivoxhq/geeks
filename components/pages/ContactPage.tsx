"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Mail, Sparkles } from "lucide-react";
import { ExpertContactForm } from "@/components/ui/ExpertContactForm";
import { contactPageContent } from "@/data/contact";
import gsap from "gsap";

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-contact-orb]");
      const orbTweens =
        orbs?.length &&
        Array.from(orbs).map((orb, i) =>
          gsap.to(orb, {
            x: i % 2 === 0 ? 20 : -16,
            y: i % 2 === 0 ? -12 : 14,
            duration: 16 + i * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );

      const formCard = formCardRef.current;
      const formTween = formCard
        ? gsap.to(formCard, {
            y: -6,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.5,
          })
        : null;

      return () => {
        if (Array.isArray(orbTweens)) orbTweens.forEach((t) => t.kill());
        formTween?.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#eef3fa] py-12 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="contact-page-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-contact-orb
          className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[110px]"
        />
        <div
          data-contact-orb
          className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-secondary/14 blur-[100px]"
        />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(74,112,169,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.035)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="order-2 flex flex-col lg:order-1 lg:sticky lg:top-28 lg:py-4">
            <span className="font-primary mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {contactPageContent.badge}
            </span>

            <h1
              id="contact-page-heading"
              className="font-secondary text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-tight"
            >
              {contactPageContent.title}
            </h1>

            <p className="font-primary mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {contactPageContent.description}
            </p>

            <div className="font-primary mt-8 hidden flex-col gap-3 text-sm text-muted-foreground lg:flex">
              <span className="inline-flex items-center gap-2 text-foreground">
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                Strategy calls within 24 hours
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground/90">
                Trusted by marketplace sellers scaling on Amazon, Etsy, Shopify, TikTok Shop,
                and Walmart.
              </span>
            </div>
          </div>

          <div ref={formCardRef} className="order-1 w-full lg:order-2">
            <ExpertContactForm
              idPrefix="contact"
              showWebsiteUrl
              staggerFields={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
