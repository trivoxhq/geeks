import type { CSSProperties } from "react";

export interface ServiceHeroProps {
  title: string;
  subtitle: string;
  /** Public path e.g. `/services/amazon-banner.webp` */
  backgroundImage: string;
  imageAlt?: string;
}

export function ServiceHero({
  title,
  subtitle,
  backgroundImage,
}: ServiceHeroProps) {
  const headingId = "service-hero-heading";

  const bannerBackgroundStyle: CSSProperties = {
    backgroundImage: `url("${backgroundImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };

  const overlayStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <section
      className="relative flex min-h-[max(56vh,56dvh)] w-full items-center justify-center overflow-hidden sm:min-h-[62dvh] lg:min-h-[68dvh]"
      aria-labelledby={headingId}
    >
      <div
        className="absolute inset-0 size-full"
        style={bannerBackgroundStyle}
        aria-hidden
      />

      <div className="absolute inset-0 size-full" style={overlayStyle} aria-hidden />

      <div className="site-container relative z-10 flex w-full flex-col items-center justify-center px-5 pb-14 pt-20 text-center sm:pb-16 sm:pt-24 lg:py-18">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <span
            className="font-primary mb-6 inline-block h-px w-16 bg-linear-to-r from-transparent via-white/70 to-transparent sm:mb-8 sm:w-24"
            aria-hidden
          />

          <h1
            id={headingId}
            className="font-secondary text-5xl font-semibold tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[4.5rem] lg:leading-[1.08] xl:text-[5rem]"
          >
            {title}
          </h1>

          <p className="font-primary mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg sm:leading-relaxed">
            {subtitle}
          </p>

          <span
            className="font-primary mt-8 inline-block h-px w-16 bg-linear-to-r from-transparent via-primary/80 to-transparent sm:mt-10 sm:w-24"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
