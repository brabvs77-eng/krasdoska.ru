"use client";

import Image from "next/image";
import Link from "next/link";
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
      <div className="container-content relative flex min-h-[700px] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        {slides.length > 1 && (
          <p className="absolute right-4 top-28 text-sm font-semibold tracking-widest text-white/90 sm:right-6 sm:top-32 lg:top-36">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        )}
        <div className="max-w-4xl">
          {slide.eyebrow && (
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/90 sm:text-base">
              {slide.eyebrow}
            </p>
          )}
          <h1 className="mt-3 whitespace-pre-line text-3xl font-semibold leading-tight sm:text-4xl lg:text-[50px]">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {slide.subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#form" className="btn-primary">
              Получить консультацию
            </Link>
            <Link href="/katalog/" className="btn-outline-light">
              Смотреть каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
