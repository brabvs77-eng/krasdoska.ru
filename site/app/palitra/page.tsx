import { ColorsSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { ContentList } from "@/components/content/ContentList";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllPalettePages, getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("palitra");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Палитра",
    description: page ? getExcerpt(page) : "Палитры RAL, NCS и BIOFA. Эксклюзивные цвета KD.",
    path: "/palitra/",
  });
}

export default function PalettePage() {
  const page = getPage("palitra");
  const palettes = getAllPalettePages();

  return (
    <>
      <PageHero
        title={page?.title ?? "Идеальный цвет для каждой детали"}
        description={
          getExcerpt(page) ??
          "Профессиональный подбор оттенков RAL, NCS, BIOFA и фирменных цветов KD."
        }
      />
      <ColorsSection />
      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="container-content">
          <h2 className="section-title">Каталоги палитр</h2>
          <ContentList
            embedded
            items={palettes.map((item) => ({
              slug: item.slug,
              title: item.title,
              excerpt: getExcerpt(item),
              href: `/palitra/${item.slug}/`,
            }))}
          />
        </div>
      </section>
      <MarketingPageFooter />
    </>
  );
}
