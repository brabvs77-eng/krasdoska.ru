import type { BlogAuthor } from "@/lib/content";

type Props = {
  author: BlogAuthor;
  publishedLabel?: string;
};

export function ArticleAuthor({ author, publishedLabel }: Props) {
  return (
    <aside
      className="mb-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6"
      aria-label="Об авторе"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Автор</p>
      <p className="mt-2 text-lg font-semibold text-white">{author.name}</p>
      {author.role ? <p className="mt-1 text-sm text-white/70">{author.role}</p> : null}
      {author.bio ? <p className="mt-3 text-sm leading-relaxed text-white/75">{author.bio}</p> : null}
      {publishedLabel ? (
        <p className="mt-4 text-xs text-white/45">Опубликовано: {publishedLabel}</p>
      ) : null}
    </aside>
  );
}
