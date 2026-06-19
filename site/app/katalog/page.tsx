import { ContentList } from "@/components/content/ContentList";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllCatalogCategories } from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "Каталог",
  description: "Каталог крашеной доски и пиломатериалов.",
  path: "/katalog/",
});

export default function CatalogPage() {
  const categories = getAllCatalogCategories();

  return (
    <>
      <PageHero
        title="Каталог продукции"
        description="Крашеная доска, вагонка, имитация бруса, планкен и террасная доска."
      />
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
