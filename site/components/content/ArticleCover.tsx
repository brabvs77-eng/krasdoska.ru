import Image from "next/image";

type ArticleCoverProps = {
  src: string;
  alt: string;
  /** Orange offset half-frame behind the cover (default true). */
  orangeFrame?: boolean;
  /**
   * landscape — wide crop (default, most posts).
   * portrait — tall certificate/document photos as on the WP donor (e.g. /blog/brend/).
   */
  variant?: "landscape" | "portrait";
  priority?: boolean;
};

export function ArticleCover({
  src,
  alt,
  orangeFrame = true,
  variant = "landscape",
  priority = true,
}: ArticleCoverProps) {
  const isPortrait = variant === "portrait";

  return (
    <div
      className={`article-cover${orangeFrame ? " article-cover--framed" : ""}${
        isPortrait ? " article-cover--portrait" : ""
      }`}
    >
      {orangeFrame ? <div className="article-cover__accent" aria-hidden="true" /> : null}
      <div className={`article-cover__media${isPortrait ? " article-cover__media--portrait" : ""}`}>
        <Image
          src={src}
          alt={alt}
          title={alt}
          fill
          sizes={isPortrait ? "(max-width: 640px) 90vw, 420px" : "(max-width: 1024px) 100vw, 900px"}
          className={isPortrait ? "object-contain" : "object-cover"}
          unoptimized
          priority={priority}
        />
      </div>
    </div>
  );
}
