import { HtmlContent } from "@/components/content/HtmlContent";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("kontakty");
  return buildPageMetadata({
    title: page?.title ?? "Контакты",
    description: "Контакты, адреса офиса и производства, телефон и email.",
    path: "/kontakty/",
  });
}

export default function ContactsPage() {
  const page = getPage("kontakty");

  return (
    <>
      <PageHero
        title={page?.title ?? "Контакты"}
        description="Свяжитесь с нами для консультации и расчёта заказа."
      />
      <div className="container-content py-12">
        {page?.content ? (
          <HtmlContent html={page.content} stripLeadingH1 />
        ) : (
          <p className="text-neutral-600">Контактная информация появится после миграции контента.</p>
        )}
      </div>
      <CtaSection />
    </>
  );
}
