import { DiyVsFactoryArticle } from "@/components/blog/DiyVsFactoryArticle";
import { ArticleShell } from "@/components/content/ArticleShell";
import { HtmlContent } from "@/components/content/HtmlContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { enhanceArticleHtml, extractArticleToc } from "@/lib/article-html";
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
  const enhanced = enhanceArticleHtml(post.content ?? "", cover);
  const toc = extractArticleToc(enhanced);

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
          <div className="mt-8">
            {isFeatured && cover ? (
              <DiyVsFactoryArticle coverSrc={cover} title={post.title} />
            ) : (
              <ArticleShell
                coverSrc={cover}
                coverAlt={post.title}
                toc={toc}
                orangeFrame
                coverVariant={slug === "brend" ? "portrait" : "landscape"}
              >
                <HtmlContent html={enhanced} className="article-prose" />
              </ArticleShell>
            )}
          </div>
        </article>
      </section>
      <MarketingPageFooter />
    </>
  );
}
