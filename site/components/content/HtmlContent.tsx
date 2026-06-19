type HtmlContentProps = {
  html?: string;
  className?: string;
};

export function HtmlContent({ html, className = "" }: HtmlContentProps) {
  if (!html?.trim()) return null;

  return (
    <div
      className={`wp-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
