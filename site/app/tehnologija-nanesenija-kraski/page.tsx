import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("tehnologija-nanesenija-kraski");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Технология нанесения краски",
    description: page ? getExcerpt(page) : "Этапы производства, видео и ответы на частые вопросы.",
    path: "/tehnologija-nanesenija-kraski/",
  });
}

export default function TechnologyPage() {
  const page = getPage("tehnologija-nanesenija-kraski");
  if (!page) {
    return null;
  }
  return <WpPage page={page} fallbackDescription="11 этапов производства, видео с линии и FAQ." />;
}
