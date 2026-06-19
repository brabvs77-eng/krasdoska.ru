import { CATALOG_PREVIEW, firstImageFromHtml, getCatalogImage } from "@/lib/media";
import type { CatalogProduct } from "@/lib/content";

export function getProductImage(product: CatalogProduct): string {
  return (
    product.image ??
    firstImageFromHtml(product.content) ??
    getCatalogImage(product.category) ??
    CATALOG_PREVIEW[0].image
  );
}
