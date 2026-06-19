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
  variant?: "light" | "dark";
  layout?: "grid" | "carousel";
};

export function ContentList({
  items,
  emptyMessage = "Пока нет записей.",
  embedded = false,
  variant = "light",
  layout = "grid",
}: ContentListProps) {
  const isDark = variant === "dark";
  const isCarousel = layout === "carousel";

  if (items.length === 0) {
    return (
      <div
        className={
          embedded
            ? `text-center ${isDark ? "text-white/70" : "text-neutral-600"}`
            : `container-content py-16 text-center ${isDark ? "text-white/70" : "text-neutral-600"}`
        }
      >
        {emptyMessage}
      </div>
    );
  }

  const list = (
    <ul
      className={
        isCarousel
          ? "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {items.map((item) => (
        <li
          key={item.slug}
          className={isCarousel ? "w-[min(85vw,320px)] shrink-0 snap-start sm:w-[320px]" : undefined}
        >
          <Link
            href={item.href}
            className={`group block h-full overflow-hidden transition ${
              isDark
                ? "rounded-2xl border border-white/10 bg-white/5 hover:border-accent/40"
                : "rounded-2xl border border-neutral-200 bg-white hover:border-brand/30 hover:shadow-sm"
            }`}
          >
            {item.image ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 85vw, 320px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-brand/10 to-accent/15" />
            )}
            <div className="p-5">
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-white group-hover:text-accent" : "text-neutral-900 group-hover:text-brand"
                }`}
              >
                {item.title}
              </h2>
              {item.excerpt && (
                <p className={`mt-2 line-clamp-3 text-sm ${isDark ? "text-white/75" : "text-neutral-600"}`}>
                  {item.excerpt}
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  if (embedded) return <div className={isCarousel ? undefined : "mt-10"}>{list}</div>;

  return <div className="container-content py-12">{list}</div>;
}
