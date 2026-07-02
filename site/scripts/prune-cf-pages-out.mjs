#!/usr/bin/env node
/**
 * Cloudflare Pages rejects assets over 25 MiB.
 * Strip them from out/ after export; SSH deploy keeps them via local path in technology.ts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CF_PAGES_MAX_BYTES = 25 * 1024 * 1024;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "out");

function prune(dir) {
  if (!fs.existsSync(dir)) return 0;
  let removed = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += prune(full);
      continue;
    }
    const size = fs.statSync(full).size;
    if (size > CF_PAGES_MAX_BYTES) {
      fs.unlinkSync(full);
      removed++;
      const rel = path.relative(outRoot, full).replace(/\\/g, "/");
      console.warn(`  prune out/${rel} (${(size / (1024 * 1024)).toFixed(1)} MB)`);
    }
  }

  return removed;
}

function main() {
  if (process.env.CF_PAGES !== "1") return;

  const removed = prune(outRoot);
  if (removed > 0) {
    console.log(`prune-cf-pages-out: removed ${removed} oversized file(s) from out/`);
  }
}

main();
