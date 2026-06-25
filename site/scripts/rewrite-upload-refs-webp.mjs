#!/usr/bin/env node
/**
 * Заменяет /uploads/*.jpg|png на .webp по манифесту compress-uploads-webp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "webp-manifest.json");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|json)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function rewriteText(text, mapping) {
  let out = text;
  const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);
  for (const from of keys) {
    const to = mapping[from];
    out = out.split(from).join(to);
    const wpFrom = from.replace("/uploads/", "/wp-content/uploads/");
    const wpTo = to.replace("/uploads/", "/wp-content/uploads/");
    out = out.split(wpFrom).join(wpTo);
    const suffix = from.slice("/uploads".length);
    const toSuffix = to.slice("/uploads".length);
    out = out.split(`\${UPLOADS}${suffix}`).join(`\${UPLOADS}${toSuffix}`);
  }
  return out;
}

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error("webp-manifest.json not found — run compress-uploads-webp first");
    process.exit(1);
  }

  const { mapping } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const dirs = ["lib", "content", "components", "app"].map((d) => path.join(SITE_ROOT, d));
  let changed = 0;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      const before = fs.readFileSync(file, "utf8");
      const after = rewriteText(before, mapping);
      if (after !== before) {
        fs.writeFileSync(file, after);
        changed++;
        console.log("  updated", path.relative(SITE_ROOT, file));
      }
    }
  }

  console.log(`rewrite-upload-refs-webp: ${changed} file(s) updated, ${Object.keys(mapping).length} path(s) mapped`);
}

main();
