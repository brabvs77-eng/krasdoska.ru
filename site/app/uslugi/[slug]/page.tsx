import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getServicePage, getServiceSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  return buildPageMetadata({
    title: service?.seo?.title ?? service?.title ?? slug.replace(/-/g, " "),
    description: service ? getExcerpt(service) : undefined,
    path: `/uslugi/${slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return null;
  }

  return <WpPage page={service} />;
}
