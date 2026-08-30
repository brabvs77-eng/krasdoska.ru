import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/HomeSections";
import { TechnologyProcessInfographic } from "@/components/sections/TechnologyProcessInfographic";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { ContentItem } from "@/lib/content";
import {
  TECHNOLOGY_FAQ,
  TECHNOLOGY_IMAGE,
  TECHNOLOGY_VIDEO,
} from "@/lib/technology";

type TechnologyContentProps = {
  page: ContentItem;
};

export function TechnologyContent({ page }: TechnologyContentProps) {
  return (
    <>
      <PageHero
        title={"Технология:\nнанесение краски и масла"}
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: page.title }]}
      />
      <article className="section-dark container-content py-12">
        <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
          <video className="aspect-video w-full" controls preload="metadata" playsInline>
            <source src={TECHNOLOGY_VIDEO} type="video/mp4" />
          </video>
        </div>

        <TechnologyProcessInfographic />

        <section className="relative mt-14">
          <h2 className="section-title">Делаем обьем без потери качества</h2>
          {/* Оранжевая полурамка со смещением вправо-вниз — как на услугах / палитре */}
          <div className="relative mt-8 pr-4 pb-4 sm:pr-5 sm:pb-5">
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] bg-accent sm:h-[calc(100%-1.25rem)] sm:w-[calc(100%-1.25rem)]"
            />
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2/1]">
              <Image
                src={TECHNOLOGY_IMAGE}
                alt="Рифлёная доска крупным планом — объёмная фактура без потери качества"
                title="Рифлёная доска крупным планом"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-10">
                <p className="max-w-3xl text-lg font-semibold leading-snug text-white sm:text-xl">
                  Мы гордимся тем, что наши заказчики всегда остаются довольны результатом,
                  и продолжаем развиваться, внедряя новейшие технологии и подходы в покраске
                  древесины любых пород.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <FaqAccordion items={TECHNOLOGY_FAQ} variant="dark" />
        </div>
      </article>
      <CtaSection />
    </>
  );
}
