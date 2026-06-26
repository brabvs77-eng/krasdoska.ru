import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

export function Footer() {
  const { site, contacts, navigation } = getSiteSettings();
  const phone = contacts.phones[0] ?? "8 (800) 250-90-55";
  const phoneHref = `tel:${phone.replace(/\s|\(|\)|-/g, "")}`;

  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-dark text-neutral-300">
      <div className="container-content py-12">
        {/* Parity: верхняя строка — логотип слева + крупный телефон справа */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="text-xl font-bold text-white">{site.name}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">{site.description}</p>
          </div>
          <a
            href={phoneHref}
            className="text-3xl font-bold tracking-tight text-white transition hover:text-accent sm:text-4xl"
          >
            {phone}
          </a>
        </div>

        {/* Строка навигации */}
        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Контакты + реквизиты */}
        <div className="mt-8 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Контакты</p>
            <p className="mt-2">
              <a href={`mailto:${contacts.email}`} className="hover:text-white">
                {contacts.email}
              </a>
            </p>
            <p className="mt-1 leading-relaxed">{contacts.address}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Реквизиты</p>
            <p className="mt-2">
              ИНН {contacts.inn}
              <br />
              КПП {contacts.kpp}
            </p>
          </div>
          <div>
            <Link
              href="/politika-konfidencialnosti/"
              className="inline-block hover:text-white"
            >
              Политика конфиденциальности
            </Link>
          </div>
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
