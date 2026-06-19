#!/usr/bin/env node
/**
 * Скачивает все /uploads/... из кода и content JSON с продакшена.
 * Нужно для Cloudflare Pages: public/uploads в .gitignore.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const DEST_ROOT = path.join(SITE_ROOT, "public", "uploads");
const PRODUCTION = "https://krashenayadoska.ru/wp-content/uploads";
const MAX_AUTO_MB = Number(process.env.FETCH_UPLOADS_MAX_MB ?? 100);

export function collectUploadRefs() {
  const refs = new Set();
  const re = /\/uploads\/[A-Za-z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif|mp4|svg)/gi;

  function scanFile(file) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(re)) refs.add(m[0]);
  }

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx|json)$/.test(entry.name)) scanFile(full);
    }
  }

  walk(path.join(SITE_ROOT, "lib"));
  walk(path.join(SITE_ROOT, "content"));
  walk(path.join(SITE_ROOT, "components"));
  walk(path.join(SITE_ROOT, "app"));

  return [...refs].sort();
}

async function downloadOne(relPath) {
  const remotePath = relPath.replace(/^\/uploads\//, "");
  const dest = path.join(DEST_ROOT, remotePath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return "skip";
  }

  const url = `${PRODUCTION}/${remotePath}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  miss ${relPath} (${res.status})`);
    return "miss";
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const sizeMb = buf.length / (1024 * 1024);
  if (sizeMb > MAX_AUTO_MB) {
    console.warn(`  skip large ${relPath} (${sizeMb.toFixed(1)} MB)`);
    return "large";
  }

  fs.writeFileSync(dest, buf);
  return "ok";
}

async function main() {
  const refs = collectUploadRefs();
  console.log(`fetch-uploads: ${refs.length} referenced paths`);

  let ok = 0;
  let skip = 0;
  let miss = 0;

  for (const ref of refs) {
    const result = await downloadOne(ref);
    if (result === "ok") ok++;
    else if (result === "skip") skip++;
    else miss++;
  }

  console.log(`fetch-uploads: downloaded=${ok} cached=${skip} missing=${miss}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
