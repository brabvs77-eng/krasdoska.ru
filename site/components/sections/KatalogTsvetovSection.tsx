import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { KatalogTsvetovGallery } from "@/components/sections/KatalogTsvetovGallery";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";

export type KatalogTsvetovSectionData = {
  title: string;
  intro: string[];
  sections: { id: string; title: string; images: string[] }[];
  paletteLinks: { title: string; href: string }[];
};

type Props = {
  data: KatalogTsvetovSectionData;
};

export function KatalogTsvetovSection({ data }: Props) {
  return (
    <>
      <PageHero title={data.title} description={data.intro[0]} />

      <section className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Палитра", href: "/palitra/" },
              { label: data.title },
            ]}
          />

          <div className="mt-10 space-y-6">
            {data.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="max-w-3xl text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {data.paletteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-accent hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <KatalogTsvetovGallery sections={data.sections} />
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/#form" className="btn-primary">
              Заказать образец
            </Link>
            <Link href="/palitra/" className="btn-outline-light">
              Все палитры
            </Link>
          </div>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
