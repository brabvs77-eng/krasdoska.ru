import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { PaintSchemesData } from "@/lib/paint-schemes";

type Props = {
  data: PaintSchemesData;
};

function LayerInfographic({ layers }: { layers: string[] }) {
  return (
    <ol className="mt-4 flex flex-wrap items-center gap-2">
      {layers.map((layer, index) => (
        <li key={`${layer}-${index}`} className="flex items-center gap-2">
          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-accent px-2 text-xs font-bold text-brand-dark">
            {index + 1}
          </span>
          <span className="text-sm text-white/80">{layer}</span>
          {index < layers.length - 1 ? (
            <span className="mx-1 hidden text-accent sm:inline" aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function SchemeProcess({
  steps,
}: {
  steps: PaintSchemesData["steps"];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="relative border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Шаг {index + 1}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
          {index < steps.length - 1 ? (
            <span
              className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent lg:block"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function PaintSchemesSection({ data }: Props) {
  return (
    <>
      <PageHero
        title={data.title}
        description={data.intro[0]}
        action={{ href: "/#form", label: "Получить расчёт" }}
      />

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

          <div className="mt-10 max-w-3xl space-y-4">
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Тарифы схем</h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">{data.tariffsIntro}</p>
            <ul className="mt-5 space-y-4">
              {data.tariffs.map((tariff) => (
                <li key={tariff.name} className="border-l-2 border-accent pl-4">
                  <p className="font-semibold text-white">{tariff.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{tariff.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/80">{data.included}</p>
          </div>

          <aside className="mt-8 border border-accent/35 bg-accent/10 px-5 py-4 text-sm leading-relaxed text-white/90">
            <p className="font-semibold text-white">Важно о схемах и ценах</p>
            <p className="mt-2">{data.disclaimer}</p>
            <p className="mt-2 text-white/75">{data.brandsNote}</p>
          </aside>

          <div className="mt-8 flex flex-wrap gap-3">
            {data.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-accent hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark border-t border-white/5 py-14 sm:py-16">
        <div className="container-content">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Как устроена схема</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">{data.stepsLead}</p>
          <div className="mt-8">
            <SchemeProcess steps={data.steps} />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Слои покрытия (стандарт)</h3>
              <p className="text-sm leading-relaxed text-white/70">{data.layersLead}</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Укрывная — плотный цвет, сильнее скрывает рисунок, максимальная защита фасада
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Лессирующая — подчёркивает текстуру дерева, сохраняет «живой» вид
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  Масло Talatu — для террас с периодическим обновлением покрытия
                </li>
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-md" aria-hidden>
              <div className="space-y-2 rounded-2xl border border-white/10 bg-brand-dark/40 p-6">
                <div className="rounded-lg bg-[#c4a574]/90 px-4 py-3 text-center text-sm font-semibold text-brand-dark">
                  Финиш 2 — Sirca / Talatu
                </div>
                <div className="rounded-lg bg-[#a8885a] px-4 py-3 text-center text-sm font-semibold text-white">
                  Финиш 1 — Sirca / Talatu
                </div>
                <div className="rounded-lg bg-[#6b5344] px-4 py-4 text-center text-sm font-semibold text-white">
                  Грунт Sirca · 4 стороны
                </div>
                <div
                  className="rounded-lg px-4 py-6 text-center text-sm font-semibold text-brand-dark"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg,#d2b48c 0 8px,#c4a06a 8px 16px)",
                  }}
                >
                  Древесина
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="section-dark border-t border-white/5 py-14 sm:py-16"
        >
          <div className="container-content">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/65">{section.subtitle}</p>
            {section.lead?.length ? (
              <div className="mt-5 max-w-3xl space-y-3">
                {section.lead.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-relaxed text-white/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-10 space-y-12">
              {section.groups.map((group) => (
                <div key={`${section.id}-${group.title}`}>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-accent">
                    {group.title}
                  </h3>
                  <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((item) => (
                      <article
                        key={`${section.id}-${group.title}-${item.tier}`}
                        className="flex flex-col border border-white/10 bg-white/[0.04] p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                              Схема
                            </p>
                            <h4 className="mt-1 text-xl font-semibold text-white">{item.tier}</h4>
                          </div>
                          <p className="text-right">
                            <span className="block text-2xl font-semibold text-accent">
                              {item.price.toLocaleString("ru-RU")}
                            </span>
                            <span className="text-xs text-white/55">{item.unit}</span>
                          </p>
                        </div>
                        <p className="mt-2 text-xs font-medium text-white/55">
                          Срок службы: {item.life}
                        </p>
                        <LayerInfographic layers={item.layers} />
                        <p className="mt-4 text-sm leading-relaxed text-white/75">
                          {item.description}
                        </p>
                        {item.details?.length ? (
                          <div className="mt-3 space-y-2">
                            {item.details.map((detail) => (
                              <p
                                key={detail.slice(0, 40)}
                                className="text-sm leading-relaxed text-white/65"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        ) : null}
                        <Link href="/#form" className="btn-primary mt-5 inline-flex self-start">
                          Заказать схему
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-dark border-t border-white/5 py-14 sm:py-16">
        <div className="container-content">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{data.benefitsTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/75">
            {data.benefitsLead}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {data.benefits.map((benefit) => (
              <div key={benefit.title} className="border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{benefit.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/65">
            Подробнее о процессе — на странице{" "}
            <Link
              href="/tehnologija-nanesenija-kraski/"
              className="text-accent underline-offset-2 hover:underline"
            >
              технологии нанесения
            </Link>
            . Сравнить «самому / маляр / завод» по деньгам — в статье{" "}
            <Link
              href="/blog/chto-vygodnee-krasit-samomu-ili-na-proizvodstve/"
              className="text-accent underline-offset-2 hover:underline"
            >
              что выгоднее: красить самому или на производстве
            </Link>
            . Оттенки — в{" "}
            <Link href="/katalog-tsvetov/" className="text-accent underline-offset-2 hover:underline">
              каталоге выкрасов
            </Link>{" "}
            и{" "}
            <Link href="/palitra/" className="text-accent underline-offset-2 hover:underline">
              палитре
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-dark border-t border-white/5 py-14 sm:py-16">
        <div className="container-content">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Примеры работ</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/75">
            {data.examplesLead}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {data.examples.map((example) => (
              <figure key={example.src} className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={example.src}
                  alt={example.alt}
                  title={example.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3 text-xs text-white/90">
                  {example.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#form" className="btn-primary">
              Получить расчёт по схеме
            </Link>
            <Link href="/project/" className="btn-outline-light">
              Смотреть проекты
            </Link>
          </div>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
