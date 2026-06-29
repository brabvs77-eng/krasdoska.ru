#!/usr/bin/env node
/**
 * Миграция контента из WXR в content/
 * Запуск из site/: npm run migrate:content
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const REPO_ROOT = path.join(SITE_ROOT, "..");
const WXR_PATH = path.join(REPO_ROOT, "krashenayadoskaru.WordPress.2026-06-18.xml");
const CATALOG_CATEGORIES_PATH = path.join(REPO_ROOT, "scripts", "catalog-categories.json");

const OUT = {
  pages: path.join(SITE_ROOT, "content", "pages"),
  blog: path.join(SITE_ROOT, "content", "blog"),
  projects: path.join(SITE_ROOT, "content", "projects"),
  categories: path.join(SITE_ROOT, "content", "catalog", "categories"),
  products: path.join(SITE_ROOT, "content", "catalog", "products"),
};

const CATALOG_SLUGS = [
  "krashenaja-doska",
  "vagonka",
  "krashenaja-vagonka",
  "imitacija-brusa",
  "krashenaja-imitacija-brusa",
  "planken",
  "skandinavskaja-doska",
  "terrasnaja-doska",
];

/** Legacy landing slugs (uncategorized in WP) → canonical category slug */
const LANDING_ALIAS_MAP = {
  "krashenyj-planken": "planken",
  "doska-pola": "krashenaja-doska",
  "parketnaja-doska": "krashenaja-doska",
  "fasadnaja-doska": "krashenaja-doska",
  "massiv-pola": "krashenaja-doska",
  "palubnaja-doska": "krashenaja-doska",
  "blok-haus": "imitacija-brusa",
};

const ALL_LANDING_SLUGS = [...CATALOG_SLUGS, ...Object.keys(LANDING_ALIAS_MAP)];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function decodeXml(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function getTag(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const match = block.match(re);
  return match ? decodeXml(match[1].trim()) : "";
}

function getCategories(block) {
  const re = /<category domain="category" nicename="([^"]+)">/g;
  const cats = [];
  let m;
  while ((m = re.exec(block))) {
    cats.push(m[1]);
  }
  return cats;
}

function getTaxonomy(block, domain) {
  const re = new RegExp(
    `<category domain="${domain}" nicename="([^"]+)">(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</category>`,
    "g",
  );
  const items = [];
  let m;
  while ((m = re.exec(block))) {
    items.push({ slug: m[1], label: decodeXml((m[2] || m[3] || "").trim()) });
  }
  return items;
}

function getPostMeta(block, key) {
  const re = new RegExp(
    `<wp:meta_key><!\\[CDATA\\[${key}\\]\\]></wp:meta_key>\\s*<wp:meta_value><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:meta_value>`,
  );
  const match = block.match(re);
  return match ? decodeXml(match[1]) : "";
}

