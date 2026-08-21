import { CommercialLandingContent } from "@/components/sections/CommercialLandingContent";
import { buildPageMetadata } from "@/lib/metadata";
import { getCommercialLanding } from "@/lib/commercial-landings";

const landing = getCommercialLanding("proizvodstvo-istra");

export async function generateMetadata() {
  if (!landing) return {};
  return buildPageMetadata({
    title: landing.seo.title,
    description: landing.seo.description,
    path: "/proizvodstvo-istra/",
  });
}

export default function ProductionIstraPage() {
  if (!landing) return null;
  return <CommercialLandingContent landing={landing} />;
}
