import { CatalogPriceCalculator } from "@/components/sections/CatalogPriceCalculator";
import { ServicesPreviewSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { getCatalogPrices } from "@/lib/catalog-prices";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";
import { SERVICES_TECHNOLOGY_VIDEO } from "@/lib/technology";

export async function generateMetadata() {
  const page = getPage("uslugi");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Услуги",
    description: page ? getExcerpt(page) : "Покраска дерева, нанесение масла и воска, реставрация.",
    path: "/uslugi/",
  });
}

export default function ServicesPage() {
  const prices = getCatalogPrices();

  return (
    <>
      <PageHero
        title="Наши услуги"
        description="Покраска дерева, нанесение масла и воска, реставрация. Рассчитайте стоимость по прайсу."
        action={{ href: "#kalkulyator", label: "Рассчитать стоимость" }}
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />
      <section className="section-dark border-b border-white/10 py-12 sm:py-14">
        <div className="container-content">
          <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
            <video
              className="aspect-video w-full"
              controls
              preload="metadata"
              playsInline
            >
              <source src={SERVICES_TECHNOLOGY_VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <ServicesPreviewSection variant="marketing" />
      <CatalogPriceCalculator data={prices} />
      <MarketingPageFooter />
    </>
  );
}
