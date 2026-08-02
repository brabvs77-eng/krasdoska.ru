import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  href: string;
  title: string;
  image: string;
  imageAlt?: string;
  /** Optional cross-section diagram shown in addition to the main photo. */
  sectionImage?: string;
  variant?: "light" | "dark";
};

export function ProductCard({
  href,
  title,
  image,
  imageAlt,
  sectionImage,
  variant = "light",
}: ProductCardProps) {
  const isDark = variant === "dark";

  return (
    <Link href={href} className="group block">
      <div
        className={`overflow-hidden ${
          isDark ? "rounded-lg bg-white/5" : "rounded-2xl border border-neutral-200 bg-surface-muted shadow-sm"
        }`}
      >
        <div className="relative aspect-[225/300]">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      </div>

      <h3
        className={`mt-3 text-sm font-semibold leading-snug tracking-tight sm:text-base ${
          isDark ? "text-white group-hover:text-accent" : "text-neutral-900 group-hover:text-brand"
        }`}
      >
        {title}
      </h3>

      {sectionImage ? (
        <div
          className={`mt-2 overflow-hidden rounded-lg border px-3 py-2.5 ${
            isDark ? "border-white/10 bg-black/40" : "border-neutral-200 bg-neutral-950"
          }`}
        >
          <p
            className={`mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              isDark ? "text-white/45" : "text-white/55"
            }`}
          >
            Сечение профиля
          </p>
          <div className="relative h-12 w-full sm:h-14">
            <Image
              src={sectionImage}
              alt={`Сечение: ${title}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain object-left"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </Link>
  );
}
