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

function loadCatalogDefinitions() {
  if (fs.existsSync(CATALOG_CATEGORIES_PATH)) {
    return JSON.parse(fs.readFileSync(CATALOG_CATEGORIES_PATH, "utf8"));
  }
  return CATALOG_SLUGS.map((slug) => ({
    slug,
    title: slug.replace(/-/g, " "),
  }));
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
      if (CATALOG_SLUGS.includes(item.slug)) {
        catalogLandings.set(item.slug, item);
      }
    } else if (item.type === "blog-post") {
      writeJson(path.join(OUT.blog, `${item.slug}.json`), {
        ...base,
        image: getItemImage(item.block, item.content, attachments) || undefined,
      });
      blog++;
    } else if (item.type === "project") {
      writeJson(path.join(OUT.projects, `${item.slug}.json`), {
        ...base,
        image: getItemImage(item.block, item.content, attachments) || undefined,
      });
      projects++;
    } else if (item.type === "post") {
      if (CATALOG_SLUGS.includes(item.slug)) {
        catalogLandings.set(item.slug, item);
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
    });
  }

  console.log(
    `Migrated: pages=${pages}, blog=${blog}, projects=${projects}, products=${products}, categories=${catalogDefs.length}, landings=${catalogLandings.size}`,
  );
}

main();
