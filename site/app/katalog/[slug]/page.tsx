import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getCatalogCategory, getCatalogSlugs } from "@/lib/content";

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

  return (
    <>
      <PageHero
        title={title}
        description={category?.description ?? `Категория каталога: ${title}`}
      />
      <article className="container-content py-12">
        <HtmlContent html={category?.content} />
      </article>
    </>
  );
}
