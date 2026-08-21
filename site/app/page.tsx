import {
  BottomBarSection,
  CatalogPreviewSection,
  ColorsSection,
  CompanyPreviewSection,
  CtaSection,
  HomeBlogSection,
  HomeProjectsSection,
  PartnersSection,
  ProductionIntroSection,
  ServicesPreviewSection,
} from "@/components/sections/HomeSections";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { buildPageMetadata } from "@/lib/metadata";
import { getPage } from "@/lib/content";
import { HERO_SLIDES } from "@/lib/media";

export async function generateMetadata() {
  const page = getPage("glavnaja");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Главная",
    description:
      "Крашеная доска с заводской покраской в Истре: от 1 436 руб/м², линия до 912 м² за смену, гарантия 3 года. Вагонка, планкен, фасад, терраса. Доставка по России.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <div className="font-home">
      <HeroSlider slides={HERO_SLIDES} />
      <ProductionIntroSection />
      <CatalogPreviewSection />
      <ServicesPreviewSection />
      <ColorsSection />
      <HomeBlogSection />
      <HomeProjectsSection />
      <PartnersSection />
      <CtaSection />
      <CompanyPreviewSection />
      <BottomBarSection />
    </div>
  );
}
