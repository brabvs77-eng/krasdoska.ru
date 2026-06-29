import { ContactsPageContent } from "@/components/sections/ContactsPageContent";
import { buildPageMetadata } from "@/lib/metadata";
import { getPage } from "@/lib/content";

export async function generateMetadata() {
  const page = getPage("kontakty");
  return buildPageMetadata({
    title: page?.title ?? "Контакты",
    description: "Контакты, адрес офиса, телефон, email и карта проезда.",
    path: "/kontakty/",
  });
}

export default function ContactsPage() {
  return <ContactsPageContent />;
}
