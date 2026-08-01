import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/HomeSections";
import { TechnologyProcessInfographic } from "@/components/sections/TechnologyProcessInfographic";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { ContentItem } from "@/lib/content";
import { WOOD_TEXTURE_BG } from "@/lib/media";
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
          <div className="relative mt-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2/1]">
              <Image
                src={TECHNOLOGY_IMAGE}
                alt="Рифлёная доска крупным планом — объёмная фактура без потери качества"
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
            <div aria-hidden="true" className="mt-0 hidden justify-end lg:flex">
              <div className="h-28 w-[30%] overflow-hidden bg-accent">
                <Image
                  src={WOOD_TEXTURE_BG}
                  alt=""
                  width={400}
                  height={112}
                  className="h-full w-full object-cover opacity-40 mix-blend-multiply"
                  unoptimized
                />
              </div>
              <div className="h-28 w-[22%] overflow-hidden bg-accent-dark">
                <Image
                  src={WOOD_TEXTURE_BG}
                  alt=""
                  width={300}
                  height={112}
                  className="h-full w-full object-cover opacity-30 mix-blend-multiply"
                  unoptimized
                />
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
