import type { CatalogProduct } from "@/lib/content";

const SECTION = "/uploads/prices/sections";

/** Cross-section diagrams extracted from the price-list Excel files (+ drawn fills). */
export const PROFILE_SECTION_IMAGES = {
  vagonkaShtil: `${SECTION}/vagonka-shtil.png`,
  imitacijaBrusa: `${SECTION}/imitacija-brusa.png`,
  imitacijaBrusaKarelia: `${SECTION}/imitacija-brusa-karelia.png`,
  plankenPryamoy: `${SECTION}/planken-pryamoy.png`,
  plankenKosoy: `${SECTION}/planken-kosoy.png`,
  terrasaVelvet: `${SECTION}/terrasa-velvet.png`,
  palubnaya: `${SECTION}/palubnaya.png`,
  doskaKm: `${SECTION}/doska-km.png`,
  doskaPola: `${SECTION}/doska-pola.png`,
  parketnaja: `${SECTION}/parketnaja-doska.png`,
  massivPola: `${SECTION}/massiv-pola.png`,
  blokHaus: `${SECTION}/blok-haus.png`,
} as const;

const PROFILE_KEYWORDS: { match: RegExp; image: string }[] = [
  { match: /блок[-\s]?хаус|block[-\s]?haus/i, image: PROFILE_SECTION_IMAGES.blokHaus },
  { match: /вельвет|velvet|ёлочк|елочк/i, image: PROFILE_SECTION_IMAGES.terrasaVelvet },
  { match: /палубн/i, image: PROFILE_SECTION_IMAGES.palubnaya },
  { match: /паркет/i, image: PROFILE_SECTION_IMAGES.parketnaja },
  { match: /массив\s*пола/i, image: PROFILE_SECTION_IMAGES.massivPola },
  { match: /доска\s*пола/i, image: PROFILE_SECTION_IMAGES.doskaPola },
  { match: /скошен|косой|kosoy|skoshen/i, image: PROFILE_SECTION_IMAGES.plankenKosoy },
  { match: /прямой\s*планкен|планкен\s*прямой/i, image: PROFILE_SECTION_IMAGES.plankenPryamoy },
  { match: /карел/i, image: PROFILE_SECTION_IMAGES.imitacijaBrusaKarelia },
  { match: /имитац/i, image: PROFILE_SECTION_IMAGES.imitacijaBrusa },
  { match: /вагонк|штиль/i, image: PROFILE_SECTION_IMAGES.vagonkaShtil },
  { match: /\bкм\b|km2?r?/i, image: PROFILE_SECTION_IMAGES.doskaKm },
  { match: /планкен/i, image: PROFILE_SECTION_IMAGES.plankenPryamoy },
  { match: /террас/i, image: PROFILE_SECTION_IMAGES.terrasaVelvet },
  { match: /скандинав|фасадн|строган/i, image: PROFILE_SECTION_IMAGES.doskaKm },
];

const CATEGORY_SECTION: Record<string, string> = {
  vagonka: PROFILE_SECTION_IMAGES.vagonkaShtil,
  "krashenaja-vagonka": PROFILE_SECTION_IMAGES.vagonkaShtil,
  "imitacija-brusa": PROFILE_SECTION_IMAGES.blokHaus,
  "krashenaja-imitacija-brusa": PROFILE_SECTION_IMAGES.imitacijaBrusaKarelia,
  planken: PROFILE_SECTION_IMAGES.plankenKosoy,
  "terrasnaja-doska": PROFILE_SECTION_IMAGES.terrasaVelvet,
  "krashenaja-doska": PROFILE_SECTION_IMAGES.palubnaya,
  "fasadnaja-doska": PROFILE_SECTION_IMAGES.doskaKm,
  "skandinavskaja-doska": PROFILE_SECTION_IMAGES.doskaKm,
};

export function getSectionImageForProfile(profile: string): string | undefined {
  const hit = PROFILE_KEYWORDS.find((item) => item.match.test(profile));
  return hit?.image;
}

export function getProductSectionImage(
  product: Pick<CatalogProduct, "slug" | "category" | "title">,
): string | undefined {
  const haystack = `${product.slug} ${product.title} ${product.category}`;
  const byText = getSectionImageForProfile(haystack);
  if (byText) return byText;
  return CATEGORY_SECTION[product.category];
}
