import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getCatalogCategory,
  getExcerpt,
  getProduct,
  getProductStaticParams,
} from "@/lib/content";
import { getProductImage } from "@/lib/product-media";
import Image from "next/image";

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

  if (
    !product ||
    (product.category !== slug && !product.categories?.includes(slug))
  ) {
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
      <article className="container-content py-12">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/katalog/" },
            { label: categoryTitle, href: `/katalog/${slug}/` },
            { label: product.title },
          ]}
        />
        <div className="relative mb-10 aspect-[3/4] max-w-sm overflow-hidden rounded-2xl bg-surface-muted">
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="384px"
            className="object-cover"
            unoptimized
          />
        </div>
        <HtmlContent html={product.content} />
      </article>
    </>
  );
}
