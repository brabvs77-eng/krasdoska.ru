import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACTS_QUESTIONS_BG } from "@/lib/media";
import { getSiteSettings } from "@/lib/site";

type QuestionsCtaPanelProps = {
  className?: string;
};

/** Photo-backed «Остались вопросы?» panel (contacts design). */
export function QuestionsCtaPanel({ className = "" }: QuestionsCtaPanelProps) {
  const { contacts, integrations } = getSiteSettings();
  const phoneDigits = contacts.phones[0]?.replace(/\D/g, "") ?? "88002509055";
  const phoneHref = phoneDigits ? `tel:${phoneDigits}` : "tel:88002509055";

  return (
    <div
      className={`relative z-10 overflow-hidden border border-white/10 p-6 sm:p-10 ${className}`.trim()}
    >
      <Image
        src={CONTACTS_QUESTIONS_BG}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1100px"
        className="object-cover object-right"
        unoptimized
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25"
      />
      <div className="relative z-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Остались вопросы?
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-accent" aria-hidden />
        <p className="mx-auto mt-5 max-w-xl text-center text-base text-white/75">
          Заполните форму — свяжемся и поможем с выбором схемы, цвета и расчётом.
        </p>
        <div className="mx-auto mt-8 max-w-2xl">
          <ContactForm
            email={contacts.email}
            phoneHref={phoneHref}
            formEndpoint={integrations.formEndpoint || undefined}
          />
        </div>
      </div>
    </div>
  );
}

/** Standalone section used in marketing footers and the homepage. */
export function QuestionsCtaSection() {
  return (
    <section id="form" className="section-dark relative scroll-mt-24 py-16 sm:py-20">
      <div className="container-content">
        <QuestionsCtaPanel />
      </div>
    </section>
  );
}
