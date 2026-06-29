import fs from "node:fs";
import path from "node:path";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "catalog", "products");

let routeMap: Record<string, string> | null = null;

export function getProductRouteMap(): Record<string, string> {
  if (routeMap) return routeMap;

  routeMap = {};
  if (!fs.existsSync(PRODUCTS_DIR)) return routeMap;

  for (const file of fs.readdirSync(PRODUCTS_DIR)) {
    if (!file.endsWith(".json")) continue;
    const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf8").replace(/^\uFEFF/, "");
    const product = JSON.parse(raw) as { slug?: string; category?: string };
    if (!product.slug || !product.category) continue;
    routeMap[product.slug] = `/katalog/${product.category}/${product.slug}/`;
  }

  return routeMap;
}
