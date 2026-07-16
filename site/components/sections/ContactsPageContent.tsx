import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { DELIVERY_TRUCK_IMAGE, WOOD_TEXTURE_BG } from "@/lib/media";
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
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-white/60">{office.title}:</p>
                  <p className="mt-2 text-base leading-relaxed text-white">{office.address}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Телефон:</p>
                  <a href={PHONE_HREF} className="mt-2 block text-base text-white hover:text-accent">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-white/60">Email:</p>
                  <a href={`mailto:${EMAIL}`} className="mt-2 block text-base text-accent hover:text-accent-dark">
                    {EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-white/60">Режим работы</p>
                  <p className="mt-2 text-base text-white">{office.hours}</p>
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

        <section className="py-12 sm:py-16">
          <div className="container-content">
            <h2 className="section-title mb-8">
              Доставим крашеную доску в Москву и любую точку России
            </h2>
            <div className="overflow-hidden bg-accent">
              <div className="grid lg:grid-cols-[1.5fr_1fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {deliveryFeatures.map((feature) => (
                      <div key={feature.title}>
                        <div className="text-white">{feature.icon}</div>
                        <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/90">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[220px]">
                  <Image
                    src={DELIVERY_TRUCK_IMAGE}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/40 to-transparent" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/70">
              *Стоимость и сроки доставки рассчитываются индивидуально согласно тарифам транспортных
              компаний и зависят от объема заказа (веса и кубатуры пиломатериалов).
            </p>
          </div>
        </section>

        <section id="form" className="relative overflow-hidden scroll-mt-24 py-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-16 right-0 top-8 hidden w-[34%] overflow-hidden bg-accent lg:block"
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
            <div className="lg:max-w-[60%]">
              <h2 className="section-title">Юридическая информация</h2>
              <p className="mt-6 text-lg font-medium text-white">ООО «Крашеная Доска»</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-white/60">Адрес:</p>
                  <p className="mt-2 text-base leading-relaxed text-white">
                    141031, Россия, Московская обл, г.о. Мытищи, п. Нагорное, ул. Центральная, д.3, стр.1, пом. №43
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">ОГРН:</p>
                  <p className="mt-2 text-base text-white">1247700371027</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">ИНН/КПП:</p>
                  <p className="mt-2 text-base text-white">9715482912 / 771501001</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-14 bg-[#181410] p-6 sm:p-10 lg:mr-[10%]">
              <h2 className="section-title">Остались вопросы?</h2>
              <div className="mt-8">
                <ContactForm
                  email={EMAIL}
                  phoneHref={PHONE_HREF}
                  formEndpoint={integrations.formEndpoint || undefined}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
