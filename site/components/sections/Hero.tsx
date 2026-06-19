import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,163,90,0.25),transparent_50%)]" />
      <div className="container-content relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Производитель крашеной доски
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary bg-accent text-surface-dark hover:bg-accent-dark">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
