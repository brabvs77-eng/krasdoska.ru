"use client";

import Image from "next/image";
import { useEffect, useId } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageLightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function ImageLightbox({ items, index, onClose, onChange }: ImageLightboxProps) {
  const titleId = useId();
  const open = index !== null && items[index];

  useEffect(() => {
    if (index === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onChange, onClose]);

  if (!open || index === null) return null;

  const item = items[index];
  const hasMany = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        ×
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index - 1 + items.length) % items.length);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index + 1) % items.length);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </>
      )}

      <figure
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[min(72vh,720px)] w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
            unoptimized
            priority
          />
        </div>
        <figcaption id={titleId} className="mt-4 max-w-3xl text-center text-sm text-white/90 sm:text-base">
          {item.caption ?? item.alt}
          {hasMany ? (
            <span className="mt-1 block text-xs text-white/55">
              {index + 1} / {items.length}
            </span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}
