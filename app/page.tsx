import Image from "next/image";
import ChefStoryVideo from "./chef-story-video";

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
    name: "Частный ужин",
    description:
      "Я приготовлю любимые блюда для близких или создам гастрономический маршрут в семь подач.",
    src: "/media/event-formats/private-dinner.jpg",
    width: 1152,
    height: 1572,
    alt: "Евгений Грыбенюк готовит блюдо на сковороде для частного ужина",
    drawingSrc: "/media/blueprint-backgrounds/private-dinner-event-concept-v3.png",
    compactDrawingSrc: "/media/blueprint-backgrounds/private-dinner-compact-mobile-v5.webp",
    courseImageSrc: "/media/event-formats/private-dinner-seven-plates-v1.jpg",
    canapeImageSrc: null,
    processBackground: true,
  },
  {
    name: "Приватные мероприятия",
    description:
      "Я соберу свободный формат с небольшими закусками и блюдами, которые удобно есть за разговором.",
    src: "/media/event-formats/private-event-outdoor-crepes.png",
    width: 2278,
    height: 1510,
    alt: "Евгений Грыбенюк готовит блины перед гостями на приватном мероприятии",
    drawingSrc: null,
    compactDrawingSrc: null,
    courseImageSrc: null,
    canapeImageSrc: "/media/event-formats/private-event-canapes-v1.webp",
    processBackground: true,
  },
  {
    name: "Мастер-классы",
    description:
      "Я покажу гостям профессиональные приёмы, мы вместе приготовим блюда, а затем сядем за общий стол.",
    src: "/media/event-formats/masterclass.jpg",
    width: 1144,
    height: 770,
    alt: "Евгений Грыбенюк показывает участникам мастер-класса профессиональные приёмы",
    drawingSrc: "/media/blueprint-backgrounds/masterclass-learning-concept-v3.png",
    compactDrawingSrc: "/media/blueprint-backgrounds/masterclass-compact-mobile-v5.webp",
    courseImageSrc: null,
    canapeImageSrc: null,
    processBackground: true,
  },
];

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

const sourceScenes = [
  {
    id: "meat",
    caption: "ягнёнок · горы",
    src: "/media/sourcing/evgen-half-lamb-market-v1.webp",
    width: 1448,
    height: 1086,
    alt: "Евгений Грыбенюк осматривает половину барана в мясной лавке",
  },
  {
    id: "fish",
    caption: "рыба · порт",
    src: "/media/sourcing/evgen-fish-harbour-market-v1.webp",
    width: 1448,
    height: 1086,
    alt: "Евгений Грыбенюк выбирает свежую рыбу у гавани",
  },
  {
    id: "produce",
    caption: "урожай · фермы Кипра",
    src: "/media/sourcing/evgen-grape-harvest.webp",
    width: 1794,
    height: 1898,
    alt: "Евгений Грыбенюк с ящиком собранного винограда",
  },
] as const;

function PersonalMenuPlate() {
  return (
    <figure className="menu-plate-composition" aria-labelledby="menu-plate-caption">
      <div className="menu-plate-stage">
        <img
          className="menu-plate-photo"
          src="/media/menu/personal-menu-duck-plate-cutout-v1.webp"
          width="1800"
          height="1665"
          loading="lazy"
          decoding="async"
          alt="Белая тарелка с нарезанным мясом, гарниром, зеленью и несколькими соусами"
        />
        <svg
          className="menu-plate-leaders"
          viewBox="0 0 1000 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 184 112 H 272 L 512 324" />
          <path d="M 816 166 H 746 L 608 194" />
          <path d="M 194 626 H 304 L 560 530" />
          <circle cx="512" cy="324" r="4" />
          <circle cx="608" cy="194" r="4" />
          <circle cx="560" cy="530" r="4" />
        </svg>
        <p className="menu-plate-note menu-plate-note-texture">
          баланс текстур
          <span>и температур</span>
        </p>
        <p className="menu-plate-note menu-plate-note-season">
          локальные продукты
          <span>· сезон</span>
        </p>
        <p className="menu-plate-note menu-plate-note-sauce">
          соус связывает
          <span>вкус и блюдо</span>
        </p>
      </div>
      <figcaption id="menu-plate-caption">пример композиции блюда</figcaption>
    </figure>
  );
}

