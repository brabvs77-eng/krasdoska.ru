import { CatalogCategoryLayout } from "@/components/sections/CatalogCategoryLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { getCatalogCategory, getCatalogSlugs, getProductsByCategory } from "@/lib/content";
import { getCatalogShowcaseForSlug } from "@/lib/catalog-showcase";

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
  const products = getProductsByCategory(slug);
  const showcase = getCatalogShowcaseForSlug(slug);

  return (
    <CatalogCategoryLayout
      slug={slug}
      category={category}
      title={title}
      showcase={showcase}
      products={products}
    />
  );
}
