import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { PalettePageData } from "@/lib/palette-data";
import { PALETTE_HERO_IMAGE } from "@/lib/palette-data";

type PaletteDetailSectionProps = {
  data: PalettePageData;
};

function groupSwatches(data: PalettePageData) {
  const groups = new Map<string, typeof data.swatches>();
  for (const swatch of data.swatches) {
    const group = swatch.group ?? "Палитра";
    const list = groups.get(group) ?? [];
    list.push(swatch);
    groups.set(group, list);
  }
  return [...groups.entries()];
}

export function PaletteDetailSection({ data }: PaletteDetailSectionProps) {
  const groups = groupSwatches(data);

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

              {groups.map(([group, swatches]) => (
                <section key={group} className="pt-4">
                  <h2 className="text-lg font-semibold text-white">{group}</h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {swatches.map((swatch) => (
                      <div
                        key={swatch.code}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                      >
                        <div
                          className="aspect-square w-full"
                          style={{ backgroundColor: swatch.hex }}
                          aria-hidden="true"
                        />
                        <div className="p-3">
                          <p className="text-sm font-semibold text-white">{swatch.code}</p>
                          <p className="mt-0.5 text-xs text-white/65">{swatch.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/#form" className="btn-primary">
                  Заказать образец
                </Link>
                <Link href="/palitra/" className="btn-outline-light">
                  Все палитры
                </Link>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="relative aspect-[716/586] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={PALETTE_HERO_IMAGE}
                  alt="Качественная обработка деревянных изделий"
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
