import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { HomeProjectsSection } from "@/components/sections/HomeSections";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PAGE_HERO_BG } from "@/lib/media";
import type { ServiceDetail } from "@/lib/service-details";

type Props = { service: ServiceDetail; breadcrumbs: BreadcrumbItem[] };

const iconProps = {
  width: 46,
  height: 46,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const advantageIcons = [
  <svg key="i0" {...iconProps}><path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Z" /><path d="M7 10l3.5-6.5a1.8 1.8 0 0 1 2.5 1.6V9h5a1.8 1.8 0 0 1 1.8 2.1l-1 6A1.8 1.8 0 0 1 17 19H7" /></svg>,
  <svg key="i1" {...iconProps}><path d="M10 3h3M11.5 3v3" /><path d="M9.5 9.2C9.5 7.4 10.6 6 12 6s2.5 1.4 2.5 3.2V18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9.2Z" /><path d="M9.5 12.5h5" /><path d="M16 6.5h3M16 9h3M16.5 4.5l1-1" /></svg>,
  <svg key="i2" {...iconProps}><rect x="3" y="7" width="18" height="3.6" rx="1" /><rect x="3" y="13.4" width="18" height="3.6" rx="1" /><path d="M7 7v3.6M16 13.4V17" /></svg>,
];

export function ServiceDetailContent({ service, breadcrumbs }: Props) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-dark/30 py-12 sm:py-16">
        <Image
          src={PAGE_HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-brand-dark/60"
        />
        <div className="container-content relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_minmax(380px,560px)]">
          <div>
            <Breadcrumbs items={breadcrumbs} variant="dark" />
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              {service.subtitle}
            </p>
            <Link href="#form" className="btn-primary mt-8 inline-flex">
              Заказать звонок
            </Link>
          </div>
          <div className="relative hidden lg:block">
            {/* Parity: оранжевая подложка-полурамка со смещением вправо-вниз */}
            <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full bg-accent" />
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                sizes="560px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content">
          <h2 className="section-title">Преимущества покраски дерева на станке</h2>
          <div className="mt-10 grid gap-x-12 sm:grid-cols-3">
            {service.advantages.map((item, index) => (
              <article key={item.title} className="flex flex-col border-b border-white/15 py-8">
                <div className="h-12 w-12">{advantageIcons[index]}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-white">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content">
          <h2 className="section-title max-w-4xl">{service.industrialTitle}</h2>
          <div className="mt-8 max-w-4xl space-y-5">
            {service.industrialParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={service.wideImage}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content grid items-start gap-10 lg:grid-cols-[1fr_minmax(280px,380px)]">
          <div className="space-y-10">
            {service.techBlocks.map((block) => (
              <article key={block.title}>
                <h2 className="section-title">{block.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-white/80">{block.text}</p>
              </article>
            ))}
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={service.techImage}
              alt={service.title}
              fill
              sizes="380px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content">
          <h2 className="section-title">{service.featuresTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {service.features.map((feature) => (
              <article key={feature.title}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-10">
        <div className="container-content">
          <p className="max-w-4xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
            {service.highlight.before}
            <span className="text-accent">{service.highlight.accents[0]}</span>
            {" и "}
            <span className="text-accent">{service.highlight.accents[1]}</span>
            {service.highlight.after}
          </p>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content max-w-4xl">
          <h2 className="section-title">{service.conclusionTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/80">{service.conclusion}</p>
        </div>
      </section>

      <section className="section-dark py-14 sm:py-16">
        <div className="container-content">
          <div className="rounded-2xl bg-white/5 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="max-w-2xl text-2xl font-semibold leading-snug text-white">
                ООО «Крашеная доска» всегда поможет заказчикам подобрать{" "}
                <span className="text-accent">желаемый цвет</span> в ваших проектах.
              </h2>
              <Link href="/palitra/" className="btn-primary inline-flex shrink-0">
                Узнать подробнее
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {service.palette.map((swatch, index) => (
                <div key={`${swatch.code}-${index}`} className="text-center">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={swatch.image}
                      alt={swatch.code}
                      fill
                      sizes="(max-width: 640px) 33vw, 16vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="mt-2 text-sm text-white/80">{swatch.code}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark py-12">
        <div className="container-content flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="section-title">Заказать услугу</h2>
            <p className="mt-3 text-lg font-semibold text-accent">{service.title}</p>
          </div>
          <Link href="#form" className="btn-primary inline-flex shrink-0">
            Узнать подробнее
          </Link>
        </div>
      </section>

      <HomeProjectsSection />
      <MarketingPageFooter />
    </>
  );
}
