import { HtmlContent } from "@/components/content/HtmlContent";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildPageMetadata } from "@/lib/metadata";
import { getPage } from "@/lib/content";
import { getSiteSettings } from "@/lib/site";

export async function generateMetadata() {
  const page = getPage("kontakty");
  return buildPageMetadata({
    title: page?.title ?? "Контакты",
    description: "Контакты, адреса офиса и производства, телефон и email.",
    path: "/kontakty/",
  });
}

export default function ContactsPage() {
  const page = getPage("kontakty");
  const { contacts } = getSiteSettings();

  return (
    <>
      <PageHero
        title={page?.title ?? "Контакты"}
        description="Свяжитесь с нами для консультации и расчёта заказа."
      />
      <div className="container-content grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-surface-muted p-6">
            <h2 className="text-lg font-semibold">Центральный офис</h2>
            <dl className="mt-4 space-y-3 text-sm text-neutral-700">
              <div>
                <dt className="font-medium text-neutral-900">Адрес</dt>
                <dd>{contacts.address}</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Телефон</dt>
                <dd>
                  <a href="tel:88002509055" className="text-brand hover:underline">
                    {contacts.phones[0]}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Email</dt>
                <dd>
                  <a href={`mailto:${contacts.email}`} className="text-brand hover:underline">
                    {contacts.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Режим работы</dt>
                <dd>Пн–Пт 9:00–18:00</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-surface-muted p-6">
            <h2 className="text-lg font-semibold">Производственный цех</h2>
            <p className="mt-4 text-sm text-neutral-700">
              143502, Россия, Московская обл., г. Истра, ул. Центральная, д.3А
            </p>
            <p className="mt-2 text-sm text-neutral-700">Пн–Пт 9:00–18:00</p>
          </section>

          {page?.content && (
            <article>
              <HtmlContent html={page.content} />
            </article>
          )}
        </div>

        <ContactForm showTitle />
      </div>
    </>
  );
}
