import Image from "next/image";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getCatalogCategory,
  getExcerpt,
  getProduct,
  getProductStaticParams,
  matchesCategory,
} from "@/lib/content";
import { getProductImage } from "@/lib/product-media";

type Props = { params: Promise<{ slug: string; productSlug: string }> };

export function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug, productSlug } = await params;
  const product = getProduct(productSlug);
  const category = getCatalogCategory(slug);
  return buildPageMetadata({
    title: product?.seo?.title ?? product?.title ?? productSlug.replace(/-/g, " "),
    description: product ? getExcerpt(product) : category?.description,
    path: `/katalog/${slug}/${productSlug}/`,
  });
}

export default async function CatalogProductPage({ params }: Props) {
  const { slug, productSlug } = await params;
  const product = getProduct(productSlug);
  const category = getCatalogCategory(slug);
  const categoryTitle = category?.title ?? slug.replace(/-/g, " ");

  if (!product || !matchesCategory(product, slug)) {
    return (
      <>
        <PageHero title={productSlug.replace(/-/g, " ")} />
        <div className="container-content py-16 text-center text-neutral-600">
          Товар не найден.
        </div>
      </>
    );
  }

  const image = getProductImage(product);

  return (
    <>
      <PageHero title={product.title} description={getExcerpt(product)} />
      <article className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/katalog/" },
              { label: categoryTitle, href: `/katalog/${slug}/` },
              { label: product.title },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={image}
                alt={product.title}
                fill
                sizes="360px"
                className="object-cover"
                unoptimized
              />
            </div>
            <HtmlContent
              html={product.content}
              className="text-white/85 [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_a]:text-accent [&_strong]:text-white"
            />
          </div>
        </div>
      </article>
      <MarketingPageFooter />
    </>
  );
}
