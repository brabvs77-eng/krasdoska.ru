import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import type { CommercialLanding } from "@/lib/commercial-landings";

type Props = {
  landing: CommercialLanding;
};

export function CommercialLandingContent({ landing }: Props) {
  return (
    <>
      <PageHero
        title={landing.title}
        description={landing.heroDescription}
        action={{ href: "/#form", label: "Получить расчёт" }}
      />

      <section className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[{ label: "Главная", href: "/" }, { label: landing.title }]}
          />

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={landing.heroImage}
                alt={landing.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            <div className="space-y-4">
              {landing.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {landing.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-white/5 p-5 text-center"
              >
                <dt className="text-2xl font-semibold text-accent">{stat.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-white/70">{stat.label}</dd>
              </div>
            ))}
          </dl>

          {landing.sections.map((section) => (
            <div key={section.title} className="mt-14">
              <h2 className="section-title text-white">{section.title}</h2>
              <div className="mt-6 max-w-3xl space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-white/80">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-base text-white/80">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {landing.example && (
            <div className="mt-14 rounded-2xl border border-accent/30 bg-white/5 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">{landing.example.title}</h2>
              <ul className="mt-4 space-y-2 text-base text-white/80">
                {landing.example.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-14">
            <h2 className="section-title text-white">Полезные ссылки</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {landing.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:border-accent/50 hover:bg-white/10"
                  >
                    {link.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MarketingPageFooter />
    </>
  );
}
