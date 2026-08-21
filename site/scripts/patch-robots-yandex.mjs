/**
 * Append Yandex Clean-param directives to out/robots.txt after static export.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const robotsPath = join(process.cwd(), "out", "robots.txt");
if (!existsSync(robotsPath)) {
  console.warn("[patch-robots-yandex] out/robots.txt not found, skip");
  process.exit(0);
}

const cleanParams = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "yclid",
  "gclid",
  "fbclid",
  "openstat",
  "from",
  "_openstat",
].join("&");

const marker = "Clean-param:";
let text = readFileSync(robotsPath, "utf8");
if (text.includes(marker)) {
  console.log("[patch-robots-yandex] Clean-param already present");
  process.exit(0);
}

if (!text.includes("User-agent: Yandex")) {
  text += `\nUser-agent: Yandex\nAllow: /\n`;
}

text = text.trimEnd() + `\nClean-param: ${cleanParams}\n`;
writeFileSync(robotsPath, text);
console.log("[patch-robots-yandex] appended Clean-param for Yandex");
