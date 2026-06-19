import Image from "next/image";
import Link from "next/link";

type ContentListItem = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  href: string;
};

type ContentListProps = {
  items: ContentListItem[];
  emptyMessage?: string;
  embedded?: boolean;
};

export function ContentList({
  items,
  emptyMessage = "Пока нет записей.",
  embedded = false,
}: ContentListProps) {
  if (items.length === 0) {
    return (
      <div className={embedded ? "text-center text-neutral-600" : "container-content py-16 text-center text-neutral-600"}>
        {emptyMessage}
      </div>
    );
  }

  const list = (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={item.href}
            className="group block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-brand/30 hover:shadow-sm"
          >
            {item.image ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-brand/10 to-accent/15" />
            )}
            <div className="p-5">
              <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-brand">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{item.excerpt}</p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  if (embedded) return <div className="mt-10">{list}</div>;

  return <div className="container-content py-12">{list}</div>;
}
