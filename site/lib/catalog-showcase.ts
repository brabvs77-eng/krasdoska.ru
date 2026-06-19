const UPLOADS = "/uploads";

export type CatalogSpec = {
  label: string;
  value: string;
};

export type CatalogShowcaseItem = {
  title: string;
  tagline?: string;
  href: string;
  image: string;
  priceFrom?: string;
  specs: CatalogSpec[];
};

export const CATALOG_SHOWCASE: CatalogShowcaseItem[] = [
  {
    title: "Крашеная скандинавская доска",
    tagline: "Палубная доска — дерево, которое не боится воды",
    href: "/katalog/skandinavskaja-doska/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 1800 руб/м²",
    specs: [
      { label: "Сорт", value: "AB" },
      { label: "Порода", value: "ель" },
      { label: "Влажность", value: "12 +/- 2%" },
      { label: "Поверхность", value: "Строганая, поднятый ворс" },
      { label: "Толщина", value: "20 мм" },
      { label: "Ширина", value: "145/195 мм" },
      { label: "Длина", value: "6000 мм" },
      { label: "Раб. ширина", value: "135/185 мм" },
    ],
  },
  {
    title: "Крашеная фасадная доска",
    href: "/katalog/krashenaja-doska/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 1700 руб/м²",
    specs: [
      { label: "Сорт", value: "AB" },
      { label: "Порода", value: "северная сосна" },
      { label: "Влажность", value: "12 +/- 2%" },
      { label: "Поверхность", value: "Строганая, ручное браширование" },
      { label: "Толщина", value: "23 мм" },
      { label: "Ширина", value: "196 мм" },
      { label: "Длина", value: "6000 мм" },
      { label: "Покрытие", value: "Трёхслойное UV-стойкое (грунт + 2 слоя финиша)" },
    ],
  },
  {
    title: "Крашеная вагонка",
    href: "/katalog/krashenaja-vagonka/",
    image: `${UPLOADS}/2025/11/14.jpg`,
    priceFrom: "от 1850 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / B / AB / ABC" },
      { label: "Порода", value: "Ангарская сосна / лиственница / хвоя" },
      { label: "Влажность", value: "12 +/- 2%" },
      { label: "Поверхность", value: "Строганая, ручное браширование (опционально)" },
      { label: "Толщина", value: "14 / 20 мм" },
      { label: "Ширина", value: "90 / 110 / 115 / 120 / 135 / 145 мм" },
      { label: "Длина", value: "2000 / 2500 / 3000 / 3500 / 4000 / 6000 мм" },
      { label: "Покрытие", value: "Трёхслойное (грунт + 2 слоя финиша)" },
    ],
  },
  {
    title: "Имитация бруса",
    tagline: "Профиль UTVF для внутренней отделки — шлифовка, воск и лак в цеху",
    href: "/katalog/imitacija-brusa/",
    image: `${UPLOADS}/2025/11/14.jpg`,
    priceFrom: "от 1436 руб/м²",
    specs: [
      { label: "Сорт", value: "АВ" },
      { label: "Порода", value: "ель (северная, камерной сушки)" },
      { label: "Поверхность", value: "Глубокая шлифовка" },
      { label: "Толщина", value: "23 мм" },
      { label: "Ширина", value: "196 мм" },
      { label: "Длина", value: "6000 мм" },
      { label: "Покрытие", value: "Воск + лак Sirca" },
      { label: "Применение", value: "Внутренние работы" },
    ],
  },
  {
    title: "Крашеная имитация бруса — карельский профиль",
    href: "/katalog/krashenaja-imitacija-brusa/",
    image: `${UPLOADS}/2025/11/14.jpg`,
    priceFrom: "от 1436 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / B / AB" },
      { label: "Порода", value: "северная сосна / ель / лиственница / хвоя" },
      { label: "Влажность", value: "12 +/- 2%" },
      { label: "Поверхность", value: "Строганая, браширование или шлифовка" },
      { label: "Толщина", value: "16 / 20 / 21 / 23 мм" },
      { label: "Ширина", value: "140 / 145 / 196 мм" },
      { label: "Длина", value: "2000 / 2500 / 3000 / 3500 / 4000 / 6000 мм" },
    ],
  },
  {
    title: "Крашеная палубная доска",
    href: "/katalog/krashenaja-doska/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 2500 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / AB" },
      { label: "Порода", value: "Лиственница / термососна / кедр" },
      { label: "Поверхность", value: "Фрезерованная, ручная шлифовка" },
      { label: "Толщина", value: "24 / 26 / 28 / 30 мм" },
      { label: "Ширина", value: "110 / 120 / 135 / 142 мм" },
      { label: "Длина", value: "3000 / 4000 / 6000 мм" },
    ],
  },
  {
    title: "Крашеная имитация бруса",
    href: "/katalog/krashenaja-imitacija-brusa/",
    image: `${UPLOADS}/2025/11/14.jpg`,
    priceFrom: "от 1436 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / B / AB" },
      { label: "Порода", value: "северная сосна / ель / лиственница / хвоя" },
      { label: "Влажность", value: "12 +/- 2%" },
      { label: "Толщина", value: "16 / 20 / 21 / 23 мм" },
      { label: "Ширина", value: "140 / 145 / 196 мм" },
      { label: "Длина", value: "2000 / 2500 / 3000 / 3500 / 4000 / 6000 мм" },
    ],
  },
  {
    title: "Крашеная паркетная доска",
    href: "/katalog/krashenaja-doska/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 1800 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / Селект / Натурал / АВ / Рустик" },
      { label: "Порода", value: "Дуб / ясень / северная сосна / орех" },
      { label: "Толщина", value: "12 / 14 / 15 / 18 мм" },
      { label: "Ширина", value: "90 / 120 / 180 / 220 / 240 мм" },
      { label: "Длина", value: "450 / 600 / 1200 / 1500 / 1800 мм" },
    ],
  },
  {
    title: "Крашеная террасная доска",
    href: "/katalog/terrasnaja-doska/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 2800 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / B / AB" },
      { label: "Порода", value: "Лиственница / северная хвоя" },
      { label: "Поверхность", value: "Фрезерованная (вельвет / евровельвет)" },
      { label: "Толщина", value: "20 / 28 / 35 мм" },
      { label: "Ширина", value: "115 / 120 / 140 / 142 / 145 мм" },
      { label: "Длина", value: "2000 / 2500 / 3000 / 3500 / 4000 / 6000 мм" },
    ],
  },
  {
    title: "Крашеный планкен",
    href: "/katalog/planken/",
    image: `${UPLOADS}/2025/11/capture_251107_215619-2.png`,
    priceFrom: "от 2050 руб/м²",
    specs: [
      { label: "Сорт", value: "Экстра / A / B / AB" },
      { label: "Порода", value: "Лиственница / хвоя (сосна, ель)" },
      { label: "Поверхность", value: "Шлифованная или брашированная" },
      { label: "Профиль", value: "Прямой / скошенный" },
      { label: "Толщина", value: "20 мм" },
      { label: "Ширина", value: "90 / 95 / 110 / 120 / 140 / 145 мм" },
      { label: "Длина", value: "2000 / 2500 / 3000 / 3500 / 4000 / 6000 мм" },
    ],
  },
];

const SHOWCASE_SLUG_ALIASES: Record<string, string> = {
  vagonka: "krashenaja-vagonka",
};

export function getCatalogShowcaseForSlug(slug: string): CatalogShowcaseItem | undefined {
  const resolved = SHOWCASE_SLUG_ALIASES[slug] ?? slug;
  return CATALOG_SHOWCASE.find((item) => item.href === `/katalog/${resolved}/`);
}
