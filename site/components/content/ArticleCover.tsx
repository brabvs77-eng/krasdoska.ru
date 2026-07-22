import Image from "next/image";

type ArticleCoverProps = {
  src: string;
  alt: string;
  /** Orange offset half-frame behind the cover (default true). */
  orangeFrame?: boolean;
  priority?: boolean;
};

export function ArticleCover({
  src,
  alt,
  orangeFrame = true,
  priority = true,
}: ArticleCoverProps) {
  return (
    <div className={`article-cover${orangeFrame ? " article-cover--framed" : ""}`}>
      {orangeFrame ? <div className="article-cover__accent" aria-hidden="true" /> : null}
      <div className="article-cover__media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          unoptimized
          priority={priority}
        />
      </div>
    </div>
  );
}
