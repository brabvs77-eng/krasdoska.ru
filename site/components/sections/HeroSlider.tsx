"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/media";

type HeroSliderProps = {
  slides: HeroSlide[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function HeroSlider({ slides, primaryCta, secondaryCta }: HeroSliderProps) {
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
    <section className="relative overflow-hidden text-white">
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
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand/85 to-brand/55" />
      <div className="container-content relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          {slide.eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{slide.eyebrow}</p>
          )}
          <h1 className="mt-4 whitespace-pre-line text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">{slide.subtitle}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="btn-primary bg-accent text-surface-dark hover:bg-accent-dark"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
          {slides.length > 1 && (
            <div className="mt-10 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Слайд ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2 bg-white/40"}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
