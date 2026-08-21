#!/usr/bin/env node
/**
 * Renames legacy blog slugs to SEO-friendly URLs and prints redirect rules.
 */
import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** @type {Record<string, string>} */
const SLUG_MAP = {
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera":
    "planken-dlya-hvoynoy-drevesiny",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-2":
    "pokraska-terrasnoy-doski-listvennitsa-velvet",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-3":
    "pokraska-fasada-plankenom-hvoya",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-4":
    "pokraska-plankena-listvennitsy-fasad",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-5":
    "pokraska-imitacii-brusa-hvoya-interer",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-6":
    "kak-vybrat-postavshchika-krashenoy-doski",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-7":
    "imitaciya-brusa-hvoya-vnutrennyaya-otdelka",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-8":
    "terrasnaya-doska-zavodskaya-pokraska",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-9":
    "oficialnyy-diler-sirca",
  "vosstanovlenie-i-pokraska-derevjannyh-polov-sovety-jekspertov-po-obnovleniju-interera-10":
    "kachestvo-proverennoe-vremenem",
  "vosstanovlenie-i-pokraska-derevjanny": "pokraska-imitacii-brusa-hvoi-interer",
  "vosstanovlenie-i-pokraska-derevjanny-3": "hvoya-preimushchestva-dlya-fasada",
  "vosstanovlenie-i-pokraska-derevjanny-4": "kontrol-kachestva-na-proizvodstve",
  "vosstanovlenie-i-pokraska-derevjannyh-fasadov": "pokraska-derevyannyh-fasadov-nash-podhod",
};

const AUTHOR = {
  name: "Андрей Сергеевич",
  role: "Технолог производства, ООО «Крашеная доска»",
  bio: "Более 12 лет красит пиломатериалы на автоматической линии в Истре. Официальный специалист по системам Sirca. Лично контролирует шлифовку, грунтование и межслойную сушку каждой партии.",
};

for (const [oldSlug, newSlug] of Object.entries(SLUG_MAP)) {
  const oldPath = path.join(BLOG_DIR, `${oldSlug}.json`);
  const newPath = path.join(BLOG_DIR, `${newSlug}.json`);
  if (!fs.existsSync(oldPath)) {
    console.warn(`skip missing: ${oldSlug}`);
    continue;
  }
  if (fs.existsSync(newPath)) {
    console.warn(`skip exists: ${newSlug}`);
    continue;
  }

  const raw = fs.readFileSync(oldPath, "utf8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);
  data.slug = newSlug;
  data.link = `https://krashenayadoska.ru/blog/${newSlug}/`;
  if (!data.author) data.author = AUTHOR;

  fs.writeFileSync(newPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  fs.unlinkSync(oldPath);
  console.log(`${oldSlug} -> ${newSlug}`);
}

console.log("\nRedirect rules (_redirects):");
for (const [oldSlug, newSlug] of Object.entries(SLUG_MAP)) {
  console.log(`/blog/${oldSlug}/ /blog/${newSlug}/ 301`);
  console.log(`/blog/${oldSlug} /blog/${newSlug}/ 301`);
}
