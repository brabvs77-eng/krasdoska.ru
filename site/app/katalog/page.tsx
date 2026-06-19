import { CatalogShowcaseSection } from "@/components/sections/CatalogShowcaseSection";
import { CtaSection, PartnersSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CATALOG_FAQ } from "@/lib/catalog-faq";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("katalog");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Каталог",
    description:
      getExcerpt(page) ??
      "Все виды продукции в наличии и под заказ. Крашеная доска, вагонка, планкен и террасная доска.",
    path: "/katalog/",
  });
}

export default function CatalogPage() {
  const page = getPage("katalog");

  return (
    <>
      <PageHero
        title={page?.title ?? "Каталог крашеной доски"}
        description="Все виды продукции в наличии и под заказ. Не нашли нужный размер? — Звоните, подберём."
        action={{ href: "/kontakty/", label: "Заказать звонок" }}
      />
      <CatalogShowcaseSection />
      <section className="section-dark pb-16 sm:pb-20">
        <div className="container-content">
          <FaqAccordion items={CATALOG_FAQ} title="Часто задаваемые вопросы" variant="dark" />
        </div>
      </section>
      <PartnersSection />
      <CtaSection />
    </>
  );
}
