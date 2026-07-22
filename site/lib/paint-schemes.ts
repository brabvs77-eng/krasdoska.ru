import data from "@/content/shema-pokraski.json";

export type PaintSchemeItem = {
  tier: string;
  price: number;
  unit: string;
  life: string;
  layers: string[];
  description: string;
};

export type PaintSchemesData = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  intro: string[];
  disclaimer: string;
  brandsNote: string;
  steps: { title: string; text: string }[];
  sections: {
    id: string;
    title: string;
    subtitle: string;
    groups: {
      title: string;
      items: PaintSchemeItem[];
    }[];
  }[];
  benefits: { title: string; text: string }[];
  examples: { src: string; alt: string; caption: string }[];
  links: { title: string; href: string }[];
};

export function getPaintSchemesData(): PaintSchemesData {
  return data as PaintSchemesData;
}
