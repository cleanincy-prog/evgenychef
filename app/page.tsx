import Image from "next/image";
import ChefStoryVideo from "./chef-story-video";
import EventFormatSheets, { type EventFormat } from "./event-format-sheets";

/* eslint-disable @next/next/no-img-element -- local documentary images use CSS-directed editorial crops */

const instagramUrl = "https://www.instagram.com/evg.chef/";

const heroCollageSources = [
  ...Array.from(
    { length: 40 },
    (_, index) => `/media/hero-instagram/hero-${String(index + 1).padStart(2, "0")}.webp`,
  ),
  "/media/optimized/instagram/instagram-01.webp",
  "/media/optimized/instagram/instagram-02.webp",
  "/media/optimized/instagram/instagram-04.webp",
  "/media/optimized/instagram/instagram-06.webp",
  "/media/optimized/instagram/instagram-07.webp",
  "/media/optimized/instagram/instagram-11.webp",
  "/media/optimized/instagram/instagram-12.webp",
  "/media/optimized/instagram/instagram-09.webp",
  "/media/optimized/instagram/instagram-08.webp",
  "/media/optimized/instagram/instagram-13.webp",
  "/media/optimized/instagram/instagram-14.webp",
  "/media/optimized/instagram/instagram-17.webp",
  "/media/optimized/instagram/instagram-18.webp",
  "/media/optimized/instagram/instagram-16.webp",
  "/media/optimized/instagram/instagram-27.webp",
  "/media/optimized/instagram/instagram-19.webp",
  "/media/optimized/instagram/instagram-20.webp",
  "/media/optimized/instagram/instagram-21.webp",
  "/media/optimized/instagram/instagram-23.webp",
  "/media/optimized/instagram/instagram-24.webp",
  "/media/optimized/instagram/instagram-26.webp",
  "/media/optimized/instagram/instagram-22.webp",
  "/media/optimized/hero-plating-poster.webp",
  "/media/optimized/instagram/instagram-29.webp",
  "/media/optimized/instagram/instagram-30.webp",
  "/media/optimized/instagram/instagram-32.webp",
  "/media/optimized/chef-portrait.webp",
  "/media/optimized/chef-environment-poster.webp",
  "/media/hero-collage/environment-chef.webp",
  "/media/optimized/instagram/instagram-28.webp",
  "/media/optimized/hero-film-still-01.webp",
  "/media/hero-collage/story-chef-prep.webp",
  "/media/hero-collage/story-cucumber-prep.webp",
  "/media/hero-collage/story-pepper-prep.webp",
  "/media/optimized/hero-film-still-04.webp",
  "/media/optimized/hero-film-still-09.webp",
  "/media/optimized/hero-film-still-11.webp",
  "/media/hero-collage/story-mussels-prep.webp",
  "/media/optimized/hero-film-still-02.webp",
  "/media/optimized/hero-film-still-03.webp",
  "/media/optimized/hero-film-still-05.webp",
  "/media/optimized/hero-film-still-06.webp",
  "/media/optimized/hero-film-still-07.webp",
  "/media/optimized/hero-film-still-08.webp",
  "/media/optimized/hero-film-still-10.webp",
  "/media/optimized/hero-film-still-13.webp",
  "/media/event-formats/private-dinner.jpg",
  "/media/event-formats/private-event-outdoor-crepes.png",
  "/media/optimized/gallery-cooking.webp",
  "/media/optimized/gallery-portrait.webp",
  "/media/event-formats/masterclass.jpg",
  "/media/optimized/gallery-dish.webp",
  "/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg",
  "/media/hero-collage/story-service-plating.webp",
];

const heroCollageWideDesktop = new Set([
  4, 5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42,
  45, 48, 52, 55, 58, 62, 66, 70, 74, 79, 84, 89, 93,
]);

const heroCollageWideCompact = new Set([
  1, 4, 7, 10, 13, 17, 20, 23, 26, 29, 33, 36, 39,
  42, 46, 49, 52, 55, 59, 63, 67, 71, 76, 81, 87, 92,
]);

