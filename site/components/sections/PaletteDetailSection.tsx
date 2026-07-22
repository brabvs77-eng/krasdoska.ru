import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PaletteSwatchCatalog } from "@/components/sections/PaletteSwatchCatalog";
import { PageHero } from "@/components/sections/PageHero";
import type { PalettePageData } from "@/lib/palette-data";
import { PALETTE_HERO_IMAGE } from "@/lib/palette-data";

type PaletteDetailSectionProps = {
  data: PalettePageData;
};

export function PaletteDetailSection({ data }: PaletteDetailSectionProps) {
  const asideImage = data.coverImage ?? PALETTE_HERO_IMAGE;

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

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-6">
              {data.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-white/80">
                  {paragraph}
                </p>
              ))}
              {data.note && (
                <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white/85">
                  {data.note}
                </p>
              )}

              {data.benefits && data.benefits.length > 0 ? (
                <section>
                  <h2 className="text-lg font-semibold text-white">Преимущества</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                    {data.benefits.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <PaletteSwatchCatalog data={data} />

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/#form" className="btn-primary">
                  Заказать образец
                </Link>
                <Link href="/palitra/" className="btn-outline-light">
                  Все палитры
                </Link>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="relative aspect-[716/586] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={asideImage}
                  alt={data.title}
                  fill
                  sizes="360px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
                <p className="font-semibold text-white">Индивидуальная колеровка</p>
                <p className="mt-2 leading-relaxed">
                  Не нашли нужный оттенок? Подберём цвет по образцу или RAL/NCS-коду на вашей доске.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
