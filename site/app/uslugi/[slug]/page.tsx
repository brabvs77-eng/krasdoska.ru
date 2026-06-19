import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getServiceSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata({
    title: slug.replace(/-/g, " "),
    path: `/uslugi/${slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <PageHero title={slug.replace(/-/g, " ")} />
      <PagePlaceholder />
    </>
  );
}
