import { ContactForm } from "@/components/forms/ContactForm";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { ContentItem } from "@/lib/content";
import { getExcerpt } from "@/lib/content";
import { getSiteSettings } from "@/lib/site";
import {
  PRODUCTION_STEPS,
  TECHNOLOGY_FAQ,
  TECHNOLOGY_VIDEO,
  getTechnologyTailHtml,
} from "@/lib/technology";

type TechnologyContentProps = {
  page: ContentItem;
};

export function TechnologyContent({ page }: TechnologyContentProps) {
  const tailHtml = getTechnologyTailHtml(page.content);
  const { contacts } = getSiteSettings();
  const phoneDigits = contacts.phones[0]?.replace(/\D/g, "") ?? "88002509055";
  const phoneHref = phoneDigits ? `tel:${phoneDigits}` : "tel:88002509055";

  return (
    <>
      <PageHero
        title={page.title}
        description={getExcerpt(page) ?? "11 этапов производства, видео с линии и ответы на частые вопросы."}
      />
      <article className="container-content py-12">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: page.title },
          ]}
        />

        <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
          <video
            className="aspect-video w-full"
            controls
            preload="metadata"
            playsInline
            poster="/uploads/2025/04/frame-19-2.png"
          >
            <source src={TECHNOLOGY_VIDEO} type="video/mp4" />
          </video>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900">Технология производства</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRODUCTION_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                  Этап {index + 1}
                </p>
                <p className="mt-2 font-medium text-neutral-900">{step.title}</p>
                {step.note && <p className="mt-2 text-sm text-neutral-600">{step.note}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-neutral-600">
            Каждый этап контролируется для безупречного качества продукции. Готово к отгрузке.
          </p>
        </section>

        {tailHtml && <HtmlContent html={tailHtml} className="mt-12" />}

        <FaqAccordion items={TECHNOLOGY_FAQ} />

        <section className="section-dark mt-12 rounded-2xl px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="section-title">Делаем объём без потери качества</h2>
              <p className="section-subtitle mt-4">
                Мы гордимся тем, что наши заказчики остаются довольны результатом, и продолжаем
                внедрять новейшие технологии покраски древесины любых пород.
              </p>
            </div>
            <ContactForm email={contacts.email} phoneHref={phoneHref} />
          </div>
        </section>
      </article>
    </>
  );
}
