import Image from "next/image";
import { HtmlContent } from "@/components/content/HtmlContent";
import { PageJsonLd } from "@/components/integrations/PageJsonLd";
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
import { getCatalogShowcaseForSlug } from "@/lib/catalog-showcase";
import { getProductImage } from "@/lib/product-media";
import { getProductSectionImage } from "@/lib/profile-sections";
import {
  buildBreadcrumbListJsonLd,
  buildCategoryProductJsonLd,
} from "@/lib/schema";

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
  const sectionImage = getProductSectionImage(product);
  const excerpt = getExcerpt(product);
  const productPath = `/katalog/${slug}/${productSlug}/`;
  const showcase = getCatalogShowcaseForSlug(slug);

  const jsonLd = [
    buildBreadcrumbListJsonLd([
      { name: "Главная", path: "/" },
      { name: "Каталог", path: "/katalog/" },
      { name: categoryTitle, path: `/katalog/${slug}/` },
      { name: product.title, path: productPath },
    ]),
    buildCategoryProductJsonLd({
      name: product.title,
      description: excerpt,
      image,
      path: productPath,
      priceFrom: showcase?.priceFrom,
      sku: product.id,
    }),
  ];

  return (
    <>
      <PageJsonLd data={jsonLd} />
      <PageHero title={product.title} description={excerpt} />
      <article className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/katalog/" },
              { label: categoryTitle, href: `/katalog/${slug}/` },
              { label: product.title },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="space-y-4">
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
              {sectionImage ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    Сечение профиля
                  </p>
                  <div className="relative mt-2 h-16 w-full">
                    <Image
                      src={sectionImage}
                      alt={`Сечение профиля: ${product.title}`}
                      fill
                      sizes="360px"
                      className="object-contain object-left"
                      unoptimized
                    />
                  </div>
                </div>
              ) : null}
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
