"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_SCRIPT_ID = "calendly-widget-js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const initWidget = useCallback(() => {
    const parent = containerRef.current;
    if (!parent || initializedRef.current) return;

    if (window.Calendly?.initInlineWidget) {
      parent.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: parent });
      initializedRef.current = true;
      return;
    }

    /* Fallback: Calendly script auto-scans .calendly-inline-widget on load */
    parent.classList.add("calendly-inline-widget");
    parent.setAttribute("data-url", url);
    initializedRef.current = true;
  }, [url]);

  useEffect(() => {
    if (window.Calendly) initWidget();
  }, [initWidget]);

  return (
    <>
      <Script
        id={CALENDLY_SCRIPT_ID}
        src={CALENDLY_SCRIPT}
        strategy="lazyOnload"
        onLoad={initWidget}
      />
      <div
        ref={containerRef}
        className={cn(
          "calendly-inline-widget w-full overflow-hidden rounded-xl",
          className
        )}
        data-url={url}
        style={{ minWidth: 320, minHeight: 560 }}
        aria-label="Schedule a free consultation"
      />
    </>
  );
}
