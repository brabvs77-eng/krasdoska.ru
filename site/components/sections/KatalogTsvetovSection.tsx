"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";

export type KatalogTsvetovSectionData = {
  title: string;
  intro: string[];
  sections: { id: string; title: string; images: string[] }[];
  paletteLinks: { title: string; href: string }[];
};

type Props = {
  data: KatalogTsvetovSectionData;
};

export function KatalogTsvetovSection({ data }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(() => {
    const items: LightboxItem[] = [];
    for (const section of data.sections) {
      for (const src of section.images) {
        items.push({
          src,
          alt: section.title,
          caption: section.title,
        });
      }
    }
    return items;
  }, [data.sections]);

  const indexMap = useMemo(() => {
    const map = new Map<string, number>();
    let i = 0;
    for (const section of data.sections) {
      for (const src of section.images) {
        map.set(src, i);
        i += 1;
      }
    }
    return map;
  }, [data.sections]);

  return (
    <>
      <PageHero title={data.title} description={data.intro[0]} />

      <section className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Палитра", href: "/palitra/" },
              { label: data.title },
            ]}
          />

          <div className="mt-10 space-y-6">
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="max-w-3xl text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {data.paletteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-accent hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="mt-14 space-y-14">
            {data.sections.map((section) => (
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

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/#form" className="btn-primary">
              Заказать образец
            </Link>
            <Link href="/palitra/" className="btn-outline-light">
              Все палитры
            </Link>
          </div>
        </div>
      </section>

      <MarketingPageFooter />

      <ImageLightbox
        items={lightboxItems}
        index={active}
        onClose={() => setActive(null)}
        onChange={setActive}
      />
    </>
  );
}
