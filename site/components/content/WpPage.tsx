import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import type { ContentItem } from "@/lib/content";
import { getExcerpt } from "@/lib/content";

type WpPageProps = {
  page: ContentItem;
  fallbackDescription?: string;
  breadcrumbs?: BreadcrumbItem[];
  withCta?: boolean;
};

export function WpPage({ page, fallbackDescription, breadcrumbs, withCta }: WpPageProps) {
  return (
    <>
      <PageHero
        title={page.title}
        description={getExcerpt(page) ?? fallbackDescription}
      />
      <article className="container-content py-12">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <HtmlContent html={page.content} />
      </article>
      {withCta && <CtaSection />}
    </>
  );
}
