"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { HeroServiceItem } from "@/data/hero";
import { staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroServiceCardProps {
  service: HeroServiceItem;
  className?: string;
}

export function HeroServiceCard({ service, className }: HeroServiceCardProps) {
  return (
    <motion.div variants={staggerItem} className={cn("h-full", className)}>
      <Link
        href={service.href}
        className="group flex h-full items-center gap-3.5 rounded-xl border border-white/8 bg-white/4 px-3.5 py-3 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-white/8 hover:shadow-[0_8px_32px_-12px_rgba(74,112,169,0.4)] sm:gap-4 sm:px-4 sm:py-3.5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/90 p-1.5 sm:h-11 sm:w-11">
          <Image
            src={service.image}
            alt={service.title}
            width={40}
            height={40}
            className="h-full w-full object-contain"
            aria-hidden
          />
        </span>
        <span className="font-primary min-w-0 flex-1 text-left text-sm font-medium leading-snug text-white/80 transition-colors group-hover:text-white">
          {service.title}
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
