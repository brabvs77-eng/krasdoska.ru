import type { Metadata } from "next";
import { getSiteSettings } from "./site";

type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
}: PageMetaInput): Metadata {
  const settings = getSiteSettings();
  const pageTitle = title
    ? `${title} | ${settings.site.name}`
    : settings.site.name;
  const pageDescription = description ?? settings.site.description;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(settings.site.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: path,
      siteName: settings.site.name,
      locale: "ru_RU",
      type: "website",
    },
  };
}
