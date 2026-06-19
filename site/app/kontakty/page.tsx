import { PageHero } from "@/components/sections/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Контакты",
  description: "Контакты, адрес и форма обратной связи.",
  path: "/kontakty/",
});

export default function ContactsPage() {
  const { contacts } = getSiteSettings();

  return (
    <>
      <PageHero title="Контакты" description="Свяжитесь с нами для консультации и расчёта заказа." />
      <div className="container-content grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-4 text-neutral-700">
          <p>
            <span className="font-semibold text-surface-dark">Телефон: </span>
            {contacts.phones.join(", ")}
          </p>
          <p>
            <span className="font-semibold text-surface-dark">Email: </span>
            {contacts.email}
          </p>
          <p>
            <span className="font-semibold text-surface-dark">Адрес: </span>
            {contacts.address}
          </p>
          <p>
            <span className="font-semibold text-surface-dark">ИНН / КПП: </span>
            {contacts.inn} / {contacts.kpp}
          </p>
        </div>
        <form className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Заказать звонок</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm"
            />
            <button type="submit" className="btn-primary w-full">
              Отправить
            </button>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Отправка формы будет подключена на следующем этапе.
          </p>
        </form>
      </div>
    </>
  );
}
