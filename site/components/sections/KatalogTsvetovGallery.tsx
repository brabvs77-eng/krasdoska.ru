"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";

export type GalleryImage = {
  src: string;
  caption: string;
  alt?: string;
};

type GallerySection = {
  id: string;
  title: string;
  items: GalleryImage[];
};

type Props = {
  sections: GallerySection[];
};

export function KatalogTsvetovGallery({ sections }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(() => {
    const items: LightboxItem[] = [];
    for (const section of sections) {
      for (const image of section.items) {
        items.push({
          src: image.src,
          alt: image.alt ?? image.caption,
          caption: image.caption,
        });
      }
    }
    return items;
  }, [sections]);

  const indexMap = useMemo(() => {
    const map = new Map<string, number>();
    let i = 0;
    for (const section of sections) {
      for (const image of section.items) {
        map.set(image.src, i);
        i += 1;
      }
    }
    return map;
  }, [sections]);

  return (
    <>
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">{section.title}</h2>
            {/* Wide tiles (~8/3): donor photos show 2–3 swatches side by side; 4/3+cover was cropping the sides */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((image) => {
                const lightboxIndex = indexMap.get(image.src);
                return (
                  <figure key={image.src} className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="group relative aspect-[8/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left"
                      onClick={() => {
                        if (lightboxIndex !== undefined) setActive(lightboxIndex);
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt ?? image.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain transition duration-300 group-hover:scale-[1.02]"
                        unoptimized
                      />
                    </button>
                    <figcaption className="px-0.5 text-xs leading-snug text-white/70 sm:text-sm">
                      {image.caption}
                    </figcaption>
                  </figure>
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
