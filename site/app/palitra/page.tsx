import { ContentList } from "@/components/content/ContentList";
import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
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
        title={page?.title ?? "Палитра цветов"}
        description={getExcerpt(page) ?? "Стандартные каталоги и фирменные оттенки KD для вашего проекта."}
      />
      {page?.content && (
        <article className="container-content pb-8">
          <HtmlContent html={page.content} />
        </article>
      )}
      <ContentList
        items={palettes.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: getExcerpt(item),
          href: `/palitra/${item.slug}/`,
        }))}
      />
    </>
  );
}
