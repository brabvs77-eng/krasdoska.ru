import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { OsmoSwatchGrid } from "@/components/sections/OsmoSwatchGrid";
import { PageHero } from "@/components/sections/PageHero";
import type { OsmoPaletteCatalog } from "@/lib/osmo-palette";
import { PALETTE_HERO_IMAGE } from "@/lib/palette-data";

type OsmoPaletteSectionProps = {
  data: OsmoPaletteCatalog;
};

export function OsmoPaletteSection({ data }: OsmoPaletteSectionProps) {
  const cta = data.cta ?? {
    title: "Нужен образец на вашей доске?",
    text: "Сделаем выкрас на вашем материале или подберём тон под проект.",
  };

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

          <div className="mt-10 space-y-5">
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="max-w-3xl text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          {data.lead && (
            <div className="mt-12 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                {data.lead.eyebrow}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{data.lead.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{data.lead.text}</p>
            </div>
          )}

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

          {data.production && (
            <section className="mt-12 max-w-3xl">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{data.production.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{data.production.text}</p>
            </section>
          )}

          {data.includes && (
            <section className="mt-12 max-w-3xl">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{data.includes.title}</h2>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/80">
                {data.includes.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {data.includes.note && (
                <p className="mt-4 text-sm leading-relaxed text-white/65">{data.includes.note}</p>
              )}
            </section>
          )}

          <nav className="mt-12" aria-label="Разделы каталога Osmo">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Разделы каталога</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {data.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:border-accent/50 hover:text-white"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

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
          className="scroll-mt-24 border-t border-white/10 bg-brand-dark py-12 sm:py-16"
        >
          <div className="container-content">
            <h2 className="max-w-4xl text-xl font-semibold text-white sm:text-2xl">
              {section.title}
            </h2>
            {section.lead && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">{section.lead}</p>
            )}
            {section.note && (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{section.note}</p>
            )}

            <OsmoSwatchGrid items={section.items} sectionId={section.id} />
          </div>
        </section>
      ))}

      <section className="section-dark border-t border-white/10 py-12 sm:py-16">
        <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">{cta.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">{cta.text}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#form" className="btn-primary">
                Заказать образец
              </Link>
              <Link href="/palitra/" className="btn-outline-light">
                Все палитры
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-[360px] justify-self-start lg:justify-self-end">
            {/* Оранжевая полурамка со смещением вправо-вниз — как на главной / услугах */}
            <div
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-accent"
              aria-hidden="true"
            />
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
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
