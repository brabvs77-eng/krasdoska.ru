import { ServicesPreviewSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("uslugi");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Услуги",
    description:
      page?.seo?.description ??
      (page ? getExcerpt(page) : undefined) ??
      "Покраска дерева, нанесение масла и воска, реставрация.",
    path: "/uslugi/",
  });
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Услуги покраски и отделки пиломатериалов"
        description="Три направления: заводская покраска распылением, нанесение масла и воска, реставрация изделий из дерева. Все этапы — внутри производственного комплекса."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />
      <ServicesPreviewSection variant="marketing" />
      <MarketingPageFooter />
    </>
  );
}
