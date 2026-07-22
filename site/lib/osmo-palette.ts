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
  variants: OsmoVariant[];
  sections: OsmoSection[];
};

export function getOsmoPaletteCatalog(): OsmoPaletteCatalog {
  return osmoCatalog as OsmoPaletteCatalog;
}
