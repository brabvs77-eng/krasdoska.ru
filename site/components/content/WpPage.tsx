import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import type { ContentItem } from "@/lib/content";
import { getExcerpt } from "@/lib/content";

type WpPageProps = {
  page: ContentItem;
  fallbackDescription?: string;
};

export function WpPage({ page, fallbackDescription }: WpPageProps) {
  return (
    <>
      <PageHero
        title={page.title}
        description={getExcerpt(page) ?? fallbackDescription}
      />
      <article className="container-content py-12">
        <HtmlContent html={page.content} />
      </article>
    </>
  );
}
