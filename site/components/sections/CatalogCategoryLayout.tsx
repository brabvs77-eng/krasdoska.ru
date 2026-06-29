import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { CatalogCategory, CatalogProduct } from "@/lib/content";
import type { CatalogShowcaseItem } from "@/lib/catalog-showcase";
import { getCatalogImage } from "@/lib/media";
import { getProductImage } from "@/lib/product-media";

type CatalogCategoryLayoutProps = {
  slug: string;
  category: CatalogCategory | null;
  title: string;
  showcase?: CatalogShowcaseItem;
  products: CatalogProduct[];
};

export function CatalogCategoryLayout({
  slug,
  category,
  title,
  showcase,
  products,
}: CatalogCategoryLayoutProps) {
  const image = showcase?.image ?? getCatalogImage(slug);

  return (
    <>
      <PageHero
        title={title}
        description={
          showcase?.tagline ??
          category?.description ??
          "Продукция в наличии и под заказ с профессиональной покраской на производстве."
        }
        action={{ href: "/#form", label: "Заказать звонок" }}
      />

      <section className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/katalog/" },
              { label: title },
            ]}
          />

          {showcase && (
            <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
              {image && (
                <div className="relative aspect-[576/515] overflow-hidden rounded-2xl bg-white/5">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                  Характеристики
                </p>
                <dl className="mt-4 space-y-2">
                  {showcase.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid gap-1 border-b border-white/10 pb-2 text-sm sm:grid-cols-[140px_1fr]"
                    >
                      <dt className="text-white/70">{spec.label}</dt>
                      <dd className="text-white">{spec.value}</dd>
                    </div>
                  ))}
                  {showcase.priceFrom && (
                    <div className="grid gap-1 pt-2 text-sm sm:grid-cols-[140px_1fr]">
                      <dt className="text-white/70">Цена с покраской</dt>
                      <dd className="font-semibold text-accent">{showcase.priceFrom}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          {products.length > 0 && (
            <section className="mt-12">
              <h2 className="section-title">Товары в категории</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    href={`/katalog/${product.category}/${product.slug}/`}
                    title={product.title}
                    image={getProductImage(product)}
                    variant="dark"
                  />
                ))}
              </div>
            </section>
          )}

          {category?.content && (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
              <HtmlContent
                html={category.content}
                className="wp-content-dark [&_h2]:text-white [&_h3]:text-white [&_a]:text-accent"
              />
            </div>
          )}

          <Link href="/katalog/" className="btn-outline-light mt-10">
            Вернуться в каталог
          </Link>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
