import { CtaSection, PartnersSection } from "@/components/sections/HomeSections";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CATALOG_FAQ } from "@/lib/catalog-faq";

type MarketingPageFooterProps = {
  withFaq?: boolean;
};

export function MarketingPageFooter({ withFaq = true }: MarketingPageFooterProps) {
  return (
    <>
      {withFaq && (
        <section className="section-dark pb-16 sm:pb-20">
          <div className="container-content">
            <FaqAccordion items={CATALOG_FAQ} title="Часто задаваемые вопросы" variant="dark" />
          </div>
        </section>
      )}
      <PartnersSection />
      <CtaSection />
    </>
  );
}
