import { HtmlContent } from "@/components/content/HtmlContent";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { CtaSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { ContentItem } from "@/lib/content";

type WpPageProps = {
  page: ContentItem;
  fallbackDescription?: string;
  breadcrumbs?: BreadcrumbItem[];
  withCta?: boolean;
  withMarketingFooter?: boolean;
  stripLeadingH1?: boolean;
};

export function WpPage({
  page,
  breadcrumbs,
  withCta,
  withMarketingFooter,
  stripLeadingH1,
}: WpPageProps) {
  return (
    <>
      {/* Parity: чистый hero — крошки + заголовок, без абзаца-эксцерпта */}
      <PageHero title={page.title} breadcrumbs={breadcrumbs} />
      <article className="container-content py-12">
        <HtmlContent html={page.content} stripLeadingH1={stripLeadingH1} />
      </article>
      {withMarketingFooter && <MarketingPageFooter />}
      {withCta && !withMarketingFooter && <CtaSection />}
    </>
  );
}
