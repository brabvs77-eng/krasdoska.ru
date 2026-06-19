import { ContentList } from "@/components/content/ContentList";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getProject } from "@/lib/content";
import { HOME_PROJECT_SLUGS, HOME_PROJECT_TAGS } from "@/lib/home-content";
import { getContentImage } from "@/lib/product-media";

export const metadata = buildPageMetadata({
  title: "Проекты",
  description: "Выполненные работы и портфолио.",
  path: "/project/",
});

export default function ProjectsIndexPage() {
  const projects = HOME_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (project): project is NonNullable<typeof project> => project !== null,
  );

  return (
    <>
      <PageHero title="Выполненные работы" description="Портфолио реализованных проектов." />
      <section className="section-dark py-16 sm:py-20">
        <div className="container-content">
          <ContentList
            embedded
            variant="dark"
            items={projects.map((project) => ({
              slug: project.slug,
              title: project.title,
              excerpt: getExcerpt(project),
              image: getContentImage(project),
              href: `/project/${project.slug}/`,
              tag: HOME_PROJECT_TAGS[project.slug],
              cta: "Подробнее об услуге",
            }))}
            emptyMessage="Проекты появятся после миграции контента."
          />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
