import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleCover } from "@/components/content/ArticleCover";
import type { ArticleTocItem } from "@/lib/article-html";

type ArticleShellProps = {
  coverSrc?: string;
  coverAlt: string;
  orangeFrame?: boolean;
  coverVariant?: "landscape" | "portrait";
  toc: ArticleTocItem[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaText?: string;
  children: ReactNode;
};

export function ArticleShell({
  coverSrc,
  coverAlt,
  orangeFrame = true,
  coverVariant = "landscape",
  toc,
  ctaLabel = "Оставить заявку",
  ctaHref = "/#form",
  ctaText = "Нужен расчёт под ваш метраж?",
  children,
}: ArticleShellProps) {
  return (
    <div className="article-shell">
      <aside className="article-rail" aria-label="Содержание">
        <div className="article-rail__sticky">
          {toc.length > 0 ? (
            <>
              <p className="article-rail__eyebrow">Содержание</p>
              <nav className="article-rail__nav">
                {toc.map((item, index) => (
                  <a key={item.id} href={`#${item.id}`} className="article-rail__link">
                    <span className="article-rail__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </>
          ) : (
            <p className="article-rail__eyebrow">Статья</p>
          )}
          <div className="article-rail__cta">
            <p>{ctaText}</p>
            <Link href={ctaHref} className="btn-primary mt-3 w-full text-center">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </aside>

      <div className="article-body">
        {coverSrc ? (
          <ArticleCover
            src={coverSrc}
            alt={coverAlt}
            orangeFrame={orangeFrame}
            variant={coverVariant}
          />
        ) : null}

        {toc.length > 0 ? (
          <nav className="article-toc-mobile" aria-label="Содержание">
            <p className="article-toc-mobile__title">Содержание</p>
            <ol className="article-toc-mobile__list">
              {toc.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    {String(index + 1).padStart(2, "0")}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {children}
      </div>
    </div>
  );
}
