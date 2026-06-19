import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Технология нанесения краски",
  description: "Этапы производства, видео и ответы на частые вопросы.",
  path: "/tehnologija-nanesenija-kraski/",
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        title="Технология нанесения краски"
        description="11 этапов производства, видео с линии и FAQ."
      />
      <PagePlaceholder />
    </>
  );
}
