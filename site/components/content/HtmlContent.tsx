import { normalizeWpHtml } from "@/lib/wp-content";

type HtmlContentProps = {
  html?: string;
  className?: string;
  stripLeadingH1?: boolean;
  stripTrailingCta?: boolean;
  imageContext?: string;
};

export function HtmlContent({
  html,
  className = "",
  stripLeadingH1,
  stripTrailingCta,
  imageContext,
}: HtmlContentProps) {
  const normalized = normalizeWpHtml(html, { stripLeadingH1, stripTrailingCta, imageContext });
  if (!normalized?.trim()) return null;
  return (
    <div
      className={`wp-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: normalized }}
    />
  );
}
