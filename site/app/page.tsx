import {
  AdvantagesSection,
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
import { getExcerpt, getPage } from "@/lib/content";
import { HERO_SLIDES } from "@/lib/media";

export async function generateMetadata() {
  const page = getPage("glavnaja");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Главная",
    description:
      getExcerpt(page) ??
      "Производитель крашеной доски в Москве и Истре. Каталог, услуги покраски, палитра цветов, проекты и блог.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <ProductionIntroSection />
      <AdvantagesSection />
      <CatalogPreviewSection />
      <ServicesPreviewSection />
      <ColorsSection />
      <HomeBlogSection />
      <HomeProjectsSection />
      <PartnersSection />
      <CtaSection />
      <CompanyPreviewSection />
      <BottomBarSection />
    </>
  );
}
