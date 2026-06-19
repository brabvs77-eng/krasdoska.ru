"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "kd-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "accepted") {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"
      role="dialog"
      aria-label="Уведомление о cookie"
    >
      <p className="text-sm text-neutral-700">
        Мы используем cookie для аналитики и улучшения сайта. Продолжая пользоваться сайтом, вы
        соглашаетесь с{" "}
        <Link href="/politika-konfidencialnosti/" className="text-brand underline">
          политикой конфиденциальности
        </Link>
        .
      </p>
      <button
        type="button"
        className="btn-primary mt-3 w-full sm:w-auto"
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "accepted");
          setVisible(false);
        }}
      >
        Принять
      </button>
    </div>
  );
}
