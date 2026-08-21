import { absoluteUrl, getSiteSettings } from "./site";

export type SchemaBreadcrumbItem = {
  name: string;
  path?: string;
};

export type SchemaFaqItem = {
  question: string;
  answer: string;
};

export type CategoryProductSchemaInput = {
  name: string;
  description?: string;
  image?: string;
  path: string;
  priceFrom?: string;
  sku?: string;
};

export function parsePriceFromRub(text?: string): number | undefined {
  if (!text) return undefined;
  const match = text.replace(/\s/g, "").match(/(\d[\d.,]*)/);
  if (!match) return undefined;
  const value = Number.parseFloat(match[1].replace(",", "."));
  return Number.isFinite(value) ? Math.round(value) : undefined;
}

export function buildBreadcrumbListJsonLd(items: SchemaBreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildFaqPageJsonLd(items: SchemaFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildProductOffers(path: string, priceFrom?: string) {
  const { site } = getSiteSettings();
  const url = absoluteUrl(path);
  const lowPrice = parsePriceFromRub(priceFrom);

  const offers: Record<string, unknown> = {
    "@type": lowPrice ? "AggregateOffer" : "Offer",
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
    url,
    seller: { "@id": `${site.url}/#organization` },
  };

  if (lowPrice) {
    offers.lowPrice = lowPrice;
    offers.offerCount = 1;
  }

  return offers;
}

export function buildCategoryProductJsonLd(input: CategoryProductSchemaInput) {
  const { site } = getSiteSettings();
  const url = absoluteUrl(input.path);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.sku ? { sku: input.sku } : {}),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    manufacturer: { "@id": `${site.url}/#organization` },
    offers: buildProductOffers(input.path, input.priceFrom),
  };
}

export function buildOrganizationJsonLd() {
  const { site, contacts } = getSiteSettings();
  const phone = contacts.phones[0]?.replace(/[^\d+]/g, "") || undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: "ООО «Крашеная доска»",
    url: site.url,
    logo: absoluteUrl(site.logo || "/logotype.svg"),
    image: absoluteUrl(site.logo || "/logotype.svg"),
    description: site.description,
    email: contacts.email,
    telephone: phone ? `+${phone.replace(/^8/, "7")}` : undefined,
    taxID: contacts.inn,
    vatID: contacts.inn,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Центральная, д. 3, стр. 1, пом. №43",
      addressLocality: "п. Нагорное, г.о. Мытищи",
      addressRegion: "Московская область",
      postalCode: "141031",
      addressCountry: "RU",
    },
    department: [
      {
        "@type": "LocalBusiness",
        name: `${site.name} — производство`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Центральная, д. 3А",
          addressLocality: "Истра",
          addressRegion: "Московская область",
          postalCode: "143502",
          addressCountry: "RU",
        },
        telephone: phone ? `+${phone.replace(/^8/, "7")}` : undefined,
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "AdministrativeArea", name: "Московская область" },
      { "@type": "Country", name: "Россия" },
    ],
    sameAs: [],
  };
}

export function buildWebSiteJsonLd() {
  const { site } = getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "ru-RU",
    publisher: { "@id": `${site.url}/#organization` },
  };
}
