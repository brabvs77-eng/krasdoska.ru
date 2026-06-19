import { Hero } from "@/components/sections/Hero";
import {
  AdvantagesSection,
  CatalogPreviewSection,
  ColorsSection,
  CtaSection,
  ServicesPreviewSection,
} from "@/components/sections/HomeSections";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Главная",
  description:
    "Производитель крашеной доски в Москве и Истре. Каталог, услуги покраски, палитра цветов, проекты и блог.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        title="Крашеная доска для фасадов, интерьеров и террас"
        subtitle="Производим и окрашиваем пиломатериалы на автоматизированном станке. Гарантия качества, индивидуальные цвета и поставки по России."
        primaryCta={{ href: "/katalog/", label: "Смотреть каталог" }}
        secondaryCta={{ href: "/kontakty/", label: "Получить консультацию" }}
      />
      <AdvantagesSection />
      <CatalogPreviewSection />
      <ServicesPreviewSection />
      <ColorsSection />
      <CtaSection />
    </>
  );
}
