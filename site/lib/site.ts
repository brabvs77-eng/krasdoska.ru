import settings from "@/content/settings.json";
import { SiteSettingsSchema, type SiteSettings } from "./types";

let cached: SiteSettings | null = null;

export function getSiteSettings(): SiteSettings {
  if (!cached) {
    cached = SiteSettingsSchema.parse(settings);
  }
  return cached;
}

export function absoluteUrl(path: string): string {
  const base = getSiteSettings().site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
