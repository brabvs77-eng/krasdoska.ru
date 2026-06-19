import { ContentList } from "@/components/content/ContentList";
import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllServices, getExcerpt, getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("uslugi");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Услуги",
    description: page ? getExcerpt(page) : "Покраска дерева, нанесение масла и воска, реставрация.",
    path: "/uslugi/",
  });
}

export default function ServicesPage() {
  const page = getPage("uslugi");
  const services = getAllServices();

  return (
    <>
      <PageHero
        title={page?.title ?? "Услуги"}
        description={getExcerpt(page) ?? "Покраска на станке, нанесение защитных составов и реставрация деревянных поверхностей."}
      />
      {page?.content && (
        <article className="container-content pb-8">
          <HtmlContent html={page.content} />
        </article>
      )}
      <ContentList
        items={services.map((service) => ({
          slug: service.slug,
          title: service.title,
          excerpt: getExcerpt(service),
          href: `/uslugi/${service.slug}/`,
        }))}
      />
    </>
  );
}
