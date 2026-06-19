import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  href: string;
  title: string;
  image: string;
  imageAlt?: string;
};

export function ProductCard({ href, title, image, imageAlt }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-brand/30 hover:shadow-md"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug text-neutral-900 group-hover:text-brand">
          {title}
        </h3>
      </div>
    </Link>
  );
}
