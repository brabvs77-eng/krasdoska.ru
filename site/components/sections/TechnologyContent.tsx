import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/HomeSections";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { ContentItem } from "@/lib/content";
import { WOOD_TEXTURE_BG } from "@/lib/media";
import {
  PRODUCTION_STEPS,
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

        <section className="mt-12">
          <h2 className="section-title">🛠️ Технология производства</h2>
          <ol className="mt-8 space-y-5">
            {PRODUCTION_STEPS.map((step, index) => (
              <li key={step.title}>
                <p className="font-semibold text-white">
                  <span className="mr-2 text-accent">{index + 1}.</span>
                  {step.title} {step.emoji}
                </p>
                {step.note && (
                  <p className="mt-1 pl-6 text-sm italic text-white/60">({step.note})</p>
                )}
              </li>
            ))}
          </ol>
          <hr className="mt-10 border-white/20" />
          <p className="mt-6 font-semibold text-white">✅ Готово к отгрузке! 🚚</p>
          <p className="mt-3 text-sm italic text-white/60">
            P.S. Каждый этап контролируется для безупречного качества вашей продукции. 🎯
          </p>
          <p className="mt-6 text-sm text-white/75">
            Подробные схемы (грунт, число слоёв, Sirca / Talatu) и цены за м² — на странице{" "}
            <a href="/shema-pokraski/" className="text-accent underline-offset-2 hover:underline">
              схемы покраски
            </a>
            .
          </p>
        </section>

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
