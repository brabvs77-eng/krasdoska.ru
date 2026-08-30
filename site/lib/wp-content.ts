import { getProductRouteMap } from "./product-routes";

const LEGACY_PATH_MAP: Record<string, string> = {
  "/krashenaja-vagonka/": "/katalog/krashenaja-vagonka/",
  "/krashenaja-imitacija-brusa/": "/katalog/krashenaja-imitacija-brusa/",
  "/krashenyj-planken/": "/katalog/planken/",
  "/skandinavskaja-doska/": "/katalog/skandinavskaja-doska/",
  "/terrasnaja-doska/": "/katalog/terrasnaja-doska/",
  "/imitacija-brusa/": "/katalog/imitacija-brusa/",
  "/planken/": "/katalog/planken/",
  "/doska-pola/": "/katalog/krashenaja-doska/",
  "/parketnaja-doska/": "/katalog/krashenaja-doska/",
  "/fasadnaja-doska/": "/katalog/fasadnaja-doska/",
  "/massiv-pola/": "/katalog/krashenaja-doska/",
  "/palubnaja-doska/": "/katalog/krashenaja-doska/",
  "/blok-haus/": "/katalog/imitacija-brusa/",
};

function rewriteProductLinks(html: string): string {
  const routes = getProductRouteMap();
  return html.replace(/href="\/([^"/?#]+)\/?"/gi, (match, slug: string) => {
    const path = routes[slug];
    return path ? `href="${path}"` : match;
  });
}

function rewriteInternalLinks(html: string): string {
  let result = html.replace(/https?:\/\/krashenayadoska\.ru/gi, "");

  result = result.replace(/href="\/blog-post\/([^"]+)"/gi, 'href="/blog/$1"');

  for (const [from, to] of Object.entries(LEGACY_PATH_MAP)) {
    result = result.replaceAll(`href="${from}"`, `href="${to}"`);
    result = result.replaceAll(`href='${from}'`, `href='${to}'`);
  }

  return rewriteProductLinks(result);
}

function stripTrailingCtaBlock(html: string): string {
  return html.replace(/<h2[^>]*>\s*Остались вопросы\?[\s\S]*$/i, "").trim();
}

function stripLeadingHeading(html: string): string {
  return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

/**
 * Removes the legacy WordPress product gallery that often opens category/product
 * HTML with three stacked photos (sometimes identical). Later figures in the
 * body (profile diagrams, etc.) are left intact.
 */
function stripLeadingWpGallery(html: string): string {
  return html
    .replace(
      /^\s*(?:<p>\s*)?<!--\s*wp:gallery\b[\s\S]*?<!--\s*\/wp:gallery\s*-->(?:\s*<\/p>)?\s*/i,
      "",
    )
    .trimStart();
}

function embedMediaUrls(html: string): string {
  return html.replace(
    /(?:^|[\s>])(https?:\/\/[^\s<]+\.(?:mp4|webm))(?:[\s<]|$)/gi,
    (match, url) => match.replace(url, `<video controls playsinline preload="metadata" class="wp-video"><source src="${url}" type="video/mp4" /></video>`),
  );
}

type NormalizeWpHtmlOptions = {
  stripLeadingH1?: boolean;
  stripTrailingCta?: boolean;
  stripLeadingGallery?: boolean;
  /** Page/product/category title used to fill empty image alt and title attributes. */
  imageContext?: string;
};

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function deriveImageAlt(src: string, html: string, imgTag: string, contextTitle?: string): string {
  const filename = src.split("/").pop()?.split("?")[0]?.toLowerCase() ?? "";

  if (filename.includes("planken-prjamoj")) return "Сечение прямого планкена";
  if (filename.includes("planken-skoshenyj")) return "Сечение скошенного планкена";

  const profileMatch = filename.match(/profil-([a-z0-9]+)\./);
  if (profileMatch) {
    return `Профиль ${profileMatch[1].toUpperCase()} скандинавской доски`;
  }

  if (filename.includes("5641")) return "Сечение профиля";
  if (filename.includes("capture_")) {
    return contextTitle ? `${contextTitle} — пример отделки` : "Пример отделки крашеной доской";
  }
  if (filename.includes("kachestvennaja-obrabotka")) {
    return "Качественная обработка деревянных изделий";
  }

  const idx = html.indexOf(imgTag);
  if (idx > 0) {
    const before = html.slice(0, idx);
    const headings = [...before.matchAll(/<h([234])[^>]*>([\s\S]*?)<\/h\1>/gi)];
    const lastHeading = headings.at(-1);
    if (lastHeading) {
      const text = stripHtmlTags(lastHeading[2]);
      if (text) return text;
    }
  }

  return contextTitle ? `${contextTitle} — иллюстрация` : "Иллюстрация крашеной доски";
}

function ensureImageAccessibility(html: string, contextTitle?: string): string {
  let result = html.replace(/alt="alt="([^"]*)""/gi, 'alt="$1"');

  result = result.replace(/<img\b[^>]*>/gi, (imgTag) => {
    const srcMatch = imgTag.match(/\bsrc="([^"]+)"/i);
    const altMatch = imgTag.match(/\balt="([^"]*)"/i);
    const hasAltAttr = /\balt=/i.test(imgTag);
    const currentAlt = altMatch?.[1]?.trim() ?? "";

    let alt = currentAlt;
    if (!hasAltAttr || !alt) {
      alt = deriveImageAlt(srcMatch?.[1] ?? "", result, imgTag, contextTitle);
    }

    let nextTag = imgTag;
    if (!hasAltAttr) {
      nextTag = nextTag.replace(/\/?>$/, ` alt="${escapeHtmlAttr(alt)}"$&`);
    } else if (!currentAlt) {
      nextTag = nextTag.replace(/\balt=""/i, `alt="${escapeHtmlAttr(alt)}"`);
    }

    if (!/\btitle=/i.test(nextTag)) {
      nextTag = nextTag.replace(/\s*\/?>$/, ` title="${escapeHtmlAttr(alt)}"$&`);
    }

    return nextTag;
  });

  return result;
}

export function normalizeWpHtml(
  html?: string,
  options?: NormalizeWpHtmlOptions,
): string | undefined {
  if (!html?.trim()) return undefined;

  let normalized = html
    .replace(/\[custom_breadcrumbs\]/g, "")
    .replace(/https?:\/\/krashenayadoska\.ru\/wp-content\/uploads\//gi, "/uploads/")
    .replace(/\/wp-content\/uploads\//g, "/uploads/");

  if (options?.stripLeadingGallery) {
    normalized = stripLeadingWpGallery(normalized);
  }

  if (options?.stripLeadingH1) {
    normalized = stripLeadingHeading(normalized);
  }

  if (options?.stripTrailingCta) {
    normalized = stripTrailingCtaBlock(normalized);
  }

  normalized = embedMediaUrls(rewriteInternalLinks(normalized));
  return ensureImageAccessibility(normalized, options?.imageContext);
}
