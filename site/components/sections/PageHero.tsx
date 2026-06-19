import Image from "next/image";
import { PAGE_HERO_BG } from "@/lib/media";

type PageHeroProps = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-dark/30">
      <Image
        src={PAGE_HERO_BG}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-brand-dark/60" />
      <div className="container-content relative py-20 text-white sm:py-24 lg:py-28">
        <h1 className="section-title max-w-4xl text-white">{title}</h1>
        {description && (
          <p className="section-subtitle mt-4 max-w-2xl text-white/85">{description}</p>
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
