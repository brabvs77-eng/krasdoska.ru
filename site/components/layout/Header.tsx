"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getSiteSettings } from "@/lib/site";

/** Official Rutube mark (letter R) — from Rutube favicon / Wikimedia Commons. */
function IconRutube({ className = "h-[15px] w-[15px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="26 33 80 66" fill="currentColor" aria-hidden>
      <path d="M81.536 62.987H42.539V47.555h38.997c2.278 0 3.862.397 4.657 1.09.795.694 1.287 1.98 1.287 3.858v5.541c0 1.979-.492 3.265-1.287 3.959-.795.693-2.379.99-4.657.99v-.006Zm2.676-29.981H26V99h16.539V77.529h30.479L87.48 99H106L90.055 77.429c5.878-.871 8.518-2.673 10.695-5.642 2.177-2.969 3.269-7.716 3.269-14.051v-4.948c0-3.758-.398-6.727-1.092-9.002-.694-2.276-1.88-4.255-3.565-6.033-1.78-1.683-3.761-2.868-6.14-3.662-2.378-.693-5.35-1.09-9.01-1.09v.006Z" />
    </svg>
  );
}

/** Official Max messenger mark — from max.ru / Wikimedia Commons logo. */
function IconMax({ className = "h-[17px] w-[17px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67m.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z"
      />
    </svg>
  );
}

export function Header() {
  const { site, navigation, contacts } = getSiteSettings();
  const phone = contacts.phones[0];
  const logo = "/logotype.svg";
  const digits = (phone ?? "").replace(/\D/g, "");

  const socials = [
    {
      label: "Telegram",
      href: "https://t.me/krashenayadoska",
      bg: "#2aabee",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.9 4.4 18.7 19.5c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.4 13.2 1.6 11.7c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.4Z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wtsp.cc/79168066363",
      bg: "#25d366",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.6-.1 1.2Z" />
        </svg>
      ),
    },
    {
      label: "Max",
      href: "https://max.ru/u/f9LHodD0cOLCogoIGNehtQjt7TsFEzu8ByAxiwnf2SyaAFNB5o3KRcpseIY",
      bg: "#4e3cf0",
      icon: <IconMax />,
    },
    {
      label: "Rutube",
      href: "https://rutube.ru/channel/47165294/",
      bg: "#100943",
      icon: <IconRutube />,
    },
    {
      label: "Дзен",
      href: "https://dzen.ru/id/67b7053f13189028ae090969",
      bg: "#000000",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2c.2 5.2 1.1 7.4 2.9 8.9 1.4 1.2 3.4 1.7 7.1 1.9-3.7.2-5.7.7-7.1 1.9-1.8 1.5-2.7 3.7-2.9 9.3-.2-5.6-1.1-7.8-2.9-9.3-1.4-1.2-3.4-1.7-7.2-1.9 3.8-.2 5.8-.7 7.2-1.9C10.9 9.4 11.8 7.2 12 2Z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white">
      <div className="container-content flex h-16 items-center gap-3 lg:h-20 lg:gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {logo ? (
            <Image
              src={logo}
              alt={site.name}
              width={48}
              height={48}
              className="h-10 w-auto max-w-[150px] object-contain brightness-0 invert lg:h-11 lg:max-w-[160px]"
              unoptimized
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              KD
            </span>
          )}
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-2.5 lg:flex xl:gap-x-4 2xl:gap-x-5"
          aria-label="Основное меню"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[12px] font-medium text-white/90 transition-colors hover:text-accent xl:text-[13px] 2xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contacts stay on one horizontal line — never wrap phone */}
        <div className="flex shrink-0 items-center gap-2 xl:gap-2.5">
          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition hover:opacity-85 xl:h-9 xl:w-9"
                style={{ backgroundColor: s.bg }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          {phone && (
            <a
              href={`tel:${digits}`}
              className="hidden whitespace-nowrap text-[13px] font-semibold tabular-nums tracking-tight text-white lg:inline xl:text-sm"
            >
              {phone}
            </a>
          )}
          <Link
            href="/#form"
            className="btn-primary hidden px-4 py-2.5 text-xs xl:inline-flex"
          >
            Заказать звонок
          </Link>
          <MobileNav phone={phone} phoneDigits={digits} socials={socials} />
        </div>
      </div>
    </header>
  );
}

type SocialItem = {
  label: string;
  href: string;
  bg: string;
  icon: ReactNode;
};

function MobileNav({
  phone,
  phoneDigits,
  socials,
}: {
  phone?: string;
  phoneDigits: string;
  socials: SocialItem[];
}) {
  const { navigation } = getSiteSettings();

  return (
    <details className="relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white">
        Меню
      </summary>
      <nav
        className="absolute right-0 top-full mt-2 min-w-56 rounded-lg border border-neutral-200 bg-white p-2 text-surface-dark shadow-lg"
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
        {phone && (
          <a
            href={`tel:${phoneDigits}`}
            className="mt-1 block whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold tabular-nums text-brand"
          >
            {phone}
          </a>
        )}
        <div className="mt-2 flex flex-wrap gap-2 px-2 pb-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: s.bg }}
            >
              {s.icon}
            </a>
          ))}
        </div>
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
