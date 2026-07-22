import biofaCatalog from "@/content/palitra/biofa.json";
import lesiruyushchieCatalog from "@/content/palitra/lesiruyushchie.json";
import ncsCatalog from "@/content/palitra/ncs.json";
import ralCatalog from "@/content/palitra/ral.json";
import teknosFacadeCatalog from "@/content/palitra/teknos-facade.json";
import teknosInteriorCatalog from "@/content/palitra/teknos-interior.json";
import { PRODUCTION_IMAGE } from "@/lib/media";

export type PaletteSwatch = {
  code: string;
  name: string;
  hex: string;
  group?: string;
};

export type PalettePageData = {
  slug: string;
  title: string;
  intro: string[];
  note?: string;
  benefits?: string[];
  coverImage?: string;
  seo?: { title: string; description: string };
  swatches: PaletteSwatch[];
};

export const PALETTE_HERO_IMAGE = PRODUCTION_IMAGE;

export const RAL_CARD_IMAGE = "/uploads/palitra/ral/cover.jpg";
export const NCS_CARD_IMAGE = "/uploads/palitra/ncs/cover.jpg";
export const BIOFA_CARD_IMAGE = "/uploads/palitra/biofa/cover.jpg";
export const TEKNOS_INTERIOR_CARD_IMAGE = "/uploads/palitra/teknos-interior/cover.jpg";
export const TEKNOS_FACADE_CARD_IMAGE = "/uploads/palitra/teknos-facade/cover.jpg";
export const LESIRUYUSHCHIE_CARD_IMAGE = "/uploads/palitra/lesiruyushchie/cover.jpg";
export const KATALOG_TSVETOV_CARD_IMAGE = "/uploads/katalog-tsvetov/clean/cover.jpg";

function fromCatalog(
  catalog: {
    slug: string;
    title: string;
    intro: string[];
    note?: string;
    benefits?: string[];
    seo?: { title: string; description: string };
    swatches: PaletteSwatch[];
  },
  coverImage: string,
): PalettePageData {
  return {
    slug: catalog.slug,
    title: catalog.title,
    intro: catalog.intro,
    note: catalog.note,
    benefits: catalog.benefits,
    coverImage,
    seo: catalog.seo,
    swatches: catalog.swatches as PaletteSwatch[],
  };
}

export const PALETTE_PAGES: Record<string, PalettePageData> = {
  "palitra-ral": fromCatalog(ralCatalog, RAL_CARD_IMAGE),
  "palitra-ncs": fromCatalog(ncsCatalog, NCS_CARD_IMAGE),
  "palitra-cvetov-biofa": fromCatalog(biofaCatalog, BIOFA_CARD_IMAGE),
  "palitra-ukryvnyh-cvetov-dlya-interera": fromCatalog(
    teknosInteriorCatalog,
    TEKNOS_INTERIOR_CARD_IMAGE,
  ),
  "palitra-ukryvnyh-cvetov-dlya-fasada": fromCatalog(teknosFacadeCatalog, TEKNOS_FACADE_CARD_IMAGE),
  "palitra-lesiruyushchih-cvetov": fromCatalog(lesiruyushchieCatalog, LESIRUYUSHCHIE_CARD_IMAGE),
};

export function getPalettePageData(slug: string): PalettePageData | null {
  return PALETTE_PAGES[slug] ?? null;
}
