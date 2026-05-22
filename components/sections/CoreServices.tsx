"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { Clock, Sparkles } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Tabs } from "@/components/ui/Tabs";
import type { CoreServiceItem } from "@/data/coreServices";
import {
  COMING_SOON_CARD_COUNT,
  coreServiceTabs,
  coreServicesByTab,
  coreServicesHeader,
} from "@/data/coreServices";
import {
  coreServicesGridStagger,
  sectionFadeUp,
  tabContentFade,
} from "@/lib/animations";
import gsap from "gsap";

const viewport = { once: true, margin: "-80px" as const };

function ServiceGridPanel({
  tabId,
  services,
}: {
  tabId: string;
  services: CoreServiceItem[];
}) {
  return (
    <motion.div
      key={tabId}
      variants={tabContentFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className="w-full"
    >
      <motion.div
        variants={coreServicesGridStagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ComingSoonPanel({ tabId, tabLabel }: { tabId: string; tabLabel: string }) {
  return (
    <motion.div
      key={tabId}
      variants={tabContentFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className="w-full"
    >
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Clock className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="font-secondary text-xl font-semibold text-foreground sm:text-2xl">
          {tabLabel} — Coming Soon
        </h3>
        <p className="font-primary mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          We&apos;re finalizing this service playbook. Check back soon for full automation
          workflows and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: COMING_SOON_CARD_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-2xl border border-primary/8 bg-white/50 p-6"
          >
            <div className="h-10 w-10 animate-pulse rounded-xl bg-primary/10" />
            <div className="mt-4 h-4 w-2/3 animate-pulse rounded-md bg-primary/10" />
            <div className="mt-3 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CoreServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("amazon");

  const activeTabLabel =
    coreServiceTabs.find((t) => t.id === activeTab)?.label ?? "Service";
  const activeServices = coreServicesByTab[activeTab] ?? null;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const orbs = sectionRef.current?.querySelectorAll("[data-core-orb]");
      if (!orbs?.length) return;

      const tweens = Array.from(orbs).map((orb, i) =>
        gsap.to(orb, {
          x: i % 2 === 0 ? 24 : -20,
          y: i % 2 === 0 ? -16 : 12,
          duration: 14 + i * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );

      return () => tweens.forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-[#eef3fa] via-white to-[#f8fafc] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="core-services-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-core-orb
          className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-primary/12 blur-[100px]"
        />
        <div
          data-core-orb
          className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-secondary/14 blur-[90px]"
        />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(74,112,169,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.035)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        {/* Header */}
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-primary mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            What we deliver
          </span>
          <h2
            id="core-services-heading"
            className="font-secondary text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {coreServicesHeader.title}
          </h2>
          <p className="font-primary mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {coreServicesHeader.subtitle}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12"
        >
          <Tabs tabs={coreServiceTabs} activeId={activeTab} onChange={setActiveTab} />
        </motion.div>

        {/* Tab panels */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            {activeServices ? (
              <ServiceGridPanel tabId={activeTab} services={activeServices} />
            ) : (
              <ComingSoonPanel tabId={activeTab} tabLabel={activeTabLabel} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