const eventFormats = [
  {
    id: "private-dinner",
    kind: "dinner",
    name: "Частный ужин",
    description:
      "Я приготовлю любимые блюда для близких или создам гастрономический маршрут в семь подач.",
    src: "/media/event-formats/private-dinner.jpg",
    width: 1152,
    height: 1572,
    alt: "Евгений Грыбенюк готовит блюдо на сковороде для частного ужина",
  },
  {
    id: "private-events",
    kind: "canapes",
    name: "Приватные мероприятия",
    description:
      "Я соберу свободный формат с небольшими закусками и блюдами, которые удобно есть за разговором.",
    src: "/media/event-formats/private-event-outdoor-crepes.png",
    width: 2278,
    height: 1510,
    alt: "Евгений Грыбенюк готовит блины перед гостями на приватном мероприятии",
  },
  {
    id: "masterclasses",
    kind: "techniques",
    name: "Мастер-классы",
    description:
      "Я покажу гостям профессиональные приёмы, мы вместе приготовим блюда, а затем сядем за общий стол.",
    src: "/media/event-formats/masterclass.jpg",
    width: 1144,
    height: 770,
    alt: "Евгений Грыбенюк показывает участникам мастер-класса профессиональные приёмы",
  },
] satisfies EventFormat[];

const privateDinnerCourses = [
  "Стартер",
  "Холодная закуска",
  "Горячая закуска",
  "Рыбный курс",
  "Освежающая пауза",
  "Основное блюдо",
  "Десерт",
];

const chefJourneyStops = [
  {
    id: "spain",
    country: "Испания",
    dish: "Паэлья",
    src: "/media/masterchef/route-plates/01-paella-plate-v2-1024.webp",
  },
  {
    id: "france",
    country: "Франция",
    dish: "Утка с соусом",
    src: "/media/masterchef/route-plates/02-duck-plate-v2-1024.webp",
  },
  {
    id: "italy",
    country: "Италия",
    dish: "Равиоли",
    src: "/media/masterchef/route-plates/03-ravioli-plate-v2-1024.webp",
  },
  {
    id: "greece",
    country: "Греция",
    dish: "Осьминог",
    src: "/media/masterchef/route-plates/04-octopus-plate-v2-1024.webp",
  },
  {
    id: "turkey",
    country: "Турция",
    dish: "Фисташковая выпечка",
    src: "/media/masterchef/route-plates/05-baklava-plate-v2-1024.webp",
  },
] as const;

function PersonalMenuPlate() {
  return (
    <figure
      className="menu-plate-composition"
      aria-label="Четыре элемента композиции блюда: основной продукт, гарнир, текстуры и соус"
    >
      <div className="menu-plate-stage">
        <img
          className="menu-plate-photo"
          src="/media/menu/personal-menu-duck-plate-cutout-v1.webp"
          width="1800"
          height="1665"
          loading="lazy"
          decoding="async"
          alt="Белая тарелка с нарезанным мясом, гарниром, зеленью и соусами"
        />
        <svg
          className="menu-plate-leaders"
          viewBox="0 0 1200 820"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className="menu-plate-leaders-wide">
            <path d="M 230 205 H 280 L 625 420" />
            <path d="M 970 175 H 905 L 640 520" />
            <path d="M 990 390 H 915 L 816 455" />
            <path d="M 230 665 H 315 L 700 585" />
            <circle cx="625" cy="420" r="4" />
            <circle cx="640" cy="520" r="4" />
            <circle cx="816" cy="455" r="4" />
            <circle cx="700" cy="585" r="4" />
          </g>
          <g className="menu-plate-leaders-tablet">
            <path d="M 265 205 H 300 L 625 420" />
            <path d="M 935 300 H 880 L 640 520" />
            <path d="M 935 440 H 880 L 816 455" />
            <path d="M 265 665 H 315 L 700 585" />
            <circle cx="625" cy="420" r="4" />
            <circle cx="640" cy="520" r="4" />
            <circle cx="816" cy="455" r="4" />
            <circle cx="700" cy="585" r="4" />
          </g>
          <g className="menu-plate-leaders-phone">
            <path d="M 550 160 H 430 L 660 377" />
            <path d="M 650 185 H 725 L 670 430" />
            <path d="M 650 590 H 720 L 936 413" />
            <path d="M 550 600 H 480 L 700 480" />
            <circle cx="660" cy="377" r="4" />
            <circle cx="670" cy="430" r="4" />
            <circle cx="936" cy="413" r="4" />
            <circle cx="700" cy="480" r="4" />
          </g>
        </svg>
        <div className="menu-plate-note menu-plate-note-duck">
          <h3>Основной продукт</h3>
          <p>С него начинается подбор остальных элементов блюда.</p>
        </div>
        <div className="menu-plate-note menu-plate-note-vegetables">
          <h3>Гарнир</h3>
          <p>Дополняет основной продукт и поддерживает общее сочетание вкусов.</p>
        </div>
        <div className="menu-plate-note menu-plate-note-puree">
          <h3>Текстуры</h3>
          <p>Мягкие и плотные элементы создают контраст.</p>
        </div>
        <div className="menu-plate-note menu-plate-note-sauce">
          <h3>Соус</h3>
          <p>Связывает элементы блюда и добавляет завершающий акцент.</p>
        </div>
      </div>
    </figure>
  );
}

