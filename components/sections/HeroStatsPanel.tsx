"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  heroBarChart,
  heroCircleMetric,
  heroClientSlides,
  heroProgressMetrics,
} from "@/data/heroStats";
import { cn } from "@/lib/utils";

const cardClass =
  "rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:p-5";

/** Set to true when the live clients slider should be shown again */
const SHOW_LIVE_CLIENTS = false;

function CircleProgress({ value, label, sublabel }: { value: number; label: string; sublabel: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className={cn(cardClass, "flex flex-col items-center justify-center text-center")}>
      <div className="relative h-[5.5rem] w-[5.5rem]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 88 88" aria-hidden>
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="8" />
          <motion.circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="url(#heroCircleGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
          <defs>
            <linearGradient id="heroCircleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A70A9" />
              <stop offset="100%" stopColor="#8FABD4" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-secondary text-xl font-bold text-white">
          {value}%
        </span>
      </div>
      <p className="font-secondary mt-3 text-sm font-semibold text-white">{label}</p>
      <p className="font-primary mt-0.5 text-xs text-white/50">{sublabel}</p>
    </div>
  );
}

function BarChartCard() {
  const max = Math.max(...heroBarChart.map((b) => b.value));

  return (
    <div className={cardClass}>
      <p className="font-primary text-xs font-medium uppercase tracking-wider text-white/50">
        Sales trend
      </p>
      <div className="mt-4 flex h-24 items-end justify-between gap-1.5 sm:gap-2">
        {heroBarChart.map((bar, i) => (
          <div
            key={bar.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <motion.div
              className="w-full min-h-1 rounded-t-md bg-linear-to-t from-primary to-secondary"
              initial={{ height: 0 }}
              animate={{ height: `${(bar.value / max) * 100}%` }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="font-primary shrink-0 text-[0.625rem] text-white/40">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLIDE_ROW_PX = 72;

function ClientSlider() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const doubled = [...heroClientSlides, ...heroClientSlides];
  const displayIndex = index % heroClientSlides.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn(cardClass, "overflow-hidden")}>
      <div className="flex items-center justify-between">
        <p className="font-primary text-xs font-medium uppercase tracking-wider text-white/50">
          Live clients
        </p>
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden />
      </div>

      <div className="relative mt-3 h-[144px] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-[rgb(20_28_40/0.85)] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-[rgb(20_28_40/0.85)] to-transparent"
          aria-hidden
        />
        <motion.div
          animate={{ y: -(index * SLIDE_ROW_PX) }}
          transition={{
            duration: instant ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => {
            if (index === heroClientSlides.length) {
              setInstant(true);
              setIndex(0);
              requestAnimationFrame(() => setInstant(false));
            }
          }}
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex h-[72px] flex-col justify-center border-b border-white/6"
            >
              <p className="font-secondary text-base font-semibold text-white">{client.name}</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <p className="font-primary text-xs text-white/45">{client.period}</p>
                <p className="font-secondary text-lg font-bold text-emerald-400">{client.sales}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-3 flex justify-center gap-1">
        {heroClientSlides.map((c, i) => (
          <span
            key={c.id}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === displayIndex ? "w-5 bg-emerald-400" : "w-1 bg-white/15"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function GreenProgressBar({
  label,
  value,
  suffix = "%",
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}) {
  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-primary text-xs text-white/60">{label}</p>
        <span className="font-secondary text-xs font-semibold text-emerald-400">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function HeroStatsPanel({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full", className)}
      aria-hidden
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <CircleProgress
          value={heroCircleMetric.value}
          label={heroCircleMetric.label}
          sublabel={heroCircleMetric.sublabel}
        />
        <BarChartCard />

        {SHOW_LIVE_CLIENTS && (
          <div className="col-span-2">
            <ClientSlider />
          </div>
        )}

        {heroProgressMetrics.map((metric, i) => (
          <GreenProgressBar
            key={metric.id}
            label={metric.label}
            value={metric.value}
            suffix={metric.suffix}
            delay={0.4 + i * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}
