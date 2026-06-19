import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("o-kompanii");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "О компании",
    description: page ? getExcerpt(page) : "ООО «Крашеная доска» — производитель крашеной доски.",
    path: "/o-kompanii/",
  });
}

export default function AboutPage() {
  const page = getPage("o-kompanii");
  if (!page) {
    return null;
  }
  return <WpPage page={page} fallbackDescription="Производство крашеной доски в Московской области." />;
}
