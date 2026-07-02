"use client";

import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

export function Header() {
  const { site, navigation, contacts } = getSiteSettings();
  const phone = contacts.phones[0];
  const logo = "/logotype.svg";
  const digits = (phone ?? "").replace(/\D/g, "");
  const waNumber = digits.replace(/^8/, "7");

  const socials = [
    {
      label: "Telegram",
      href: "https://t.me/krashenayadoska",
      bg: "#2aabee",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.4 18.7 19.5c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.4 13.2 1.6 11.7c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.4Z" /></svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wtsp.cc/79168066363",
      bg: "#25d366",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.6-.1 1.2Z" /></svg>
      ),
    },
    {
      label: "Rutube",
      href: "https://rutube.ru/channel/47165294/",
      bg: "#ff0033",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6.5C4 5.1 5.1 4 6.5 4h11C18.9 4 20 5.1 20 6.5v11c0 1.4-1.1 2.5-2.5 2.5h-11C5.1 20 4 18.9 4 17.5v-11Zm5 1.8v7.4l6.4-3.7L9 8.3Z" /></svg>
      ),
    },
    {
      label: "Дзен",
      href: "https://dzen.ru/id/67b7053f13189028ae090969",
      bg: "#000000",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.2 5.2 1.1 7.4 2.9 8.9 1.4 1.2 3.4 1.7 7.1 1.9-3.7.2-5.7.7-7.1 1.9-1.8 1.5-2.7 3.7-2.9 9.3-.2-5.6-1.1-7.8-2.9-9.3-1.4-1.2-3.4-1.7-7.2-1.9 3.8-.2 5.8-.7 7.2-1.9C10.9 9.4 11.8 7.2 12 2Z" /></svg>
      ),
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white">
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {logo ? (
            <Image
              src={logo}
              alt={site.name}
              width={48}
              height={48}
              className="h-11 w-auto max-w-[180px] object-contain brightness-0 invert"
              unoptimized
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              KD
            </span>
          )}
          <span className="hidden text-lg font-bold sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Основное меню">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-85"
                style={{ backgroundColor: s.bg }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          {phone && (
            <a
              href={`tel:${digits}`}
              className="hidden text-sm font-semibold text-white lg:inline"
            >
              {phone}
            </a>
          )}
          <Link href="/#form" className="btn-primary hidden sm:inline-flex">
            Заказать звонок
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const { navigation } = getSiteSettings();

  return (
    <details className="relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white">
        Меню
      </summary>
      <nav
        className="absolute right-0 top-full mt-2 min-w-48 rounded-lg border border-neutral-200 bg-white p-2 text-surface-dark shadow-lg"
        aria-label="Мобильное меню"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-surface-muted hover:text-brand"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/#form"
          className="mt-1 block rounded-md px-3 py-2 text-sm font-semibold text-accent hover:bg-surface-muted"
        >
          Заказать звонок
        </Link>
      </nav>
    </details>
  );
}
