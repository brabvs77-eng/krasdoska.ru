const UPLOADS = "/uploads";

export const PAGE_HERO_BG = `${UPLOADS}/2025/04/frist-screen.png`;
export const WOOD_TEXTURE_BG = `${UPLOADS}/2025/04/top-view-light-wood-wallpaper-1-1.png`;

export const HERO_IMAGE = `${UPLOADS}/2025/04/photo_2025-04-26_20-30-22-1024x825.jpg`;
export const HERO_IMAGE_ALT = `${UPLOADS}/2025/04/099057a2-33ce-491e-af16-1198cfa85b67-1024x581.jpg`;

export type HeroSlide = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Лучшие идеи — лучшее решение — лучшие результаты",
    title: "Идеальный цвет\nдля каждой детали",
    image: HERO_IMAGE,
  },
  {
    eyebrow: "Персональный подход",
    title: "Профессиональная покраска деревянных домов",
    subtitle: "Ваш комфорт — наша приоритетная задача.",
    image: HERO_IMAGE_ALT,
  },
  {
    title: "Исключительное качество",
    subtitle: "Гарантия долговечности и эстетики.",
    image: WOOD_TEXTURE_BG,
  },
];

export const PRODUCTION_IMAGE = `${UPLOADS}/2025/04/photo_2025-04-26_20-30-22-300x242.jpg`;

export const SERVICES_IMAGE = `${UPLOADS}/2025/03/Frame-19.png`;

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
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-21-225x300.jpg`,
  },
  {
    slug: "planken",
    href: "/katalog/planken/",
    title: "Крашеный планкен",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-38-225x300.jpg`,
  },
  {
    slug: "skandinavskaja-doska",
    href: "/katalog/skandinavskaja-doska/",
    title: "Крашеная скандинавская доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-25-51-225x300.jpg`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная доска пола",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-02-225x300.jpg`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная паркетная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-37-225x300.jpg`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеная фасадная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-46-225x300.jpg`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Крашеный массив пола",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-26-58-225x300.jpg`,
  },
  {
    slug: "terrasnaja-doska",
    href: "/katalog/terrasnaja-doska/",
    title: "Крашеная террасная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-07-225x300.jpg`,
  },
  {
    slug: "krashenaja-doska",
    href: "/katalog/krashenaja-doska/",
    title: "Палубная доска",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-21-225x300.jpg`,
  },
  {
    slug: "krashenaja-imitacija-brusa",
    href: "/katalog/krashenaja-imitacija-brusa/",
    title: "Имитация бруса — карельский профиль",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-40-225x300.jpg`,
  },
  {
    slug: "imitacija-brusa",
    href: "/katalog/imitacija-brusa/",
    title: "Блок-хаус",
    image: `${UPLOADS}/2025/04/photo_2025-04-26_23-27-56-225x300.jpg`,
  },
];

export const ADVANTAGE_ICONS = [
  `${UPLOADS}/2025/04/frame-10-1.png`,
  `${UPLOADS}/2025/04/frame-10-2.png`,
  `${UPLOADS}/2025/04/frame-10-1.png`,
  `${UPLOADS}/2025/04/frame-10-2.png`,
  `${UPLOADS}/2025/04/frame-10-1.png`,
  `${UPLOADS}/2025/04/frame-10-2.png`,
] as const;

export const COLOR_SWATCHES = [
  { code: "KD-25", image: `${UPLOADS}/2025/03/Mask-group-1.png` },
  { code: "KD-32", image: `${UPLOADS}/2025/03/Mask-group-2.png` },
  { code: "KD-28", image: `${UPLOADS}/2025/03/Mask-group-3.png` },
  { code: "KD-6", image: `${UPLOADS}/2025/03/Mask-group-4.png` },
  { code: "KD-15", image: `${UPLOADS}/2025/03/Mask-group-5.png` },
] as const;

export const PARTNERS = [
  { name: "Stardeck", url: "https://stardeck-msk.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_09-46-28-1-2.jpg` },
  { name: "Лиственница", url: "https://listvennica-sosna.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_19-09-37-1-1.jpg` },
  { name: "Dedom", url: "https://dedom.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_11-56-01.jpg` },
  { name: "Talatu", url: "https://talatu.com/", image: `${UPLOADS}/2025/04/photo_2025-04-18_11-19-34.jpg` },
  { name: "Купить лиственницу", url: "https://kupitlistvennica.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-18_22-30-59-1.jpg` },
  { name: "Lakpro", url: "https://lakpro.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-07-39-2-1-1-1.jpg` },
  { name: "Smitdom", url: "https://smitdom.ru/", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-15-58.jpg` },
  { name: "Ideadom", url: "https://smart.ideadom.ru", image: `${UPLOADS}/2025/04/photo_2025-04-26_22-20-18.jpg` },
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
