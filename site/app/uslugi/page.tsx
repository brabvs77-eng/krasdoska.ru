import { ServicesPreviewSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("uslugi");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Услуги",
    description: page ? getExcerpt(page) : "Покраска дерева, нанесение масла и воска, реставрация.",
    path: "/uslugi/",
  });
}

export default function ServicesPage() {
  const page = getPage("uslugi");

  return (
    <>
      <PageHero
        title="Наши услуги"
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />
      <ServicesPreviewSection />
      <MarketingPageFooter />
    </>
  );
}
