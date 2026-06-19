"use client";

type ContactFormProps = {
  title?: string;
  submitLabel?: string;
  showTitle?: boolean;
};

export function ContactForm({
  title = "Заказать звонок",
  submitLabel = "Отправить",
  showTitle = false,
}: ContactFormProps) {
  return (
    <form
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
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
