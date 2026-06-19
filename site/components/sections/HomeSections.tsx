import Link from "next/link";

const advantages = [
  {
    title: "Контроль качества",
    text: "Многоступенчатый контроль на каждом этапе производства.",
  },
  {
    title: "Долговечность",
    text: "Стойкие покрытия для фасадов, интерьеров и террас.",
  },
  {
    title: "Экологичность",
    text: "Современные материалы и безопасные технологии нанесения.",
  },
  {
    title: "Автоматизация",
    text: "Покраска на станке с равномерным распылением.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <h2 className="section-title">Почему выбирают нас</h2>
        <p className="section-subtitle">
          Производство в Московской области с поставками по всей России.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const catalogPreview = [
  { slug: "krashenaja-doska", title: "Крашеная доска" },
  { slug: "vagonka", title: "Вагонка" },
  { slug: "imitacija-brusa", title: "Имитация бруса" },
  { slug: "planken", title: "Планкен" },
  { slug: "terrasnaja-doska", title: "Террасная доска" },
  { slug: "skandinavskaja-doska", title: "Скандинавская доска" },
];

export function CatalogPreviewSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Каталог продукции</h2>
            <p className="section-subtitle">Крашеные пиломатериалы для фасадов, интерьеров и террас.</p>
          </div>
          <Link href="/katalog/" className="btn-outline">
            Весь каталог
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalogPreview.map((item) => (
            <Link
              key={item.slug}
              href={`/katalog/${item.slug}/`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-brand/10 to-accent/20" />
              <h3 className="text-lg font-semibold group-hover:text-brand">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  { href: "/uslugi/pokraska-dereva-na-stanke-metodom-raspyleni/", title: "Покраска на станке" },
  { href: "/uslugi/", title: "Нанесение масла и воска" },
  { href: "/uslugi/", title: "Реставрация деревянных поверхностей" },
];

export function ServicesPreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <h2 className="section-title">Наши услуги</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-brand hover:bg-surface-muted"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="mt-4 inline-block text-sm font-medium text-brand">Подробнее →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const colors = ["KD-25", "KD-32", "KD-28", "KD-6", "KD-15"];

export function ColorsSection() {
  return (
    <section className="bg-brand py-16 text-white sm:py-20">
      <div className="container-content">
        <h2 className="section-title text-white">Эксклюзивные цвета</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          Фирменная палитра KD и стандартные каталоги RAL, NCS, BIOFA.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {colors.map((code) => (
            <span
              key={code}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold"
            >
              {code}
            </span>
          ))}
        </div>
        <Link href="/palitra/" className="btn-primary mt-8 bg-accent text-surface-dark hover:bg-accent-dark">
          Смотреть палитру
        </Link>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content rounded-3xl bg-surface-muted px-6 py-12 text-center sm:px-12">
        <h2 className="section-title">Остались вопросы?</h2>
        <p className="section-subtitle mx-auto">
          Оставьте заявку — мы перезвоним и поможем подобрать материал и цвет.
        </p>
        <Link href="/kontakty/" className="btn-primary mt-8">
          Заказать звонок
        </Link>
      </div>
    </section>
  );
}
