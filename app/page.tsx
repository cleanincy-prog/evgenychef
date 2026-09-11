import ChefStoryVideo from "./chef-story-video";
import EveningPlanRoute from "./evening-plan-route";
import PlateLeaders from "./plate-leaders";

/* eslint-disable @next/next/no-img-element -- original local media with source-specific editorial framing */

const instagramUrl = "https://www.instagram.com/evg.chef/";

// Full documentary collage from the approved Mise en place version.
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

const formats = [
  {
    id: "private-dinner", name: "Частный ужин",
    description: "Любимые блюда для близких или гастрономический маршрут в семь подач.",
    src: "/media/event-formats/private-dinner.jpg", width: 1152, height: 1572,
    alt: "Евгений готовит блюдо на сковороде: видны лицо, руки и подача",
  },
  {
    id: "private-events", name: "Приватные мероприятия",
    description: "Небольшие закуски и блюда, которые удобно есть за разговором.",
    src: "/media/event-formats/private-event-outdoor-crepes.png", width: 2278, height: 1510,
    alt: "Евгений готовит блины на открытом воздухе перед гостями",
  },
  {
    id: "masterclasses", name: "Мастер-классы",
    description: "Готовим вместе, осваиваем приёмы и садимся за общий стол.",
    src: "/media/event-formats/masterclass.jpg", width: 1144, height: 770,
    alt: "Участники мастер-класса наблюдают за работой Евгения",
  },
];

