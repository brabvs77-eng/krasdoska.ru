import { ContentList } from "@/components/content/ContentList";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllBlogPosts, getExcerpt } from "@/lib/content";
import { HOME_BLOG_DATES } from "@/lib/home-content";
import { getContentImage } from "@/lib/product-media";

export const metadata = buildPageMetadata({
  title: "Блог",
  description: "Новости и статьи о крашеной доске, покраске и технологиях.",
  path: "/blog/",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageHero title="Блог и новости" description="Статьи о материалах, покраске и производстве." />
      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="container-content">
          <ContentList
            embedded
            items={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              excerpt: getExcerpt(post),
              image: getContentImage(post),
              href: `/blog/${post.slug}/`,
              meta: HOME_BLOG_DATES[post.slug],
            }))}
            emptyMessage="Статьи появятся после миграции контента."
          />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