function EventFormats() {
  return <EventFormatSheets formats={eventFormats} courses={privateDinnerCourses} />;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        перейти к содержанию
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Evgen Grybenyk — начало страницы">
          Evgen Grybenyk
        </a>
        <a
          className="header-action"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Обсудить вечер в Instagram @evg.chef — откроется в новой вкладке"
        >
          <span className="header-action-copy">обсудить вечер <span aria-hidden="true">↗</span></span>
          <small className="header-action-channel">Instagram</small>
        </a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-stage">
            <div className="hero-media hero-collage" aria-hidden="true">
              <div className="hero-collage-grid" aria-hidden="true">
                {heroCollageSources.map((src, index) => {
                  const desktopWide = heroCollageWideDesktop.has(index);
                  const compactWide = heroCollageWideCompact.has(index);
                  const tileClassName = [
                    "hero-collage-tile",
                    desktopWide ? "hero-collage-tile--wide-desktop" : "",
                    compactWide ? "hero-collage-tile--wide-compact" : "",
                  ].filter(Boolean).join(" ");
                  const tileSizes = [
                    `(max-width: 560px) ${compactWide ? "25vw" : "12.5vw"}`,
                    `(max-width: 1100px) ${compactWide ? "16.7vw" : "8.34vw"}`,
                    desktopWide ? "20vw" : "10vw",
                  ].join(", ");

                  return (
                    <span className={tileClassName} key={src}>
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes={tileSizes}
                        loading="eager"
                        fetchPriority={index < 12 ? "high" : "low"}
                        decoding="async"
                      />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="hero-central-spread">
              <div className="hero-copy">
                <h1 id="hero-title" aria-label="Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре">
                  <span className="hero-name" aria-hidden="true">
                    <span>Евгений</span>
                    <span>Грыбенюк —</span>
                  </span>
                  <em aria-hidden="true">ваш личный</em>
                  <span className="hero-service" aria-hidden="true">
                    <span>Мастер-Шеф</span>
                    <span>на Кипре</span>
                  </span>
                </h1>
              </div>
              <figure className="hero-apron">
                <Image
                  src="/media/chef-hero-apron.jpg"
                  alt="Евгений Грыбенюк в форме шефа"
                  fill
                  sizes="(max-width: 560px) calc(100vw - 36px), (max-width: 820px) 40vw, (min-width: 1600px) 560px, 38vw"
                  preload
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption>частный шеф · Кипр</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="story" id="film" aria-labelledby="story-title">
          <div className="story-sequence" id="menu" aria-label="Победа MasterChef и форматы мероприятий">
            <div className="story-origin">
              <div className="story-origin-archive-field">
                <div className="story-origin-lead">
                  <div className="chef-journey-underlay" aria-hidden="true">
                    <picture>
                      <source
                        media="(max-width: 560px)"
                        srcSet="/media/blueprint-backgrounds/masterchef-route-underlay-v3-mobile.webp"
                      />
                      <source
                        media="(max-width: 900px)"
                        srcSet="/media/blueprint-backgrounds/masterchef-route-underlay-v3-tablet.webp"
                      />
                      <img
                        src="/media/blueprint-backgrounds/masterchef-route-underlay-v3-desktop.webp"
                        width="1774"
                        height="887"
                        loading="eager"
                        decoding="async"
                        alt=""
                      />
                    </picture>
                  </div>
                  <figure className="story-award">
                    <img
                      src="/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg"
                      width="1719"
                      height="900"
                      loading="eager"
                      decoding="async"
                      alt="Евгений Грыбенюк после победы в МастерШеф. Профессионалы — 2 держит фирменный конверт победителя"
                    />
                    <figcaption>победа · MasterChef</figcaption>
                  </figure>
                  <div className="story-copy">
                    <header className="section-intro story-intro">
                      <p className="section-kicker">о шефе</p>
                      <h2 id="story-title">
                        От MasterChef
                        <br />
                        <em>к вашему столу.</em>
                      </h2>
                    </header>
                    <div className="story-copy-body">
                      <p>
                        Я — победитель «МастерШеф. Профессионалы». Сегодня готовлю частные ужины
                        и меню для мероприятий, провожу мастер-классы на Кипре.
                      </p>
                      <p className="chef-journey-kicker" id="chef-journey-label">
                        кухни на карте · 5 стран / 5 блюд
                      </p>
                    </div>
                  </div>
                  <div
                    className="chef-journey"
                    role="group"
                    aria-labelledby="chef-journey-label"
                    aria-describedby="chef-journey-note"
                  >
                    <ol className="chef-journey-stops" aria-label="Пять кухонь и блюд">
                      {chefJourneyStops.map((stop) => (
                        <li
                          className={`chef-journey-stop chef-journey-stop-${stop.id}`}
                          key={stop.id}
                        >
                          <figure>
                            <span className="chef-journey-plate" aria-hidden="true">
                              <img
                                src={stop.src}
                                width="1024"
                                height="1024"
                                loading="lazy"
                                decoding="async"
                                alt=""
                              />
                            </span>
                            <figcaption>
                              <span>{stop.country}</span>
                              <strong>{stop.dish}</strong>
                            </figcaption>
                          </figure>
                        </li>
                      ))}
                    </ol>
                    <span className="chef-journey-cyprus" aria-hidden="true">Кипр</span>
                  </div>
                </div>
                <dl className="chef-journey-mobile-key" aria-hidden="true">
                  {chefJourneyStops.map((stop) => (
                    <div key={stop.id}>
                      <dt>{stop.country}</dt>
                      <dd>{stop.dish}</dd>
                    </div>
                  ))}
                </dl>
                <p className="chef-journey-meta">
                  <span className="chef-journey-credit">карта кухонь · иллюстрация</span>
                  <span className="chef-journey-note" id="chef-journey-note">
                    <strong>Кипр — авторское меню сегодня.</strong>{" "}
                    Карта и блюда — иллюстрации кухонь пяти стран.
                  </span>
                </p>
              </div>
            </div>
            <EventFormats />
          </div>
        </section>

        <section className="present-day" aria-labelledby="present-title">
          <div className="home-story">
            <header className="home-story-copy">
              <p className="section-kicker">частный ужин</p>
              <h2 id="present-title">
                Я —
                <br />
                <em>у вас дома.</em>
              </h2>
              <p className="home-story-lede">
                Подготовка начинается задолго до прихода гостей: я закупаю продукты,
                делаю заготовки, маринады и соусы. К вам приезжаю с готовым mise en place
                и беру на себя огонь и подачу. Вы встречаете гостей и остаётесь частью
                собственного вечера.
              </p>
              <p className="home-story-promise">
                Чтобы вы были дома —
                <br />
                <em>со своими.</em>
              </p>
            </header>

            <dl className="home-story-day" aria-label="Как проходит день частного ужина">
              <div>
                <dt>утро</dt>
                <dd>закупаю продукты</dd>
              </div>
              <div>
                <dt>день</dt>
                <dd>делаю заготовки, маринады и соусы</dd>
              </div>
              <div>
                <dt>вечер</dt>
                <dd>готовлю и подаю у вас дома</dd>
              </div>
            </dl>

            <figure className="home-story-film">
              <ChefStoryVideo />
              <figcaption>домашняя кухня · подготовка, огонь, подача</figcaption>
            </figure>
          </div>
        </section>

        <section className="sources" id="products" aria-labelledby="sources-title">
          <div className="personal-menu-shell">
            <header className="personal-menu-intro">
              <p className="section-kicker">персональное меню</p>
              <h2 id="sources-title">
                Меню появляется
                <br />
                <em>после разговора.</em>
              </h2>
              <p className="personal-menu-lede">
                Вы рассказываете, что любите, каким будет ваш вечер и что важно учесть. Я подбираю
                продукты, продумываю сочетания и создаю меню специально для вас.
              </p>
              <p className="personal-menu-lede personal-menu-lede-secondary">
                Каждое блюдо — это комбинация вкуса, текстур и сезонных продуктов. Я продумываю все
                элементы, чтобы они гармонично работали вместе и создавали цельное впечатление.
              </p>
            </header>

            <PersonalMenuPlate />

            <div className="personal-menu-action-row">
              <span aria-hidden="true" />
              <a
                className="personal-menu-action"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Обсудить меню в Instagram @evg.chef — откроется в новой вкладке"
              >
                обсудить меню
              </a>
              <span aria-hidden="true" />
            </div>
            <p className="personal-menu-channel">Instagram @evg.chef</p>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <a href="#top">Evgen Grybenyk</a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram @evg.chef — откроется в новой вкладке"
        >
          Instagram @evg.chef ↗
        </a>
      </footer>
    </>
  );
}
