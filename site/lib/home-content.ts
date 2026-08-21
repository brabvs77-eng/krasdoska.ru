export const HOME_BLOG_SLUGS = [
  "chto-vygodnee-krasit-samomu-ili-na-proizvodstve",
  "brend",
  "dostavka-v-regiony",
  "hvoya-preimushchestva-dlya-fasada",
] as const;

/** @deprecated Use formatBlogDate(post.publishedAt) from content items */
export const HOME_BLOG_DATES: Record<string, string> = {
  "chto-vygodnee-krasit-samomu-ili-na-proizvodstve": "22 июля, 2026",
  brend: "24 декабря, 2025",
  "dostavka-v-regiony": "16 июля, 2025",
  "hvoya-preimushchestva-dlya-fasada": "10 апреля, 2025",
  "oficialnyy-diler-sirca": "10 апреля, 2025",
};

export const HOME_PROJECT_SLUGS = [
  "fasad-iz-plankena-listvennicy",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-8",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-7",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-6",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-5",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-4",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-3",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-2",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej",
  "preobrazim-derevo-pokraska-i-restavr",
] as const;

export const HOME_PROJECT_TAGS: Record<string, string> = {
  "fasad-iz-plankena-listvennicy": "готовый проект",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-8":
    "покраска, покрытие, шлифовка",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-7": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-6": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-5": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-4": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-3": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej-2": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavracija-derevjannyh-poverhnostej": "покраска, покрытие",
  "preobrazim-derevo-pokraska-i-restavr": "покраска, покрытие, шлифовка",
};
