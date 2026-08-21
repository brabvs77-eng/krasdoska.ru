import { CatalogPriceCalculator } from "@/components/sections/CatalogPriceCalculator";
import { CatalogShowcaseSection } from "@/components/sections/CatalogShowcaseSection";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { getCatalogPrices } from "@/lib/catalog-prices";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("katalog");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Каталог крашеной доски",
    description:
      getExcerpt(page) ??
      "Каталог крашеной доски: вагонка, планкен, фасад, терраса от 1 436 руб/м². Заводская покраска в Истре, гарантия 3 года, доставка по России.",
    path: "/katalog/",
  });
}

export default function CatalogPage() {
  const page = getPage("katalog");
  const prices = getCatalogPrices();

  return (
    <>
      <PageHero
        title={page?.title ?? "Каталог крашеной доски"}
        description="8 групп продукции: от 1 436 до 2 800 руб/м² с покраской. Вагонка, планкен, фасад, терраса, скандинавская доска. Расчёт по площади — в калькуляторе ниже."
        action={{ href: "#kalkulyator", label: "Рассчитать стоимость" }}
      />
      <CatalogPriceCalculator data={prices} />
      <CatalogShowcaseSection />
      <MarketingPageFooter />
    </>
  );
}
