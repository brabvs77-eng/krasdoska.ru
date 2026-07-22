import data from "@/content/shema-pokraski.json";

export type PaintSchemeItem = {
  tier: string;
  price: number;
  unit: string;
  life: string;
  layers: string[];
  description: string;
  details?: string[];
};

export type PaintSchemesData = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  intro: string[];
  tariffsIntro: string;
  tariffs: { name: string; text: string }[];
  included: string;
  disclaimer: string;
  brandsNote: string;
  stepsLead: string;
  steps: { title: string; text: string }[];
  layersLead: string;
  sections: {
    id: string;
    title: string;
    subtitle: string;
    lead?: string[];
    groups: {
      title: string;
      items: PaintSchemeItem[];
    }[];
  }[];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: { title: string; text: string }[];
  examplesLead: string;
  examples: { src: string; alt: string; caption: string }[];
  links: { title: string; href: string }[];
};

export function getPaintSchemesData(): PaintSchemesData {
  return data as PaintSchemesData;
}
