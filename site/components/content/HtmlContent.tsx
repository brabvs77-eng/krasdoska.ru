import { normalizeWpHtml } from "@/lib/wp-content";

type HtmlContentProps = {
  html?: string;
  className?: string;
};

export function HtmlContent({ html, className = "" }: HtmlContentProps) {
  const normalized = normalizeWpHtml(html);
  if (!normalized?.trim()) return null;
  return (
    <div
      className={`wp-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: normalized }}
    />
  );
}
