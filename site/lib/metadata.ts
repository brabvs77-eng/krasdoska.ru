import type { Metadata } from "next";
import { absoluteUrl, getSiteSettings } from "./site";

type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function composeTitle(pageTitle: string | undefined, siteName: string): string {
  if (!pageTitle?.trim()) return siteName;
  const trimmed = pageTitle.trim();
  const lower = trimmed.toLowerCase();
  const siteLower = siteName.toLowerCase();
  if (
    lower === siteLower ||
    lower.endsWith(` | ${siteLower}`) ||
    lower.endsWith(` - ${siteLower}`)
  ) {
    return trimmed;
  }
  return `${trimmed} | ${siteName}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: PageMetaInput): Metadata {
  const settings = getSiteSettings();
  const pageTitle = composeTitle(title, settings.site.name);
  const pageDescription = description?.trim() || settings.site.description;
  const ogImage = absoluteUrl(image || settings.site.logo || "/uploads/2025/05/photo_2025-05-30_23-49-23.webp");

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(settings.site.url),
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: path,
      siteName: settings.site.name,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage, alt: settings.site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}
