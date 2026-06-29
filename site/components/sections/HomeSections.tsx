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
  BOTTOMBAR_BG,
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

/* Parity: белые линейные иконки, как в оригинале (Elementor font-icons). */
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

const advantageIcons = [
  // Высокое качество — палец вверх
  <svg key="i0" {...iconProps}><path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Z" /><path d="M7 10l3.5-6.5a1.8 1.8 0 0 1 2.5 1.6V9h5a1.8 1.8 0 0 1 1.8 2.1l-1 6A1.8 1.8 0 0 1 17 19H7" /></svg>,
  // Долговечность покрытия — бутыль ЛКМ (спрей)
  <svg key="i1" {...iconProps}><path d="M10 3h3M11.5 3v3" /><path d="M9.5 9.2C9.5 7.4 10.6 6 12 6s2.5 1.4 2.5 3.2V18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9.2Z" /><path d="M9.5 12.5h5" /><path d="M16 6.5h3M16 9h3M16.5 4.5l1-1" /></svg>,
  // Контроль — доски/слои
  <svg key="i2" {...iconProps}><rect x="3" y="7" width="18" height="3.6" rx="1" /><rect x="3" y="13.4" width="18" height="3.6" rx="1" /><path d="M7 7v3.6M16 13.4V17" /></svg>,
  // Шлифовка — шлифовальный брусок
  <svg key="i3" {...iconProps}><rect x="3" y="13" width="15" height="5" rx="1" /><path d="M6 13l1.5-3h7L16 13" /><path d="M19 9l2-2M17 8l1.3-1.3M20.5 10.5l1.3-1.3" /></svg>,
  // Автоматизация — шестерёнка
  <svg key="i4" {...iconProps}><path d="M12 2.5l1.6 1 1.9-.4.8 1.8 1.8.8-.4 1.9 1 1.6-1 1.6.4 1.9-1.8.8-.8 1.8-1.9-.4-1.6 1-1.6-1-1.9.4-.8-1.8-1.8-.8.4-1.9-1-1.6 1-1.6-.4-1.9 1.8-.8.8-1.8 1.9.4 1.6-1Z" /><circle cx="12" cy="12" r="3.2" /></svg>,
  // Экологичность — лист
  <svg key="i5" {...iconProps}><path d="M4 19C4 10.7 9.8 5 19 5c0 9.2-5.7 14-15 14Z" /><path d="M5.5 17.5C8 13 11.5 10 16 8.5" /></svg>,
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
    href: "/uslugi/",
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
    <section className="relative overflow-hidden bg-[#241c19] py-16 text-white sm:py-20">
      <Image
        src={COLORS_BG}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
        unoptimized
      />
      {/* Тёмный градиент: слева плотный, справа лес проступает — как в оригинале */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c1512] via-[#1c1512]/95 to-[#1c1512]/40" />
      <div className="container-content relative">
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
            <div key={swatch.code} className="text-center">
              <div className="relative mx-auto aspect-square max-w-[150px] overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                <Image
                  src={swatch.image}
                  alt={swatch.code}
                  fill
                  sizes="150px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-white/90">{swatch.code}</p>
            </div>
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
