import osmoCatalog from "@/content/palitra/osmo.json";

export type OsmoScope = "interior" | "exterior";
export type OsmoFinish = "шлифовка" | "брашировка";
export type OsmoLayers = "1" | "2" | "1-2";

export type OsmoSwatch = {
  code: string;
  name: string;
  finish: OsmoFinish | string | null;
  image: string;
  label: string;
  raw?: string;
  layers?: OsmoLayers | null;
};

export type OsmoSection = {
  id: string;
  title: string;
  lead?: string | null;
  note: string | null;
  scope?: OsmoScope;
  exclusive?: boolean;
  items: OsmoSwatch[];
};

export type OsmoVariant = {
  title: string;
  text: string;
};

export type OsmoPaletteCatalog = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  intro: string[];
  lead?: {
    eyebrow: string;
    title: string;
    text: string;
  };
  production?: {
    title: string;
    text: string;
  };
  includes?: {
    title: string;
    items: string[];
    note?: string;
  };
  variants: OsmoVariant[];
  cta?: {
    title: string;
    text: string;
  };
  sections: OsmoSection[];
};

export type OsmoCatalogFilters = {
  scope: "all" | OsmoScope;
  finish: "all" | OsmoFinish;
  query: string;
  exclusiveOnly: boolean;
  layerCompare: boolean;
};

export const DEFAULT_OSMO_FILTERS: OsmoCatalogFilters = {
  scope: "all",
  finish: "all",
  query: "",
  exclusiveOnly: false,
  layerCompare: false,
};

export function getOsmoPaletteCatalog(): OsmoPaletteCatalog {
  return osmoCatalog as OsmoPaletteCatalog;
}

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

export function filterOsmoSections(
  sections: OsmoSection[],
  filters: OsmoCatalogFilters,
): OsmoSection[] {
  const query = normalizeQuery(filters.query);

  return sections
    .filter((section) => {
      if (filters.scope !== "all" && section.scope && section.scope !== filters.scope) {
        return false;
      }
      if (filters.exclusiveOnly && !section.exclusive) {
        return false;
      }
      return true;
    })
    .map((section) => {
      const items = section.items.filter((item) => {
        if (filters.finish !== "all" && item.finish !== filters.finish) {
          return false;
        }
        if (filters.layerCompare && item.layers !== "1-2") {
          return false;
        }
        if (query) {
          const haystack = normalizeQuery(`${item.code} ${item.name} ${item.label}`);
          if (!haystack.includes(query)) return false;
        }
        return true;
      });

      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);
}
