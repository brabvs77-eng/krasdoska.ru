import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Услуги",
  description: "Покраска дерева, нанесение масла и воска, реставрация.",
  path: "/uslugi/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Услуги"
        description="Покраска на станке, нанесение защитных составов и реставрация деревянных поверхностей."
      />
      <PagePlaceholder />
    </>
  );
}
