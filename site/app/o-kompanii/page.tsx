import { AboutCompanyContent } from "@/components/sections/AboutCompanyContent";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("o-kompanii");
  return buildPageMetadata({
    title: "О компании — производство крашеной доски в Истре | Крашеная доска",
    description:
      page?.excerpt ??
      "ООО «Крашеная доска»: заводская покраска в Истре, линия до 912 м²/смену, Sirca, гарантия 3 года. Доставка по Москве и регионам.",
    path: "/o-kompanii/",
  });
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="О компании: профессиональная покраска пиломатериалов"
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "О компании" }]}
      />
      <AboutCompanyContent />
      <MarketingPageFooter />
    </>
  );
}
