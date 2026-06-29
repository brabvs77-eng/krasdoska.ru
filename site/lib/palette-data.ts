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
  swatches: PaletteSwatch[];
};

import { PRODUCTION_IMAGE } from "@/lib/media";

export const PALETTE_HERO_IMAGE = PRODUCTION_IMAGE;

export const PALETTE_PAGES: Record<string, PalettePageData> = {
  "palitra-ral": {
    slug: "palitra-ral",
    title: "Палитра цветов RAL",
    intro: [
      "Мы красим древесину строго по международной системе RAL. В колеровочной базе — широкий спектр оттенков для фасадов и интерьеров.",
      "Выбирая ЛКМ у нас, вы получаете точное попадание в тон и безупречную эстетику каждого квадратного метра.",
    ],
    note: "Показаны популярные оттенки RAL Classic. Полный каталог доступен при консультации — подберём точный код под ваш проект.",
    swatches: [
      { code: "RAL 9010", name: "Белый", hex: "#F7F9EF", group: "Белые и серые" },
      { code: "RAL 9005", name: "Чёрный", hex: "#0E0E10", group: "Белые и серые" },
      { code: "RAL 7035", name: "Светло-серый", hex: "#CBD0CC", group: "Белые и серые" },
      { code: "RAL 7016", name: "Антрацитово-серый", hex: "#383E42", group: "Белые и серые" },
      { code: "RAL 6005", name: "Зелёный мох", hex: "#114232", group: "Зелёные" },
      { code: "RAL 6021", name: "Бледно-зелёный", hex: "#89AC76", group: "Зелёные" },
      { code: "RAL 5010", name: "Генцианово-синий", hex: "#004F7C", group: "Синие" },
      { code: "RAL 5008", name: "Серо-синий", hex: "#2F4A71", group: "Синие" },
      { code: "RAL 3020", name: "Транспортный красный", hex: "#BB1E10", group: "Красные" },
      { code: "RAL 8017", name: "Шоколадно-коричневый", hex: "#45322E", group: "Коричневые" },
      { code: "RAL 8003", name: "Глиняно-коричневый", hex: "#7E4B26", group: "Коричневые" },
      { code: "RAL 1015", name: "Светлая слоновая кость", hex: "#E6D690", group: "Жёлтые и бежевые" },
      { code: "RAL 1001", name: "Бежевый", hex: "#C2B078", group: "Жёлтые и бежевые" },
      { code: "RAL 3004", name: "Пурпурно-красный", hex: "#691F23", group: "Красные" },
      { code: "RAL 7021", name: "Чёрно-серый", hex: "#2F3234", group: "Белые и серые" },
    ],
  },
  "palitra-ncs": {
    slug: "palitra-ncs",
    title: "Палитра цветов NCS",
    intro: [
      "Шведская система NCS — инструмент для естественных природных оттенков интерьера и фасада.",
      "Мы выполняем компьютерную колеровку и профессиональную покраску доски по каталогу NCS на автоматической линии.",
    ],
    note: "NCS описывает цвет через черноту, насыщенность и оттенок. Ниже — часто заказываемые тона для деревянных фасадов.",
    swatches: [
      { code: "S 0500-N", name: "Чистый белый", hex: "#F5F5F0", group: "Нейтральные" },
      { code: "S 1002-B", name: "Светло-бежевый", hex: "#E8DFD0", group: "Нейтральные" },
      { code: "S 3005-Y20R", name: "Тёплый песок", hex: "#C4A574", group: "Тёплые" },
      { code: "S 4010-Y30R", name: "Оливковый", hex: "#8A7A4A", group: "Зелёные" },
      { code: "S 5020-B50G", name: "Хвойный", hex: "#3D5C4A", group: "Зелёные" },
      { code: "S 6010-B30G", name: "Лесной", hex: "#2E4A3A", group: "Зелёные" },
      { code: "S 7005-R20B", name: "Графит", hex: "#4A4E52", group: "Тёмные" },
      { code: "S 8005-B20G", name: "Антрацит", hex: "#2C3330", group: "Тёмные" },
      { code: "S 4040-R10B", name: "Сливовый", hex: "#6B3A4A", group: "Акцентные" },
      { code: "S 3030-Y70R", name: "Терракота", hex: "#A85A3A", group: "Тёплые" },
      { code: "S 2030-Y40R", name: "Карамель", hex: "#B8885A", group: "Тёплые" },
      { code: "S 0502-Y", name: "Кремовый", hex: "#F0EDE4", group: "Нейтральные" },
    ],
  },
  "palitra-cvetov-biofa": {
    slug: "palitra-cvetov-biofa",
    title: "Палитра цветов масло BIOFA",
    intro: [
      "Натуральные немецкие масла и воски BIOFA — выбор тех, кто ценит экологичность и хочет подчеркнуть рисунок живой древесины.",
      "Лессирующие составы глубоко проникают в поры дерева, создавая «дышащую» шелковистую поверхность. На производстве наносим масла методом распыления и втирания.",
    ],
    note: "Оттенки BIOFA полупрозрачны — итоговый цвет зависит от породы древесины. Образцы можно заказать на вашей доске.",
    swatches: [
      { code: "BIOFA 01", name: "Натуральный", hex: "#D4B896", group: "Натуральные" },
      { code: "BIOFA 02", name: "Сосна", hex: "#C9A86C", group: "Натуральные" },
      { code: "BIOFA 03", name: "Дуб светлый", hex: "#B8956A", group: "Дуб" },
      { code: "BIOFA 04", name: "Дуб", hex: "#9A7348", group: "Дуб" },
      { code: "BIOFA 05", name: "Орех", hex: "#7A5230", group: "Тёмные" },
      { code: "BIOFA 06", name: "Тик", hex: "#8B6914", group: "Тёмные" },
      { code: "BIOFA 07", name: "Серый дым", hex: "#9A9590", group: "Серые" },
      { code: "BIOFA 08", name: "Графит", hex: "#5C5A56", group: "Серые" },
      { code: "BIOFA 09", name: "Белый", hex: "#E8E4DC", group: "Светлые" },
      { code: "BIOFA 10", name: "Оливковый", hex: "#6B7048", group: "Зелёные" },
      { code: "BIOFA 11", name: "Красное дерево", hex: "#8B4040", group: "Акцентные" },
      { code: "BIOFA 12", name: "Чёрный", hex: "#3A3632", group: "Тёмные" },
    ],
  },
};

export function getPalettePageData(slug: string): PalettePageData | null {
  return PALETTE_PAGES[slug] ?? null;
}
