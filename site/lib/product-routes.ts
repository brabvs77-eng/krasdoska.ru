import fs from "node:fs";
import path from "node:path";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "catalog", "products");

const CATEGORY_ALIASES: Record<string, string> = {
  vagonka: "krashenaja-vagonka",
};

let routeMap: Record<string, string> | null = null;

function resolveCategory(category: string): string {
  return CATEGORY_ALIASES[category] ?? category;
}

export function getProductRouteMap(): Record<string, string> {
  if (routeMap) return routeMap;

  routeMap = {};
  if (!fs.existsSync(PRODUCTS_DIR)) return routeMap;

  for (const file of fs.readdirSync(PRODUCTS_DIR)) {
    if (!file.endsWith(".json")) continue;
    const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf8").replace(/^\uFEFF/, "");
    const product = JSON.parse(raw) as { slug?: string; category?: string };
    if (!product.slug || !product.category) continue;
    const category = resolveCategory(product.category);
    routeMap[product.slug] = `/katalog/${category}/${product.slug}/`;
  }

  return routeMap;
}
