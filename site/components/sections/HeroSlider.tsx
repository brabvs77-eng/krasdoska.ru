"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/media";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slide) return null;

  return (
    <section className="relative min-h-[700px] overflow-hidden text-white">
      <div className="absolute inset-0">
        {slides.map((item, i) => (
          <Image
            key={item.image}
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            unoptimized
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container-content relative flex min-h-[700px] items-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          {slide.eyebrow && (
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/90 sm:text-base">
              {slide.eyebrow}
            </p>
          )}
          <h1 className="mt-3 whitespace-pre-line text-3xl font-semibold uppercase leading-tight sm:text-4xl lg:text-[50px]">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {slide.subtitle}
            </p>
          )}
          {slides.length > 1 && (
            <p className="mt-10 text-sm font-medium text-white/80">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
