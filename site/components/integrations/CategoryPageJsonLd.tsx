import {
  buildCatalogProductJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/schema";
import type { FaqItem } from "@/lib/technology";

type CategoryPageJsonLdProps = {
  path: string;
  name: string;
  description?: string;
  image?: string;
  priceFrom?: string;
  faq?: FaqItem[];
};

export function CategoryPageJsonLd({
  path,
  name,
  description,
  image,
  priceFrom,
  faq,
}: CategoryPageJsonLdProps) {
  const graph = [
    buildCatalogProductJsonLd({
      name,
      description,
      image,
      path,
      priceFrom,
    }),
    ...(faq && faq.length > 0 ? [buildFaqPageJsonLd(faq, path)] : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
