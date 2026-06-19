import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
};

export function Breadcrumbs({ items, variant = "light" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Хлебные крошки"
      className={`mb-6 text-sm ${isDark ? "text-white/70" : "text-neutral-500"}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden className={isDark ? "text-white/30" : "text-neutral-300"}>
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isDark ? "hover:text-accent" : "hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? isDark
                        ? "font-medium text-white"
                        : "font-medium text-neutral-800"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
