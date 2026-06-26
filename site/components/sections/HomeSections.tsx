import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContentList } from "@/components/content/ContentList";
import { getBlogPost, getExcerpt, getProject } from "@/lib/content";
import { HOME_BLOG_DATES, HOME_BLOG_SLUGS, HOME_PROJECT_SLUGS, HOME_PROJECT_TAGS } from "@/lib/home-content";
import { getContentImage } from "@/lib/product-media";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site";
import { HOME_COMPANY_BLOCKS } from "@/lib/home-footer";
import {
  CATALOG_PREVIEW,
  COLOR_SWATCHES,
  COLORS_BG,
  PARTNERS,
  PRODUCTION_IMAGE,
  SERVICE_IMAGES,
  WOOD_TEXTURE_BG,
} from "@/lib/media";

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

/* Parity: в оригинале — оранжевые линейные иконки (не фото). */
const iconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fe772b",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const advantageIcons = [
  // Высокое качество — медаль
  <svg key="i0" {...iconProps}><circle cx="12" cy="9" r="5.5" /><path d="M9.5 13.5 8 21l4-2 4 2-1.5-7.5" /><path d="m10 9 1.4 1.4L14 7.8" /></svg>,
  // Долговечность — щит
  <svg key="i1" {...iconProps}><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>,
  // Контроль — шкала/датчик
  <svg key="i2" {...iconProps}><path d="M4 15a8 8 0 0 1 16 0" /><path d="M4 15h16" /><path d="m12 15 3.5-4" /><circle cx="12" cy="15" r="1" /></svg>,
  // Шлифовка — слои
  <svg key="i3" {...iconProps}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>,
  // Автоматизация — шестерёнка
  <svg key="i4" {...iconProps}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>,
  // Экологичность — лист
  <svg key="i5" {...iconProps}><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z" /><path d="M5 19c3-5 6-8 10-10" /></svg>,
];

/* Parity: оригинал — одна тёмная секция: слева заголовок + фото,
   справа сетка преимуществ 2×3 с оранжевыми иконками, без карточек. */
export function ProductionIntroSection() {
  return (
    <section className="section-dark py-14 sm:py-20">
      <div className="container-content grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[34px]">
            Производство по изготовлению высококачественных отделочных материалов
          </h2>
          <div className="relative mt-7 aspect-[300/242] w-full max-w-sm overflow-hidden rounded-2xl bg-surface-muted">
            <Image
              src={PRODUCTION_IMAGE}
              alt="Производство крашеной доски"
              fill
              sizes="360px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {advantages.map((item, index) => (
            <article key={item.title}>
              <div className="h-10 w-10">{advantageIcons[index]}</div>
              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
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
export function ServicesPreviewSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <h2 className="section-title">Наши услуги</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="relative p-6">
                <h3 className="text-lg font-semibold leading-snug text-white">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-accent-dark">
                  {item.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
    <section className="relative overflow-hidden bg-brand py-16 text-white sm:py-20">
      <Image
        src={COLORS_BG}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right opacity-30"
        unoptimized
      />
      <div className="container-content relative">
        <h2 className="section-title text-white">
          Эксклюзивные цвета
          <br />
          в ваших проектах
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLOR_SWATCHES.map((swatch) => (
            <div key={swatch.code} className="text-center">
              <div className="relative mx-auto aspect-square max-w-[132px] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src={swatch.image}
                  alt={swatch.code}
                  fill
                  sizes="132px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="mt-3 text-sm font-semibold">{swatch.code}</p>
            </div>
          ))}
        </div>
        <Link href="/palitra/" className="btn-primary mt-10">
          Узнать подробнее
        </Link>
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
    <section id="form" className="section-dark scroll-mt-24 py-16 sm:py-20">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="section-title">Остались вопросы?</h2>
          <p className="section-subtitle mt-4">
            Заполните простую форму — мы свяжемся с вами и поможем подобрать подходящие решения.
          </p>
        </div>
        <ContactForm
          email={contacts.email}
          phoneHref={phoneHref}
          formEndpoint={integrations.formEndpoint || undefined}
        />
      </div>
    </section>
  );
}

export function CompanyPreviewSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content max-w-4xl">
        <h2 className="section-title">ООО «Крашеная доска»</h2>
        <div className="mt-8 space-y-8">
          {HOME_COMPANY_BLOCKS.map((block) => (
            <article key={block.title}>
              <h3 className="text-lg font-semibold text-accent">
                <span className="mr-2">{block.icon}</span>
                {block.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-white/75">{block.text}</p>
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
    <section className="bg-accent py-8 text-white">
      <div className="container-content flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-semibold sm:text-xl">
          Широкий ассортимент, выгодные цены и быстрая доставка
        </p>
        <Link href="/#form" className="btn-outline-light shrink-0">
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title">Новости и статьи</h2>
          <Link href="/blog/" className="btn-outline-light">
            Еще больше статей
          </Link>
        </div>
        <ContentList
          embedded
          variant="dark"
          items={posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: getExcerpt(post),
            image: getContentImage(post),
            href: `/blog/${post.slug}/`,
            meta: HOME_BLOG_DATES[post.slug],
          }))}
        />
      </div>
    </section>
  );
}
