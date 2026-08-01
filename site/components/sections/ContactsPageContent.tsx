import Image from "next/image";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACTS_QUESTIONS_BG, DELIVERY_TRUCK_IMAGE, WOOD_TEXTURE_BG } from "@/lib/media";
import { getSiteSettings } from "@/lib/site";

const PHONE_DISPLAY = "8 (800) 250-90-55";
const PHONE_HREF = "tel:88002509055";
const EMAIL = "krashenaya.doska@mail.ru";

const offices = [
  {
    title: "Центральный офис",
    address:
      "141031, Россия, Московская обл, г.о. Мытищи, п. Нагорное, ул. Центральная, д.3, стр.1, пом. №43",
    hours: "Пн–Пт 9:00–18:00",
    mapSrc:
      "https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=37.629368%2C55.901264&mode=search&oid=147741933843&ol=biz&z=17.13",
    mapTitle: "Крашеная доска — центральный офис на карте",
  },
  {
    title: "Производственный цех ООО «Крашеная доска»",
    address: "143502, Россия, Московская обл, г. Истра, ул. Центральная д.3А",
    hours: "Пн–Пт 9:00–18:00",
    mapSrc:
      "https://yandex.ru/map-widget/v1/?ll=36.840907%2C55.906078&mode=search&oid=98577705388&ol=biz&z=16.57",
    mapTitle: "Крашеная доска — производственный цех на карте",
  },
];

const deliveryFeatures = [
  {
    title: "Собственное производство",
    text: "Отгрузка готовой продукции напрямую с нашего производственного комплекса. Тщательно упаковываем каждую партию в защитную пленку для сохранности лакокрасочного покрытия.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    title: "Любые транспортные компании",
    text: "Сотрудничаем со всеми ведущими логистическими службами России. Подберем оптимальный вариант по скорости и стоимости доставки до вашего объекта.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
];

function ContactFact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{label}</p>
      <div className="mt-3 flex flex-1 items-center justify-center text-base leading-relaxed text-white">
        {children}
      </div>
    </div>
  );
}

export function ContactsPageContent() {
  const { integrations } = getSiteSettings();

  return (
    <>
      <PageHero
        title="Контакты"
        description="ООО «Крашеная доска» осуществляет доставку в регионы Москва, Санкт-Петербург, Сочи, Грозный, Казань."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
      />

      <div className="section-dark">
        {offices.map((office) => (
          <section key={office.title} className="py-12 sm:py-16">
            <div className="container-content">
              <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {office.title}
              </h2>
              <div className="mx-auto mt-3 h-px w-16 bg-accent" aria-hidden />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                <ContactFact label="Адрес">
                  <p className="text-sm sm:text-base">{office.address}</p>
                </ContactFact>
                <ContactFact label="Телефон">
                  <a
                    href={PHONE_HREF}
                    className="whitespace-nowrap font-semibold tabular-nums text-white hover:text-accent"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </ContactFact>
                <ContactFact label="Email">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-accent hover:text-white"
                  >
                    {EMAIL}
                  </a>
                </ContactFact>
                <ContactFact label="Режим работы">
                  <p className="font-semibold">{office.hours}</p>
                </ContactFact>
              </div>

              <div className="mt-8 overflow-hidden border border-white/10">
                <iframe
                  title={office.mapTitle}
                  src={office.mapSrc}
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        ))}

        <section className="py-12 sm:py-16">
          <div className="container-content">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Доставим крашеную доску в Москву и любую точку России
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-accent" aria-hidden />

            <div className="mt-10 overflow-hidden bg-accent">
              <div className="grid lg:grid-cols-2">
                <div className="grid gap-8 p-8 sm:grid-cols-2 sm:gap-10 sm:p-10 lg:p-12">
                  {deliveryFeatures.map((feature) => (
                    <div key={feature.title} className="text-center sm:text-left">
                      <div className="mx-auto inline-flex text-white sm:mx-0">{feature.icon}</div>
                      <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{feature.text}</p>
                    </div>
                  ))}
                </div>
                <div className="relative min-h-[240px]">
                  <Image
                    src={DELIVERY_TRUCK_IMAGE}
                    alt="Доставка крашеной доски"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/35 to-transparent lg:from-accent/80" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-white/65">
              *Стоимость и сроки доставки рассчитываются индивидуально согласно тарифам транспортных
              компаний и зависят от объема заказа (веса и кубатуры пиломатериалов).
            </p>
          </div>
        </section>

        <section id="form" className="relative overflow-hidden scroll-mt-24 py-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-8 right-0 hidden w-[32%] overflow-hidden bg-accent lg:block"
          >
            <Image
              src={WOOD_TEXTURE_BG}
              alt=""
              fill
              sizes="480px"
              className="object-cover opacity-40 mix-blend-multiply"
              unoptimized
            />
          </div>
          <div className="container-content relative">
            <div className="lg:max-w-[62%]">
              <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-left sm:text-3xl">
                Юридическая информация
              </h2>
              <div className="mx-auto mt-3 h-px w-16 bg-accent sm:mx-0" aria-hidden />
              <p className="mt-6 text-center text-lg font-medium text-white sm:text-left">
                ООО «Крашеная Доска»
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
                <ContactFact label="Адрес">
                  <p className="text-sm">
                    141031, Россия, Московская обл, г.о. Мытищи, п. Нагорное, ул. Центральная, д.3,
                    стр.1, пом. №43
                  </p>
                </ContactFact>
                <ContactFact label="ОГРН">
                  <p className="font-semibold tabular-nums">1247700371027</p>
                </ContactFact>
                <ContactFact label="ИНН / КПП">
                  <p className="font-semibold tabular-nums">9715482912 / 771501001</p>
                </ContactFact>
              </div>
            </div>

            <div className="relative z-10 mt-14 overflow-hidden border border-white/10 p-6 sm:p-10 lg:mr-[8%]">
              <Image
                src={CONTACTS_QUESTIONS_BG}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-right"
                unoptimized
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25"
              />
              <div className="relative z-10">
                <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Остались вопросы?
                </h2>
                <div className="mx-auto mt-3 h-px w-16 bg-accent" aria-hidden />
                <p className="mx-auto mt-5 max-w-xl text-center text-base text-white/75">
                  Заполните форму — свяжемся и поможем с выбором схемы, цвета и расчётом.
                </p>
                <div className="mx-auto mt-8 max-w-2xl">
                  <ContactForm
                    email={EMAIL}
                    phoneHref={PHONE_HREF}
                    formEndpoint={integrations.formEndpoint || undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
