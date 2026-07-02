import Image from "next/image";
import { CtaSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { WOOD_TEXTURE_BG } from "@/lib/media";

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

export function ContactsPageContent() {
  return (
    <>
      <PageHero
        title="Контакты"
        description="ООО «Крашеная доска» осуществляет доставку в регионы Москва, Санкт-Петербург, Сочи, Грозный, Казань."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
      />

      <div className="section-dark">
        {/* Офисы + карты */}
        {offices.map((office) => (
          <section key={office.title} className="py-12 sm:py-16">
            <div className="container-content">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">{office.title}</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Адрес</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{office.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Телефон</h3>
                  <a href={PHONE_HREF} className="mt-2 block text-lg font-semibold text-white hover:text-accent">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Email</h3>
                  <a href={`mailto:${EMAIL}`} className="mt-2 block text-lg font-semibold text-white hover:text-accent">
                    {EMAIL}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Режим работы</h3>
                  <p className="mt-2 text-white/80">{office.hours}</p>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
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

        {/* Блок доставки */}
        <section className="py-12 sm:py-16">
          <div className="container-content">
            <div className="overflow-hidden rounded-2xl bg-accent">
              <div className="grid lg:grid-cols-[1.5fr_1fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    Доставим крашеную доску в Москву и любую точку России
                  </h2>
                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {deliveryFeatures.map((feature) => (
                      <div key={feature.title}>
                        <div className="text-white">{feature.icon}</div>
                        <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/90">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-10 text-sm leading-relaxed text-white/85">
                    *Стоимость и сроки доставки рассчитываются индивидуально согласно тарифам транспортных
                    компаний и зависят от объема заказа (веса и кубатуры пиломатериалов).
                  </p>
                </div>
                <div className="relative min-h-[220px]">
                  <Image
                    src={WOOD_TEXTURE_BG}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-accent/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Юридическая информация */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-1/2 hidden h-72 w-72 -translate-y-1/2 bg-accent lg:block"
          />
          <div className="container-content relative max-w-4xl">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Юридическая информация</h2>
            <p className="mt-6 text-lg font-medium text-white">ООО «Крашеная Доска»</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Адрес</h3>
                <p className="mt-2 text-base leading-relaxed text-white/80">
                  141031, Россия, Московская обл, г.о. Мытищи, п. Нагорное, ул. Центральная, д.3, стр.1, пом. №43
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">ОГРН</h3>
                <p className="mt-2 text-base text-white/80">1247700371027</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">ИНН/КПП</h3>
                <p className="mt-2 text-base text-white/80">9715482912 / 771501001</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaSection />
    </>
  );
}
