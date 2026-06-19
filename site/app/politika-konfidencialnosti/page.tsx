import { PageHero, PagePlaceholder } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Политика конфиденциальности",
  path: "/politika-konfidencialnosti/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Политика конфиденциальности" />
      <PagePlaceholder message="Текст политики будет перенесён из WordPress." />
    </>
  );
}
