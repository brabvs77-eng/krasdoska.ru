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
/** Cloudflare Pages asset limit */
const CF_PAGES_MAX_BYTES = 25 * 1024 * 1024;
const MAX_AUTO_BYTES = Number(process.env.FETCH_UPLOADS_MAX_MB ?? 24) * 1024 * 1024;

/** Exceeds Cloudflare Pages 25 MiB — kept for SSH deploy, skipped on CF prune */
const ALLOW_OVERSIZED = new Set([
  "/uploads/2026/03/video_2026-03-13_23-56-23.mp4",
]);

export function collectUploadRefs() {
  const refs = new Set();
  const re = /\/uploads\/[A-Za-z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif|mp4|svg)/gi;
  const tplRe = /\$\{UPLOADS\}(\/[A-Za-z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif|mp4|svg))/gi;

  function addRef(raw) {
    refs.add(raw.startsWith("/uploads/") ? raw : `/uploads${raw}`);
  }

  function scanFile(file) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(re)) addRef(m[0]);
    for (const m of text.matchAll(tplRe)) addRef(m[1]);
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

export function pruneOversizedUploads() {
  if (!fs.existsSync(DEST_ROOT)) return 0;
  let removed = 0;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const rel = `/uploads/${path.relative(DEST_ROOT, full).replace(/\\/g, "/")}`;
      const size = fs.statSync(full).size;
      if (size > CF_PAGES_MAX_BYTES && !ALLOW_OVERSIZED.has(rel)) {
        fs.unlinkSync(full);
        removed++;
        console.warn(`  prune ${full.replace(SITE_ROOT, "")} (${(size / (1024 * 1024)).toFixed(1)} MB)`);
      }
    }
  }

  walk(DEST_ROOT);
  return removed;
}

async function downloadOne(relPath) {
  const remotePath = relPath.replace(/^\/uploads\//, "");
  const maxBytes = ALLOW_OVERSIZED.has(relPath) ? 200 * 1024 * 1024 : MAX_AUTO_BYTES;
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
  if (buf.length > maxBytes) {
    console.warn(
      `  skip large ${relPath} (${(buf.length / (1024 * 1024)).toFixed(1)} MB, limit ${(maxBytes / (1024 * 1024)).toFixed(0)} MB)`,
    );
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

  const pruned = pruneOversizedUploads();
  console.log(
    `fetch-uploads: downloaded=${ok} cached=${skip} missing=${miss} pruned=${pruned}`,
  );

  const maxMiss = Number(process.env.FETCH_UPLOADS_MAX_MISS ?? 0);
  if (miss > maxMiss) {
    console.error(`fetch-uploads: ${miss} missing assets (limit ${maxMiss}) — fail build`);
    process.exit(1);
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
