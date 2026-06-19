export function normalizeWpHtml(html?: string): string | undefined {
  if (!html?.trim()) return undefined;

  return html
    .replace(/\[custom_breadcrumbs\]/g, "")
    .replace(/https?:\/\/krashenayadoska\.ru\/wp-content\/uploads\//g, "/uploads/")
    .replace(/\/wp-content\/uploads\//g, "/uploads/");
}
