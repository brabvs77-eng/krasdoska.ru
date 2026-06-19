import { z } from "zod";

export const NavItemSchema = z.object({
  href: z.string(),
  label: z.string(),
});

export const SiteSettingsSchema = z.object({
  site: z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
  }),
  contacts: z.object({
    phones: z.array(z.string()),
    email: z.string().email(),
    address: z.string(),
    inn: z.string(),
    kpp: z.string(),
  }),
  integrations: z.object({
    yandexMetrikaId: z.string(),
    googleAnalyticsId: z.string(),
    marquizId: z.string(),
    formEndpoint: z.string().optional(),
  }),
  navigation: z.array(NavItemSchema),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

export const SeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const PageContentSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  seo: SeoSchema.optional(),
});

export type PageContent = z.infer<typeof PageContentSchema>;
