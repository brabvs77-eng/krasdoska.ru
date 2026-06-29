import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

export function Footer() {
  const { site, contacts, navigation } = getSiteSettings();
  const phone = contacts.phones[0] ?? "8 (800) 250-90-55";
  const phonePlain = phone.replace(/\s|\(|\)|-/g, "");
  const phoneHref = `tel:${phonePlain}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-dark text-neutral-300">
      <div className="container-content py-12">
        {/* Верхняя строка: логотип слева — крупный телефон + email справа + «Наверх» */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-3">
            {site.logo ? (
              <Image
                src={site.logo}
                alt={site.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-contain"
                unoptimized
              />
            ) : null}
            <div>
              <p className="text-xl font-bold tracking-tight text-white">{site.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">Готовое решение</p>
              <p className="mt-2 text-sm text-white/70">Спасибо, что выбираете нас</p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex flex-col items-start lg:items-end">
              <a
                href={phoneHref}
                className="whitespace-nowrap text-3xl font-bold tracking-tight text-white transition hover:text-accent sm:text-4xl"
              >
                {phonePlain}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="mt-1 whitespace-nowrap text-sm font-medium text-accent hover:text-white"
              >
                {contacts.email}
              </a>
            </div>
            <a
              href="#"
              aria-label="Наверх"
              className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
              <span className="mt-0.5 text-[11px] text-white/60">Наверх</span>
            </a>
          </div>
        </div>

        {/* Копирайт слева + навигация справа */}
        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-sm text-white/55">
            © {year} {site.name}. Все права защищены.
          </p>
          <nav className="flex max-w-xl flex-wrap gap-x-10 gap-y-4 lg:justify-end">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/85 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Юр. текст слева + виджет рейтинга справа */}
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[1fr_auto]">
          <p className="max-w-2xl text-sm leading-relaxed text-white/55">
            {year} © «{site.name}» — официальный сайт компании Крашеная Доска в Москве по продаже и
            покраске отделочных материалов из древесины. Сайт носит информационный характер и не
            является публичной офертой, определяемой положениями Ст. 437 ГК РФ. Для получения более
            точной информации обращайтесь по указанным в контактах телефонам.
          </p>
          <a
            href="https://yandex.ru/maps/org/krashenaya_doska/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-fit items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
            </span>
            <span>
              <span className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">4,8</span>
                <span className="text-sm tracking-tight text-amber-400">★★★★★</span>
              </span>
              <span className="text-xs text-white/55">Рейтинг организации в Яндексе</span>
            </span>
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <Link
            href="/politika-konfidencialnosti/"
            className="text-sm text-white/55 hover:text-white"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
