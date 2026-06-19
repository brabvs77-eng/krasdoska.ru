import { Hero } from "@/components/sections/Hero";
import {
  AdvantagesSection,
  CatalogPreviewSection,
  ColorsSection,
  CtaSection,
  HomeBlogSection,
  HomeProjectsSection,
  ServicesPreviewSection,
} from "@/components/sections/HomeSections";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

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
  const page = getPage("glavnaja");

  return (
    <>
      <Hero
        title="Идеальный цвет для каждой детали"
        subtitle={
          getExcerpt(page) ??
          "Производим и окрашиваем пиломатериалы на автоматизированном станке. Гарантия качества, индивидуальные цвета и поставки по России."
        }
        primaryCta={{ href: "/katalog/", label: "Смотреть каталог" }}
        secondaryCta={{ href: "/kontakty/", label: "Получить консультацию" }}
      />
      <AdvantagesSection />
      <CatalogPreviewSection />
      <ServicesPreviewSection />
      <ColorsSection />
      <HomeProjectsSection />
      <HomeBlogSection />
      <CtaSection />
    </>
  );
}
