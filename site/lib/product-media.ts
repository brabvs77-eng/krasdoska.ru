import { CATALOG_PREVIEW, firstImageFromHtml, getCatalogImage } from "@/lib/media";
import type { CatalogProduct, ContentItem } from "@/lib/content";

export function getContentImage(item: Pick<ContentItem, "image" | "content">): string | undefined {
  return item.image ?? firstImageFromHtml(item.content);
}

export function getProductImage(product: CatalogProduct): string {
  return (
    product.image ??
    firstImageFromHtml(product.content) ??
    getCatalogImage(product.category) ??
    CATALOG_PREVIEW[0].image
  );
}
