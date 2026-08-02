import data from "@/content/catalog-prices.json";

export type PriceGradeId = "extra" | "prima" | "av";

export type CatalogPriceItem = {
  profile: string;
  thickness: number;
  width: string;
  widthWork: string;
  length: string;
  wood: string;
  prices: Partial<Record<PriceGradeId, number>>;
};

export type CatalogPriceCollection = {
  id: string;
  title: string;
  subtitle: string;
  items: CatalogPriceItem[];
};

export type CatalogPricesData = {
  updatedAt: string;
  currency: string;
  unit: string;
  grades: { id: PriceGradeId; label: string }[];
  note: string;
  collections: CatalogPriceCollection[];
};

export function getCatalogPrices(): CatalogPricesData {
  return data as CatalogPricesData;
}

export function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function uniqueSorted<T extends string | number>(values: T[]): T[] {
  return Array.from(new Set(values)).sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b), "ru");
  });
}
