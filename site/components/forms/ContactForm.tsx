"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  title?: string;
  submitLabel?: string;
  showTitle?: boolean;
  email?: string;
  phoneHref?: string;
  formEndpoint?: string;
};

export function ContactForm({
  title = "Заказать звонок",
  submitLabel = "Отправить",
  showTitle = false,
  email = "krashenaya.doska@mail.ru",
  phoneHref = "tel:88002509055",
  formEndpoint,
}: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openMailto = (name: string, phone: string, message: string) => {
    const subject = encodeURIComponent("Заявка с сайта krashenayadoska.ru");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\nКомментарий: ${message || "—"}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, phone, message }),
        });

        if (!response.ok) {
          throw new Error("form-submit-failed");
        }

        setSent(true);
        return;
      } catch {
        setError("Не удалось отправить заявку онлайн. Откроем почтовый клиент.");
        openMailto(name, phone, message);
        setSent(true);
        return;
      } finally {
        setSubmitting(false);
      }
    }

    openMailto(name, phone, message);
    setSent(true);
    setSubmitting(false);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-base font-medium text-neutral-900">Спасибо за заявку!</p>
        <p className="mt-2 text-sm text-neutral-600">
          {error ??
            "Если почтовый клиент не открылся автоматически, позвоните нам — мы на связи в рабочее время."}
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
          disabled={submitting}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1 disabled:opacity-60"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          disabled={submitting}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1 disabled:opacity-60"
        />
        <textarea
          name="message"
          placeholder="Комментарий (необязательно)"
          rows={3}
          disabled={submitting}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none ring-brand focus:border-brand focus:ring-1 disabled:opacity-60"
        />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Отправка…" : submitLabel}
        </button>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Нажимая кнопку «Отправить», вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
