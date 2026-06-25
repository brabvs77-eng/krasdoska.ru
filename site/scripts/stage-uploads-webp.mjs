#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectUploadRefs } from "./fetch-uploads.mjs";

const siteRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.join(siteRoot, "..");

for (const ref of collectUploadRefs()) {
  const rel = path.join("site", "public", "uploads", ref.replace(/^\/uploads\//, ""));
  const abs = path.join(repoRoot, rel);
  if (!fs.existsSync(abs)) {
    console.error(`missing ${rel}`);
    process.exit(1);
  }
  execSync(`git add "${rel.replace(/\\/g, "/")}"`, { cwd: repoRoot, stdio: "inherit" });
}

console.log(`staged ${collectUploadRefs().length} webp asset(s)`);