function EventFormats() {
  return (
    <div className="format-chapter">
      <ol className="format-list">
        {eventFormats.map((format, index) => (
          <li
            className={`format-row format-row-${index + 1}${format.processBackground ? " format-row-process" : ""}${format.courseImageSrc ? " format-row-menu" : ""}${format.canapeImageSrc ? " format-row-canape" : ""}`}
            id={index === 0 ? "private-dinner" : undefined}
            key={format.name}
          >
            {format.processBackground ? (
              <div className="format-process-field">
                {format.courseImageSrc ? (
                  <span className="format-menu-drafting-lines" aria-hidden="true">
                    <span className="format-menu-drafting-frame" />
                    <span className="format-menu-drafting-rule format-menu-drafting-rule-top" />
                    <span className="format-menu-drafting-rule format-menu-drafting-rule-divider" />
                    <span className="format-menu-drafting-rule format-menu-drafting-rule-bottom" />
                    <span className="format-menu-drafting-spine" />
                  </span>
                ) : null}
                {format.canapeImageSrc ? (
                  <span className="format-event-drafting-lines" aria-hidden="true">
                    <span className="format-event-drafting-frame" />
                    <span className="format-event-drafting-rule format-event-drafting-rule-top" />
                    <span className="format-event-drafting-rule format-event-drafting-rule-divider" />
                    <span className="format-event-drafting-rule format-event-drafting-rule-bottom" />
                    <span className="format-event-drafting-spine" />
                  </span>
                ) : null}
                {!format.courseImageSrc && !format.canapeImageSrc ? (
                  <picture className="format-process-plan">
                    <source
                      media="(max-width: 940px)"
                      srcSet={format.compactDrawingSrc ?? undefined}
                    />
                    <img
                      src={format.drawingSrc ?? undefined}
                      width="1774"
                      height="887"
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                  </picture>
                ) : null}
                {format.courseImageSrc ? (
                  <>
                    <div className="format-dinner-meta" aria-hidden="true">
                      <span>Частный ужин</span>
                      <span>Семь подач</span>
                    </div>
                    <div className="format-dinner-axis" aria-hidden="true">
                      <span>— Готовит шеф</span>
                    </div>
                    <figure className="format-menu-spread">
                      <img
                        className="format-menu-overview"
                        src={format.courseImageSrc}
                        width="1200"
                        height="800"
                        loading="lazy"
                        decoding="async"
                        alt=""
                      />
                      <div className="format-menu-mobile">
                        <div className="format-course-group format-course-group-four">
                          <div className="format-course-strip" aria-hidden="true">
                            <img
                              src={format.courseImageSrc}
                              width="1200"
                              height="800"
                              loading="lazy"
                              decoding="async"
                              alt=""
                            />
                          </div>
                          <ol className="format-course-labels">
                            {privateDinnerCourses.slice(0, 4).map((course) => (
                              <li key={course}>{course}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="format-course-group format-course-group-three">
                          <div className="format-course-strip" aria-hidden="true">
                            <img
                              src={format.courseImageSrc}
                              width="1200"
                              height="800"
                              loading="lazy"
                              decoding="async"
                              alt=""
                            />
                          </div>
                          <ol className="format-course-labels" start={5}>
                            {privateDinnerCourses.slice(4).map((course) => (
                              <li key={course}>{course}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                      <figcaption className="format-menu-caption">
                        Семь подач: {privateDinnerCourses.join(", ")}.
                      </figcaption>
                    </figure>
                  </>
                ) : null}
                {format.canapeImageSrc ? (
                  <figure className="format-event-canape-spread" aria-hidden="true">
                    <img
                      src={format.canapeImageSrc}
                      width="1774"
                      height="887"
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                  </figure>
                ) : null}
                <figure className="format-media">
                  <img
                    src={format.src}
                    width={format.width}
                    height={format.height}
                    loading="lazy"
                    decoding="async"
                    alt={format.alt}
                  />
                </figure>
                <div className="format-copy">
                  <span aria-hidden="true">0{index + 1}</span>
                  <h3>
                    {format.courseImageSrc ? (
                      <>
                        Частный <br className="format-dinner-title-break" aria-hidden="true" /> ужин
                      </>
                    ) : (
                      format.name
                    )}
                  </h3>
                  <p>{format.description}</p>
                </div>
              </div>
            ) : (
              <>
                <figure className="format-media">
                  <img
                    src={format.src}
                    width={format.width}
                    height={format.height}
                    loading="lazy"
                    decoding="async"
                    alt={format.alt}
                  />
                </figure>
                <div className="format-copy">
                  <span aria-hidden="true">0{index + 1}</span>
                  <h3>{format.name}</h3>
                  <p>{format.description}</p>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
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
          обсудить вечер <span aria-hidden="true">↗</span>
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
                        Победа в «МастерШеф. Профессионалы» открыла мне путь к новым кухням Европы
                        и Средиземноморья. Там я собирал рецепты и техники, которые сегодня
                        превращаю в частные ужины, мероприятия и мастер-классы на Кипре.
                      </p>
                      <p className="chef-journey-kicker" id="chef-journey-label">
                        маршрут вкусов · 5 стран / 5 блюд
                      </p>
                    </div>
                  </div>
                  <div
                    className="chef-journey"
                    role="group"
                    aria-labelledby="chef-journey-label"
                    aria-describedby="chef-journey-note"
                  >
                    <ol className="chef-journey-stops" aria-label="Страны и блюда маршрута">
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
                <p className="chef-journey-meta">
                  <span className="chef-journey-credit">схема маршрута · визуализация</span>
                  <span className="chef-journey-note" id="chef-journey-note">
                    <strong>Кипр — авторское меню сегодня.</strong>{" "}
                    Блюда и маршрут — фотореалистичные визуализации; маршрут требует подтверждения шефа.
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
          <header className="section-intro sources-intro">
            <div className="sources-copy">
              <div className="sources-heading">
                <p className="section-kicker">персональное меню</p>
                <h2 id="sources-title">
                  Меню появляется
                  <br />
                  <em>после разговора.</em>
                </h2>
              </div>
              <div className="sources-story">
                <p className="sources-lede">
                  Вы рассказываете, что любите и что важно учесть. Я выбираю продукты под этот вечер —
                  и только потом собираю меню.
                </p>
                <ol className="source-sequence" aria-label="Как создаётся меню">
                  <li>ваш вкус</li>
                  <li>продукты</li>
                  <li>меню вечера</li>
                </ol>
              </div>
            </div>
            <PersonalMenuPlate />
          </header>

          <div className="source-gallery" role="group" aria-label="Выбор продуктов для персонального меню">
            {sourceScenes.map((scene) => (
              <figure className={`source-scene source-scene-${scene.id}`} key={scene.id}>
                <img
                  src={scene.src}
                  width={scene.width}
                  height={scene.height}
                  loading="lazy"
                  decoding="async"
                  alt={scene.alt}
                />
                <figcaption>{scene.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="source-provenance">
            Рыночные сцены — визуализации; сбор винограда — личный архив.
          </p>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p className="section-kicker">ваш вечер</p>
          <h2 id="contact-title">
            Расскажите мне,
            <br />
            <em>чего хочется.</em>
          </h2>
          <figure className="contact-reference-plan" aria-hidden="true">
            <img
              src="/media/blueprint-backgrounds/inquiry-spoon-reference-exact.png"
              width="417"
              height="157"
              loading="lazy"
              decoding="async"
              alt=""
            />
          </figure>
          <a
            className="contact-action"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Обсудить вечер в Instagram @evg.chef — откроется в новой вкладке"
          >
            <span>обсудить вечер</span>
            <span aria-hidden="true">Instagram @evg.chef ↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top">Evgen Grybenyk</a>
        <nav aria-label="Навигация в подвале">
          <a href="#contact">контакты</a>
        </nav>
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
