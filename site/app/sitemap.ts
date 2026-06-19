import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site";

const staticRoutes = [
  "/",
  "/katalog/",
  "/uslugi/",
  "/palitra/",
  "/blog/",
  "/o-kompanii/",
  "/kontakty/",
  "/tehnologija-nanesenija-kraski/",
  "/politika-konfidencialnosti/",
  "/palitra/palitra-ral/",
  "/palitra/palitra-ncs/",
  "/palitra/palitra-cvetov-biofa/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteSettings().site.url.replace(/\/$/, "");

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
