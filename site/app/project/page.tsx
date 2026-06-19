import { ContentList } from "@/components/content/ContentList";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllProjects, getExcerpt } from "@/lib/content";
import { getContentImage } from "@/lib/product-media";

export const metadata = buildPageMetadata({
  title: "Проекты",
  description: "Выполненные работы и портфолио.",
  path: "/project/",
});

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHero title="Выполненные работы" description="Портфолио реализованных проектов." />
      <ContentList
        items={projects.map((project) => ({
          slug: project.slug,
          title: project.title,
          excerpt: getExcerpt(project),
          image: getContentImage(project),
          href: `/project/${project.slug}/`,
        }))}
        emptyMessage="Проекты появятся после миграции контента."
      />
    </>
  );
}
