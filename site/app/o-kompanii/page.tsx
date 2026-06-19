import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "О компании",
  description: "ООО «Крашеная доска» — производитель крашеной доски.",
  path: "/o-kompanii/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="О компании"
        description="Производство крашеной доски в Московской области."
      />
      <PagePlaceholder />
    </>
  );
}
