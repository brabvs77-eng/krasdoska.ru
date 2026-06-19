import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getPaletteSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPaletteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata({
    title: slug.replace(/-/g, " "),
    path: `/palitra/${slug}/`,
  });
}

export default async function PaletteSubPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <PageHero title={slug.replace(/-/g, " ")} />
      <PagePlaceholder />
    </>
  );
}
