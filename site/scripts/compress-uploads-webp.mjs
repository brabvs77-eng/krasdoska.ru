#!/usr/bin/env node
/**
 * Конвертирует все /uploads/... из кода (jpg/png) в WebP для коммита в git.
 * Источник: public/uploads → extracted/uploads (fallback).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { collectUploadRefs } from "./fetch-uploads.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const DEST_ROOT = path.join(SITE_ROOT, "public", "uploads");
const EXTRACTED_ROOT = path.join(SITE_ROOT, "..", "extracted", "uploads");
const MANIFEST = path.join(SITE_ROOT, "scripts", "webp-manifest.json");

const SKIP_EXT = new Set(["gif", "svg", "mp4"]);

function resolveSource(relPath) {
  const inPublic = path.join(DEST_ROOT, relPath);
  if (fs.existsSync(inPublic)) return inPublic;
  const inExtracted = path.join(EXTRACTED_ROOT, relPath);
  if (fs.existsSync(inExtracted)) return inExtracted;
  return null;
}

function findSourceForRef(ref) {
  const rel = ref.replace(/^\/uploads\//, "");
  const direct = resolveSource(rel);
  if (direct) return direct;

  if (/\.webp$/i.test(rel)) {
    const base = rel.replace(/\.webp$/i, "");
    for (const ext of ["png", "jpg", "jpeg"]) {
      const alt = resolveSource(`${base}.${ext}`);
      if (alt) return alt;
    }
  }
  return null;
}

async function convertOne(ref) {
  const ext = ref.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "gif" || ext === "svg" || ext === "mp4") {
    const rel = ref.replace(/^\/uploads\//, "");
    const src = findSourceForRef(ref);
    if (!src) return { ref, status: "missing", webpRef: ref };
    const dest = path.join(DEST_ROOT, rel);
    if (path.resolve(src) !== path.resolve(dest)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
    }
    return { ref, webpRef: ref, status: "kept" };
  }

  const rel = ref.replace(/^\/uploads\//, "");
  const webpRel = rel.replace(/\.(jpe?g|png|webp)$/i, ".webp");
  const webpRef = `/uploads/${webpRel}`;
  const dest = path.join(DEST_ROOT, webpRel);

  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { ref, webpRef, status: "skip" };
  }

  const srcPath = findSourceForRef(ref);
  if (!srcPath) return { ref, webpRef, status: "missing" };

  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const inputStat = fs.statSync(srcPath);
  const isPng = /\.png$/i.test(srcPath);

  await sharp(srcPath)
    .webp({
      quality: isPng ? 85 : 80,
      effort: 4,
      alphaQuality: isPng ? 90 : undefined,
    })
    .toFile(dest);

  const outStat = fs.statSync(dest);
  return {
    ref,
    webpRef,
    status: "ok",
    bytesIn: inputStat.size,
    bytesOut: outStat.size,
  };
}

async function main() {
  const refs = collectUploadRefs();
  console.log(`compress-uploads-webp: ${refs.length} referenced paths`);

  const results = [];
  let converted = 0;
  let kept = 0;
  let missing = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const ref of refs) {
    const result = await convertOne(ref);
    results.push(result);
    if (result.status === "ok") {
      converted++;
      bytesIn += result.bytesIn ?? 0;
      bytesOut += result.bytesOut ?? 0;
    } else if (result.status === "skip" || result.status === "kept") {
      kept++;
    } else {
      missing++;
      console.warn(`  missing source for ${ref}`);
    }
  }

  const mapping = Object.fromEntries(
    results.filter((r) => r.webpRef && r.ref !== r.webpRef).map((r) => [r.ref, r.webpRef]),
  );

  fs.writeFileSync(
    MANIFEST,
    JSON.stringify({ generatedAt: new Date().toISOString(), mapping, results }, null, 2),
  );

  console.log(
    `compress-uploads-webp: converted=${converted} kept=${kept} missing=${missing} ` +
      `size ${(bytesIn / 1024 / 1024).toFixed(1)}MB → ${(bytesOut / 1024 / 1024).toFixed(1)}MB`,
  );

  if (missing > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
