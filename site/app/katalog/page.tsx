import { CatalogShowcaseSection } from "@/components/sections/CatalogShowcaseSection";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("katalog");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Каталог",
    description:
      page?.seo?.description ??
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
        title={page?.title ?? "Каталог крашеной доски и пиломатериалов"}
        description="Все позиции проходят полный цикл в нашем цеху: шлифовка, грунт-антисептик, два слоя финиша. Материал приезжает на объект готовым к монтажу."
        action={{ href: "/#form", label: "Заказать звонок" }}
      />
      <CatalogShowcaseSection />
      <MarketingPageFooter />
    </>
  );
}
