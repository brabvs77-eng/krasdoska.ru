"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type ContentListItem = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  href: string;
  tag?: string;
  meta?: string;
  cta?: string;
};

type ContentListProps = {
  items: ContentListItem[];
  emptyMessage?: string;
  embedded?: boolean;
  variant?: "light" | "dark";
  layout?: "grid" | "carousel";
  cols?: 3 | 4;
};

export function ContentList({
  items,
  emptyMessage = "Пока нет записей.",
  embedded = false,
  variant = "light",
  layout = "grid",
  cols = 3,
}: ContentListProps) {
  const isDark = variant === "dark";
  const isCarousel = layout === "carousel";
  const scroller = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth, 360), behavior: "smooth" });
  };

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

  const gridCols =
    cols === 4
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const list = (
    <ul
      ref={scroller}
      className={
        isCarousel
          ? "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : gridCols
      }
    >
      {items.map((item) => (
        <li
          key={item.slug}
          className={isCarousel ? "w-[min(85vw,360px)] shrink-0 snap-start sm:w-[360px]" : undefined}
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
                  sizes="(max-width: 640px) 85vw, 360px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-brand/10 to-accent/15" />
            )}
            <div className="p-5">
              {item.tag && (
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">
                  {item.tag}
                </p>
              )}
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
              {item.meta && (
                <p className={`mt-3 text-xs ${isDark ? "text-white/60" : "text-neutral-500"}`}>{item.meta}</p>
              )}
              {item.cta && (
                <p className="mt-3 text-sm font-semibold text-accent">{item.cta}</p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  // Слайдер со стрелками ‹ › (как в оригинале «Выполненные работы»)
  const carousel = (
    <div className="relative">
      {list}
      {items.length > 1 && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => scrollBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white transition hover:border-accent hover:bg-accent hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={() => scrollBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white transition hover:border-accent hover:bg-accent hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );

  const content = isCarousel ? carousel : list;

  if (embedded) return <div className="mt-10">{content}</div>;

  return <div className="container-content py-12">{content}</div>;
}
