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
  2, 5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42,
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
    drawingSrc: "/media/blueprint-backgrounds/private-event-circulation-concept-v3.png",
    compactDrawingSrc: "/media/blueprint-backgrounds/private-event-compact-mobile-v5.webp",
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
    processBackground: true,
  },
];

const chefJourneyStops = [
  {
    id: "spain",
    country: "Испания",
    dish: "Паэлья",
    src: "/media/masterchef/route-plates/01-paella-plate-v1-512.webp",
  },
  {
    id: "france",
    country: "Франция",
    dish: "Утка с соусом",
    src: "/media/masterchef/route-plates/02-duck-plate-v1-512.webp",
  },
  {
    id: "italy",
    country: "Италия",
    dish: "Равиоли",
    src: "/media/masterchef/route-plates/03-ravioli-plate-v1-512.webp",
  },
  {
    id: "greece",
    country: "Греция",
    dish: "Осьминог",
    src: "/media/masterchef/route-plates/04-octopus-plate-v1-512.webp",
  },
  {
    id: "turkey",
    country: "Турция",
    dish: "Фисташковая выпечка",
    src: "/media/masterchef/route-plates/05-baklava-plate-v1-512.webp",
  },
] as const;

const chefJourneyFlags = [
  { id: "spain", country: "Испания", x: 234, y: 386, src: "/media/masterchef/route-flags/spain.svg" },
  { id: "france", country: "Франция", x: 425, y: 190, src: "/media/masterchef/route-flags/france.svg" },
  { id: "italy", country: "Италия", x: 650, y: 159, src: "/media/masterchef/route-flags/italy.svg" },
  { id: "greece", country: "Греция", x: 1088, y: 454, src: "/media/masterchef/route-flags/greece.svg" },
  { id: "turkey", country: "Турция", x: 1275, y: 318, src: "/media/masterchef/route-flags/turkey.svg" },
  { id: "cyprus", country: "Кипр", x: 1430, y: 585, src: "/media/masterchef/route-flags/cyprus.svg" },
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

function EventFormats() {
  return (
    <div className="format-chapter">
      <ol className="format-list">
        {eventFormats.map((format, index) => (
          <li
            className={`format-row format-row-${index + 1}${format.processBackground ? " format-row-process" : ""}`}
            id={index === 0 ? "private-dinner" : undefined}
            key={format.name}
          >
            {format.processBackground ? (
              <div className="format-process-field">
                <picture className="format-process-plan">
                  <source media="(max-width: 940px)" srcSet={format.compactDrawingSrc} />
                  <img
                    src={format.drawingSrc ?? undefined}
                    width="1774"
                    height="887"
                    loading="lazy"
                    decoding="async"
                    alt=""
                  />
                </picture>
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
                        decoding="sync"
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
                  sizes="(max-width: 560px) calc(100vw - 36px), (max-width: 820px) 40vw, 38vw"
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
          <header className="section-intro story-intro">
            <p className="section-kicker">о шефе</p>
            <h2 id="story-title">
              От MasterChef
              <br />
              <em>к вашему столу.</em>
            </h2>
          </header>

          <div className="story-sequence" id="menu" aria-label="Победа MasterChef и форматы мероприятий">
            <div className="story-origin">
              <div className="story-origin-archive-field">
                <div className="story-origin-lead">
                  <figure className="story-award">
                    <img
                      src="/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg"
                      width="1719"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      alt="Евгений Грыбенюк после победы в МастерШеф. Профессионалы — 2 держит фирменный конверт победителя"
                    />
                    <figcaption>победа · MasterChef</figcaption>
                  </figure>
                  <div className="story-copy">
                    <p>
                      Победа в «МастерШеф. Профессионалы» открыла мне путь к новым кухням Европы
                      и Средиземноморья. Там я собирал рецепты и техники, которые сегодня
                      превращаю в частные ужины, мероприятия и мастер-классы на Кипре.
                    </p>
                    <p className="chef-journey-kicker" id="chef-journey-label">
                      маршрут вкусов · 5 стран / 5 блюд
                    </p>
                  </div>
                  <div
                    className="chef-journey"
                    role="group"
                    aria-labelledby="chef-journey-label"
                    aria-describedby="chef-journey-note"
                  >
                    <figure className="chef-journey-map">
                      <div className="chef-journey-canvas">
                        <div className="chef-journey-map-field">
                          <svg
                            className="chef-journey-map-layer"
                            viewBox="150 100 1450 600"
                            role="img"
                            aria-labelledby="chef-journey-map-title"
                          >
                            <title id="chef-journey-map-title">
                              Редакционная схема предполагаемого маршрута через Испанию, Францию,
                              Италию, Грецию и Турцию к Кипру; страны отмечены флагами
                            </title>
                            <image
                              href="/media/masterchef/culinary-archive/map-mediterranean-full-cc-by-sa.svg"
                              x="0"
                              y="0"
                              width="1754"
                              height="862"
                            />
                            <g className="chef-journey-route" aria-hidden="true">
                              <polyline points="234,386 425,190 650,159 1088,454 1275,318 1430,585" />
                            </g>
                          </svg>

                          <svg
                            className="chef-journey-flag-layer"
                            viewBox="150 100 1450 600"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            {chefJourneyFlags.map((flag) => (
                              <g data-country-flag={flag.id} key={flag.id}>
                                <rect
                                  className="chef-journey-flag-keyline"
                                  x={flag.x - 46}
                                  y={flag.y - 32}
                                  width="92"
                                  height="64"
                                />
                                <image
                                  className="chef-journey-flag-image"
                                  href={flag.src}
                                  x={flag.x - 42}
                                  y={flag.y - 28}
                                  width="84"
                                  height="56"
                                  preserveAspectRatio="xMidYMid slice"
                                />
                                <rect
                                  className="chef-journey-flag-outline"
                                  x={flag.x - 42}
                                  y={flag.y - 28}
                                  width="84"
                                  height="56"
                                />
                              </g>
                            ))}
                          </svg>

                          <div className="chef-journey-point-labels" aria-hidden="true">
                            {chefJourneyStops.map((stop) => (
                              <span className={`chef-journey-point chef-journey-point-${stop.id}`} key={stop.id}>
                                <i>{stop.country}</i>
                              </span>
                            ))}
                            <span className="chef-journey-point chef-journey-point-cyprus">
                              <i>Кипр</i>
                            </span>
                          </div>

                          <svg
                            className="chef-journey-leaders"
                            viewBox="150 100 1450 600"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <polyline data-leader="spain" points="234,386 260,430 324,568" />
                            <polyline data-leader="france" points="425,190 448,240 542,376" />
                            <polyline data-leader="italy" points="650,159 680,210 824,268" />
                            <polyline data-leader="greece" points="1088,454 1078,470 1006,568" />
                            <polyline data-leader="turkey" points="1275,318 1271,350 1339,430" />
                          </svg>

                          <ol
                            className="chef-journey-stops"
                            aria-label="Страны и блюда маршрута"
                          >
                            {chefJourneyStops.map((stop) => (
                              <li
                                className={`chef-journey-stop chef-journey-stop-${stop.id}`}
                                key={stop.id}
                              >
                                <figure>
                                  <span className="chef-journey-plate" aria-hidden="true">
                                    <img
                                      src={stop.src}
                                      width="512"
                                      height="512"
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
                        </div>
                      </div>
                      <figcaption className="chef-journey-meta">
                        <span className="chef-journey-credit">
                          карта ·{" "}
                          <a
                            href="https://commons.wikimedia.org/wiki/File:Mediterranean_Sea_location_map_(blank).svg"
                            target="_blank"
                            rel="noreferrer"
                          >
                            NordNordWest / Wikipedia
                          </a>{" "}
                          ·{" "}
                          <a
                            href="https://creativecommons.org/licenses/by-sa/3.0/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            CC BY-SA 3.0
                          </a>
                        </span>
                        <span className="chef-journey-note" id="chef-journey-note">
                          <strong>Кипр — авторское меню сегодня.</strong>{" "}
                          Блюда — фотореалистичные визуализации; маршрут требует подтверждения шефа.
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
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