function StationHeading({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <div className="station-heading">
    <span className="route-node" data-route-node aria-hidden="true" />
    <span className="station-number" aria-hidden="true">{number}</span>
    <div className="station-copy"><h3>{title}</h3><p>{children}</p></div>
  </div>;
}

function MenuPlate() {
  return <figure className="menu-plate" aria-label="Композиция блюда: основной продукт, гарнир, текстуры и соус">
    <div className="plate-visual">
    <img className="menu-plate-photo" src="/media/menu/personal-menu-duck-plate-cream-v2.webp" alt="Кремовая тарелка с уткой, гарниром и соусами" width="1800" height="1665" loading="lazy" decoding="async" />
    </div>
    <PlateLeaders />
    <figcaption className="plate-notes"><dl className="plate-note-list">
      <div className="plate-label plate-label-main"><dt>Основной продукт</dt><dd>С него начинается подбор остальных элементов блюда.</dd></div>
      <div className="plate-label plate-label-side"><dt>Гарнир</dt><dd>Дополняет основной продукт и поддерживает общее сочетание вкусов.</dd></div>
      <div className="plate-label plate-label-texture"><dt>Текстуры</dt><dd>Мягкие и плотные элементы создают контраст.</dd></div>
      <div className="plate-label plate-label-sauce"><dt>Соус</dt><dd>Связывает элементы блюда и добавляет завершающий акцент.</dd></div>
    </dl></figcaption>
  </figure>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Перейти к содержанию</a>
    <header className="site-header sheet" id="top">
      <a className="wordmark" href="#top" aria-label="Евгений Грыбенюк — начало страницы">Evgen Grybenyk</a>
      <a className="header-action" href={instagramUrl} target="_blank" rel="noopener noreferrer">
        <span className="header-action-desktop">Обсудить вечер <span aria-hidden="true">↗</span></span>
        <span className="header-action-mobile">Instagram <span aria-hidden="true">↗</span></span>
        <small>Instagram @evg.chef</small>
      </a>
    </header>
    <main className="sheet" id="main-content" tabIndex={-1}>
      <section className="hero" aria-label="Евгений Грыбенюк — ваш личный Мастер-Шеф на Кипре">
        <div className="hero-frame">
          <div className="hero-collage" aria-hidden="true">
            <div className="hero-collage-grid">
              {heroCollageSources.map((src, index) => <div
                className={[
                  "collage-tile",
                  heroCollageWideDesktop.has(index) ? "collage-tile--wide-desktop" : "",
                  heroCollageWideCompact.has(index) ? "collage-tile--wide-compact" : "",
                ].filter(Boolean).join(" ")}
                key={src}
              >
                <img src={src} alt="" width="240" height="180" loading="eager" decoding="async" fetchPriority="low" />
              </div>)}
            </div>
          </div>
          <div className="hero-identity">
            <div className="hero-copy"><h1><span>Евгений</span><span>Грыбенюк —</span><em>ваш личный</em><span>Мастер-Шеф</span><span>на Кипре</span></h1></div>
            <figure className="hero-portrait"><img src="/media/chef-hero-apron.jpg" alt="Евгений Грыбенюк улыбается, стоя в полосатом поварском фартуке" width="576" height="1280" fetchPriority="high" decoding="async" /></figure>
          </div>
        </div>
        <div className="award-proof">
          <img src="/media/masterchef/evgen-grybenyk-winner-envelope-2020.jpg" alt="Евгений с наградой победителя «МастерШеф. Профессионалы»" width="1200" height="675" loading="eager" decoding="async" />
          <div><p className="award-title">Победитель «МастерШеф. Профессионалы»</p><p className="award-note">Частные ужины и мероприятия на Кипре.</p></div>
        </div>
      </section>
      <section className="formats" aria-labelledby="formats-title">
        <h2 id="formats-title">Какой будет ваш вечер?</h2>
        <ol className="format-list">
          {formats.map((format, index) => <li className={`format-row format-${format.id}`} key={format.id}>
            <span className="format-number" aria-hidden="true">0{index + 1}</span>
            <h3>{format.name}</h3><p>{format.description}</p>
            <figure className="format-image"><img src={format.src} alt={format.alt} width={format.width} height={format.height} loading="lazy" decoding="async" /></figure>
          </li>)}
        </ol>
      </section>
      <section className="evening-plan" aria-labelledby="plan-title">
        <h2 id="plan-title">От разговора — <span>к вашему столу.</span></h2>
        <div className="process-board">
          <EveningPlanRoute />
          <ol className="process-list">
            <li className="process-station station-conversation" data-step="01">
              <StationHeading number="01" title="Разговор">Вы рассказываете, что любите, каким будет вечер и что важно учесть.</StationHeading>
              <figure className="process-illustration conversation-illustration"><img src="/media/evening-plan/conversation-evgen-paper-flowers-v8.png" alt="Карандашный рисунок: Евгений с лёгкой улыбкой записывает пожелания гостьи в блокнот; на столе небольшая ваза с цветами и два стакана воды" width="1536" height="1024" loading="lazy" decoding="async" /></figure>
            </li>
            <li className="process-station station-menu" data-step="02">
              <StationHeading number="02" title="Меню">Я подбираю продукты, продумываю сочетания и составляю меню для вас.</StationHeading>
              <MenuPlate />
            </li>
            <li className="process-station station-preparation" data-step="03">
              <StationHeading number="03" title="Подготовка">Закупаю продукты, делаю заготовки, маринады и соусы.</StationHeading>
              <ChefStoryVideo />
            </li>
            <li className="process-station station-evening" data-step="04">
              <StationHeading number="04" title="Ваш вечер">Готовлю и подаю. Вы встречаете гостей и остаётесь частью собственного вечера.</StationHeading>
              <figure className="process-illustration toast-illustration"><img src="/media/evening-plan/toast-illustration.png" alt="Карандашная иллюстрация: гости поднимают бокалы за общим столом" width="1536" height="1024" loading="lazy" decoding="async" /></figure>
            </li>
          </ol>
        </div>
      </section>
      <section className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Начнём с вашего вечера.</h2>
        <div className="contact-action">
          <a className="instagram-button" href={instagramUrl} target="_blank" rel="noopener noreferrer">Написать в Instagram <span aria-hidden="true">↗</span></a>
          <p className="instagram-handle">@evg.chef</p>
          <p className="contact-help">В первом сообщении укажите дату, число гостей и формат.</p>
        </div>
      </section>
    </main>
    <footer className="site-footer sheet"><a className="wordmark" href="#top">Evgen Grybenyk</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram @evg.chef</a></footer>
  </>;
}
