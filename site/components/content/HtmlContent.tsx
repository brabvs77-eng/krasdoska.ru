import { normalizeWpHtml } from "@/lib/wp-content";

type HtmlContentProps = {
  html?: string;
  className?: string;
  stripLeadingH1?: boolean;
};

export function HtmlContent({ html, className = "", stripLeadingH1 }: HtmlContentProps) {
  const normalized = normalizeWpHtml(html, { stripLeadingH1 });
  if (!normalized?.trim()) return null;
  return (
    <div
      className={`wp-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: normalized }}
    />
  );
}
