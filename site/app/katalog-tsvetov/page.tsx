import { KatalogTsvetovSection } from "@/components/sections/KatalogTsvetovSection";
import catalog from "@/content/palitra/katalog-tsvetov.json";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: catalog.seo.title,
  description: catalog.seo.description,
  path: "/katalog-tsvetov/",
});

export default function KatalogTsvetovPage() {
  return (
    <KatalogTsvetovSection
      data={{
        title: catalog.title,
        intro: catalog.intro,
        sections: catalog.sections.map((section) => ({
          id: section.id,
          title: section.title,
          items: section.items,
        })),
        paletteLinks: catalog.paletteLinks,
      }}
    />
  );
}
