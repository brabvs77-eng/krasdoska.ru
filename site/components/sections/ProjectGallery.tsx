"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${title} — фото ${i + 1}`}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 960px"
          className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          unoptimized
        />
      ))}
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Слайд ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-accent w-6" : "bg-white/50"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            onClick={() => setIndex((current) => (current + 1) % images.length)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
