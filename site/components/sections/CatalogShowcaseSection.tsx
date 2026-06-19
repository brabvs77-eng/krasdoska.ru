import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CATALOG_SHOWCASE } from "@/lib/catalog-showcase";

export function CatalogShowcaseSection() {
  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="container-content space-y-16">
        {CATALOG_SHOWCASE.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="relative aspect-[576/515] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
              <h2 className="text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl">
                {item.title}
              </h2>
              {item.tagline && (
                <p className="mt-3 text-base text-white/80">{item.tagline}</p>
              )}
              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent">
                Характеристики
              </p>
              <dl className="mt-4 space-y-2">
                {item.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 border-b border-white/10 pb-2 text-sm sm:grid-cols-[140px_1fr]"
                  >
                    <dt className="text-white/70">{spec.label}</dt>
                    <dd className="text-white">{spec.value}</dd>
                  </div>
                ))}
                {item.priceFrom && (
                  <div className="grid gap-1 pt-2 text-sm sm:grid-cols-[140px_1fr]">
                    <dt className="text-white/70">Цена с покраской</dt>
                    <dd className="font-semibold text-accent">{item.priceFrom}</dd>
                  </div>
                )}
              </dl>
              <ArrowLink href={item.href} className="mt-6 text-accent">
                Узнать подробнее
              </ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
