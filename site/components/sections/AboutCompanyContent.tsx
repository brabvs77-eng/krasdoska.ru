import Image from "next/image";
import type { ReactNode } from "react";

const PHOTO_ASPECT = "aspect-[4/5]";

function Divider() {
  return (
    <div className="about-divider" aria-hidden>
      <span className="about-divider__line" />
      <span className="about-divider__dot" />
      <span className="about-divider__line" />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  children,
  icon,
}: {
  eyebrow?: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <header className="about-heading">
      {icon ? <span className="about-heading__icon">{icon}</span> : null}
      {eyebrow ? <p className="about-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="about-heading__title">{children}</h2>
    </header>
  );
}

function IconTarget({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconEar({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 7a4 4 0 0 0-8 0v5a3 3 0 0 0 4.5 2.6L13 16.5A2.5 2.5 0 1 1 9.5 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPalette({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 0-4.6H12a1.2 1.2 0 1 1 0-2.4h4.5A9 9 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10.5" cy="7.2" r="1.1" fill="currentColor" />
      <circle cx="14.2" cy="7.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconShield({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9.5 12 1.8 1.8 3.5-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGear({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUsers({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c1.2-3 3.2-4.5 5.5-4.5S13.3 16 14.5 19M14 14.2c1.5-.4 3.1 0 4.5 1.3.9.8 1.5 1.9 1.9 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSand({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4h10M8 4l-2 8h12l-2-8M6 20h12M9 12v4M15 12v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBox({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 21V12M3 7.5 12 12l9-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconSpray({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="9" width="7" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9V7a2 2 0 0 1 2-2h1M16 6h2M16 9h3M16 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconDrop({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3s5 6.2 5 10a5 5 0 1 1-10 0c0-3.8 5-10 5-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBrush({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20c2.5 0 4-1 5-2.5L17.5 9a2.1 2.1 0 0 0-3-3L7.5 13.5C6 14.5 5 16 5 18.5V20H4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRestore({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12a8 8 0 1 0 2.3-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 5v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const missionPillars = [
  {
    title: "Слышим заказчика",
    text: "Девиз простой: услышать пожелания и подойти к каждому проекту как к уникальной задаче.",
    icon: <IconEar />,
  },
  {
    title: "Цвет как искусство",
    text: "Создаём увлекательный цвет дома — от консультации по палитре до финального оттенка на доске.",
    icon: <IconPalette />,
  },
  {
    title: "Защита древесины",
    text: "Покрытие — не только декор, но и защита от влаги, УФ и износа с учётом породы и условий.",
    icon: <IconShield />,
  },
  {
    title: "Технологии линии",
    text: "Современное оборудование и контроль на каждом этапе — от выкраса до упаковки партии.",
    icon: <IconGear />,
  },
];

const directors = [
  {
    name: "Орлов Павел Павлович",
    role: "генеральный директор",
    image: "/uploads/2025/04/frame-10-1.webp",
    reverse: false,
    isLead: true,
    paragraphs: [
      "ООО «Крашеная доска» предлагает профессиональный подход к каждому проекту. Мы изучаем особенности заказа: тип древесины, условия эксплуатации, пожелания клиента. Используем качественные материалы и современное оборудование. Гарантируем покрытие, которое прослужит много лет.",
      "Наша цель — не просто покрасить пиломатериалы. Мы создаем защитное и эстетическое покрытие, соответствующее требованиям заказчика.",
    ],
  },
  {
    name: "Андрей Сергеевич",
    role: "технический директор / художник-исследователь",
    image: "/uploads/2025/04/frame-10-2.webp",
    reverse: true,
    isLead: false,
    paragraphs: [
      "Он помогает создать широкую палитру оттенков. Обеспечивает нужные цветовые эффекты и качественное покрытие поверхности.",
      "Андрей изучает влияние цвета на восприятие и эмоции. Его знания позволяют находить уникальные решения и вдохновлять заказчиков новыми идеями.",
    ],
  },
];

const specialists = [
  {
    title: "Специалисты по шлифовке дерева",
    icon: <IconSand />,
    paragraphs: [
      "Шлифовка — важный этап обработки древесины. Она улучшает внешний вид и продлевает срок службы изделия.",
      "Наши мастера владеют разными техниками. Они умеют работать с различными инструментами. Благодаря опыту, они превращают дерево в настоящее произведение искусства.",
    ],
    images: [
      "/uploads/2025/06/photo_2025-06-23_18-02-45.webp",
      "/uploads/2025/04/5b9c1e92-ab35-4206-ad04-01c082afd167.webp",
      "/uploads/2025/04/ae415409-13d9-4736-8e78-5ce92aa7c9b8.webp",
    ],
  },
  {
    title: "Специалисты по упаковке пиломатериалов",
    icon: <IconBox />,
    paragraphs: [
      "Упаковка играет ключевую роль при подготовке к отгрузке. Мы сохраняем целостность материалов во время транспортировки. Также обеспечиваем защиту от внешних воздействий.",
      "Благодаря их работе, наша продукция доходит до клиента в идеальном состоянии. Это повышает уровень сервиса и репутацию компании.",
    ],
    images: ["/uploads/2025/04/frame-10-6.webp", "/uploads/2025/04/frame-53-3.webp"],
  },
  {
    title: "Специалисты покрасочного станка",
    icon: <IconSpray />,
    paragraphs: [
      "Покраска требует внимательности и точности. Наши операторы знают все технологии окраски древесины. Они профессионально подходят к своей работе. Эффективно выполняют задачи и обеспечивают высокое качество продукции.",
    ],
    images: [
      "/uploads/2025/04/8a349c47-7230-4089-be27-7f55e19973e0.webp",
      "/uploads/2025/04/frame-54-1.webp",
      "/uploads/2025/04/77ca590f-46ed-4078-b05f-406492ad1565.webp",
    ],
  },
  {
    title: "Специалист по грунтовке пиломатериалов",
    icon: <IconDrop />,
    paragraphs: [
      "Грунтование защищает древесину от влаги и вредителей. Мы используем составы, которые укрепляют структуру дерева и сохраняют его естественный вид.",
      "Правильно подобранные средства увеличивают срок службы изделий. Это делает их более устойчивыми к внешним воздействиям.",
    ],
    images: ["/uploads/2025/04/e19affb5-211b-4db5-85de-8242c974e3c4.webp"],
  },
];

const serviceScope = {
  intro:
    "«Крашеная доска» предлагает полный спектр услуг, направленных на преображение и защиту деревянных поверхностей. Независимо от того, нуждается ли фасад дома в обновлении цвета, или вы хотите придать новый вид деревянному полу — мы готовы предложить оптимальное решение.",
  items: [
    {
      term: "Покраска",
      icon: <IconBrush />,
      text: "Широкий выбор систем покрытия под задачу: подберём цвет и текстуру для интерьера или экстерьера.",
    },
    {
      term: "Реставрация",
      icon: <IconRestore />,
      text: "Бережно восстанавливаем деревянные изделия: снимаем старое покрытие, устраняем дефекты, возвращаем вид.",
    },
    {
      term: "Шлифовка",
      icon: <IconSand />,
      text: "Ровная база под покраску и лак — залог равномерного слоя и долговечного результата.",
    },
    {
      term: "Антисептики и антипирены",
      icon: <IconShield />,
      text: "Защита от гниения, плесени, грибка и возгорания современными составами.",
    },
  ],
};

const guarantees = [
  {
    term: "Индивидуальный подход",
    text: "Слушаем пожелания и предлагаем решение под задачу и бюджет.",
  },
  {
    term: "Высокое качество",
    text: "Проверенные материалы и технологии — долговечность и чистый вид покрытия.",
  },
  {
    term: "Профессионализм",
    text: "Команда опытных специалистов, которые постоянно развивают навыки.",
  },
  {
    term: "Соблюдение сроков",
    text: "Ценим время заказчика и держим оговоренные сроки.",
  },
  {
    term: "Гарантия на работы",
    text: "Уверены в результате и даём гарантию на выполненные работы.",
  },
];

function Photo({
  src,
  alt,
  sizes,
  framed = false,
  lead = false,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  framed?: boolean;
  lead?: boolean;
  priority?: boolean;
}) {
  const media = (
    <div
      className={`relative overflow-hidden bg-surface-muted ${
        lead ? "aspect-[3/4]" : PHOTO_ASPECT
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
        unoptimized
        priority={priority}
      />
    </div>
  );

  if (!framed && !lead) return media;

  return (
    <div className={`relative w-full ${lead ? "max-w-[340px] pb-4 pr-4" : "pb-3 pr-3"}`}>
      <div
        aria-hidden="true"
        className={`absolute bottom-0 right-0 bg-accent ${
          lead
            ? "h-[calc(100%-1rem)] w-[calc(100%-1rem)]"
            : "h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)]"
        }`}
      />
      {media}
    </div>
  );
}

export function AboutCompanyContent() {
  return (
    <div className="about-page section-dark">
      {/* Миссия */}
      <section className="py-14 sm:py-20">
        <div className="container-content">
          <SectionTitle eyebrow="ООО «Крашеная доска»" icon={<IconTarget />}>
            Наша миссия
          </SectionTitle>

          <p className="about-lead mt-8 max-w-3xl">
            Создавать увлекательный цвет вашего дома. Услышать заказчика. Превратить доску в готовое
            решение — красивое, защищённое и предсказуемое по качеству.
          </p>

          <Divider />

          <div className="about-pillars">
            {missionPillars.map((pillar) => (
              <article key={pillar.title} className="about-pillar">
                <span className="about-pillar__icon">{pillar.icon}</span>
                <h3 className="about-pillar__title">{pillar.title}</h3>
                <p className="about-pillar__text">{pillar.text}</p>
              </article>
            ))}
          </div>

          <Divider />

          <div className="about-mission-grid">
            <div className="about-mission-copy">
              <p>
                За каждым оттенком и слоем покрытия — работа команды: от консультации и подбора
                палитры до финальной инспекции партии. Используем качественные материалы, которые
                держат цвет и защищают древесину годами.
              </p>
              <p>
                Эстетика и функция идут вместе: подбираем схему под породу, задачу и условия
                эксплуатации. На линии — современное оборудование и ровный слой; перед запуском
                можем согласовать выкрас, чтобы исключить сюрпризы.
              </p>
              <p>
                Мастера постоянно повышают квалификацию. Для нас покраска — не финальный штрих, а
                вклад в уют и долговечность вашего дома.
              </p>
            </div>
            <blockquote className="about-quote">
              Доверьте нам мечту об идеальном цвете — и мы воплотим её в жизнь на производстве в
              Истре.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Команда + фото рядом с текстом */}
      <section className="py-14 sm:py-20">
        <div className="container-content">
          <SectionTitle eyebrow="Люди и производство" icon={<IconUsers />}>
            Наша команда профессионалов
          </SectionTitle>
          <Divider />
          <div className="about-split">
            <div className="about-split__media">
              <Photo
                src="/uploads/2025/04/frame-19-2.webp"
                alt="Коллекция окрашенных деревянных панелей"
                sizes="(max-width: 768px) 100vw, 360px"
                framed
              />
            </div>
            <div className="about-split__copy">
              <p className="about-lead about-lead--sm">
                Мы гордимся тем, что заказчики остаются довольны результатом, и продолжаем
                развиваться — внедряя новые технологии и подходы в покраске древесины любых пород.
              </p>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                На производстве в Истре работают шлифовщики, операторы линии, специалисты по
                грунтовке и упаковке. Каждый этап влияет на то, как доска выглядит и служит после
                монтажа.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Руководители */}
      <section className="py-14 sm:py-20">
        <div className="container-content">
          <SectionTitle>
            Вместе мы найдем Ваш <span className="text-accent">неповторимый стиль</span>
          </SectionTitle>
          <Divider />
          <div className="mt-4 space-y-16">
            {directors.map((person) => (
              <article
                key={person.name}
                className={`about-split ${person.reverse ? "about-split--reverse" : ""}`}
              >
                <div className="about-split__media">
                  <Photo
                    src={person.image}
                    alt={person.name}
                    sizes={person.isLead ? "340px" : "280px"}
                    lead={person.isLead}
                    framed={person.isLead}
                    priority={person.isLead}
                  />
                </div>
                <div className="about-split__copy">
                  <p className="about-role">{person.role}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {person.name}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {person.paragraphs.map((text) => (
                      <p key={text.slice(0, 40)} className="text-base leading-relaxed text-white/75">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Специалисты */}
      {specialists.map((group) => {
        const sideBySide = group.images.length <= 2;
        return (
          <section key={group.title} className="py-14 sm:py-20">
            <div className="container-content">
              <SectionTitle icon={group.icon}>{group.title}</SectionTitle>
              <Divider />

              {sideBySide ? (
                <div className="about-split">
                  <div className="about-split__copy">
                    <div className="space-y-4">
                      {group.paragraphs.map((text) => (
                        <p key={text.slice(0, 40)} className="text-base leading-relaxed text-white/75">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`about-split__media grid gap-4 ${
                      group.images.length === 2 ? "sm:grid-cols-2" : "max-w-[280px]"
                    }`}
                  >
                    {group.images.map((src) => (
                      <Photo
                        key={src}
                        src={src}
                        alt={group.title}
                        sizes="(max-width: 768px) 280px, 240px"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="max-w-3xl space-y-4">
                    {group.paragraphs.map((text) => (
                      <p key={text.slice(0, 40)} className="text-base leading-relaxed text-white/75">
                        {text}
                      </p>
                    ))}
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {group.images.map((src) => (
                      <div key={src} className="max-w-[280px] sm:max-w-none">
                        <Photo
                          src={src}
                          alt={group.title}
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 45vw, 280px"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* Услуги */}
      <section className="py-14 sm:py-20">
        <div className="container-content">
          <SectionTitle eyebrow="Что делаем" icon={<IconBrush />}>
            Широкий спектр услуг для сохранения красоты дерева
          </SectionTitle>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75">{serviceScope.intro}</p>
          <Divider />
          <div className="about-pillars about-pillars--services">
            {serviceScope.items.map((item) => (
              <article key={item.term} className="about-pillar">
                <span className="about-pillar__icon">{item.icon}</span>
                <h3 className="about-pillar__title">{item.term}</h3>
                <p className="about-pillar__text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="pb-14 sm:pb-20">
        <div className="container-content">
          <SectionTitle eyebrow="Доверие" icon={<IconCheck className="h-5 w-5" />}>
            Почему выбирают «Крашеную доску»?
          </SectionTitle>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75">
            Вы получаете не просто покраску, а комплексный подход к преображению дерева. Мы
            гарантируем:
          </p>
          <Divider />
          <ul className="about-guarantees">
            {guarantees.map((item) => (
              <li key={item.term}>
                <span className="about-guarantees__mark">
                  <IconCheck />
                </span>
                <div>
                  <p className="font-semibold text-white">{item.term}</p>
                  <p className="mt-1 text-base leading-relaxed text-white/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-white/75">
            ООО «Крашеная доска» — партнёр в покраске и защите древесины. Свяжитесь с нами — поможем
            с расчётом, схемой и цветом под ваш проект.
          </p>
        </div>
      </section>
    </div>
  );
}
