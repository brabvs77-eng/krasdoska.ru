type PageJsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function PageJsonLd({ data }: PageJsonLdProps) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
