type PageHeroProps = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-neutral-200 bg-surface-muted py-12 sm:py-16">
      <div className="container-content">
        <h1 className="section-title">{title}</h1>
        {description && <p className="section-subtitle">{description}</p>}
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
