import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteSettings().site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
