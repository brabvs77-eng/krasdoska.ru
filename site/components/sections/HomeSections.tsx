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
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Parity: белые линейные иконки, как в оригинале. */
const advantageIcons = [
  // Высокое качество — палец вверх
  <svg key="i0" {...iconProps}><path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Z" /><path d="M7 10l3.5-6.5a1.8 1.8 0 0 1 2.5 1.6V9h5a1.8 1.8 0 0 1 1.8 2.1l-1 6A1.8 1.8 0 0 1 17 19H7" /></svg>,
  // Долговечность покрытия — бутыль ЛКМ
  <svg key="i1" {...iconProps}><path d="M10 3h4M11.5 3v2.5M12.5 3v2.5" /><path d="M9 9.5C9 7.6 10.3 6 12 6s3 1.6 3 3.5V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9.5Z" /><path d="M9 12h6" /></svg>,
  // Контроль — доски/планки
  <svg key="i2" {...iconProps}><rect x="3" y="7" width="18" height="4" rx="1" /><rect x="3" y="13" width="18" height="4" rx="1" /><path d="M7 7v4M16 13v4" /></svg>,
  // Шлифовка — шлифовальный брусок
  <svg key="i3" {...iconProps}><rect x="3" y="13" width="15" height="5" rx="1" /><path d="M6 13l1.5-3h7L16 13" /><path d="M19 9l2-2M17 8l1.5-1.5M20 11l1.5-1.5" /></svg>,
  // Автоматизация — дисковая пила
  <svg key="i4" {...iconProps}><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="1.4" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></svg>,
  // Экологичность — отпечаток/лист
  <svg key="i5" {...iconProps}><path d="M4 13a8 8 0 0 1 16 0" /><path d="M7 14a5 5 0 0 1 10 0v3" /><path d="M10 14a2 2 0 0 1 4 0v4" /><path d="M5 18.5c.7 1 1 1.7 1 2.5M19 17v1.5" /></svg>,
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
        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {advantages.map((item, index) => (
            <article
              key={item.title}
              className={`py-7 ${index >= 2 ? "sm:border-t sm:border-white/10" : ""}`}
            >
              <div className="h-11 w-11">{advantageIcons[index]}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
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
