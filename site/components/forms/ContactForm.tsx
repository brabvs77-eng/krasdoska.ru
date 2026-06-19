"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  title?: string;
  submitLabel?: string;
  showTitle?: boolean;
  email?: string;
  phoneHref?: string;
};

export function ContactForm({
  title = "Заказать звонок",
  submitLabel = "Отправить",
  showTitle = false,
  email = "krashenaya.doska@mail.ru",
  phoneHref = "tel:88002509055",
}: ContactFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent("Заявка с сайта krashenayadoska.ru");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\nКомментарий: ${message || "—"}`,
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-base font-medium text-neutral-900">Спасибо за заявку!</p>
        <p className="mt-2 text-sm text-neutral-600">
          Если почтовый клиент не открылся автоматически, позвоните нам — мы на связи в рабочее время.
        </p>
        <a href={phoneHref} className="btn-primary mt-6 inline-flex">
          Позвонить 8 (800) 250-90-55
        </a>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      {showTitle && <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>}
      <div className={showTitle ? "mt-4 space-y-4" : "space-y-4"}>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1"
        />
        <textarea
          name="message"
          placeholder="Комментарий (необязательно)"
          rows={3}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1"
        />
        <button type="submit" className="btn-primary w-full">
          {submitLabel}
        </button>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Нажимая кнопку «Отправить», вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
