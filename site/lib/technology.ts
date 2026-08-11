/** Self-hosted on SSH deploy; CDN on Cloudflare Pages (25 MiB asset limit). */
export const TECHNOLOGY_VIDEO =
  process.env.CF_PAGES === "1"
    ? "https://krashenayadoska.ru/wp-content/uploads/2026/03/video_2026-03-13_23-56-23.mp4"
    : "/uploads/2026/03/video_2026-03-13_23-56-23.mp4";

/** Horizontal process video on /uslugi/ — upload to the same folder as TECHNOLOGY_VIDEO. */
export const SERVICES_TECHNOLOGY_VIDEO =
  process.env.CF_PAGES === "1"
    ? "https://krashenayadoska.ru/wp-content/uploads/2026/03/na-tehnolog-2.mp4"
    : "/uploads/2026/03/na-tehnolog-2.mp4";

export const TECHNOLOGY_IMAGE = "/uploads/2025/04/photo_2025-05-17_23-20-04.webp";

export type ProductionPhaseId =
  | "prepare"
  | "primer"
  | "finish1"
  | "finish2"
  | "pack";

export type ProductionStep = {
  title: string;
  note?: string;
  phase: ProductionPhaseId;
  /** Compact label for the infographic node type */
  kind: "prep" | "coat" | "dry" | "sand" | "pack";
};

export const PRODUCTION_PHASES: {
  id: ProductionPhaseId;
  label: string;
  summary: string;
}[] = [
  {
    id: "prepare",
    label: "Подготовка",
    summary: "Геометрия и чистота поверхности перед покрытием",
  },
  {
    id: "primer",
    label: "Грунт",
    summary: "Антисептик и защита тыльной стороны",
  },
  {
    id: "finish1",
    label: "Финиш I",
    summary: "Первый слой покрытия с межслойной шлифовкой",
  },
  {
    id: "finish2",
    label: "Финиш II",
    summary: "Второй слой для плотности и стойкости цвета",
  },
  {
    id: "pack",
    label: "Упаковка",
    summary: "Защита лицевых пластей до отгрузки",
  },
];

/** Original production sequence — wording preserved from the source page. */
export const PRODUCTION_STEPS: ProductionStep[] = [
  { title: "Калибровка и шлифовка на КШС", phase: "prepare", kind: "prep" },
  { title: "Обеспыливание", phase: "prepare", kind: "prep" },
  {
    title: "Нанесение грунта-антисептика на щеточном станке с окрашиванием тыльной стороны",
    phase: "primer",
    kind: "coat",
  },
  { title: "Сушка", phase: "primer", kind: "dry" },
  {
    title: "Межслойное шлифование на щеточно-шлифовальном станке",
    phase: "finish1",
    kind: "sand",
  },
  {
    title: "Нанесение 1 слоя финишного покрытия",
    note: "лак полуглянец, матовый, укрывная краска, воск, масло",
    phase: "finish1",
    kind: "coat",
  },
  { title: "Сушка", phase: "finish1", kind: "dry" },
  {
    title: "Межслойное шлифование на щеточно-шлифовальном станке",
    phase: "finish2",
    kind: "sand",
  },
  {
    title: "Нанесение второго слоя финишного покрытия",
    note: "лак полуглянец, матовый, укрывная краска, воск, масло",
    phase: "finish2",
    kind: "coat",
  },
  { title: "Сушка", phase: "finish2", kind: "dry" },
  {
    title: "Упаковка",
    note: "вспененный полиэтилен по лицевым пластям, обмотка в стрейч-плёнку",
    phase: "pack",
    kind: "pack",
  },
];

export const TECHNOLOGY_CLOSING = {
  ready: "Готово к отгрузке!",
  ps: "P.S. Каждый этап контролируется для безупречного качества вашей продукции.",
  schemesLead:
    "Подробные схемы (грунт, число слоёв, Sirca / Talatu) и цены за м² — на странице",
} as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const TECHNOLOGY_FAQ: FaqItem[] = [
  {
    question: "Какие лакокрасочные материалы вы используете?",
    answer:
      "Применяем профессиональные составы европейских брендов: Sirca, Talatu и другие. Подбираем покрытие под задачу — фасад, интерьер, терраса.",
  },
  {
    question: "Какой гарантии можно ожидать на покрытие?",
    answer:
      "Гарантия зависит от типа древесины, системы покрытия и условий эксплуатации. На консультации подскажем оптимальный вариант и срок службы для вашего объекта.",
  },
  {
    question: "Сколько занимает производство и доставка?",
    answer:
      "Срок поставки обычно от 5 дней в зависимости от объёма и цвета. Доставляем по Москве, Московской области и в регионы России.",
  },
  {
    question: "Можно ли заказать индивидуальный цвет?",
    answer:
      "Да. Подбираем оттенок по каталогам RAL, NCS и BIOFA, а также по образцу заказчика. Смотрите раздел «Палитра» или оставьте заявку на подбор.",
  },
];

export function getTechnologyTailHtml(html?: string): string | undefined {
  if (!html) return undefined;
  const marker = "Делаем обьем";
  const idx = html.indexOf(marker);
  if (idx === -1) return undefined;
  const h2start = html.lastIndexOf("<h2", idx);
  return html.slice(h2start >= 0 ? h2start : idx);
}
