import Image from "next/image";
import { DiyVsFactoryArticle } from "@/components/blog/DiyVsFactoryArticle";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getBlogPost, getBlogSlugs, getExcerpt } from "@/lib/content";
import { getContentImage } from "@/lib/product-media";

const FEATURED_ARTICLE_SLUG = "chto-vygodnee-krasit-samomu-ili-na-proizvodstve";

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
        <section className="section-dark">
          <div className="container-content py-16 text-center text-white/70">
            Запись не найдена.
          </div>
        </section>
      </>
    );
  }

  const isFeatured = slug === FEATURED_ARTICLE_SLUG;
  const cover = getContentImage(post);

  return (
    <>
      <PageHero title={post.title} description={getExcerpt(post)} />
      <section className="section-dark">
        <article className="container-content py-12">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Блог", href: "/blog/" },
              { label: post.title },
            ]}
          />
          {isFeatured && cover ? (
            <div className="mt-8">
              <DiyVsFactoryArticle coverSrc={cover} title={post.title} />
            </div>
          ) : (
            <>
              {cover ? (
                <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </figure>
              ) : null}
              <div className="mt-8">
                <HtmlContent html={post.content} />
              </div>
            </>
          )}
        </article>
      </section>
      <MarketingPageFooter />
    </>
  );
}
