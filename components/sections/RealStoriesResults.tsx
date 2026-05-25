"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import {
  realStoriesContent,
  testimonialStories,
} from "@/data/realStories";
import { sectionFadeUp } from "@/lib/animations";
import { sectionHeadingClassName } from "@/lib/sectionTypography";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const viewport = { once: true, margin: "-80px" as const };

export default function RealStoriesResults() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-[#f8fafc] via-white to-[#f8fafc] py-14 text-foreground sm:py-16 lg:py-20"
      aria-labelledby="real-stories-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-secondary/12 blur-[90px]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(74,112,169,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,112,169,0.035)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem]" />
      </div>

      <div className="site-container relative">
        <motion.header
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="real-stories-heading"
            className={sectionHeadingClassName}
          >
            {realStoriesContent.title}
          </h2>
          <p className="font-primary mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {realStoriesContent.subtitle}
          </p>
        </motion.header>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 flex w-full flex-col sm:mt-12 lg:mt-14"
      >
        {/* Controls first in DOM so Swiper can bind navigation on init */}
        <div className="site-container relative order-2 mt-6 flex items-center justify-center gap-4">
          <div className="real-stories-pagination flex items-center justify-center" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="real-stories-prev flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-white text-foreground shadow-card transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-elevated"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className="real-stories-next flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-white text-foreground shadow-card transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-elevated"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="order-1 relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip">
          <Swiper
            modules={[Navigation, Pagination]}
            grabCursor
            centeredSlides
            centerInsufficientSlides
            loop
            watchSlidesProgress
            slidesPerView={1.2}
            spaceBetween={16}
            speed={600}
            slideToClickedSlide
            pagination={{
              clickable: true,
              el: ".real-stories-pagination",
              bulletClass:
                "real-stories-bullet inline-block h-2 w-2 rounded-full bg-primary/20 mx-1 cursor-pointer transition-all duration-300",
              bulletActiveClass:
                "real-stories-bullet-active !w-7 !rounded-full !bg-primary",
            }}
            navigation={{
              prevEl: ".real-stories-prev",
              nextEl: ".real-stories-next",
            }}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="real-stories-swiper !px-4 pb-4 sm:!px-6 lg:!px-8"
            breakpoints={{
              480: { slidesPerView: 1.4, spaceBetween: 18 },
              640: { slidesPerView: 1.75, spaceBetween: 20 },
              768: { slidesPerView: 2.25, spaceBetween: 22 },
              1024: { slidesPerView: 2.75, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 28 },
            }}
          >
            {testimonialStories.map((story, index) => (
              <SwiperSlide key={story.id} className="!h-auto">
                <div className="flex justify-center px-2 py-6 sm:px-3">
                  <TestimonialCard
                    story={story}
                    isActive={activeIndex === index}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
}
