import { WpPage } from "@/components/content/WpPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("politika-konfidencialnosti");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Политика конфиденциальности",
    description: page ? getExcerpt(page) : undefined,
    path: "/politika-konfidencialnosti/",
  });
}

export default function PrivacyPage() {
  const page = getPage("politika-konfidencialnosti");
  if (!page) {
    return null;
  }
  return <WpPage page={page} withCta />;
}
