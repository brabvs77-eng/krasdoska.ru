import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { OsmoPaletteCatalog } from "@/lib/osmo-palette";
import { PALETTE_HERO_IMAGE } from "@/lib/palette-data";

type OsmoPaletteSectionProps = {
  data: OsmoPaletteCatalog;
};

export function OsmoPaletteSection({ data }: OsmoPaletteSectionProps) {
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
              <p key={paragraph.slice(0, 40)} className="max-w-3xl text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Варианты покраски доски</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.variants.map((variant) => (
                <div
                  key={variant.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {variant.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{variant.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#form" className="btn-primary">
              Подобрать цвет Osmo
            </Link>
            <Link href="/katalog/" className="btn-outline-light">
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {data.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-t border-white/10 bg-brand-dark py-12 sm:py-16"
        >
          <div className="container-content">
            <h2 className="max-w-4xl text-xl font-semibold text-white sm:text-2xl">
              {section.title}
            </h2>
            {section.note && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{section.note}</p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {section.items.map((item, index) => (
                <article
                  key={`${section.id}-${item.code}-${item.finish}-${index}`}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="relative aspect-[5/3] bg-black/30">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold leading-snug text-white">{item.label}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-dark border-t border-white/10 py-12 sm:py-16">
        <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Нужен образец на вашей доске?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Оттенок Osmo зависит от породы, шлифовки и числа слоёв. Сделаем выкрас на вашем
              материале или подберём тон под проект — с заводской покраской на линии в Истре.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#form" className="btn-primary">
                Заказать образец
              </Link>
              <Link href="/palitra/" className="btn-outline-light">
                Все палитры
              </Link>
            </div>
          </div>
          <div className="relative aspect-[716/586] overflow-hidden rounded-2xl bg-white/5">
            <Image
              src={PALETTE_HERO_IMAGE}
              alt="Заводская покраска пиломатериалов"
              fill
              sizes="360px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
