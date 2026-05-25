"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  applyTransitionDirection,
  clearTransitionDirection,
  getPageTransitionDirection,
  gsapPageEnterFallback,
  gsapPageExitFallback,
  prefersReducedPageMotion,
  supportsViewTransitions,
  type PageTransitionDirection,
} from "@/lib/pageTransition";

type NavigateOptions = {
  direction?: PageTransitionDirection;
  scroll?: boolean;
};

type PageTransitionContextValue = {
  navigateWithTransition: (href: string, options?: NavigateOptions) => void;
  /** Pathname for chrome (header, backgrounds) — updates at navigation start */
  visualPathname: string;
  isTransitioning: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

function isInternalLink(anchor: HTMLAnchorElement): string | null {
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
    return null;
  }

  try {
    const url = new URL(raw, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function shouldInterceptClick(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target === "_blank") return false;
  if (anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel")?.includes("external")) return false;
  return true;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const pathnameRef = useRef(pathname);
  const isTransitioningRef = useRef(false);
  const resolveNavigationRef = useRef<(() => void) | null>(null);
  const [visualPathname, setVisualPathname] = useState(pathname);

  const waitForRouteCommit = useCallback(() => {
    return new Promise<void>((resolve) => {
      resolveNavigationRef.current = resolve;
    });
  }, []);

  const finishTransition = useCallback((shouldScroll: boolean) => {
    if (shouldScroll) window.scrollTo({ top: 0, behavior: "instant" });
    isTransitioningRef.current = false;
    clearTransitionDirection();
  }, []);

  const navigateWithTransition = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (isTransitioningRef.current) return;

      const from = pathnameRef.current;
      const targetPath = href.split("?")[0]?.split("#")[0] ?? href;

      if (targetPath === from && !href.includes("?") && !href.includes("#")) {
        return;
      }

      const direction =
        options?.direction ?? getPageTransitionDirection(from, targetPath);
      const shouldScroll = options?.scroll ?? true;
      const root = contentRef.current;

      const runNavigation = async () => {
        isTransitioningRef.current = true;
        applyTransitionDirection(direction);
        /* Sync header/background with page crossfade — no post-transition delay */
        setVisualPathname(targetPath);

        if (!supportsViewTransitions() || prefersReducedPageMotion()) {
          if (root) {
            await gsapPageExitFallback(root);
          }
          router.push(href, { scroll: false });
          await waitForRouteCommit();
          if (root) gsapPageEnterFallback(root);
          finishTransition(shouldScroll);
          return;
        }

        const transition = document.startViewTransition(async () => {
          router.push(href, { scroll: false });
          await waitForRouteCommit();
        });

        try {
          await transition.finished;
        } catch {
          /* interrupted */
        } finally {
          finishTransition(shouldScroll);
        }
      };

      void runNavigation();
    },
    [router, waitForRouteCommit, finishTransition]
  );

  /* Resolve startViewTransition after Next.js commits the new route to the DOM */
  useLayoutEffect(() => {
    pathnameRef.current = pathname;

    if (resolveNavigationRef.current) {
      resolveNavigationRef.current();
      resolveNavigationRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isTransitioningRef.current) {
      setVisualPathname(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isTransitioningRef.current) {
        event.preventDefault();
        return;
      }

      const anchor = (event.target as Element).closest("a");
      if (!anchor || !shouldInterceptClick(anchor, event)) return;

      const href = isInternalLink(anchor);
      if (!href) return;

      const nextPath = href.split("?")[0]?.split("#")[0] ?? href;
      if (nextPath === pathnameRef.current && !href.includes("?") && !href.includes("#")) {
        return;
      }

      event.preventDefault();
      navigateWithTransition(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigateWithTransition]);

  return (
    <PageTransitionContext.Provider
      value={{
        navigateWithTransition,
        visualPathname,
        isTransitioning: isTransitioningRef.current,
      }}
    >
      <div
        ref={contentRef}
        data-page-main
        className="min-h-full w-full [view-transition-name:page-main]"
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

export function usePageTransitionOptional() {
  return useContext(PageTransitionContext);
}
