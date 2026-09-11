import ChefStoryVideo from "./chef-story-video";
import EveningPlanRoute from "./evening-plan-route";
import PlateLeaders from "./plate-leaders";
import { heroImages, siteImages } from "./site-images";

/* eslint-disable @next/next/no-img-element -- original local media with source-specific editorial framing */

const instagramUrl = "https://www.instagram.com/evg.chef/";

// The approved 63 photographs use dedicated WebP thumbnails.
const heroCollageWideDesktop = new Set([
  4, 5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38,
  42, 45, 48, 52, 55,
]);

const heroCollageWideCompact = new Set([
  1, 4, 7, 10, 13, 17, 20, 23, 26, 29, 33, 36,
  39, 42, 46, 49, 52,
]);

const formats = [
  {
    id: "private-dinner", name: "Частный ужин",
    description: "Любимые блюда для близких или гастрономический маршрут в семь подач.",
    ...siteImages["private-dinner"],
    alt: "Евгений готовит блюдо на сковороде: видны лицо, руки и подача",
  },
  {
    id: "private-events", name: "Приватные мероприятия",
    description: "Небольшие закуски и блюда, которые удобно есть за разговором.",
    ...siteImages["private-events"],
    alt: "Евгений готовит блины на открытом воздухе перед гостями",
  },
  {
    id: "masterclasses", name: "Мастер-классы",
    description: "Готовим вместе, осваиваем приёмы и садимся за общий стол.",
    ...siteImages.masterclasses,
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
    <img className="menu-plate-photo" {...siteImages["duck-plate"]} sizes="(max-width: 620px) calc(100vw - 69px), (max-width: 900px) min(calc(90.5vw - 38px), 600px), min(29.29vw, 428px)" alt="Кремовая тарелка с уткой, гарниром и соусами" loading="lazy" decoding="async" />
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
              {heroImages.map((image, index) => <div
                className={[
                  "collage-tile",
                  heroCollageWideDesktop.has(index) ? "collage-tile--wide-desktop" : "",
                  heroCollageWideCompact.has(index) ? "collage-tile--wide-compact" : "",
                ].filter(Boolean).join(" ")}
                key={image.src}
              >
                <img {...image} sizes={`(max-width: 620px) ${heroCollageWideCompact.has(index) ? "25vw" : "12.5vw"}, (max-width: 1100px) ${heroCollageWideCompact.has(index) ? "20vw" : "10vw"}, ${heroCollageWideDesktop.has(index) ? "20vw" : "10vw"}`} alt="" loading="eager" decoding="async" fetchPriority="low" />
              </div>)}
            </div>
          </div>
          <div className="hero-identity">
            <div className="hero-copy"><h1><span>Евгений</span><span>Грыбенюк —</span><em>ваш личный</em><span>Мастер-Шеф</span><span>на Кипре</span></h1></div>
            <figure className="hero-portrait"><img {...siteImages["chef-hero-apron"]} sizes="(max-width: 620px) 56vw, 34vw" alt="Евгений Грыбенюк улыбается, стоя в полосатом поварском фартуке" fetchPriority="high" decoding="async" /></figure>
          </div>
        </div>
        <div className="award-proof">
          <img {...siteImages.masterchef} sizes="(max-width: 620px) 36vw, 23vw" alt="Евгений в белом кителе с конвертом на фоне эмблемы «МастерШеф»" loading="lazy" decoding="async" />
          <div className="award-copy">
            <p className="award-title">Победитель «МастерШеф. Профессионалы»</p>
            <p className="award-note">Больше 25 лет в гастрономии. Победа в «МастерШеф. Профессионалы» открыла мне путь к новым кухням Европы и Средиземноморья.</p>
            <p className="award-note">Этот опыт стал основой моего стиля — современной европейской кухни с авторским характером. Сегодня на Кипре создаю персональные меню для частных ужинов и особых событий, а на мастер-классах делюсь тонкостями своего ремесла. В каждом блюде — внимание к вашим вкусам, в каждой детали — забота об атмосфере вечера.</p>
          </div>
        </div>
      </section>
      <section className="formats" aria-labelledby="formats-title">
        <h2 id="formats-title">Какой будет ваш вечер?</h2>
        <ol className="format-list">
          {formats.map((format, index) => <li className={`format-row format-${format.id}`} key={format.id}>
            <span className="format-number" aria-hidden="true">0{index + 1}</span>
            <h3>{format.name}</h3><p>{format.description}</p>
            <figure className="format-image"><img src={format.src} srcSet={format.srcSet} sizes="(max-width: 620px) calc(100vw - 36px), 270px" alt={format.alt} width={format.width} height={format.height} loading="lazy" decoding="async" /></figure>
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
              <figure className="process-illustration conversation-illustration"><img {...siteImages.conversation} sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(63.35vw, 450px), min(36.64vw, 450px)" alt="Карандашный рисунок: Евгений с лёгкой улыбкой записывает пожелания гостьи в блокнот; на столе небольшая ваза с цветами и два стакана воды" loading="lazy" decoding="async" /></figure>
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
              <figure className="process-illustration toast-illustration"><img {...siteImages.toast} sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(67.88vw, 440px), min(38.07vw, 440px)" alt="Карандашная иллюстрация: гости поднимают бокалы за общим столом" loading="lazy" decoding="async" /></figure>
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
