import type { MetadataRoute } from "next";
import {
  getBlogSlugs,
  getCatalogSlugs,
  getPaletteSlugs,
  getProjectSlugs,
  getServiceSlugs,
} from "@/lib/content";
import { getSiteSettings } from "@/lib/site";

export const dynamic = "force-static";

const staticRoutes = [
  "/",
  "/katalog/",
  "/uslugi/",
  "/palitra/",
  "/blog/",
  "/project/",
  "/o-kompanii/",
  "/kontakty/",
  "/tehnologija-nanesenija-kraski/",
  "/politika-konfidencialnosti/",
];

function routeEntry(base: string, path: string, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteSettings().site.url.replace(/\/$/, "");

  const routes = [
    ...staticRoutes,
    ...getCatalogSlugs().map((slug) => `/katalog/${slug}/`),
    ...getServiceSlugs().map((slug) => `/uslugi/${slug}/`),
    ...getPaletteSlugs().map((slug) => `/palitra/${slug}/`),
    ...getBlogSlugs().map((slug) => `/blog/${slug}/`),
    ...getProjectSlugs().map((slug) => `/project/${slug}/`),
  ];

  return routes.map((path) => routeEntry(base, path));
}
