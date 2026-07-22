import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaSection, PartnersSection } from "@/components/sections/HomeSections";
import { CATALOG_FAQ } from "@/lib/catalog-faq";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getPage } from "@/lib/content";
import { WOOD_TEXTURE_BG } from "@/lib/media";
import { TECHNOLOGY_VIDEO } from "@/lib/technology";

const PALETTE_HERO_BG = "/uploads/2026/05/krashenaja-skandinavskaja-doska.webp";
const PALETTE_CARD_IMAGE = "/uploads/2026/05/1-1.webp";
const VIDEO_POSTER = "/uploads/2026/05/kachestvennaja-obrabotka-derevjannyh-izdelij.webp";

const OSMO_CARD_IMAGE = "/uploads/palitra/osmo/7e07e01118d79bdff133d99182a17354979.png";

const paletteCards = [
  { title: "Палитра цветов RAL", href: "/palitra/palitra-ral/", image: PALETTE_CARD_IMAGE },
  { title: "Палитра цветов NCS", href: "/palitra/palitra-ncs/", image: PALETTE_CARD_IMAGE },
  { title: "Палитра цветов масло BIOFA", href: "/palitra/palitra-cvetov-biofa/", image: PALETTE_CARD_IMAGE },
  { title: "Палитра цветов Osmo", href: "/palitra/palitra-osmo/", image: OSMO_CARD_IMAGE },
  { title: "Палитра укрывных цветов для интерьера", href: null, image: PALETTE_CARD_IMAGE },
  { title: "Палитра укрывных цветов для фасада", href: null, image: PALETTE_CARD_IMAGE },
  { title: "Палитра лессирующих цветов", href: null, image: PALETTE_CARD_IMAGE },
];

export async function generateMetadata() {
  const page = getPage("palitra");
  return buildPageMetadata({
    title: page?.seo?.title ?? page?.title ?? "Палитра",
    description: page ? getExcerpt(page) : "Палитры RAL, NCS, BIOFA и Osmo. Эксклюзивные цвета KD.",
    path: "/palitra/",
  });
}

export default function PalettePage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Image
          src={PALETTE_HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="container-content relative text-white">
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Идеальный цвет для каждой детали:
            <br />
            подбор оттенков онлайн
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Добро пожаловать в мир профессиональных цветовых решений от компании «Крашеная доска»!
            Мы открываем безграничные возможности для создания стильных, долговечных и выразительных
            интерьеров и фасадов.
          </p>
          <Link href="#form" className="btn-primary mt-8 inline-flex">
            Получить бесплатный расчёт
          </Link>
        </div>
      </section>

      <section className="section-dark py-16">
        <div className="container-content">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paletteCards.map((item) => {
              const card = (
                <>
                  <div className="relative aspect-[7/5] overflow-hidden border-2 border-accent">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="mt-4 text-center text-base font-semibold uppercase tracking-wide text-white">
                    {item.title}
                  </p>
                </>
              );

              if (item.href) {
                return (
                  <Link key={item.title} href={item.href} className="group block hover:opacity-90">
                    {card}
                  </Link>
                );
              }

              return <div key={item.title}>{card}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="section-dark py-16">
        <div className="container-content max-w-4xl">
          <FaqAccordion
            items={CATALOG_FAQ}
            title="Часто задаваемые вопросы"
            variant="accent"
            align="center"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-dark py-16">
        <Image
          src={WOOD_TEXTURE_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          unoptimized
        />
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="container-content relative flex justify-center">
          <video
            className="w-full max-w-2xl"
            controls
            preload="metadata"
            playsInline
            poster={VIDEO_POSTER}
          >
            <source src={TECHNOLOGY_VIDEO} type="video/mp4" />
          </video>
        </div>
      </section>

      <PartnersSection />
      <CtaSection />
    </>
  );
}
