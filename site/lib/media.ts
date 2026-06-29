const UPLOADS = "/uploads";

export const PAGE_HERO_BG = `${UPLOADS}/2025/04/frist-screen.webp`;
export const WOOD_TEXTURE_BG = `${UPLOADS}/2025/04/top-view-light-wood-wallpaper-1-1.webp`;

export const HERO_IMAGE = `${UPLOADS}/2025/05/photo_2025-05-30_23-49-23.webp`;

const HERO_SLIDE_IMAGES = {
  idealColor: `${UPLOADS}/2025/05/photo_2025-05-30_23-49-23.webp`,
  housePainting: `${UPLOADS}/2025/05/dsc_5305-scaled.webp`,
  personalApproach: `${UPLOADS}/2025/05/hnj84hc5vyfbpdgkf2vy8q0j71gcxydbiyj9p9hshwwlfgtdp4a-ea7-s0ersdz75lbzc7a398lmbqohdddh7g-scaled.webp`,
  quality: `${UPLOADS}/2025/05/photo_2025-05-17_23-36-40.webp`,
} as const;

export type HeroSlide = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Идеальный цвет\nдля каждой детали",
    subtitle: "Лучшие идеи — Лучшее решение — Лучшие результаты",
    image: HERO_SLIDE_IMAGES.idealColor,
  },
  {
    title: "Профессиональная покраска деревянных домов",
    image: HERO_SLIDE_IMAGES.housePainting,
  },
  {
    title: "Персональный подход",
    subtitle: "Ваш комфорт — Наша приоритетная задача",
    image: HERO_SLIDE_IMAGES.personalApproach,
  },
  {
    title: "Исключительное качество",
    subtitle: "Гарантия долговечности и эстетики",
    image: HERO_SLIDE_IMAGES.quality,
  },
];

export const PRODUCTION_IMAGE = `${UPLOADS}/2025/04/photo_2025-04-26_20-30-22.webp`;

export const SERVICES_IMAGE = `${UPLOADS}/2025/03/Frame-19.webp`;

// Parity: торец бревна (годовые кольца) — фон нижнего CTA-баннера
export const BOTTOMBAR_BG = `${UPLOADS}/2025/04/top-view-light-wood-wallpaper-1-1.webp`;

// Parity: оранжевый лес — фон секции «Эксклюзивные цвета» (как в оригинале)
export const COLORS_BG = `${UPLOADS}/2025/03/Frame-19.webp`;

// Parity: реальные фото услуг из оригинала (krashenayadoska.ru)
export const SERVICE_IMAGES = {
  spray: `${UPLOADS}/2025/04/photo_2025-05-17_23-20-04.webp`,
  oil: `${UPLOADS}/2025/04/frame-19-2-768x566.webp`,
  restoration: `${UPLOADS}/2025/04/photo_2025-05-18_00-25-01.webp`,
} as const;

export type CatalogPreviewItem = {
  slug: string;
  href: string;
  title: string;
  image: string;
};

export const CATALOG_PREVIEW: CatalogPreviewItem[] = [
  {
    slug: "krashenaja-vagonka",
    href: "/katalog/krashenaja-vagonka/",
    title: "Крашеная вагонка",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-05-225x300.webp`,
  },
  {
    slug: "krashenaja-imitacija-brusa",
    href: "/katalog/krashenaja-imitacija-brusa/",
    title: "Крашеная имитация бруса",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-21-225x300.webp`,
  },
  {
    slug: "planken",
    href: "/katalog/planken/",
    title: "Крашеный планкен",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-38-225x300.webp`,
  },
  {
    slug: "skandinavskaja-doska",
    href: "/katalog/skandinavskaja-doska/",
    title: "Крашеная скандинавская доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-51-225x300.webp`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная доска пола",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-02-225x300.webp`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная паркетная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-37-225x300.webp`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная фасадная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-46-225x300.webp`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеный массив пола",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-58-225x300.webp`,
  },
  {
    slug: "terrasnaja-doska",
    href: "/katalog/terrasnaja-doska/",
    title: "Крашеная террасная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-07-225x300.webp`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Палубная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-21-225x300.webp`,
  },
  {
    slug: "krashenaja-imitacija-brusa",
    href: "/katalog/krashenaja-imitacija-brusa/",
    title: "Имитация бруса — карельский профиль",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-40-225x300.webp`,
  },
  {
    slug: "imitacija-brusa",
    href: "/katalog/imitacija-brusa/",
    title: "Блок-хаус",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-56-225x300.webp`,
  },
];

export const ADVANTAGE_ICONS = [
  `${UPLOADS}/2025/04/frame-10-1.webp`,
  `${UPLOADS}/2025/04/frame-10-2.webp`,
  `${UPLOADS}/2025/04/frame-10-1.webp`,
  `${UPLOADS}/2025/04/frame-10-2.webp`,
  `${UPLOADS}/2025/04/frame-10-1.webp`,
  `${UPLOADS}/2025/04/frame-10-2.webp`,
] as const;

export const COLOR_SWATCHES = [
  { code: "KD-25", image: `${UPLOADS}/2025/03/Mask-group-1.webp` },
  { code: "KD-32", image: `${UPLOADS}/2025/03/Mask-group-2.webp` },
  { code: "KD-28", image: `${UPLOADS}/2025/03/Mask-group-3.webp` },
  { code: "KD-6", image: `${UPLOADS}/2025/03/Mask-group-4.webp` },
  { code: "KD-15", image: `${UPLOADS}/2025/03/Mask-group-5.webp` },
] as const;

export const PARTNERS = [
  { name: "Stardeck", url: "https://stardeck-msk.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_09-46-28-1-2.webp` },
  { name: "Лиственница", url: "https://listvennica-sosna.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_19-09-37-1-1.webp` },
  { name: "Dedom", url: "https://dedom.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_11-56-01.webp` },
  { name: "Talatu", url: "https://talatu.com/", image: `${UPLOADS}/2025/04/photo_2025-04-18_11-19-34.webp` },
  { name: "Купить лиственницу", url: "https://kupitlistvennica.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_22-30-59-1.webp` },
  { name: "Lakpro", url: "https://lakpro.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-07-39-2-1-1-1.webp` },
  { name: "Smitdom", url: "https://smitdom.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-15-58.webp` },
  { name: "Ideadom", url: "https://smart.ideadom.ru", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-20-18.webp` },
] as const;

export function firstImageFromHtml(html?: string): string | undefined {
  if (!html) return undefined;
  const match = html.match(/src="([^"]+\/uploads\/[^"]+)"/i);
  if (!match?.[1]) return undefined;
  return match[1].replace(/https?:\/\/krashenayadoska\.ru\/wp-content\/uploads\//i, `${UPLOADS}/`);
}

export function getCatalogImage(slug: string): string | undefined {
  return CATALOG_PREVIEW.find((item) => item.slug === slug)?.image;
}
