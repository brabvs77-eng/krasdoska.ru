import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  href: string;
  title: string;
  image: string;
  imageAlt?: string;
  variant?: "light" | "dark";
};

export function ProductCard({
  href,
  title,
  image,
  imageAlt,
  variant = "light",
}: ProductCardProps) {
  const isDark = variant === "dark";

  return (
    <Link href={href} className="group block">
      <div
        className={`relative aspect-[3/4] overflow-hidden ${
          isDark ? "rounded-lg bg-white/5" : "rounded-2xl border border-neutral-200 bg-surface-muted shadow-sm"
        }`}
      >
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
      <h3
        className={`mt-4 text-base font-semibold leading-snug sm:text-lg ${
          isDark ? "text-white group-hover:text-accent" : "text-neutral-900 group-hover:text-brand"
        }`}
      >
        {title}
      </h3>
    </Link>
  );
}
