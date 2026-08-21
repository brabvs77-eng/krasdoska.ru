import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Базовый robots.txt. Clean-param для Яндекса дописывается в postbuild
 * (scripts/patch-robots-yandex.mjs).
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteSettings().site.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
