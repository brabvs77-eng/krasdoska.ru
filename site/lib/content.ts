import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  link?: string;
  seo?: { title?: string; description?: string };
};

export type CatalogCategory = {
  slug: string;
  title: string;
  description?: string;
  content?: string;
};

function readJsonDir(subdir: string): string[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

function readJsonFile<T>(subdir: string, slug: string): T | null {
  const file = path.join(CONTENT_DIR, subdir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function readAllJson<T>(subdir: string): T[] {
  return readJsonDir(subdir)
    .map((slug) => readJsonFile<T>(subdir, slug))
    .filter((item): item is T => item !== null);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getExcerpt(item: Pick<ContentItem, "excerpt" | "content">): string | undefined {
  const fromExcerpt = item.excerpt?.trim();
  if (fromExcerpt) return stripHtml(fromExcerpt);
  if (item.content) {
    const text = stripHtml(item.content);
    if (text) return text.length > 160 ? `${text.slice(0, 157)}…` : text;
  }
  return undefined;
}

const FALLBACK_CATALOG_SLUGS = [
  "krashenaja-doska",
  "vagonka",
  "krashenaja-vagonka",
  "imitacija-brusa",
  "krashenaja-imitacija-brusa",
  "planken",
  "skandinavskaja-doska",
  "terrasnaja-doska",
];

export function getCatalogSlugs(): string[] {
  const fromContent = readJsonDir("catalog/categories");
  return fromContent.length > 0 ? fromContent : FALLBACK_CATALOG_SLUGS;
}

export function getCatalogCategory(slug: string): CatalogCategory | null {
  return readJsonFile<CatalogCategory>("catalog/categories", slug);
}

export function getAllCatalogCategories(): CatalogCategory[] {
  return getCatalogSlugs()
    .map((slug) => getCatalogCategory(slug))
    .filter((item): item is CatalogCategory => item !== null);
}

export function getBlogSlugs(): string[] {
  return readJsonDir("blog");
}

export function getBlogPost(slug: string): ContentItem | null {
  return readJsonFile<ContentItem>("blog", slug);
}

export function getAllBlogPosts(): ContentItem[] {
  return readAllJson<ContentItem>("blog").sort((a, b) =>
    a.title.localeCompare(b.title, "ru"),
  );
}

export function getProjectSlugs(): string[] {
  return readJsonDir("projects");
}

export function getProject(slug: string): ContentItem | null {
  return readJsonFile<ContentItem>("projects", slug);
}

export function getAllProjects(): ContentItem[] {
  return readAllJson<ContentItem>("projects").sort((a, b) =>
    a.title.localeCompare(b.title, "ru"),
  );
}

export function getServiceSlugs(): string[] {
  const fromContent = readJsonDir("pages/services");
  if (fromContent.length > 0) return fromContent;
  return ["pokraska-dereva-na-stanke-metodom-raspyleni"];
}

export function getPaletteSlugs(): string[] {
  return ["palitra-ral", "palitra-ncs", "palitra-cvetov-biofa"];
}
