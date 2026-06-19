import fs from "node:fs";
import path from "node:path";
import { normalizeWpHtml } from "./wp-content";

const CONTENT_DIR = path.join(process.cwd(), "content");
export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  link?: string;
  image?: string;
  seo?: { title?: string; description?: string };
};

export type CatalogCategory = {
  slug: string;
  title: string;
  description?: string;
  content?: string;
};

export type CatalogProduct = ContentItem & {
  category: string;
  categories?: string[];
  image?: string;
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
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw) as T;
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

export function getExcerpt(item: Pick<ContentItem, "excerpt" | "content"> | null | undefined): string | undefined {
  if (!item) return undefined;
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

export function getProductSlugs(): string[] {
  return readJsonDir("catalog/products");
}

export function getProduct(slug: string): CatalogProduct | null {
  const product = readJsonFile<CatalogProduct>("catalog/products", slug);
  if (!product) return null;
  return { ...product, content: normalizeWpHtml(product.content) };
}

export function getAllProducts(): CatalogProduct[] {
  return readAllJson<CatalogProduct>("catalog/products");
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return getAllProducts()
    .filter(
      (product) =>
        product.category === categorySlug || product.categories?.includes(categorySlug),
    )
    .sort((a, b) => a.title.localeCompare(b.title, "ru"));
}

export function getProductStaticParams(): { slug: string; productSlug: string }[] {
  return getAllProducts().map((product) => ({
    slug: product.category,
    productSlug: product.slug,
  }));
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

export function getPage(slug: string): ContentItem | null {
  const page = readJsonFile<ContentItem>("pages", slug);
  if (!page) return null;
  return { ...page, content: normalizeWpHtml(page.content) };
}

const SERVICE_SLUGS = ["pokraska-dereva-na-stanke-metodom-raspyleni"];

export function getServiceSlugs(): string[] {
  return SERVICE_SLUGS;
}

export function getServicePage(slug: string): ContentItem | null {
  return getPage(slug);
}

export function getAllServices(): ContentItem[] {
  return getServiceSlugs()
    .map((slug) => getServicePage(slug))
    .filter((item): item is ContentItem => item !== null);
}

export function getPaletteSlugs(): string[] {
  return ["palitra-ral", "palitra-ncs", "palitra-cvetov-biofa"];
}

export function getPalettePage(slug: string): ContentItem | null {
  return getPage(slug);
}

export function getAllPalettePages(): ContentItem[] {
  return getPaletteSlugs()
    .map((slug) => getPalettePage(slug))
    .filter((item): item is ContentItem => item !== null);
}