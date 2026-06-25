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

const SKIP_EXT = new Set(["webp", "gif", "svg", "mp4"]);

function resolveSource(relPath) {
  const inPublic = path.join(DEST_ROOT, relPath);
  if (fs.existsSync(inPublic)) return inPublic;
  const inExtracted = path.join(EXTRACTED_ROOT, relPath);
  if (fs.existsSync(inExtracted)) return inExtracted;
  return null;
}

function toWebpRef(ref) {
  return ref.replace(/\.(jpe?g|png)$/i, ".webp");
}

async function convertOne(ref) {
  const ext = ref.split(".").pop()?.toLowerCase() ?? "";
  if (SKIP_EXT.has(ext)) {
    const rel = ref.replace(/^\/uploads\//, "");
    const src = resolveSource(rel);
    if (!src) return { ref, status: "missing", webpRef: ref };
    const dest = path.join(DEST_ROOT, rel);
    if (path.resolve(src) !== path.resolve(dest)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
    }
    return { ref, webpRef: ref, status: "kept" };
  }

  const rel = ref.replace(/^\/uploads\//, "");
  const webpRel = rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const webpRef = `/uploads/${webpRel}`;
  const src = resolveSource(rel);
  if (!src) return { ref, webpRef, status: "missing" };

  const dest = path.join(DEST_ROOT, webpRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const inputStat = fs.statSync(src);
  const isPng = /\.png$/i.test(src);

  await sharp(src)
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
    status: "converted",
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
    if (result.status === "converted") {
      converted++;
      bytesIn += result.bytesIn ?? 0;
      bytesOut += result.bytesOut ?? 0;
    } else if (result.status === "kept") {
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
