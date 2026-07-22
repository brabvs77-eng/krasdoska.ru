import { OsmoPaletteSection } from "@/components/sections/OsmoPaletteSection";
import { PaletteDetailSection } from "@/components/sections/PaletteDetailSection";
import { buildPageMetadata } from "@/lib/metadata";
import { getOsmoPaletteCatalog } from "@/lib/osmo-palette";
import { getPalettePageData } from "@/lib/palette-data";
import { getPaletteSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPaletteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (slug === "palitra-osmo") {
    const osmo = getOsmoPaletteCatalog();
    return buildPageMetadata({
      title: osmo.seo.title,
      description: osmo.seo.description,
      path: `/palitra/${slug}/`,
    });
  }

  const data = getPalettePageData(slug);
  return buildPageMetadata({
    title: data?.title ?? slug.replace(/-/g, " "),
    description: data?.intro[0],
    path: `/palitra/${slug}/`,
  });
}

export default async function PaletteSubPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "palitra-osmo") {
    return <OsmoPaletteSection data={getOsmoPaletteCatalog()} />;
  }

  const data = getPalettePageData(slug);

  if (!data) {
    return null;
  }

  return <PaletteDetailSection data={data} />;
}
