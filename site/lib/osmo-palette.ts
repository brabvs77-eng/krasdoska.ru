import osmoCatalog from "@/content/palitra/osmo.json";

export type OsmoSwatch = {
  code: string;
  name: string;
  finish: string | null;
  image: string;
  label: string;
};

export type OsmoSection = {
  id: string;
  title: string;
  lead?: string | null;
  note: string | null;
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

export function getOsmoPaletteCatalog(): OsmoPaletteCatalog {
  return osmoCatalog as OsmoPaletteCatalog;
}
