import Link from "next/link";

type ContentListItem = {
  slug: string;
  title: string;
  excerpt?: string;
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
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={item.href}
            className="block h-full rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-brand-500 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{item.title}</h2>
            {item.excerpt && (
              <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{item.excerpt}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (embedded) return list;

  return <div className="container-content py-12">{list}</div>;
}