function normalizeUploadUrl(url) {
  if (!url) return "";
  return url.replace(/https?:\/\/krashenayadoska\.ru\/wp-content\/uploads\//, "/uploads/");
}

function resolveAttachment(id, attachments) {
  if (!id) return "";
  const url = attachments[String(id).trim()];
  return url ? normalizeUploadUrl(url) : "";
}

function parsePhpArrayIds(value) {
  if (!value?.trim()) return [];
  const ids = [];
  const re = /s:\d+:"(\d+)"/g;
  let m;
  while ((m = re.exec(value))) {
    ids.push(m[1]);
  }
  return ids;
}

function getFirstImage(html) {
  if (!html) return "";
  const match = html.match(/src="([^"]+\/uploads\/[^"]+)"/);
  return match ? normalizeUploadUrl(match[1]) : "";
}

function extractItems(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[1];
    items.push({
      block,
      title: getTag(block, "title"),
      link: getTag(block, "link"),
      slug: getTag(block, "wp:post_name") || getTag(block, "link").split("/").filter(Boolean).pop() || "",
      type: getTag(block, "wp:post_type"),
      status: getTag(block, "wp:status"),
      content: getTag(block, "content:encoded"),
      excerpt: getTag(block, "excerpt:encoded"),
      postId: getTag(block, "wp:post_id"),
      categories: getCategories(block),
      projectTags: getTaxonomy(block, "project-categoties"),
      projectService: getTaxonomy(block, "project-parrent"),
    });
  }
  return items;
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function stripHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getItemImage(block, content, attachments) {
  const thumbId = getPostMeta(block, "_thumbnail_id");
  if (thumbId && attachments[thumbId]) {
    return attachments[thumbId];
  }
  return getFirstImage(content);
}

function extractProjectFields(block, attachments) {
  const heroDescription = getPostMeta(block, "project-hero-descr")?.trim() || undefined;
  const description = getPostMeta(block, "project-descr")?.trim() || undefined;

  const sliderIds = parsePhpArrayIds(getPostMeta(block, "project-slider"));
  const slider = sliderIds.map((id) => resolveAttachment(id, attachments)).filter(Boolean);

  const heroImageIds = parsePhpArrayIds(getPostMeta(block, "project-hero-images"));
  const heroImages = heroImageIds.map((id) => resolveAttachment(id, attachments)).filter(Boolean);

  const repeaterCount = Number.parseInt(getPostMeta(block, "project-repeater") || "0", 10);
  const gallery = [];
  for (let i = 0; i < repeaterCount; i++) {
    const url = resolveAttachment(getPostMeta(block, `project-repeater_${i}_img`), attachments);
    if (url) gallery.push(url);
  }

  const logoUrl = resolveAttachment(getPostMeta(block, "project-hero-logos"), attachments);

  return {
    heroDescription,
    description,
    slider: slider.length ? slider : undefined,
    heroImages: heroImages.length ? heroImages : undefined,
    gallery: gallery.length ? gallery : undefined,
    logo: logoUrl || undefined,
  };
}

function loadCatalogDefinitions() {
  if (fs.existsSync(CATALOG_CATEGORIES_PATH)) {
    return JSON.parse(fs.readFileSync(CATALOG_CATEGORIES_PATH, "utf8"));
  }
  return CATALOG_SLUGS.map((slug) => ({
    slug,
    title: slug.replace(/-/g, " "),
  }));
}

function resolveLandingCategory(slug) {
  if (CATALOG_SLUGS.includes(slug)) return slug;
  return LANDING_ALIAS_MAP[slug] ?? null;
}

function main() {
  if (!fs.existsSync(WXR_PATH)) {
    console.error("WXR not found:", WXR_PATH);
    process.exit(1);
  }

  Object.values(OUT).forEach(ensureDir);

  const xml = fs.readFileSync(WXR_PATH, "utf8");
  const items = extractItems(xml);

  const attachments = {};
  for (const item of items) {
    if (item.type !== "attachment") continue;
    const url = getTag(item.block, "wp:attachment_url") || item.link;
    if (item.postId && url) {
      attachments[item.postId] = normalizeUploadUrl(url);
    }
  }

  let pages = 0;
  let blog = 0;
  let projects = 0;
  let products = 0;

  const catalogLandings = new Map();

  for (const item of items) {
    if (item.status !== "publish") continue;

    const base = {
      id: item.postId,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || undefined,
      content: item.content || undefined,
      link: item.link || undefined,
      seo: { title: item.title },
    };

    if (item.type === "page") {
      writeJson(path.join(OUT.pages, `${item.slug}.json`), base);
      pages++;
      const landingCat = resolveLandingCategory(item.slug);
      if (landingCat) {
        catalogLandings.set(landingCat, { ...item, landingSlug: item.slug });
      }
    } else if (item.type === "blog-post") {
      writeJson(path.join(OUT.blog, `${item.slug}.json`), {
        ...base,
        image: getItemImage(item.block, item.content, attachments) || undefined,
      });
      blog++;
    } else if (item.type === "project") {
      const acf = extractProjectFields(item.block, attachments);
      writeJson(path.join(OUT.projects, `${item.slug}.json`), {
        ...base,
        image: getItemImage(item.block, item.content, attachments) || undefined,
        tags: item.projectTags.map((t) => t.label).filter(Boolean),
        service: item.projectService[0]?.label,
        ...acf,
      });
      projects++;
    } else if (item.type === "post") {
      const landingCat = resolveLandingCategory(item.slug);
      if (landingCat) {
        const existing = catalogLandings.get(landingCat);
        if (!existing || LANDING_ALIAS_MAP[item.slug]) {
          catalogLandings.set(landingCat, { ...item, landingSlug: item.slug });
        }
        continue;
      }

      const categories = item.categories.filter((c) => c !== "uncategorized");
      const primary = categories[0];
      if (!primary) continue;

      writeJson(path.join(OUT.products, `${item.slug}.json`), {
        ...base,
        category: primary,
        categories,
        image: getItemImage(item.block, item.content, attachments) || undefined,
      });
      products++;
    }
  }

  const catalogDefs = loadCatalogDefinitions();
  for (const def of catalogDefs) {
    const landing = catalogLandings.get(def.slug);
    const content = landing?.content?.trim();
    const description =
      def.description ||
      (landing?.excerpt?.trim() ? stripHtml(landing.excerpt) : undefined) ||
      (content ? stripHtml(content).slice(0, 200) : undefined);

    writeJson(path.join(OUT.categories, `${def.slug}.json`), {
      slug: def.slug,
      title: landing?.title || def.title,
      description: description || undefined,
      content: content || def.content || undefined,
      landingSlug: landing?.landingSlug,
    });
  }

  console.log(
    `Migrated: pages=${pages}, blog=${blog}, projects=${projects}, products=${products}, categories=${catalogDefs.length}, landings=${catalogLandings.size}`,
  );
}

main();
