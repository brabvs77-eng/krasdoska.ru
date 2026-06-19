import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPalettePage, getPaletteSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPaletteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getPalettePage(slug);
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? slug.replace(/-/g, " "),
    description: page ? getExcerpt(page) : undefined,
    path: `/palitra/${slug}/`,
  });
}

export default async function PaletteSubPage({ params }: Props) {
  const { slug } = await params;
  const page = getPalettePage(slug);

  if (!page) {
    return null;
  }

  return <WpPage page={page} />;
}
