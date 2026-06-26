import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContentList } from "@/components/content/ContentList";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getBlogPost, getExcerpt, getProject } from "@/lib/content";
import { HOME_BLOG_DATES, HOME_BLOG_SLUGS, HOME_PROJECT_SLUGS, HOME_PROJECT_TAGS } from "@/lib/home-content";
import { getContentImage } from "@/lib/product-media";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site";
import { HOME_COMPANY_BLOCKS } from "@/lib/home-footer";
import {
  ADVANTAGE_ICONS,
  CATALOG_PREVIEW,
  COLOR_SWATCHES,
  PARTNERS,
  PRODUCTION_IMAGE,
  SERVICES_IMAGE,
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
              <div className="relative h-10 w-10">
                <Image
                  src={ADVANTAGE_ICONS[index] ?? ADVANTAGE_ICONS[0]}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain"
                  unoptimized
                />
              </div>
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  },
  {
    href: "/tehnologija-nanesenija-kraski/",
    title: "Нанесение масла, воска на пиломатериалы",
    cta: "Подробнее",
  },
  {
    href: "/kontakty/",
    title: "Реставрация",
    cta: "Подробнее",
  },
];

export function ServicesPreviewSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <h2 className="section-title">Наши услуги</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
            {services.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold leading-snug text-white">{item.title}</h3>
                <ArrowLink href={item.href} className="mt-4 text-accent">
                  {item.cta}
                </ArrowLink>
              </article>
            ))}
          </div>
          <div className="relative hidden min-h-[280px] overflow-hidden rounded-2xl bg-brand-dark lg:block">
            <Image
              src={SERVICES_IMAGE}
              alt="Услуги покраски дерева"
              fill
              sizes="360px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ColorsSection() {
  return (
    <section className="bg-brand py-16 text-white sm:py-20">
      <div className="container-content">
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
    <section className="bg-surface-muted py-16 sm:py-20">
      <div className="container-content max-w-4xl">
        <h2 className="section-title">ООО «Крашеная доска»</h2>
        <div className="mt-8 space-y-8">
          {HOME_COMPANY_BLOCKS.map((block) => (
            <article key={block.title}>
              <h3 className="text-lg font-semibold text-brand">
                <span className="mr-2">{block.icon}</span>
                {block.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">{block.text}</p>
            </article>
          ))}
        </div>
        <Link href="/o-kompanii/" className="btn-outline mt-10">
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
    <section className="bg-surface-muted py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title">Новости и статьи</h2>
          <Link href="/blog/" className="btn-outline">
            Еще больше статей
          </Link>
        </div>
        <ContentList
          embedded
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
