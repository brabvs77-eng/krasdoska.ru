#!/usr/bin/env node
/**
 * Симлинк или копия медиа из extracted/uploads → public/uploads
 * Запуск: npm run sync:uploads
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.join(__dirname, "..");
const SRC = path.join(SITE_ROOT, "..", "extracted", "uploads");
const DEST = path.join(SITE_ROOT, "public", "uploads");

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.endsWith(".tar.gz")) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Source uploads not found:", SRC);
    console.error("Run scripts/extract-wpress.ps1 first.");
    process.exit(1);
  }

  if (fs.existsSync(DEST)) {
    console.log("Destination exists, merging:", DEST);
  }

  copyRecursive(SRC, DEST);
  const count = walkCount(DEST);
  console.log(`Synced ${count} files to public/uploads`);
}

function walkCount(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) n += walkCount(p);
    else n++;
  }
  return n;
}

main();
