"use client";

import { useState, type FormEvent } from "react";
import { trackMetrikaGoal } from "@/lib/analytics";

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

        trackMetrikaGoal("lead_form", { source: "endpoint" });
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
    trackMetrikaGoal("lead_form", { source: "mailto" });
    setSent(true);
    setSubmitting(false);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <p className="text-base font-medium text-white">Спасибо за заявку!</p>
        <p className="mt-2 text-sm text-white/70">
          {error ??
            "Если почтовый клиент не открылся автоматически, позвоните нам — мы на связи в рабочее время."}
        </p>
        <a href={phoneHref} className="btn-primary mt-6 inline-flex">
          Позвонить 8 (800) 250-90-55
        </a>
      </div>
    );
  }

  // Parity: поля и кнопка в одну строку, мелкие тексты под полями в две колонки
  const inputClass =
    "w-full border-0 border-b border-white/30 bg-transparent px-0 py-3 text-base text-white placeholder-white/50 outline-none transition-colors focus:border-accent disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit}>
      {showTitle && <h2 className="mb-6 text-lg font-semibold text-white">{title}</h2>}
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <input
          type="text"
          name="name"
          placeholder="Имя*"
          required
          disabled={submitting}
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон*"
          required
          disabled={submitting}
          className={inputClass}
        />
        <input
          type="text"
          name="message"
          placeholder="Сообщение"
          disabled={submitting}
          className={inputClass}
        />
        <button
          type="submit"
          className="btn-primary inline-flex shrink-0 items-center gap-2 justify-self-start lg:justify-self-end"
          disabled={submitting}
        >
          {submitting ? "Отправка…" : submitLabel}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </button>
      </div>
      <div className="mt-5 grid gap-x-6 gap-y-3 text-xs leading-snug text-white/60 sm:grid-cols-2 lg:max-w-3xl">
        <p>
          Заполните простую форму — мы свяжемся с вами и поможем подобрать подходящие решения.
        </p>
        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            name="consent"
            required
            disabled={submitting}
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
          />
          <span>
            Нажимая кнопку «Отправить», вы соглашаетесь на обработку персональных данных
          </span>
        </label>
      </div>
    </form>
  );
}
