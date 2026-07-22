export type ArticleTocItem = {
  id: string;
  label: string;
};

const DIVIDER =
  '<div class="article-divider" aria-hidden="true"><span class="article-divider__line"></span><span class="article-divider__dot"></span><span class="article-divider__line"></span></div>';

function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
  return base || "section";
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Remove cover image duplicates from article body HTML. */
export function stripCoverFromHtml(html: string, coverSrc?: string): string {
  if (!html || !coverSrc) return html;
  const escaped = coverSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html
    .replace(
      new RegExp(
        `<figure[^>]*>\\s*<img[^>]+src=["']${escaped}["'][^>]*/?>\\s*(?:<figcaption[^>]*>[\\s\\S]*?</figcaption>)?\\s*</figure>`,
        "gi",
      ),
      "",
    )
    .replace(new RegExp(`<img[^>]+src=["']${escaped}["'][^>]*/?>`, "gi"), "");
}

function wrapImageAsFigure(imgTag: string, caption = ""): string {
  return `<figure class="article-figure">${imgTag}${caption}</figure>`;
}

/** Add heading ids, dividers, and normalize figures for the shared article layout. */
export function enhanceArticleHtml(html: string, coverSrc?: string): string {
  if (!html?.trim()) return "";

  let result = stripCoverFromHtml(html, coverSrc);
  const usedIds = new Set<string>();
  let headingIndex = 0;

  result = result.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (_match, attrs = "", inner) => {
    const label = stripTags(inner);
    const idMatch = String(attrs).match(/\bid=["']([^"']+)["']/i);
    let id = idMatch?.[1] ?? slugifyHeading(label);
    const base = id;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${base}-${n++}`;
    }
    usedIds.add(id);

    const attrsWithoutId = String(attrs).replace(/\s*id=["'][^"']*["']/gi, "");
    const block = `<h2 id="${id}" class="article-h2 scroll-mt-28"${attrsWithoutId}><span class="article-h2__icon" aria-hidden="true"></span><span>${inner}</span></h2>`;
    const withDivider = headingIndex > 0 ? `${DIVIDER}\n${block}` : block;
    headingIndex += 1;
    return withDivider;
  });

  // Normalize existing figures
  result = result.replace(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/gi, (_m, _attrs, inner) => {
    const img = String(inner).match(/<img\b[\s\S]*?>/i)?.[0];
    if (!img) return _m;
    const caption = String(inner).match(/<figcaption[\s\S]*?<\/figcaption>/i)?.[0] ?? "";
    return wrapImageAsFigure(img, caption);
  });

  // Wrap remaining bare images
  const parts: string[] = [];
  let last = 0;
  const imgRe = /<img\b[\s\S]*?>/gi;
  let imgMatch: RegExpExecArray | null;
  while ((imgMatch = imgRe.exec(result)) !== null) {
    const start = imgMatch.index;
    const before = result.slice(Math.max(0, start - 80), start);
    if (/<figure\b[^>]*>\s*$/i.test(before) || /article-figure/i.test(before.slice(-40))) {
      continue;
    }
    parts.push(result.slice(last, start));
    parts.push(wrapImageAsFigure(imgMatch[0]));
    last = start + imgMatch[0].length;
  }
  if (parts.length) {
    parts.push(result.slice(last));
    result = parts.join("");
  }

  return result.trim();
}

export function extractArticleToc(html: string): ArticleTocItem[] {
  if (!html) return [];
  const items: ArticleTocItem[] = [];
  const re = /<h2\b[^>]*\bid=["']([^"']+)["'][^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const label = stripTags(match[2]);
    if (label) items.push({ id: match[1], label });
  }
  return items;
}
