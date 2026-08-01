import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell } from "@/components/content/ArticleShell";

const TOC = [
  { id: "tri-podhoda", label: "Три подхода" },
  { id: "samostoyatelno", label: "Самостоятельно" },
  { id: "malyar", label: "Маляр" },
  { id: "zavod", label: "Производство" },
  { id: "sravnenie", label: "Что выгоднее" },
  { id: "sovety", label: "Советы" },
  { id: "vyvod", label: "Вывод" },
] as const;

function IconBrush({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20c2.5 0 4-1 5-2.5L17.5 9a2.1 2.1 0 0 0-3-3L7.5 13.5C6 14.5 5 16 5 18.5V20H4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 6.5 17.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconUser({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 19c1.4-3 3.4-4.5 6.5-4.5s5.1 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFactory({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 20V9l5 3V9l5 3V6h8v14H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 20v-3M11 20v-3M15 20v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function IconCross({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4 12 12M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconScale({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 6 5 9l3.5 6H12M12 6l7 3-3.5 6H12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconTip({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18h6M10 21h4M8 14a5 5 0 1 1 8 0c0 1.6-.8 2.5-1.6 3.3-.5.5-.9 1-1 1.7H10.6c-.1-.7-.5-1.2-1-1.7C8.8 16.5 8 15.6 8 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFlag({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 21V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 5h12l-2 3.5L17 12H5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function SectionDivider() {
  return (
    <div className="diy-divider" aria-hidden>
      <span className="diy-divider__line" />
      <span className="diy-divider__dot" />
      <span className="diy-divider__line" />
    </div>
  );
}

function SectionHeading({
  id,
  icon,
  children,
}: {
  id: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="diy-h2 scroll-mt-28">
      <span className="diy-h2__icon">{icon}</span>
      <span>{children}</span>
    </h2>
  );
}

function ProsCons({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="diy-proscons">
      <div className="diy-proscons__col diy-proscons__col--pros">
        <p className="diy-proscons__label">Плюсы</p>
        <ul>
          {pros.map((item) => (
            <li key={item}>
              <span className="diy-mark diy-mark--ok">
                <IconCheck />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="diy-proscons__col diy-proscons__col--cons">
        <p className="diy-proscons__label">Минусы</p>
        <ul>
          {cons.map((item) => (
            <li key={item}>
              <span className="diy-mark diy-mark--no">
                <IconCross />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ArticleFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="diy-figure">
      <div className="diy-figure__frame">
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 720px" className="object-cover" unoptimized />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type Props = {
  coverSrc: string;
  title: string;
};

export function DiyVsFactoryArticle({ coverSrc, title }: Props) {
  return (
    <ArticleShell
      coverSrc={coverSrc}
      coverAlt={title}
      orangeFrame
      toc={TOC.map((item) => ({ id: item.id, label: item.label }))}
    >
        <p className="diy-lead">
          Перед покраской пиломатериалов почти всегда встаёт один и тот же вопрос: сделать самому,
          нанять маляра или отдать доску на заводскую покраску. Ниже сравниваем затраты, плюсы и
          минусы каждого варианта на примере фасада среднего каркасного дома — около{" "}
          <strong>300&nbsp;м²</strong> обшивки.
        </p>
        <p className="diy-note">
          Цифры ориентировочные и зависят от породы древесины, профиля, схемы и региона. Для
          заводской покраски опираемся на актуальные тарифы производства в Истре — см. страницу{" "}
          <Link href="/shema-pokraski/">схем покраски и цен</Link>.
        </p>

        <SectionDivider />

        <SectionHeading id="tri-podhoda" icon={<IconScale />}>
          Три подхода к покраске
        </SectionHeading>
        <p>
          Каждый вариант решает свою задачу. Ниже — честный разбор по деньгам, срокам и качеству
          покрытия.
        </p>

        <div className="diy-approach-nav" aria-hidden>
          <a href="#samostoyatelno" className="diy-chip">
            <IconBrush /> Самостоятельно
          </a>
          <a href="#malyar" className="diy-chip">
            <IconUser /> Маляр
          </a>
          <a href="#zavod" className="diy-chip">
            <IconFactory /> Производство
          </a>
        </div>

        <SectionDivider />

        <section className="diy-block" id="samostoyatelno">
          <h3 className="diy-h3">
            <span className="diy-h3__badge">
              <IconBrush />
            </span>
            1. Самостоятельная покраска
          </h3>
          <ProsCons
            pros={[
              "полный контроль процесса;",
              "моральное удовлетворение — «сделал сам»;",
              "можно сменить оттенок по ходу, если запас краски позволяет.",
            ]}
            cons={[
              "много времени: от роликов и форумов до самой покраски и сушки;",
              "нужно самому подобрать грунт и ЛКМ под породу и задачу;",
              "на объекте сложно обеспечить чистые условия — пыль, сор, погода;",
              "риск порчи материала при ошибках в подготовке и нанесении;",
              "покупка инструментов, расходников и СИЗ;",
              "без опыта результат часто отличается от картинки в голове.",
            ]}
          />
          <p>
            Для оценки стоимости возьмём укрывную систему среднего сегмента для фасада: грунт и два
            слоя краски. В рознице ориентиры такие:
          </p>
          <ul className="diy-facts">
            <li>
              <span>Грунт</span>
              <strong>≈ 650–750&nbsp;₽/л</strong>
              <em>расход около 13&nbsp;м²/л</em>
            </li>
            <li>
              <span>Краска</span>
              <strong>≈ 1&nbsp;700–1&nbsp;900&nbsp;₽/л</strong>
              <em>около 7&nbsp;м²/л на слой</em>
            </li>
          </ul>
          <p>
            На 300&nbsp;м² это примерно <strong>23&nbsp;л грунта</strong> и{" "}
            <strong>около 86&nbsp;л краски</strong> (два слоя). Сумма ЛКМ выходит порядка{" "}
            <strong>170–185&nbsp;тыс.&nbsp;₽</strong>. Плюс кисти/валики или краскопульт, плёнка,
            стремянка, СИЗ и место под сушку штабелями — ещё несколько тысяч. Итого самостоятельная
            покраска «в лоб» — около <strong>180–200&nbsp;тыс.&nbsp;₽</strong> только за материалы и
            расходники, без учёта вашего времени.
          </p>
          <p>
            Важно: фактический расход выше «паспортного». Краскопульт даёт потери 15–40%, валик и
            кисть тоже добавляют. Ветер, влажность и пористая поверхность увеличивают расход.
            Подробнее о технологии — в материале{" "}
            <Link href="/tehnologija-nanesenija-kraski/">как красят древесину на производстве</Link>.
          </p>
          <ArticleFigure
            src="/uploads/2025/04/photo_2025-05-17_21-55-26.jpg"
            alt="Окрашенный деревянный фасад"
            caption="Фасадная доска после качественной окраски держит цвет и защищает древесину годами"
          />
        </section>

        <SectionDivider />

        <section className="diy-block" id="malyar">
          <h3 className="diy-h3">
            <span className="diy-h3__badge">
              <IconUser />
            </span>
            2. Наём профессионального маляра
          </h3>
          <ProsCons
            pros={[
              "выше качество и скорость, чем у новичка;",
              "экономия личного времени;",
              "помощь в выборе материалов под древесину и условия эксплуатации.",
            ]}
            cons={[
              "сложно найти надёжного исполнителя без рекомендаций;",
              "график мастера часто занят на недели вперёд;",
              "работа дороже самостоятельной покраски, возможны доплаты за выезд, логистику, мусор.",
            ]}
          />
          <p>
            По объявлениям в Московском регионе окраска деревянного фасада обычно укладывается в
            вилку <strong>150–800&nbsp;₽/м²</strong> за работу. Средняя ориентировочная ставка —
            около <strong>475&nbsp;₽/м²</strong> (грунт + два слоя без материалов). На 300&nbsp;м² это
            ≈ <strong>142&nbsp;500&nbsp;₽</strong> только за работу. С материалами и расходниками
            сумма легко выходит за <strong>320–350&nbsp;тыс.&nbsp;₽</strong>.
          </p>
          <ArticleFigure
            src="/uploads/2025/04/photo_2025-04-26_20-30-22.webp"
            alt="Готовая партия крашеной доски"
            caption="Готовая партия после линии — материал упакован и готов к монтажу"
          />
        </section>

        <SectionDivider />

        <section className="diy-block" id="zavod">
          <h3 className="diy-h3">
            <span className="diy-h3__badge">
              <IconFactory />
            </span>
            3. Заводская (станочная) покраска
          </h3>
          <ProsCons
            pros={[
              "экономия времени — материал приезжает готовым к монтажу;",
              "покраска и сушка в закрытом цеху, без пыли и дождя;",
              "ровная толщина слоя, без подтёков и «полос» от кисти;",
              "грунт и финиш по согласованной схеме, в том числе с четырёх сторон;",
              "предсказуемый срок службы и внешний вид;",
              "понятная цена за м².",
            ]}
            cons={[
              "нужно выбрать производство и согласовать схему/цвет;",
              "логистика: доска едет в цех и обратно на объект.",
            ]}
          />
          <p>
            На тарифе <strong>Стандарт</strong> (грунт Sirca с четырёх сторон + два финишных слоя)
            цена — <strong>650&nbsp;₽/м²</strong>. На 300&nbsp;м²:
          </p>
          <p className="diy-price">
            <span>650&nbsp;₽ × 300&nbsp;м²</span>
            <strong>195&nbsp;000&nbsp;₽</strong>
          </p>
          <p>
            В эту сумму входят консультация, выбор схемы и цвета, подготовка, нанесение, сушка в
            цеху и упаковка. Отдельные «сюрпризы» за валики и плёнку не вылезают. Срок службы
            покрытия по стандарту — до 10 лет. Если бюджет жёстче, есть тариф{" "}
            <strong>Оптима</strong> (585&nbsp;₽/м² → <strong>175&nbsp;500&nbsp;₽</strong> на тот же
            объём) и <strong>Эконом</strong> под докраску.
          </p>
          <p>
            Работаем на системах <strong>Sirca</strong> и маслах <strong>Talatu</strong>, колеруем в
            RAL, NCS и другие каталоги. Перед партией можем сделать выкрас на вашей доске — оттенки
            смотрите в <Link href="/katalog-tsvetov/">каталоге выкрасов</Link> и{" "}
            <Link href="/palitra/">палитре</Link>. По доставке —{" "}
            <Link href="/blog/dostavka-v-regiony/">в регионы</Link>; схемы — на странице{" "}
            <Link href="/shema-pokraski/">схем покраски</Link>.
          </p>
          <ArticleFigure
            src="/uploads/2026/05/krashenaja-skandinavskaja-doska.webp"
            alt="Крашеная скандинавская доска"
            caption="Пример готовой крашеной доски — цвет и фактура согласованы до запуска партии"
          />
        </section>

        <SectionDivider />

        <SectionHeading id="sravnenie" icon={<IconScale />}>
          Что же выгоднее?
        </SectionHeading>
        <p>Сводка по примеру 300&nbsp;м² фасада:</p>
        <div className="diy-compare">
          <div className="diy-compare__item">
            <span className="diy-compare__icon">
              <IconBrush />
            </span>
            <p className="diy-compare__title">Самостоятельно</p>
            <p className="diy-compare__price">180–200 тыс. ₽</p>
            <p className="diy-compare__meta">материалы + ваше время и риски</p>
          </div>
          <div className="diy-compare__item">
            <span className="diy-compare__icon">
              <IconUser />
            </span>
            <p className="diy-compare__title">Маляр</p>
            <p className="diy-compare__price">320–350 тыс. ₽</p>
            <p className="diy-compare__meta">работа и материалы на объекте</p>
          </div>
          <div className="diy-compare__item diy-compare__item--accent">
            <span className="diy-compare__icon">
              <IconFactory />
            </span>
            <p className="diy-compare__title">Производство</p>
            <p className="diy-compare__price">195 000 ₽</p>
            <p className="diy-compare__meta">Стандарт «под ключ»; Оптима от 175 500 ₽</p>
          </div>
        </div>
        <p>
          По деньгам станочная покраска конкурирует с самостоятельной и заметно выигрывает у найма
          маляра. По качеству и срокам завод обычно сильнее обоих: ровный слой, четыре стороны,
          сушка в цеху, материал готов к монтажу за считаные дни. Подробнее — на странице{" "}
          <Link href="/uslugi/pokraska-dereva-na-stanke-metodom-raspyleni/">
            покраски дерева на станке
          </Link>{" "}
          и в <Link href="/katalog/">каталоге продукции</Link>.
        </p>
        <p>
          Самостоятельный вариант имеет смысл при небольшом объёме, опыте, доступе к ЛКМ по оптовой
          цене и готовности соблюдать технологию. Большой фасад, потолки, партия вагонки или
          имитации бруса почти всегда выгоднее отдать на линию.
        </p>
        <ArticleFigure
          src="/uploads/2025/04/photo_2025-05-17_21-55-26-2.jpg"
          alt="Интерьер с крашеной древесиной"
          caption="В интерьере заводская покраска экономит недели ручной работы на высоте"
        />

        <SectionDivider />

        <SectionHeading id="sovety" icon={<IconTip />}>
          Практические советы
        </SectionHeading>
        <div className="diy-tips">
          <div className="diy-tip">
            <h3>Если красите сами</h3>
            <ul>
              <li>подготовьте поверхность: обеспыливание, шлифовка неровностей;</li>
              <li>выбирайте грунт и финиш под породу и задачу (фасад / интерьер / терраса);</li>
              <li>наносите тонкие слои по регламенту производителя, не «заливайте» доску;</li>
              <li>закладывайте запас времени на сушку и погоду.</li>
            </ul>
          </div>
          <div className="diy-tip">
            <h3>Если нанимаете мастера</h3>
            <ul>
              <li>берите рекомендации и отзывы из проверенных источников;</li>
              <li>зовите мастера на объект до старта — оценить объём и основание;</li>
              <li>фиксируйте сроки, схему, цвет и стоимость в договоре.</li>
            </ul>
          </div>
          <div className="diy-tip diy-tip--accent">
            <h3>Когда лучше заводская покраска</h3>
            <ul>
              <li>объём большой (фасад, партия погонажа, много потолочных панелей);</li>
              <li>нужны ровный цвет, одинаковая толщина слоя и срок службы по схеме;</li>
              <li>хотите сберечь время и получить доску, готовую к монтажу.</li>
            </ul>
          </div>
        </div>

        <SectionDivider />

        <SectionHeading id="vyvod" icon={<IconFlag />}>
          Короткий вывод
        </SectionHeading>
        <blockquote className="diy-quote">
          Для объёма уровня фасада дома заводская покраска чаще всего оказывается самым выгодным
          сочетанием цены, качества и сроков. Самостоятельная работа оправдана на малых объёмах;
          маляр на объекте — когда нужен ремонт «по месту», а не партия материала.
        </blockquote>
        <p>
          Нужен расчёт под ваш метраж и схему? <Link href="/#form">Оставьте заявку</Link> —
          подскажем тариф, цвет и срок. Схемы и цены — на странице{" "}
          <Link href="/shema-pokraski/">схем покраски</Link>, живые образцы — в{" "}
          <Link href="/katalog-tsvetov/">каталоге выкрасов</Link>.
        </p>
    </ArticleShell>
  );
}
