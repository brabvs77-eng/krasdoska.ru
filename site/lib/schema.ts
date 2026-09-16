import type { FaqItem } from "./technology";
import { absoluteUrl, getSiteSettings } from "./site";

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

export function buildFaqPageJsonLd(faq: FaqItem[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(pagePath),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCatalogProductJsonLd({
  name,
  description,
  image,
  path,
  priceFrom,
}: {
  name: string;
  description?: string;
  image?: string;
  path: string;
  priceFrom?: string;
}) {
  const { site } = getSiteSettings();
  const priceMatch = priceFrom?.match(/(\d[\d\s]*)/);
  const lowPrice = priceMatch ? priceMatch[1].replace(/\s/g, "") : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? absoluteUrl(image) : undefined,
    url: absoluteUrl(path),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    manufacturer: { "@id": `${site.url}/#organization` },
    ...(lowPrice
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "RUB",
            lowPrice,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(path),
            seller: { "@id": `${site.url}/#organization` },
          },
        }
      : {}),
  };
}
