import { ContentList } from "@/components/content/ContentList";
import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllCatalogCategories, getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("katalog");
  return buildPageMetadata({
    title: page?.title ?? "Каталог",
    description: page ? getExcerpt(page) : "Каталог крашеной доски и пиломатериалов.",
    path: "/katalog/",
  });
}

export default function CatalogPage() {
  const page = getPage("katalog");
  const categories = getAllCatalogCategories();

  return (
    <>
      <PageHero
        title={page?.title ?? "Каталог продукции"}
        description={
          getExcerpt(page) ??
          "Крашеная доска, вагонка, имитация бруса, планкен и террасная доска."
        }
      />
      {page?.content && (
        <article className="container-content pb-8">
          <HtmlContent html={page.content} />
        </article>
      )}
      <ContentList
        items={categories.map((category) => ({
          slug: category.slug,
          title: category.title,
          excerpt: category.description,
          href: `/katalog/${category.slug}/`,
        }))}
      />
    </>
  );
}
