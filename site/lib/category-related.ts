export type RelatedArticle = {
  title: string;
  href: string;
  description: string;
};

const CATEGORY_RELATED: Record<string, RelatedArticle[]> = {
  planken: [
    {
      title: "Крашеный планкен купить в Москве",
      href: "/blog/krashenyy-planken-kupit-moskva/",
      description: "Цены от 2 050 ₽/м², сроки и что входит в заводскую покраску",
    },
    {
      title: "Планкен лиственницы: прямой и скошенный",
      href: "/blog/planken-listvennitsa-pryamoy-i-skoshennyy/",
      description: "Сравнение профилей, пород и схем покраски",
    },
    {
      title: "Кейс: фасад из планкена лиственницы",
      href: "/blog/kejs-fasad-planken-listvennitsy/",
      description: "120 м², сроки производства и итоговая стоимость",
    },
  ],
  "krashenaja-vagonka": [
    {
      title: "Крашеная вагонка: как выбрать профиль и покрытие",
      href: "/blog/krashenaya-vagonka-kak-vybrat/",
      description: "Породы, сорта, схемы покраски для интерьера и фасада",
    },
    {
      title: "Монтаж крашеной доски",
      href: "/blog/montazh-krashenoy-doski/",
      description: "Зазоры, крепёж и условия гарантии на покрытие",
    },
    {
      title: "Укрывная vs лессирующая vs масло",
      href: "/blog/ukryvnaya-vs-lessiruyushchaya-vs-maslo/",
      description: "Какое покрытие выбрать для вагонки в бане или интерьере",
    },
  ],
  "krashenaja-imitacija-brusa": [
    {
      title: "Крашеная имитация бруса: где купить и как заказать",
      href: "/blog/krashenaya-imitaciya-brusa-kupit/",
      description: "Карельский и скандинавский профили, цены от 1 436 ₽/м²",
    },
    {
      title: "Имитация бруса: интерьер vs фасад",
      href: "/blog/imitaciya-brusa-interer-vs-fasad/",
      description: "Разница в монтаже, покрытии и сроках службы",
    },
    {
      title: "Крашеный блок-хаус",
      href: "/blog/blok-haus-krashenyy/",
      description: "Чем блок-хаус отличается от имитации бруса",
    },
  ],
};

export function getCategoryRelatedArticles(slug: string): RelatedArticle[] | undefined {
  return CATEGORY_RELATED[slug];
}
