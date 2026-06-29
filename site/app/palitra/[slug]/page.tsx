import { PaletteDetailSection } from "@/components/sections/PaletteDetailSection";
import { buildPageMetadata } from "@/lib/metadata";
import { getPalettePageData } from "@/lib/palette-data";
import { getPaletteSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPaletteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getPalettePageData(slug);
  return buildPageMetadata({
    title: data?.title ?? slug.replace(/-/g, " "),
    description: data?.intro[0],
    path: `/palitra/${slug}/`,
  });
}

export default async function PaletteSubPage({ params }: Props) {
  const { slug } = await params;
  const data = getPalettePageData(slug);

  if (!data) {
    return null;
  }

  return <PaletteDetailSection data={data} />;
}
