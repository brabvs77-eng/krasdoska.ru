import Image from "next/image";
import Link from "next/link";
import { ArticleShell } from "@/components/content/ArticleShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import type { ProjectItem } from "@/lib/content";

type ProjectLayoutProps = {
  project: ProjectItem;
};

const PROJECT_TOC = [
  { id: "opisanie", label: "Описание" },
  { id: "galereya", label: "Галерея" },
] as const;

export function ProjectLayout({ project }: ProjectLayoutProps) {
  const sliderImages = project.slider?.length
    ? project.slider
    : project.heroImages?.length
      ? project.heroImages
      : project.image
        ? [project.image]
        : [];

  const coverSrc = sliderImages[0] ?? project.image;
  const galleryImages = sliderImages.length > 1 ? sliderImages.slice(1) : [];
  const extraGallery = project.gallery?.filter((src) => src !== coverSrc) ?? [];
  const allGallery = [...galleryImages, ...extraGallery.filter((src) => !galleryImages.includes(src))];

  const heroText = project.heroDescription?.trim();
  const bodyDescription = project.description?.trim();
  const hasDescription = Boolean(heroText || bodyDescription);

  const toc = [
    ...(hasDescription ? [{ id: "opisanie", label: "Описание" }] : []),
    ...(allGallery.length > 0 || sliderImages.length > 1
      ? [{ id: "galereya", label: "Галерея" }]
      : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-brand-dark" />
        <div className="container-content relative py-28 sm:py-32">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Проекты", href: "/project/" },
              { label: project.title },
            ]}
          />
          <div className="mt-8 max-w-3xl text-left">
            {(project.tags?.length || project.service) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/85"
                  >
                    {tag}
                  </span>
                ))}
                {project.service && (
                  <span className="bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {project.service}
                  </span>
                )}
              </div>
            )}
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            {heroText && (
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{heroText}</p>
            )}
          </div>
        </div>
      </section>

      <article className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <ArticleShell
            coverSrc={coverSrc}
            coverAlt={project.title}
            orangeFrame
            toc={toc.length ? toc : [...PROJECT_TOC]}
            ctaText="Хотите такой же результат?"
            ctaLabel="Оставить заявку"
          >
            {hasDescription ? (
              <section id="opisanie" className="scroll-mt-28 space-y-4">
                <div className="article-divider" aria-hidden="true">
                  <span className="article-divider__line" />
                  <span className="article-divider__dot" />
                  <span className="article-divider__line" />
                </div>
                <h2 className="article-h2">
                  <span className="article-h2__icon" aria-hidden="true" />
                  <span>Описание</span>
                </h2>
                {bodyDescription
                  ? bodyDescription.split(/\n+/).map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph.trim()}</p>
                    ))
                  : null}
                {!bodyDescription && heroText ? (
                  <p className="text-white/70">Подробности проекта — в галерее ниже.</p>
                ) : null}
              </section>
            ) : null}

            {project.logo ? (
              <div className="mx-auto my-8 flex max-w-md flex-col items-center gap-3 border border-white/10 bg-white/[0.03] p-4">
                <div className="relative h-14 w-28">
                  <Image
                    src={project.logo}
                    alt={`Логотип партнёра проекта «${project.title}»`}
                    title={`Партнёр проекта «${project.title}»`}
                    fill
                    sizes="112px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-sm text-white/70">
                  Проект выполнен с использованием материалов партнёров
                </p>
              </div>
            ) : null}

            {sliderImages.length > 1 ? (
              <section id="galereya" className="scroll-mt-28">
                <div className="article-divider" aria-hidden="true">
                  <span className="article-divider__line" />
                  <span className="article-divider__dot" />
                  <span className="article-divider__line" />
                </div>
                <h2 className="article-h2">
                  <span className="article-h2__icon" aria-hidden="true" />
                  <span>Галерея</span>
                </h2>
                <div className="mt-6">
                  <ProjectGallery images={sliderImages.slice(1)} title={project.title} />
                </div>
                {extraGallery.length > 0 ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {extraGallery.map((src, imageIndex) => (
                      <figure key={src} className="article-figure">
                        <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                          <Image
                            src={src}
                            alt={`${project.title} — фото ${imageIndex + 1}`}
                            title={`${project.title} — фото ${imageIndex + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : allGallery.length > 0 ? (
              <section id="galereya" className="scroll-mt-28">
                <div className="article-divider" aria-hidden="true">
                  <span className="article-divider__line" />
                  <span className="article-divider__dot" />
                  <span className="article-divider__line" />
                </div>
                <h2 className="article-h2">
                  <span className="article-h2__icon" aria-hidden="true" />
                  <span>Галерея</span>
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {allGallery.map((src, imageIndex) => (
                    <figure key={src} className="article-figure">
                      <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                        <Image
                          src={src}
                          alt={`${project.title} — фото ${imageIndex + 1}`}
                          title={`${project.title} — фото ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-10">
              <Link href="/project/" className="btn-outline-light inline-flex">
                Все проекты
              </Link>
            </div>
          </ArticleShell>
        </div>
      </article>

      <MarketingPageFooter />
    </>
  );
}
