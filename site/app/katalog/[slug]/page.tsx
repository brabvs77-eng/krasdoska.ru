import { HtmlContent } from "@/components/content/HtmlContent";
import { ProductCard } from "@/components/cards/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getCatalogCategory, getCatalogSlugs, getProductsByCategory } from "@/lib/content";
import { getCatalogImage } from "@/lib/media";
import { getProductImage } from "@/lib/product-media";
import Image from "next/image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCatalogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCatalogCategory(slug);
  return buildPageMetadata({
    title: category?.title ?? slug.replace(/-/g, " "),
    description: category?.description,
    path: `/katalog/${slug}/`,
  });
}

export default async function CatalogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCatalogCategory(slug);
  const title = category?.title ?? slug.replace(/-/g, " ");
  const image = getCatalogImage(slug);
  const products = getProductsByCategory(slug);

  return (
    <>
      <PageHero
        title={title}
        description={category?.description ?? `Категория каталога: ${title}`}
      />
      <article className="container-content py-12">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/katalog/" },
            { label: title },
          ]}
        />
        {image && (
          <div className="relative mb-10 aspect-[3/4] max-w-xs overflow-hidden rounded-2xl bg-surface-muted">
            <Image src={image} alt={title} fill sizes="320px" className="object-cover" unoptimized />
          </div>
        )}
        {products.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Товары</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  href={`/katalog/${slug}/${product.slug}/`}
                  title={product.title}
                  image={getProductImage(product)}
                />
              ))}
            </div>
          </section>
        )}
        <HtmlContent html={category?.content} />
      </article>
    </>
  );
}
