import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContentList } from "@/components/content/ContentList";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getAllBlogPosts, getAllProjects, getExcerpt } from "@/lib/content";
import { getContentImage } from "@/lib/product-media";
import { ContactForm } from "@/components/forms/ContactForm";
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

export function ProductionIntroSection() {
  return (
    <section className="section-dark border-b border-white/10 py-12 sm:py-16">
      <div className="container-content grid items-center gap-10 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div className="relative mx-auto aspect-[300/242] w-full max-w-xs overflow-hidden rounded-2xl bg-surface-muted lg:mx-0">
          <Image
            src={PRODUCTION_IMAGE}
            alt="Производство крашеной доски"
            fill
            sizes="280px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
            Производство по изготовлению высококачественных отделочных материалов
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Профессиональная покраска деревянных домов с персональным подходом и гарантией
            долговечности и эстетики.
          </p>
        </div>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="relative mb-4 h-12 w-12">
                <Image
                  src={ADVANTAGE_ICONS[index] ?? ADVANTAGE_ICONS[0]}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-semibold text-accent">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CatalogPreviewSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">
              Крашеная доска в наличии и под заказ
            </h2>
            <p className="section-subtitle">
              Ассортимент высококачественной доски с точным соответствием сорту.
            </p>
          </div>
          <Link href="/katalog/" className="btn-primary">
            Купить по лучшей цене
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATALOG_PREVIEW.map((item) => (
            <ProductCard
              key={`${item.slug}-${item.title}`}
              href={`/katalog/${item.slug}/`}
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
              <div className="relative mx-auto aspect-square max-w-[132px] overflow-hidden rounded-full border border-white/20">
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
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="section-title">Остались вопросы?</h2>
          <p className="section-subtitle mt-4">
            Заполните простую форму — мы свяжемся с вами и поможем подобрать подходящие решения.
          </p>
        </div>
        <ContactForm />
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
        <Link href="/kontakty/" className="btn-outline-light shrink-0">
          Заказать звонок
        </Link>
      </div>
    </section>
  );
}

export function HomeProjectsSection() {
  const projects = getAllProjects();

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
          }))}
        />
      </div>
    </section>
  );
}

export function HomeBlogSection() {
  const posts = getAllBlogPosts().slice(0, 4);

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
          }))}
        />
      </div>
    </section>
  );
}
