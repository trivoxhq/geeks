"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  brand,
  companyLinks,
  contactItems,
  footerPartnerLogos,
  serviceLinks,
  socialLinks,
  type FooterPartnerLogo,
} from "@/data/footerLinks";
import {
  fadeSlideUp,
  navUnderline,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Footer — modern dark SaaS layout
   ========================================================================== */

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#030508] text-white"
      role="contentinfo"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(74,112,169,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000_20%,transparent)]" />
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-secondary/12 blur-[100px]" />
      </div>

      {/* Top gradient line */}
      <div
        className="h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden
      />

      <div className="site-container relative">
        {/* CTA strip */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative -mt-px pt-10 sm:pt-12 lg:pt-14"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-px backdrop-blur-xl sm:rounded-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-secondary/15 opacity-80" />
            <div className="relative flex flex-col items-center justify-between gap-5 rounded-[calc(1rem-1px)] bg-[#0a0e16]/90 px-5 py-6 sm:flex-row sm:rounded-[calc(1rem-1px)] sm:px-8 sm:py-7 lg:px-10">
              <div className="max-w-xl text-center sm:text-left">
                <span className="font-primary mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide text-secondary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Free consultation available
                </span>
                <h2 className="font-secondary text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {brand.cta.headline}
                </h2>
                <p className="font-primary mt-1.5 text-sm leading-snug text-white/55">
                  {brand.cta.subline}
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={brand.cta.href}
                  className="group btn btn-primary inline-flex shrink-0 gap-2 shadow-[0_0_40px_-8px_rgba(74,112,169,0.6)]"
                >
                  {brand.cta.button}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:mt-14 lg:grid-cols-4 lg:gap-8 xl:gap-10"
        >
          {/* Column 1 — Brand */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1"
          >
            <FooterLogo />
            <p className="font-primary mt-4 max-w-xs text-sm leading-snug text-white/50">
              {brand.tagline}
            </p>
            <SocialIcons className="mt-5 justify-center sm:justify-start" />
          </motion.div>

          {/* Column 2 — Company */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1"
          >
            <FooterColumnTitle>Company</FooterColumnTitle>
            <nav aria-label="Company links" className="mt-4 w-full">
              <ul className="flex flex-col gap-0.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 3 — Services */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1"
          >
            <FooterColumnTitle>Services</FooterColumnTitle>
            <nav aria-label="Services links" className="mt-4 w-full">
              <ul className="flex flex-col gap-0.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Column 4 — Contact (beside Services on desktop) */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1"
          >
            <FooterColumnTitle>Contact</FooterColumnTitle>
            <ul className="mt-4 flex w-full flex-col gap-2">
              {contactItems.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar — copyright | partner logos */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 border-t border-white/8 py-6 sm:mt-12 lg:mt-14 lg:py-7"
        >
          <div className="flex flex-col items-center gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-primary text-center text-sm text-white/45 lg:text-left">
              {brand.copyright}
            </p>

            <nav
              aria-label="Platform partners"
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6"
            >
              {footerPartnerLogos.map((logo, index) => (
                <FooterPartnerImage key={logo.src} logo={logo} index={index} />
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function FooterLogo() {
  return (
    <Link
      href="/"
      aria-label="Geeks — Home"
      className="group relative inline-flex shrink-0 items-center gap-1"
    >
      <span className="font-secondary text-[1.75rem] font-bold leading-none tracking-tight sm:text-[1.875rem]">
        <span className="bg-linear-to-r from-secondary via-[#a8c4e8] to-primary bg-clip-text text-transparent">
          Ge
        </span>
        <span className="text-white transition-colors duration-300 group-hover:text-secondary">
          eks
        </span>
      </span>
      <motion.span
        className="mt-1 hidden h-1.5 w-1.5 rounded-full bg-secondary sm:block"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </Link>
  );
}

function FooterColumnTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-5 bg-linear-to-r from-primary to-secondary" aria-hidden />
      <h3 className="font-secondary text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/80">
        {children}
      </h3>
    </div>
  );
}

function FooterLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative w-full"
    >
      <Link
        href={href}
        className={cn(
          "group font-primary flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm text-white/60 transition-colors duration-300 hover:bg-white/4 hover:text-white sm:justify-start",
          className
        )}
      >
        <span>{label}</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
          aria-hidden
        />
      </Link>
      <motion.span
        variants={navUnderline}
        className="absolute bottom-1 left-2.5 right-2.5 h-px rounded-full bg-linear-to-r from-primary/0 via-secondary to-primary/0"
        aria-hidden
      />
    </motion.div>
  );
}

function ContactCard({
  item,
}: {
  item: (typeof contactItems)[number];
}) {
  const Icon = item.icon;
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, className: "group block" }
    : { className: "group block" };

  return (
    <motion.li
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper {...wrapperProps}>
        <div className="flex items-start gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-white/6 hover:shadow-[0_8px_32px_-12px_rgba(74,112,169,0.35)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/25 to-secondary/15 text-secondary ring-1 ring-white/10 transition-all duration-300 group-hover:from-primary/40 group-hover:text-white group-hover:ring-primary/30">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="font-primary pt-1 text-left text-[0.8125rem] leading-snug text-white/65 transition-colors group-hover:text-white/90">
            {item.label}
          </span>
        </div>
      </Wrapper>
    </motion.li>
  );
}

function FooterPartnerImage({
  logo,
  index,
}: {
  logo: FooterPartnerLogo;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05, y: -1 }}
      className="group flex h-9 shrink-0 items-center justify-center sm:h-10"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="h-7 w-auto max-w-26 object-contain object-center transition-transform duration-300 sm:h-8 sm:max-w-28"
      />
    </motion.div>
  );
}

function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/4 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-white"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <span
              className="absolute inset-0 rounded-full bg-linear-to-br from-primary/30 to-secondary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <Icon
              className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.75}
              aria-hidden
            />
          </motion.a>
        );
      })}
    </div>
  );
}
