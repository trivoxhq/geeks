"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
}

export function Tabs({
  tabs,
  activeId,
  onChange,
  className,
  layoutId = "core-services-tab-indicator",
}: TabsProps) {
  return (
    <div
      className={cn(
        "relative -mx-5 flex justify-center px-5 sm:mx-0 sm:px-0",
        className
      )}
    >
      <div
        role="tablist"
        aria-label="Core services"
        className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-primary/10 bg-white/60 p-1.5 shadow-soft backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1.5 sm:p-2 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-300 sm:px-4 sm:py-2.5 sm:text-sm",
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-linear-to-r from-primary via-primary-light to-secondary shadow-[0_0_24px_-4px_rgba(74,112,169,0.55)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
