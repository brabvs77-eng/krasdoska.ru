#!/usr/bin/env node
/**
 * Миграция базового контента из WXR в content/
 * Запуск из site/: npm run migrate:content
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const REPO_ROOT = path.join(SITE_ROOT, "..");
const WXR_PATH = path.join(REPO_ROOT, "krashenayadoskaru.WordPress.2026-06-18.xml");
const OUT = {
  pages: path.join(SITE_ROOT, "content", "pages"),
  blog: path.join(SITE_ROOT, "content", "blog"),
  projects: path.join(SITE_ROOT, "content", "projects"),
  categories: path.join(SITE_ROOT, "content", "catalog", "categories"),
};

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

function extractItems(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
      const match = block.match(r);
      return match ? decodeXml(match[1].trim()) : "";
    };
    items.push({
      title: get("title"),
      link: get("link"),
      slug: get("wp:post_name") || get("link").split("/").filter(Boolean).pop() || "",
      type: get("wp:post_type"),
      status: get("wp:status"),
      content: get("content:encoded"),
      excerpt: get("excerpt:encoded"),
      postId: get("wp:post_id"),
    });
  }
  return items;
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function main() {
  if (!fs.existsSync(WXR_PATH)) {
    console.error("WXR not found:", WXR_PATH);
    process.exit(1);
  }

  Object.values(OUT).forEach(ensureDir);

  const xml = fs.readFileSync(WXR_PATH, "utf8");
  const items = extractItems(xml);
  let pages = 0;
  let blog = 0;
  let projects = 0;

  for (const item of items) {
    if (item.status !== "publish") continue;

    const base = {
      id: item.postId,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || undefined,
      content: item.content || undefined,
      seo: { title: item.title },
    };

    if (item.type === "page") {
      writeJson(path.join(OUT.pages, `${item.slug}.json`), base);
      pages++;
    } else if (item.type === "blog-post") {
      writeJson(path.join(OUT.blog, `${item.slug}.json`), base);
      blog++;
    } else if (item.type === "project") {
      writeJson(path.join(OUT.projects, `${item.slug}.json`), base);
      projects++;
    }
  }

  // Категории из channel (упрощённо — из ссылок в инвентаризации)
  const categories = [
    "krashenaja-doska",
    "vagonka",
    "krashenaja-vagonka",
    "imitacija-brusa",
    "krashenaja-imitacija-brusa",
    "planken",
    "skandinavskaja-doska",
    "terrasnaja-doska",
  ];
  for (const slug of categories) {
    writeJson(path.join(OUT.categories, `${slug}.json`), {
      slug,
      title: slug.replace(/-/g, " "),
    });
  }

  console.log(`Migrated: pages=${pages}, blog=${blog}, projects=${projects}, categories=${categories.length}`);
}

main();
