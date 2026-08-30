import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { PAGE_HERO_BG } from "@/lib/media";

type PageHeroProps = {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  breadcrumbs?: BreadcrumbItem[];
  /** Override default shared page-hero background (cache-bust / page-specific art) */
  backgroundSrc?: string;
  overlay?: "default" | "light";
};

const overlays = {
  default: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-brand-dark/60",
  light: "absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-brand-dark/45",
} as const;

export function PageHero({
  title,
  description,
  action,
  breadcrumbs,
  backgroundSrc = PAGE_HERO_BG,
  overlay = "default",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-dark/30">
      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        unoptimized
        aria-hidden
      />
      <div className={overlays[overlay]} />
      <div className="container-content relative py-20 pt-28 text-white sm:py-24 sm:pt-32 lg:py-28 lg:pt-36">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} variant="dark" />
        )}
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[50px] lg:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="section-subtitle mt-4 max-w-2xl text-white/90">{description}</p>
        )}
        {action && (
          <Link href={action.href} className="btn-primary mt-8">
            {action.label}
          </Link>
        )}
      </div>
    </section>
  );
}

type PlaceholderProps = {
  message?: string;
};

export function PagePlaceholder({
  message = "Раздел в разработке. Контент будет загружен из миграции WordPress.",
}: PlaceholderProps) {
  return (
    <div className="container-content py-16">
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-600">
        {message}
      </div>
    </div>
  );
}
