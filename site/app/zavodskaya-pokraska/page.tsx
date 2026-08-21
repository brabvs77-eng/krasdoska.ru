import { CommercialLandingContent } from "@/components/sections/CommercialLandingContent";
import { buildPageMetadata } from "@/lib/metadata";
import { getCommercialLanding } from "@/lib/commercial-landings";

const landing = getCommercialLanding("zavodskaya-pokraska");

export async function generateMetadata() {
  if (!landing) return {};
  return buildPageMetadata({
    title: landing.seo.title,
    description: landing.seo.description,
    path: "/zavodskaya-pokraska/",
  });
}

export default function FactoryPaintingPage() {
  if (!landing) return null;
  return <CommercialLandingContent landing={landing} />;
}
