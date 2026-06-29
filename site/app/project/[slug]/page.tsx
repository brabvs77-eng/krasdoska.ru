import { ProjectLayout } from "@/components/sections/ProjectLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { getExcerpt, getProject, getProjectSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  return buildPageMetadata({
    title: project?.seo?.title ?? project?.title ?? slug.replace(/-/g, " "),
    description: project
      ? project.description ?? project.heroDescription ?? getExcerpt(project)
      : undefined,
    path: `/project/${slug}/`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="container-content py-16 text-center text-neutral-600">
        Проект не найден.
      </div>
    );
  }

  return <ProjectLayout project={project} />;
}
