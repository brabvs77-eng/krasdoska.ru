"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";

type GallerySection = {
  id: string;
  title: string;
  images: string[];
};

type Props = {
  sections: GallerySection[];
};

export function KatalogTsvetovGallery({ sections }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(() => {
    const items: LightboxItem[] = [];
    for (const section of sections) {
      for (const src of section.images) {
        items.push({
          src,
          alt: section.title,
          caption: section.title,
        });
      }
    }
    return items;
  }, [sections]);

  const indexMap = useMemo(() => {
    const map = new Map<string, number>();
    let i = 0;
    for (const section of sections) {
      for (const src of section.images) {
        map.set(src, i);
        i += 1;
      }
    }
    return map;
  }, [sections]);

  return (
    <>
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.title}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {section.images.map((src) => {
                const lightboxIndex = indexMap.get(src);
                return (
                  <button
                    key={src}
                    type="button"
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left"
                    onClick={() => {
                      if (lightboxIndex !== undefined) setActive(lightboxIndex);
                    }}
                  >
                    <Image
                      src={src}
                      alt={section.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
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
