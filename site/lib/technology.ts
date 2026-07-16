/** Self-hosted on SSH deploy; CDN on Cloudflare Pages (25 MiB asset limit). */
export const TECHNOLOGY_VIDEO =
  process.env.CF_PAGES === "1"
    ? "https://krashenayadoska.ru/wp-content/uploads/2026/03/video_2026-03-13_23-56-23.mp4"
    : "/uploads/2026/03/video_2026-03-13_23-56-23.mp4";

export const TECHNOLOGY_IMAGE = "/uploads/2025/04/frame-19-2.webp";

export type ProductionStep = {
  title: string;
  note?: string;
  emoji?: string;
};

export const PRODUCTION_STEPS: ProductionStep[] = [
  { title: "Калибровка и шлифовка на КШС", emoji: "🔧" },
  { title: "Обеспыливание", emoji: "🌬️" },
  {
    title: "Нанесение грунта-антисептика на щеточном станке с окрашиванием тыльной стороны",
    emoji: "🎨🧪",
  },
  { title: "Сушка", emoji: "☀️" },
  { title: "Межслойное шлифование на щеточно-шлифовальном станке", emoji: "✨" },
  {
    title: "Нанесение 1 слоя финишного покрытия",
    note: "лак полуглянец, матовый, укрывная краска, воск, масло",
    emoji: "🖌️",
  },
  { title: "Сушка", emoji: "☀️" },
  { title: "Межслойное шлифование на щеточно-шлифовальном станке", emoji: "✨" },
  {
    title: "Нанесение второго слоя финишного покрытия",
    note: "лак полуглянец, матовый, укрывная краска, воск, масло",
    emoji: "🖌️",
  },
  { title: "Сушка", emoji: "☀️" },
  {
    title: "Упаковка",
    note: "вспененный полиэтилен по лицевым пластям, обмотка в стрейч-плёнку",
    emoji: "📦",
  },
];

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
      "Срок изготовления обычно от 14 дней в зависимости от объёма и цвета. Доставляем по Москве, Московской области и в регионы России.",
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
