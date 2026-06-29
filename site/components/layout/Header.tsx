"use client";

import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

export function Header() {
  const { site, navigation, contacts } = getSiteSettings();
  const phone = contacts.phones[0];
  const logo = site.logo;

  return (
    <header className="sticky top-0 z-50 bg-brand text-white shadow-sm">
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {logo ? (
            <Image
              src={logo}
              alt={site.name}
              width={48}
              height={48}
              className="h-11 w-11 rounded-full object-contain"
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
          {phone && (
            <a
              href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
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
