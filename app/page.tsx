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

const eventFormats = [
  {
    name: "Частный ужин",
    description:
      "Я приготовлю любимые блюда для близких или создам гастрономический маршрут в семь подач.",
    src: "/media/event-formats/private-dinner.jpg",
    width: 1152,
    height: 1572,
    alt: "Евгений Грыбенюк готовит блюдо на сковороде для частного ужина",
  },
  {
    name: "Приватные мероприятия",
    description:
      "Я соберу свободный формат с небольшими закусками и блюдами, которые удобно есть за разговором.",
    src: "/media/event-formats/private-event-outdoor-crepes.png",
    width: 2278,
    height: 1510,
    alt: "Евгений Грыбенюк готовит блины перед гостями на приватном мероприятии",
  },
  {
    name: "Мастер-классы",
    description:
      "Я покажу гостям профессиональные приёмы, мы вместе приготовим блюда, а затем сядем за общий стол.",
    src: "/media/event-formats/masterclass.jpg",
    width: 1144,
    height: 770,
    alt: "Евгений Грыбенюк показывает участникам мастер-класса профессиональные приёмы",
  },
];

const sourceChapters = [
  {
    id: "source-meat-title",
    category: "Мясо",
    statement: "Хотите ягнёнка? — еду за ним в горы.",
    images: [
      {
        src: "/media/sourcing/evgen-half-lamb-market-v1.webp",
        width: 1448,
        height: 1086,
        alt: "Евгений Грыбенюк осматривает половину барана в мясной лавке",
      },
    ],
  },
  {
    id: "source-fish-title",
    category: "Рыба",
    statement: "Нужна рыба? — еду в порт к рыбакам.",
    images: [
      {
        src: "/media/sourcing/evgen-fish-harbour-market-v1.webp",
        width: 1448,
        height: 1086,
        alt: "Евгений Грыбенюк выбирает свежую рыбу у гавани",
      },
    ],
  },
  {
    id: "source-produce-title",
    category: "Овощи и фрукты",
    statement: "Свежие овощи и фрукты? — только с кипрских ферм.",
    images: [
      {
        src: "/media/sourcing/evgen-grape-harvest.webp",
        width: 1794,
        height: 1898,
        alt: "Евгений Грыбенюк с ящиком собранного винограда",
      },
    ],
  },
] as const;

function EventFormats() {
  return (
    <div className="format-chapter">
      <ol className="format-list">
        {eventFormats.map((format, index) => (
          <li className={`format-row format-row-${index + 1}`} key={format.name}>
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
          <div className="hero-copy">
            <h1 id="hero-title" aria-label="Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре">
              <span className="hero-name" aria-hidden="true">
                <span>Евгений</span>
                <span>Грыбенюк —</span>
              </span>
              <em aria-hidden="true">ваш личный</em>
              <span aria-hidden="true">Мастер-Шеф на Кипре</span>
            </h1>
          </div>
          <div className="hero-stage">
            <div className="hero-media hero-collage" aria-hidden="true">
              <div className="hero-collage-grid" aria-hidden="true">
                {heroCollageSources.map((src, index) => (
                  <span className="hero-collage-tile" key={src}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 560px) 12.5vw, (max-width: 820px) 8.34vw, (max-width: 1100px) 8vw, 7vw"
                      loading="eager"
                      fetchPriority={index < 12 ? "high" : "low"}
                      decoding="sync"
                    />
                  </span>
                ))}
              </div>
            </div>
            <figure className="hero-apron">
              <Image
                src="/media/chef-hero-apron.jpg"
                alt="Евгений Грыбенюк в форме шефа"
                fill
                sizes="(max-width: 820px) 62vw, 30vw"
                preload
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>частный шеф · Кипр</figcaption>
            </figure>
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
              <figure className="story-award">
                <img
                  src="/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg"
                  width="1719"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  alt="Евгений Грыбенюк после победы в МастерШеф. Профессионалы — 2 держит фирменный конверт победителя"
                />
              </figure>
              <div className="story-copy">
                <p>
                  Победа в «МастерШеф. Профессионалы» открыла мне путь к новым кухням Европы
                  и Средиземноморья, где я собирал рецепты, техники и сочетания для будущих
                  авторских блюд.
                </p>
                <p>
                  Теперь я провожу частные ужины, приватные мероприятия и мастер-классы и
                  превращаю этот опыт в ваш идеальный гастрономический вечер.
                </p>
              </div>
            </div>
            <EventFormats />
          </div>
        </section>

        <section className="present-day" aria-labelledby="present-title">
          <div className="story-present">
            <div className="story-present-copy">
              <h2 id="present-title">
                Я —
                <br />
                <em>у вас дома.</em>
              </h2>
              <ul aria-label="Мой рабочий день">
                <li><span>утро</span> закупаю продукты</li>
                <li><span>день</span> делаю заготовки, маринады и соусы</li>
                <li><span>вечер</span> готовлю у вас дома для вас и ваших гостей</li>
              </ul>
            </div>
            <figure className="story-film">
              <ChefStoryVideo />
            </figure>
          </div>
        </section>

        <section className="sources" id="products" aria-labelledby="sources-title">
          <header className="section-intro sources-intro">
            <div className="sources-heading">
              <p className="section-kicker">персональное меню</p>
              <h2 id="sources-title">
                Я не работаю по меню,
                <br />
                <em>я его создаю.</em>
              </h2>
              <p className="sources-lede">
                Расскажите мне о любимых вкусах и ограничениях, я соберу для вас персональное меню.
              </p>
            </div>
            <figure className="menu-dish">
              <img
                src="/media/optimized/gallery-dish.webp"
                width="512"
                height="640"
                loading="lazy"
                decoding="async"
                alt="Авторское блюдо Евгения Грыбенюка, вокруг которого выстроен персональный план меню"
              />
            </figure>
          </header>

          <div className="source-list">
            {sourceChapters.map((chapter, index) => (
              <article className={`source-row source-row-${index + 1}`} key={chapter.category} aria-labelledby={chapter.id}>
                <header className="source-copy">
                  <p>0{index + 1}</p>
                  <h3 id={chapter.id}>{chapter.category}</h3>
                  <blockquote>{chapter.statement}</blockquote>
                </header>
                <div className="source-images">
                  {chapter.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      alt={image.alt}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p className="section-kicker">ваш вечер</p>
          <h2 id="contact-title">
            Расскажите мне,
            <br />
            <em>чего хочется.</em>
          </h2>
          <figure className="contact-art" aria-hidden="true">
            <img
              src="/media/chef-story-brush-villa.png"
              width="1536"
              height="1024"
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
