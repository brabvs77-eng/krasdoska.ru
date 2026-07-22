import { AboutCompanyContent } from "@/components/sections/AboutCompanyContent";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("o-kompanii");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "О компании",
    description: page ? getExcerpt(page) : "ООО «Крашеная доска» — производитель крашеной доски.",
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
