import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("politika-obrabotki-personalnyh-dannyh");
  return buildPageMetadata({
    title:
      page?.seo?.title ??
      page?.title ??
      "Политика обработки персональных данных — Крашеная доска",
    description: page ? getExcerpt(page) : undefined,
    path: "/politika-obrabotki-personalnyh-dannyh/",
  });
}

export default function PersonalDataPolicyPage() {
  const page = getPage("politika-obrabotki-personalnyh-dannyh");
  if (!page) {
    return null;
  }
  return <WpPage page={page} withCta stripLeadingH1 />;
}
