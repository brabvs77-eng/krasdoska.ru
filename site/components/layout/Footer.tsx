import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

export function Footer() {
  const { site, contacts, navigation } = getSiteSettings();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-surface-dark text-neutral-300">
      <div className="container-content grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{site.description}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Навигация</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Контакты</p>
          <ul className="mt-3 space-y-2 text-sm">
            {contacts.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contacts.email}`} className="hover:text-white">
                {contacts.email}
              </a>
            </li>
            <li>{contacts.address}</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Реквизиты</p>
          <p className="mt-3 text-sm">
            ИНН {contacts.inn}
            <br />
            КПП {contacts.kpp}
          </p>
          <Link
            href="/politika-konfidencialnosti/"
            className="mt-4 inline-block text-sm hover:text-white"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="container-content py-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {site.name}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
