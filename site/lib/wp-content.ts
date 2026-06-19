const LEGACY_PATH_MAP: Record<string, string> = {
  "/krashenaja-vagonka/": "/katalog/krashenaja-vagonka/",
  "/krashenaja-imitacija-brusa/": "/katalog/krashenaja-imitacija-brusa/",
  "/krashenyj-planken/": "/katalog/planken/",
  "/skandinavskaja-doska/": "/katalog/skandinavskaja-doska/",
  "/terrasnaja-doska/": "/katalog/terrasnaja-doska/",
  "/doska-pola/": "/katalog/krashenaja-doska/",
  "/parketnaja-doska/": "/katalog/krashenaja-doska/",
  "/fasadnaja-doska/": "/katalog/krashenaja-doska/",
  "/massiv-pola/": "/katalog/krashenaja-doska/",
  "/palubnaja-doska/": "/katalog/krashenaja-doska/",
  "/blok-haus/": "/katalog/imitacija-brusa/",
};

function rewriteInternalLinks(html: string): string {
  let result = html.replace(/https?:\/\/krashenayadoska\.ru/gi, "");

  result = result.replace(/href="\/blog-post\/([^"]+)"/gi, 'href="/blog/$1"');

  for (const [from, to] of Object.entries(LEGACY_PATH_MAP)) {
    result = result.replaceAll(`href="${from}"`, `href="${to}"`);
    result = result.replaceAll(`href='${from}'`, `href='${to}'`);
  }

  return result;
}

function embedMediaUrls(html: string): string {
  return html.replace(
    /(?:^|[\s>])(https?:\/\/[^\s<]+\.(?:mp4|webm))(?:[\s<]|$)/gi,
    (match, url) => match.replace(url, `<video controls playsinline preload="metadata" class="wp-video"><source src="${url}" type="video/mp4" /></video>`),
  );
}

export function normalizeWpHtml(html?: string): string | undefined {
  if (!html?.trim()) return undefined;

  return embedMediaUrls(
    rewriteInternalLinks(
      html
        .replace(/\[custom_breadcrumbs\]/g, "")
        .replace(/https?:\/\/krashenayadoska\.ru\/wp-content\/uploads\//gi, "/uploads/")
        .replace(/\/wp-content\/uploads\//g, "/uploads/"),
    ),
  );
}
