import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/schema";

export function JsonLd() {
  const graph = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
