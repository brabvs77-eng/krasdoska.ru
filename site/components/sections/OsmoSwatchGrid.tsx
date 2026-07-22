"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import type { OsmoSwatch } from "@/lib/osmo-palette";

type OsmoSwatchGridProps = {
  items: OsmoSwatch[];
  sectionId: string;
  compareMode?: boolean;
};

export function OsmoSwatchGrid({ items, sectionId, compareMode = false }: OsmoSwatchGridProps) {
  const [active, setActive] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      items
        .filter((item) => item.image)
        .map((item) => ({
          src: item.image,
          alt: item.label,
          caption: item.layers === "1-2" ? `${item.label} — 1 и 2 слоя на одной доске` : item.label,
        })),
    [items],
  );

  const indexMap = useMemo(() => {
    const map = new Map<number, number>();
    let lightboxIndex = 0;
    items.forEach((item, itemIndex) => {
      if (item.image) {
        map.set(itemIndex, lightboxIndex);
        lightboxIndex += 1;
      }
    });
    return map;
  }, [items]);

  return (
    <>
      <div
        className={
          compareMode
            ? "mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
            : "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        }
      >
        {items.map((item, index) => {
          const lightboxIndex = indexMap.get(index);
          return (
            <article
              key={`${sectionId}-${item.code}-${item.finish}-${index}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <button
                type="button"
                className={[
                  "group relative block w-full bg-black/30 text-left",
                  compareMode ? "aspect-[16/10]" : "aspect-[5/3]",
                ].join(" ")}
                onClick={() => {
                  if (lightboxIndex !== undefined) setActive(lightboxIndex);
                }}
                aria-label={`Увеличить: ${item.label}`}
                disabled={lightboxIndex === undefined}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes={
                      compareMode
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    }
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                ) : null}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                {item.layers === "1-2" ? (
                  <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white/95">
                    1 слой · 2 слоя
                  </span>
                ) : null}
                <span className="absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90 opacity-90 transition group-hover:bg-accent group-hover:text-white">
                  Увеличить
                </span>
              </button>
              <div className="p-3">
                <p className="text-sm font-semibold leading-snug text-white">{item.label}</p>
                {compareMode && item.layers === "1-2" ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                    На одной доске: один и два слоя покрытия для сравнения насыщенности.
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <ImageLightbox
        items={lightboxItems}
        index={active}
        onClose={() => setActive(null)}
        onChange={setActive}
      />
    </>
  );
}
