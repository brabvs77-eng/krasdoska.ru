import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Палитра",
  description: "Палитры RAL, NCS и BIOFA. Эксклюзивные цвета KD.",
  path: "/palitra/",
});

const paletteLinks = [
  { href: "/palitra/palitra-ral/", title: "Палитра RAL" },
  { href: "/palitra/palitra-ncs/", title: "Палитра NCS" },
  { href: "/palitra/palitra-cvetov-biofa/", title: "Палитра BIOFA" },
];

export default function PalettePage() {
  return (
    <>
      <PageHero
        title="Палитра цветов"
        description="Стандартные каталоги и фирменные оттенки KD для вашего проекта."
      />
      <div className="container-content grid gap-4 py-12 sm:grid-cols-3">
        {paletteLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-neutral-200 p-6 font-semibold hover:border-brand hover:text-brand"
          >
            {item.title}
          </a>
        ))}
      </div>
      <PagePlaceholder message="Карточки цветов будут подключены после миграции контента." />
    </>
  );
}
