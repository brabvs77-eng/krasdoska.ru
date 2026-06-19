import { ProductCard } from "@/components/cards/ProductCard";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllCatalogCategories, getExcerpt, getPage } from "@/lib/content";
import { getCatalogImage } from "@/lib/media";

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
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: page.title },
            ]}
          />
          <HtmlContent html={page.content} />
        </article>
      )}
      <div className="container-content pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const image = getCatalogImage(category.slug);

            return image ? (
              <ProductCard
                key={category.slug}
                href={`/katalog/${category.slug}/`}
                title={category.title}
                image={image}
              />
            ) : (
              <a
                key={category.slug}
                href={`/katalog/${category.slug}/`}
                className="flex min-h-[200px] items-end rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-neutral-900">{category.title}</h2>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
