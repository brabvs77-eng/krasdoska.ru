import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContentList } from "@/components/content/ContentList";
import { getBlogPost, getExcerpt, getProject } from "@/lib/content";
import { HOME_BLOG_DATES, HOME_BLOG_SLUGS, HOME_PROJECT_SLUGS, HOME_PROJECT_TAGS } from "@/lib/home-content";
import { getContentImage } from "@/lib/product-media";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site";
import { HOME_COMPANY_BLOCKS } from "@/lib/home-footer";
import {
  BOTTOMBAR_BG,
  CATALOG_PREVIEW,
  COLOR_SWATCHES,
  COLORS_BG,
  PARTNERS,
  PRODUCTION_IMAGE,
  SERVICE_IMAGES,
  WOOD_TEXTURE_BG,
} from "@/lib/media";

function IconLeaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19c6-1 10-5 12-12 0 0-5 1-9 5S5 19 5 19Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 15c2-2 5-4 8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c1.2-3 3.2-4.5 5.5-4.5S13.3 16 14.5 19M14 14.2c1.5-.4 3.1 0 4.5 1.3.9.8 1.5 1.9 1.9 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBox({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 8.5 12 4l8.5 4.5v9L12 22l-8.5-4.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3.5 8.5 12 13l8.5-4.5M12 13v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconPalette({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 0-4.6H12a1.2 1.2 0 1 1 0-2.4h4.5A9 9 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10.5" cy="7.2" r="1.1" fill="currentColor" />
      <circle cx="14.2" cy="7.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconHandshake({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 13.5 10.2 11a1.8 1.8 0 0 1 2.5 0l.8.8a1.4 1.4 0 0 0 2 0l1.7-1.7M4.5 12.5l2.2-2.2a2 2 0 0 1 2.8 0L11 11.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.5 7.5 5h3L14 8.5M21 9.5 16.5 5h-2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 16.5h3.2a2 2 0 0 0 1.4-.6l1.2-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 4.5h3L12 8l-1.8 1.2a11 11 0 0 0 4.6 4.6L16 12l3.5 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5.5 6.7a2 2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COMPANY_ICONS: Record<string, ReactNode> = {
  ecology: <IconLeaf />,
  team: <IconUsers />,
  products: <IconBox />,
  design: <IconPalette />,
  partnership: <IconHandshake />,
  contacts: <IconPhone />,
};

const advantages = [
  {
    title: "Высокое качество",
    text: "Высокое качество покраски и долговечность.",
  },
  {
    title: "Долговечность покрытия",
    text: "Покраска в соответствии с рекомендациями российских и итальянских производителей.",
  },
  {
    title: "Контроль",
    text: "Контроль температурных условий и времени межслойной сушки.",
  },
  {
    title: "Шлифовка",
    text: "Шлифовка перед покраской для лучшей адгезии краски к древесине.",
  },
  {
    title: "Автоматизация",
    text: "Автоматическая окрасочная линия для высокой производительности.",
  },
  {
    title: "Экологичность",
    text: "Подбор цвета и ЛКМ, соответствующих экологическим стандартам.",
  },
];

const iconProps = {
  width: 46,
  height: 46,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Белые линейные иконки по назначению (качество / покрытие / продукты / уход / обработка / экология). */
const advantageIcons = [
  // Высокое качество — образец дерева + палец вверх
  <svg key="i0" {...iconProps}>
    <rect x="4.5" y="3.5" width="12" height="12" rx="1.2" />
    <path d="M4.5 5.2h12M4.5 13.8h12M6.2 3.5v12M14.8 3.5v12" />
    <path d="M7 7.2c1.2-.5 2.4-.4 3.6.2M7 9.2c1.4-.4 2.8-.3 4 .3M7 11.2c1.1-.4 2.5-.3 3.7.2" />
    <path d="M14.8 14.2c.4 1.4 1.5 2.5 3 2.9.4.1.8-.2.8-.6v-3.1c0-.7-.6-1.2-1.3-1.1-1 .2-1.8.9-2.2 1.9Z" />
    <path d="M15.2 16.6h-1.6a1.2 1.2 0 0 1-1.2-1.2V14" />
  </svg>,
  // Долговечность покрытия — состав + доска
  <svg key="i1" {...iconProps}>
    <path d="M13.5 3.8h3.2c.7 0 1.3.6 1.3 1.3v4.2c0 .4-.1.8-.4 1.1L15.2 13H11l-1.2-1.6V5.1c0-.7.6-1.3 1.3-1.3h2.4Z" />
    <path d="M12.2 7.2h4.2M12.5 10.2c.8.4 1.8.5 2.8.2" />
    <rect x="3.5" y="14.2" width="14.5" height="5.2" rx="1" />
    <path d="M5.5 16h4.5M5.5 17.6h6.5M11.5 16h4" />
    <path d="M7.2 5.2l.8-.8M5.6 6.6l.7-.7M6.2 8.4h1.2" />
  </svg>,
  // Контроль — штабель досок / продукт
  <svg key="i2" {...iconProps}>
    <path d="M4 14.8 11.2 11l8.3 3.6-7.2 3.8L4 14.8Z" />
    <path d="M4 14.8v2.4l8.3 3.6 8.2-3.8v-2.2" />
    <path d="M5.2 10.6 12.2 7l7.8 3.4-7.1 3.6-7.7-3.4Z" />
    <path d="M5.2 10.6v2.1" />
    <path d="M8.2 8.6c1.6-.4 3.3-.3 4.9.3M9 9.8c1.3-.3 2.7-.2 4 .3" />
  </svg>,
  // Шлифовка / уход — рука со спонжем
  <svg key="i3" {...iconProps}>
    <path d="M3.8 18.8h16.4" />
    <path d="M8.2 14.2h7.6c.7 0 1.3.6 1.3 1.3v1.4H6.9v-1.4c0-.7.6-1.3 1.3-1.3Z" />
    <path d="M8.4 15.2h.1M10.2 15.8h.1M12 15.2h.1M13.8 15.8h.1M15.4 15.2h.1" strokeWidth="2" />
    <path d="M14.8 14.2c1.2-1.4 2.5-3.4 3.1-5.2.3-.8-.3-1.6-1.1-1.6h-1.4c-.5 0-.9.3-1.1.7l-1.5 3.4-1.2-1.5c-.4-.5-1.2-.5-1.6 0l-.8.9c-.3.4-.3.9 0 1.2l2.4 2.1" />
  </svg>,
  // Автоматизация / обработка — пила по дереву
  <svg key="i4" {...iconProps}>
    <rect x="3.5" y="14" width="17" height="5.5" rx="1" />
    <path d="M5.5 15.8h4M5.5 17.4h6.5M12.2 15.8h5.2" />
    <path d="M12 14.2c3.4 0 6.2-2.5 6.2-5.6S15.4 3 12 3 5.8 5.5 5.8 8.6c0 1.4.6 2.7 1.5 3.7" />
    <path d="M12 8.6v.1M9.4 6.4l.7.7M14.6 6.4l-.7.7M8.8 9.8h1M14.2 9.8h1" />
    <path d="M16.8 4.6c.5-.3 1.1-.2 1.5.2M18.2 6.2c.4.2.7.7.6 1.2M18.8 8.4c.1.5-.1 1-.5 1.3" />
  </svg>,
  // Экологичность — годовые кольца дерева
  <svg key="i5" {...iconProps}>
    <path d="M12 3.2c2.1 0 3.9.7 5.1 1.9 1.3 1.2 2.1 2.9 2.1 4.9 0 1.8-.6 3.4-1.7 4.6-.4.5-.3 1.2.2 1.6 1.1.9 1.8 2.2 1.8 3.7 0 .5-.5.8-.9.6-1.6-.5-2.9-1.5-3.7-2.8-.3-.4-.9-.5-1.3-.1-.8.7-1.9 1.1-3.1 1.1-.9 0-1.8-.3-2.5-.7-.4-.3-.9-.1-1.1.3-.6 1.1-1.7 1.9-3 2.3-.5.1-.9-.2-.9-.7 0-1.4.7-2.6 1.7-3.5.5-.4.5-1.1.1-1.6C3.8 13.4 3.2 11.8 3.2 10c0-2 .8-3.7 2.1-4.9C6.5 3.9 8.4 3.2 10.5 3.2h1.5Z" />
    <circle cx="12" cy="11.2" r="1.15" />
    <path d="M12 6.6c2.4 0 4.3 1.7 4.3 3.8S14.4 14.2 12 14.2 7.7 12.5 7.7 10.4 9.6 6.6 12 6.6Z" />
    <path d="M12 8.4c1.3 0 2.4.9 2.4 2s-1.1 2-2.4 2-2.4-.9-2.4-2 1.1-2 2.4-2Z" />
    <path d="M5.8 16.8 7 15.6" />
  </svg>,
];

/* Parity: оригинал — одна тёмная секция: слева заголовок + фото,
   справа сетка преимуществ 2×3 с оранжевыми иконками, без карточек. */
export function ProductionIntroSection() {
  return (
    <section className="section-dark py-14 sm:py-20">
      <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[34px]">
            Производство по изготовлению высококачественных отделочных материалов
          </h2>
          {/* Parity: крупное фото с оранжевой подложкой со смещением вправо-вниз */}
          <div className="relative mt-8 w-full max-w-[400px]">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-accent" aria-hidden="true"></div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                src={PRODUCTION_IMAGE}
                alt="Производство крашеной доски"
                fill
                sizes="400px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 sm:auto-rows-fr">
          {advantages.map((item, index) => (
            <article
              key={item.title}
              className="flex flex-col border-b border-white/15 py-8"
            >
              <div className="h-12 w-12">{advantageIcons[index]}</div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2.5 text-base leading-relaxed text-white">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Слита с ProductionIntroSection ради паритета — оставлена пустой для совместимости. */
export function AdvantagesSection() {
  return null;
}

export function CatalogPreviewSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="section-title">
              Крашеная доска в наличии и под заказ. Ассортимент высококачественной доски с точным
              соответствием сорту.
            </h2>
          </div>
          <Link href="/katalog/" className="btn-primary">
            Купить по лучшей цене
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATALOG_PREVIEW.map((item) => (
            <ProductCard
              key={`${item.href}-${item.title}`}
              href={item.href}
              title={item.title}
              image={item.image}
              variant="dark"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    href: "/uslugi/pokraska-dereva-na-stanke-metodom-raspyleni/",
    title: "Покраска на профессиональном станке методом распыления",
    cta: "Подробнее об услуге",
    image: SERVICE_IMAGES.spray,
  },
  {
    href: "/tehnologija-nanesenija-kraski/",
    title: "Нанесение масла, воска на пиломатериалы",
    cta: "Подробнее",
    image: SERVICE_IMAGES.oil,
  },
  {
    href: "/kontakty/",
    title: "Реставрация",
    cta: "Подробнее",
    image: SERVICE_IMAGES.restoration,
  },
];

/* Parity: 3 карточки с фоновыми фото, тёмный градиент, заголовок + оранжевый тег снизу. */
type ServicesPreviewSectionProps = {
  /** "home" — лес с bleed вниз (текущее поведение, главная).
      "marketing" — производственное фото с оранжевым multiply, ограничено секцией. */
  variant?: "home" | "marketing";
};

export function ServicesPreviewSection({ variant = "home" }: ServicesPreviewSectionProps) {
  const isMarketing = variant === "marketing";
  return (
    <section
      className={`section-dark relative py-16 sm:py-20 ${
        isMarketing ? "overflow-hidden" : "overflow-hidden lg:overflow-visible"
      }`}
    >
      {isMarketing ? (
        /* Parity /uslugi: производственное фото с оранжевым multiply за третьей карточкой,
           bleed вправо до края окна, по высоте — только в пределах секции */
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 top-1/3 z-0 hidden w-[40%] overflow-hidden bg-accent lg:block"
        >
          <Image
            src={PRODUCTION_IMAGE}
            alt=""
            fill
            sizes="40vw"
            className="object-cover opacity-45 mix-blend-multiply"
            unoptimized
          />
        </div>
      ) : (
        /* Parity: чёткое фото леса справа — заходит ЗА карточки и вниз в секцию «Цвета» */
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-[820px] w-[46%] overflow-hidden lg:block">
          <Image src={COLORS_BG} alt="" fill sizes="46vw" className="object-cover object-top" unoptimized />
        </div>
      )}
      <div className="container-content relative z-10">
        <h2 className="section-title">Наши услуги</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold leading-snug text-white">{item.title}</h3>
                <span className="mt-5 flex w-full items-center justify-between rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-white transition group-hover:bg-accent-dark">
                  {item.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ColorsSection() {
  return (
    <section className="relative py-16 text-white sm:py-20">
      {/* Тёмная панель: на десктопе кроет левые ~54%, справа просвечивает лес из секции выше */}
      <div className="absolute inset-0 bg-[#141210] lg:right-[46%]" />
      <div className="container-content relative z-10 lg:pr-[42%]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="section-title text-white">
            Эксклюзивные цвета
            <br />
            в ваших проектах
          </h2>
          <Link href="/palitra/" className="btn-primary shrink-0">
            Узнать подробнее
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {COLOR_SWATCHES.map((swatch) => (
            <Link
              key={swatch.code}
              href={swatch.href}
              className="group text-center"
            >
              <div className="relative mx-auto aspect-square max-w-[150px] overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                <Image
                  src={swatch.image}
                  alt={swatch.code}
                  fill
                  sizes="150px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-white/90 transition-colors duration-200 group-hover:text-accent">
                {swatch.code}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="section-dark relative overflow-hidden py-16 sm:py-20">
      <Image
        src={WOOD_TEXTURE_BG}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        unoptimized
      />
      <div className="container-content relative">
        <h2 className="section-title">Партнеры и бренды</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-28 items-center justify-center rounded-2xl border border-white/15 bg-white/95 p-4 transition hover:shadow-md"
            >
              <div className="relative h-full w-full">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  const { contacts, integrations } = getSiteSettings();
  const phoneDigits = contacts.phones[0]?.replace(/\D/g, "") ?? "88002509055";
  const phoneHref = phoneDigits ? `tel:${phoneDigits}` : "tel:88002509055";

  return (
    <section id="form" className="section-dark relative overflow-hidden scroll-mt-24 py-16 sm:py-20">
      {/* Parity: одна оранжевая плита с текстурой, bleed за правый край, на уровне заголовка */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-12 z-0 hidden h-64 w-[30%] overflow-hidden bg-accent lg:block"
      >
        <Image
          src={WOOD_TEXTURE_BG}
          alt=""
          fill
          sizes="480px"
          className="object-cover opacity-40 mix-blend-multiply"
          unoptimized
        />
      </div>
      <div className="container-content relative z-10">
        <h2 className="section-title max-w-xl">Остались вопросы?</h2>
        <div className="mt-10 lg:max-w-[66%]">
          <ContactForm
            email={contacts.email}
            phoneHref={phoneHref}
            formEndpoint={integrations.formEndpoint || undefined}
          />
        </div>
      </div>
    </section>
  );
}

export function CompanyPreviewSection() {
  const [about, ...pillars] = HOME_COMPANY_BLOCKS;
  const primary = pillars.slice(0, 3);
  const secondary = pillars.slice(3);

  return (
    <section className="company-infographic section-dark relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(254,119,43,0.16),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(254,119,43,0.08),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-[0.12] lg:block"
      >
        <Image
          src={WOOD_TEXTURE_BG}
          alt=""
          fill
          sizes="40vw"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="container-content relative z-10">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {about.title}
          </p>
          <h2 className="section-title mt-3">ООО «Крашеная доска»</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{about.text}</p>
        </header>

        <ol className="company-infographic__rail mt-12 grid gap-5 md:grid-cols-3">
          {primary.map((block, index) => (
            <li key={block.id} className="company-infographic__step">
              <div className="company-infographic__step-head">
                <span className="company-infographic__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="company-infographic__icon">{COMPANY_ICONS[block.id]}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-accent">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{block.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {secondary.map((block) => (
            <article key={block.id} className="company-infographic__tile">
              <div className="company-infographic__tile-icon">{COMPANY_ICONS[block.id]}</div>
              <h3 className="mt-3 text-base font-semibold text-accent">{block.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{block.text}</p>
            </article>
          ))}
        </div>

        <Link href="/o-kompanii/" className="btn-outline-light mt-10">
          Подробнее о компании
        </Link>
      </div>
    </section>
  );
}

export function BottomBarSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-16 text-white sm:py-20">
      <Image
        src={BOTTOMBAR_BG}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/45" />
      <div className="container-content relative">
        <h2 className="max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
          Широкий ассортимент, выгодные цены и быстрая доставка
        </h2>
        <Link href="/#form" className="btn-primary mt-8 inline-flex">
          Заказать звонок
        </Link>
      </div>
    </section>
  );
}

export function HomeProjectsSection() {
  const projects = HOME_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (project): project is NonNullable<typeof project> => project !== null,
  );

  if (projects.length === 0) return null;

  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title">Выполненные работы</h2>
          <Link href="/project/" className="btn-outline-light">
            Все проекты
          </Link>
        </div>
        <ContentList
          embedded
          variant="dark"
          layout="carousel"
          items={projects.map((project) => ({
            slug: project.slug,
            title: project.title,
            excerpt: getExcerpt(project),
            image: getContentImage(project),
            href: `/project/${project.slug}/`,
            tag: HOME_PROJECT_TAGS[project.slug],
            cta: "Подробнее об услуге",
          }))}
        />
      </div>
    </section>
  );
}

export function HomeBlogSection() {
  const posts = HOME_BLOG_SLUGS.map((slug) => getBlogPost(slug)).filter(
    (post): post is NonNullable<typeof post> => post !== null,
  );

  if (posts.length === 0) return null;

  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <h2 className="section-title">Новости и статьи</h2>
        <ContentList
          embedded
          variant="dark"
          cols={4}
          items={posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: getExcerpt(post),
            image: getContentImage(post),
            href: `/blog/${post.slug}/`,
            meta: HOME_BLOG_DATES[post.slug],
          }))}
        />
        <div className="mt-10 flex justify-center">
          <Link href="/blog/" className="btn-outline-light">
            Читать больше статей
          </Link>
        </div>
      </div>
    </section>
  );
}
