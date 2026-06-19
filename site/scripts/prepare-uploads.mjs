#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { collectUploadRefs } from "./fetch-uploads.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "..", "extracted", "uploads");
const dest = path.join(root, "public", "uploads");

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name.endsWith(".tar.gz")) continue;
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else if (!fs.existsSync(d)) fs.copyFileSync(s, d);
  }
}

const refs = collectUploadRefs();
console.log(`prepare-uploads: ${refs.length} referenced paths`);

if (fs.existsSync(src)) {
  console.log("copy from extracted/uploads …");
  copyRecursive(src, dest);
} else {
  console.log("extracted/uploads not found, fetching from production");
}

const result = spawnSync(process.execPath, ["scripts/fetch-uploads.mjs"], {
  cwd: root,
  stdio: "inherit",
});
process.exit(result.status ?? 1);
