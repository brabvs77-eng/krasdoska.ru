import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
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
    description: project ? getExcerpt(project) : undefined,
    path: `/project/${slug}/`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return (
      <>
        <PageHero title={slug.replace(/-/g, " ")} />
        <div className="container-content py-16 text-center text-neutral-600">
          Проект не найден.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={project.title} description={getExcerpt(project)} />
      <article className="container-content py-12">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Проекты", href: "/project/" },
            { label: project.title },
          ]}
        />
        <div className="mt-8">
          <HtmlContent html={project.content} />
        </div>
      </article>
      <CtaSection />
    </>
  );
}
