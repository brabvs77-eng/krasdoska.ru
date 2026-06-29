#!/usr/bin/env node
/**
 * Проверка внутренних ссылок в статическом экспорте out/
 * Запуск из site/: node scripts/check-internal-links.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "out");

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function normalizeHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }
  if (href.startsWith("http://") || href.startsWith("https://")) return null;
  if (href.startsWith("/_next/") || href.startsWith("/uploads/")) return null;
  let p = href.split("?")[0].split("#")[0];
  if (!p.startsWith("/")) return null;
  if (path.extname(p)) return null;
  if (!p.endsWith("/")) p += "/";
  return p;
}

function hrefToFile(href) {
  const rel = href.replace(/^\//, "").replace(/\/$/, "");
  if (!rel) return path.join(OUT, "index.html");
  const direct = path.join(OUT, rel, "index.html");
  if (fs.existsSync(direct)) return direct;
  return null;
}

const htmlFiles = walkHtml(OUT);
const broken = [];
const checked = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = normalizeHref(m[1]);
    if (!href) continue;
    const key = `${file} -> ${href}`;
    if (checked.has(key)) continue;
    checked.add(key);
    const target = hrefToFile(href);
    if (!target || !fs.existsSync(target)) {
      broken.push({ from: path.relative(OUT, file), href });
    }
  }
}

console.log(`Checked ${checked.size} internal links across ${htmlFiles.length} HTML files`);
if (broken.length === 0) {
  console.log("OK: no broken internal links");
  process.exit(0);
}

console.error(`Broken links: ${broken.length}`);
for (const item of broken.slice(0, 30)) {
  console.error(`  ${item.from} -> ${item.href}`);
}
process.exit(1);
