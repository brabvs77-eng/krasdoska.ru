import { PaintSchemesSection } from "@/components/sections/PaintSchemesSection";
import { buildPageMetadata } from "@/lib/metadata";
import { getPaintSchemesData } from "@/lib/paint-schemes";

const data = getPaintSchemesData();

export const metadata = buildPageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: "/shema-pokraski/",
});

export default function PaintSchemesPage() {
  return <PaintSchemesSection data={data} />;
}
