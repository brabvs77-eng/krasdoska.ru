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
        sections: catalog.sections,
        paletteLinks: catalog.paletteLinks,
      }}
    />
  );
}
