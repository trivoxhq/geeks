import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

function ensureScrollTrigger() {
  if (!scrollTriggerRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

/* ==========================================================================
   Framer Motion — shared variants
   ========================================================================== */

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

export const mobileDrawer: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export const navUnderline: Variants = {
  rest: { scaleX: 0, originX: 0.5 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const chevronRotate: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

/* ==========================================================================
   GSAP — reusable animation helpers
   ========================================================================== */

/** Stagger-reveal service cards inside the mega menu */
export function animateMegaMenuCards(
  elements: HTMLElement[] | gsap.TweenTarget,
  isVisible: boolean
) {
  if (!elements || (Array.isArray(elements) && elements.length === 0)) return;

  gsap.killTweensOf(elements);

  if (isVisible) {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 18, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  } else {
    gsap.to(elements, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    });
  }
}

/** Subtle hover lift + glow for interactive cards */
export function animateCardHover(
  element: HTMLElement | null,
  isHovering: boolean
) {
  if (!element) return;

  gsap.to(element, {
    y: isHovering ? -4 : 0,
    scale: isHovering ? 1.02 : 1,
    boxShadow: isHovering
      ? "0 12px 32px -4px rgba(74, 112, 169, 0.22)"
      : "0 4px 16px -2px rgba(74, 112, 169, 0.08)",
    duration: 0.35,
    ease: "power2.out",
  });
}

/** Logo subtle scale on hover */
export function animateLogoHover(
  element: HTMLElement | null,
  isHovering: boolean
) {
  if (!element) return;

  gsap.to(element, {
    scale: isHovering ? 1.03 : 1,
    duration: 0.4,
    ease: "power2.out",
  });
}

/** Contact button magnetic-style hover */
export function animateButtonHover(
  element: HTMLElement | null,
  isHovering: boolean
) {
  if (!element) return;

  gsap.to(element, {
    y: isHovering ? -2 : 0,
    scale: isHovering ? 1.04 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
}

/** Why Work With Us — section scroll variants */
export const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const sectionStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

export const bulletStaggerItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Core Services — tab panel transition */
export const tabContentFade: Variants = {
  hidden: { opacity: 0, y: 18, x: 12 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    x: -10,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

export const coreServicesGridStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

export const coreServicesCardItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

/** About Info Banner — masonry card stagger */
export const infoBannerMasonryStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

export const infoBannerCardItem: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** About Info Banner — subtle scroll parallax on masonry cards */
export function initInfoBannerCardsMotion(
  sectionEl: HTMLElement | null,
  cardEls: HTMLElement[],
  prefersReducedMotion: boolean
) {
  if (!sectionEl || !cardEls.length || prefersReducedMotion) return () => {};

  ensureScrollTrigger();
  const tweens: gsap.core.Tween[] = [];

  cardEls.forEach((el, index) => {
    const yOffset = index === 0 ? 28 : index === 1 ? -18 : 22;

    const tween = gsap.fromTo(
      el,
      { y: yOffset * 0.35 },
      {
        y: yOffset * -0.35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1 + index * 0.15,
        },
      }
    );
    tweens.push(tween);
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}

/** How We Work — process step stagger */
export const processStepsStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const processStepItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Speak To Expert — form field stagger */
export const formFieldsStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const formFieldItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Contact page — paper slide reveal from right */
export const contactPageReveal: Variants = {
  hidden: {
    opacity: 0,
    x: "18%",
    rotateY: -3,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const contactContentStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
};

/** Why Work With Us — image float + pointer parallax */
export function initWhyWorkImageMotion(
  floatEl: HTMLElement | null,
  parallaxEl: HTMLElement | null,
  wrapperEl: HTMLElement | null,
  prefersReducedMotion: boolean
) {
  if (!floatEl || !parallaxEl) return () => {};

  let floatTween: gsap.core.Tween | null = null;

  if (!prefersReducedMotion) {
    floatTween = gsap.to(floatEl, {
      y: -14,
      duration: 3.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  const onMove = (e: MouseEvent) => {
    if (!wrapperEl || prefersReducedMotion) return;
    const rect = wrapperEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(parallaxEl, {
      x: x * 18,
      rotateY: x * 5,
      rotateX: -y * 4,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(parallaxEl, {
      x: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.75,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  wrapperEl?.addEventListener("mousemove", onMove);
  wrapperEl?.addEventListener("mouseleave", onLeave);

  return () => {
    floatTween?.kill();
    wrapperEl?.removeEventListener("mousemove", onMove);
    wrapperEl?.removeEventListener("mouseleave", onLeave);
    gsap.killTweensOf([floatEl, parallaxEl]);
  };
}

/** How We Work — scroll progress line + active step highlights */
export function initHowWeWorkScroll(
  sectionEl: HTMLElement | null,
  pathEl: SVGPathElement | null,
  progressEl: HTMLElement | null,
  stepEls: HTMLElement[],
  onActiveStep: (index: number) => void,
  prefersReducedMotion: boolean
) {
  if (!sectionEl) return () => {};

  ensureScrollTrigger();
  const triggers: ScrollTrigger[] = [];

  if (!prefersReducedMotion && pathEl) {
    const length = pathEl.getTotalLength();
    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const pathTween = gsap.to(pathEl, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.85,
      },
    });
    if (pathTween.scrollTrigger) triggers.push(pathTween.scrollTrigger);
  }

  if (!prefersReducedMotion && progressEl) {
    const progressTween = gsap.fromTo(
      progressEl,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.85,
        },
      }
    );
    if (progressTween.scrollTrigger) triggers.push(progressTween.scrollTrigger);
  }

  stepEls.forEach((el, index) => {
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 58%",
      end: "bottom 42%",
      onEnter: () => onActiveStep(index),
      onEnterBack: () => onActiveStep(index),
    });
    triggers.push(st);
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
}

/* ==========================================================================
   Hero — GSAP entrance & scroll
   ========================================================================== */

export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

/** Hero load-in timeline for left column */
export function animateHeroEntrance(leftEl: HTMLElement | null) {
  if (!leftEl) return;

  const children = Array.from(leftEl.children);
  if (!children.length) return;

  return gsap.fromTo(
    children,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.15 }
  );
}

/** GSAP animated hero banner — entrance, float, glow pulse, scroll parallax */
export function animateHeroBanner(options: {
  bannerEl: HTMLElement | null;
  imageInnerEl: HTMLElement | null;
  glowEl: HTMLElement | null;
  sectionEl: HTMLElement | null;
}) {
  const { bannerEl, imageInnerEl, glowEl, sectionEl } = options;
  if (!bannerEl) return () => {};

  /* Initial state — GSAP owns visibility (no Framer fade) */
  gsap.set(bannerEl, { opacity: 0, y: 48, scale: 0.92 });
  if (imageInnerEl) gsap.set(imageInnerEl, { rotate: -2 });
  if (glowEl) gsap.set(glowEl, { opacity: 0, scale: 0.75 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (glowEl) {
    tl.to(glowEl, { opacity: 1, scale: 1, duration: 1.4 }, 0.2);
  }

  tl.to(
    bannerEl,
    { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" },
    0.35
  );

  if (imageInnerEl) {
    tl.to(imageInnerEl, { rotate: 0, duration: 1, ease: "power2.out" }, 0.5);
  }

  /* Float on inner layer — avoids conflict with scroll parallax on outer */
  let floatTween: gsap.core.Tween | null = null;
  if (imageInnerEl) {
    floatTween = gsap.to(imageInnerEl, {
      y: -14,
      rotate: 1.5,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.2,
    });
  }

  let glowTween: gsap.core.Tween | null = null;
  if (glowEl) {
    glowTween = gsap.to(glowEl, {
      opacity: 0.65,
      scale: 1.08,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  }

  let parallaxTween: gsap.core.Tween | null = null;
  if (sectionEl) {
    parallaxTween = gsap.to(bannerEl, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "bottom top",
        scrub: 1.4,
      },
    });
  }

  return () => {
    tl.kill();
    floatTween?.kill();
    glowTween?.kill();
    parallaxTween?.scrollTrigger?.kill();
    parallaxTween?.kill();
  };
}

/** About page hero — subtle image zoom + scroll parallax */
export function animateAboutHeroBackground(options: {
  sectionEl: HTMLElement | null;
  imageEl: HTMLElement | null;
}) {
  const { sectionEl, imageEl } = options;
  if (!imageEl) return () => {};

  ensureScrollTrigger();

  gsap.set(imageEl, { scale: 1.08 });

  const entrance = gsap.to(imageEl, {
    scale: 1,
    duration: 2.2,
    ease: "power2.out",
  });

  const breathe = gsap.to(imageEl, {
    scale: 1.04,
    duration: 8,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2.2,
  });

  let parallaxTween: gsap.core.Tween | null = null;
  if (sectionEl) {
    parallaxTween = gsap.to(imageEl, {
      y: 72,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }

  return () => {
    entrance.kill();
    breathe.kill();
    parallaxTween?.scrollTrigger?.kill();
    parallaxTween?.kill();
  };
}

/** Continuous wave motion on heading words */
export function animateHeroWaveHeading(
  wordElements: HTMLElement[],
  prefersReducedMotion: boolean
) {
  if (!wordElements.length) return () => {};

  gsap.set(wordElements, { opacity: 0, y: 24 });

  const entrance = gsap.to(wordElements, {
    opacity: 1,
    y: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.2,
  });

  if (prefersReducedMotion) {
    return () => {
      entrance.kill();
    };
  }

  const waveTweens = wordElements.map((el, index) =>
    gsap.to(el, {
      y: -7,
      rotation: index % 2 === 0 ? 0.6 : -0.6,
      duration: 2.4 + index * 0.18,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1 + index * 0.14,
    })
  );

  return () => {
    entrance.kill();
    waveTweens.forEach((t) => t.kill());
    gsap.set(wordElements, { clearProps: "y,rotation,opacity" });
  };
}

/** Lightweight canvas wave background — full-bleed hero coverage */
export function initHeroWaveCanvas(
  canvas: HTMLCanvasElement,
  container: HTMLElement | null,
  prefersReducedMotion: boolean
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !container) return () => {};

  let width = 0;
  let height = 0;
  let time = 0;
  let rafId = 0;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  /* Waves distributed top → bottom for full vertical coverage */
  const waves = [
    { amplitude: 22, frequency: 0.005, speed: 0.01, yOffset: 0.18, alpha: 0.045 },
    { amplitude: 28, frequency: 0.006, speed: 0.012, yOffset: 0.38, alpha: 0.055 },
    { amplitude: 24, frequency: 0.008, speed: 0.015, yOffset: 0.55, alpha: 0.05 },
    { amplitude: 20, frequency: 0.01, speed: 0.013, yOffset: 0.72, alpha: 0.04 },
    { amplitude: 16, frequency: 0.012, speed: 0.011, yOffset: 0.88, alpha: 0.035 },
  ];

  const drawAmbientWash = () => {
    const wash = ctx.createLinearGradient(0, 0, 0, height);
    wash.addColorStop(0, "rgba(74, 112, 169, 0.04)");
    wash.addColorStop(0.5, "rgba(143, 171, 212, 0.03)");
    wash.addColorStop(1, "rgba(74, 112, 169, 0.05)");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, width, height);
  };

  const drawWave = (config: (typeof waves)[0]) => {
    const baseY = height * config.yOffset;
    const fillDepth = height * 0.55;

    ctx.beginPath();
    for (let x = 0; x <= width; x += 5) {
      const y =
        baseY +
        Math.sin(x * config.frequency + time * config.speed) * config.amplitude +
        Math.sin(x * config.frequency * 1.6 + time * config.speed * 0.7) *
          (config.amplitude * 0.35);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, baseY - fillDepth, 0, height);
    gradient.addColorStop(0, `rgba(74, 112, 169, ${config.alpha})`);
    gradient.addColorStop(0.45, `rgba(143, 171, 212, ${config.alpha * 0.75})`);
    gradient.addColorStop(1, "rgba(74, 112, 169, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const render = () => {
    if (width === 0 || height === 0) return;
    ctx.clearRect(0, 0, width, height);
    drawAmbientWash();
    waves.forEach(drawWave);
    if (!prefersReducedMotion) time += 1;
  };

  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  window.addEventListener("resize", resize);

  if (prefersReducedMotion) {
    render();
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }

  const tick = () => {
    render();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(rafId);
    resizeObserver.disconnect();
    window.removeEventListener("resize", resize);
  };
}
