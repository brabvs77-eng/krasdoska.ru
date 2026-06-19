import { ContentList } from "@/components/content/ContentList";
import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getBlogPost, getBlogSlugs, getExcerpt } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return buildPageMetadata({
    title: post?.seo?.title ?? post?.title ?? slug.replace(/-/g, " "),
    description: post ? getExcerpt(post) : undefined,
    path: `/blog/${slug}/`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <>
        <PageHero title={slug.replace(/-/g, " ")} />
        <div className="container-content py-16 text-center text-neutral-600">
          Запись не найдена.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={post.title} description={getExcerpt(post)} />
      <article className="container-content py-12">
        <HtmlContent html={post.content} />
      </article>
    </>
  );
}
