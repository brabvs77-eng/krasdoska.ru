import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MarketingPageFooter } from "@/components/sections/MarketingPageFooter";
import { PageHero } from "@/components/sections/PageHero";
import { getSiteSettings } from "@/lib/site";

const YANDEX_MAP_SRC =
  "https://yandex.ru/map-widget/v1/?ll=37.984000%2C55.874000&z=15&pt=37.984000%2C55.874000%2Cpm2rdm";

export function ContactsPageContent() {
  const { site, contacts, integrations } = getSiteSettings();
  const phone = contacts.phones[0] ?? "8 (800) 250-90-55";
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref = `tel:${phoneDigits}`;

  return (
    <>
      <PageHero
        title="Контакты"
        description="Свяжитесь с нами для консультации и расчёта заказа. Доставка по Москве, области и регионам России."
      />

      <section className="section-dark py-12 sm:py-16">
        <div className="container-content">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Главная", href: "/" },
              { label: "Контакты" },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white">Центральный офис</h2>
                <p className="mt-3 text-base leading-relaxed text-white/80">{contacts.address}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Телефон</h3>
                  <a href={phoneHref} className="mt-2 block text-lg font-semibold text-white hover:text-accent">
                    {phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Email</h3>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="mt-2 block text-lg font-semibold text-white hover:text-accent"
                  >
                    {contacts.email}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Режим работы</h3>
                <p className="mt-2 text-white/80">Пн–Пт 9:00–18:00</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Реквизиты</h3>
                <p className="mt-2 text-white/80">
                  {site.name}
                  <br />
                  ИНН {contacts.inn} / КПП {contacts.kpp}
                </p>
              </div>

              <p className="text-sm text-white/65">
                ООО «Крашеная доска» осуществляет доставку в регионы: Москва, Санкт-Петербург, Сочи, Грозный, Казань и
                другие города России.
              </p>

              <Link
                href="https://yandex.ru/maps/org/krashenaya_doska/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light inline-flex"
              >
                Открыть на Яндекс.Картах
              </Link>
            </div>

            <ContactForm
              title="Написать нам"
              showTitle
              email={contacts.email}
              phoneHref={phoneHref}
              formEndpoint={integrations.formEndpoint || undefined}
            />
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Крашеная доска на карте"
              src={YANDEX_MAP_SRC}
              className="h-[420px] w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <MarketingPageFooter withFaq={false} />
    </>
  );
}
