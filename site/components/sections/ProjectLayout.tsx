import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import type { ProjectItem } from "@/lib/content";

type ProjectLayoutProps = {
  project: ProjectItem;
};

export function ProjectLayout({ project }: ProjectLayoutProps) {
  const sliderImages = project.slider?.length
    ? project.slider
    : project.heroImages?.length
      ? project.heroImages
      : project.image
        ? [project.image]
        : [];

  const heroText = project.heroDescription?.trim();
  const bodyDescription = project.description?.trim();

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
          <div className="mt-8 max-w-3xl">
            {(project.tags?.length || project.service) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/85"
                  >
                    {tag}
                  </span>
                ))}
                {project.service && (
                  <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
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
        <div className="container-content space-y-12">
          {sliderImages.length > 0 && (
            <ProjectGallery images={sliderImages} title={project.title} />
          )}

          {project.logo && (
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative h-14 w-28">
                <Image
                  src={project.logo}
                  alt="Партнёр проекта"
                  fill
                  sizes="112px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm text-white/70">Проект выполнен с использованием материалов партнёров</p>
            </div>
          )}

          {bodyDescription && (
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-white/80">
              {bodyDescription.split(/\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph.trim()}</p>
              ))}
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section>
              <h2 className="section-title">Галерея</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      src={src}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <Link href="/project/" className="btn-outline-light inline-flex">
            Все проекты
          </Link>
        </div>
      </article>

      <MarketingPageFooter />
    </>
  );
}
