import ChefStoryVideo from "./chef-story-video";
import EveningPlanRoute from "./evening-plan-route";
import MenuBook from "./menu-book";
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
    description: "Собрать близких за одним столом и спокойно поужинать. Меню составлю по вашим вкусам, приготовление и подачу возьму на себя. Вы сможете провести это время с теми, кого пригласили.",
    ...siteImages["private-dinner-wide-v2"],
    alt: "Евгений готовит блюдо на сковороде: видны лицо, руки и подача",
  },
  {
    id: "private-events", name: "Приватные мероприятия",
    description: "Для встреч, где главное — общение. Подберём угощение под такой ритм: закуски и блюда, которые удобно есть за разговором.",
    ...siteImages["private-events"],
    alt: "Евгений готовит блины на открытом воздухе перед гостями",
  },
  {
    id: "masterclasses", name: "Мастер-классы",
    description: "Для тех, кому интересно самим встать у плиты. Готовим вместе: я показываю приёмы, объясняю детали и помогаю разобраться в процессе. Затем пробуем приготовленное за общим столом.",
    ...siteImages.masterclasses,
    alt: "Участники мастер-класса наблюдают за работой Евгения",
  },
];

function StationHeading({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <div className="station-heading">
    <span className="route-node" data-route-node aria-hidden="true" />
    <span className="station-number" aria-hidden="true">{number}</span>
    <div className="station-copy"><h3>{title}</h3>{children}</div>
  </div>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Перейти к содержанию</a>
    <header className="site-header sheet" id="top">
      <a className="wordmark" href="#top" aria-label="Евгений Гребеник — начало страницы">Evgen Grebenik</a>
      <a className="header-action" href={instagramUrl} target="_blank" rel="noopener noreferrer">
        <span className="header-action-desktop">Обсудить вечер <span aria-hidden="true">↗</span></span>
        <span className="header-action-mobile">Instagram <span aria-hidden="true">↗</span></span>
        <small>Instagram @evg.chef</small>
      </a>
    </header>
    <main className="sheet" id="main-content" tabIndex={-1}>
      <section className="hero" aria-label="Евгений Гребеник — ваш личный Мастер-Шеф на Кипре">
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
            <div className="hero-copy"><h1><span>Евгений</span><span>Гребеник —</span><em>ваш личный</em><span>Мастер-Шеф</span><span>на Кипре</span></h1></div>
            <figure className="hero-portrait"><img {...siteImages["chef-hero-apron"]} sizes="(max-width: 620px) 56vw, 34vw" alt="Евгений Гребеник улыбается, стоя в полосатом поварском фартуке" fetchPriority="high" decoding="async" /></figure>
          </div>
        </div>
        <div className="award-proof">
          <img {...siteImages.masterchef} sizes="(max-width: 620px) 36vw, 23vw" alt="Евгений в белом кителе с конвертом на фоне эмблемы «МастерШеф»" loading="lazy" decoding="async" />
          <div className="award-copy">
            <p className="award-title">Больше <span className="numeric-spec">25</span> лет в гастрономии</p>
            <p className="award-note">Победа в «МастерШеф. Профессионалы» открыла мне путь к новым кухням Европы и Средиземноморья. Этот опыт стал основой моего стиля — современной европейской кухни с авторским характером.</p>
            <p className="award-note">Сегодня я готовлю на Кипре. Для частных ужинов и событий составляю персональные меню: кому-то хочется любимых, знакомых вкусов, кому-то — попробовать новое. На мастер-классах делюсь приёмами, которыми пользуюсь сам, и объясняю, что они меняют в блюде.</p>
          </div>
        </div>
      </section>
      <section className="formats" aria-labelledby="formats-title">
        <h2 id="formats-title"><span>Какой будет ваш вечер?</span></h2>
        <ul className="format-list">
          {formats.map(format => <li className={`format-row format-${format.id}`} key={format.id}>
            <figure className="format-image"><img src={format.src} srcSet={format.srcSet} sizes="(max-width: 620px) calc(100vw - 64px), (max-width: 900px) 540px, (max-width: 1460px) calc(45.25vw - 66px), 594px" alt={format.alt} width={format.width} height={format.height} loading="lazy" decoding="async" /></figure>
            <div className="format-caption">
              <h3><span>{format.name}</span></h3>
              <p>{format.description}</p>
            </div>
          </li>)}
        </ul>
      </section>
      <section className="evening-plan" aria-labelledby="plan-title">
        <h2 id="plan-title">От разговора — <span>к вашему столу</span></h2>
        <div className="process-board process-board-with-menu">
          <EveningPlanRoute />
          <ol className="process-list">
            <li className="process-station station-conversation" data-step="01">
              <StationHeading number="01" title="Знакомимся">
                <p>Расскажите, по какому поводу собираетесь и сколько будет гостей. Вспомним любимые блюда, обсудим, что хочется попробовать и чего точно не должно быть в меню.</p>
                <p>Можно прийти с готовой идеей. Можно начать с одного пожелания.</p>
              </StationHeading>
              <figure className="process-illustration conversation-illustration"><img {...siteImages.conversation} sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(63.35vw, 450px), min(36.64vw, 450px)" alt="Карандашный рисунок: Евгений с лёгкой улыбкой записывает пожелания гостьи в блокнот; на столе небольшая ваза с цветами и два стакана воды" loading="lazy" decoding="async" /></figure>
            </li>
            <li className="process-station station-menu" data-step="02" id="menu">
              <StationHeading number="02" title="Продумываю меню">
                <p>Из нашего разговора складывается меню. Я выбираю продукты и продумываю, какие блюда приготовить и как они будут сочетаться между собой.</p>
                <p>Внутри каждого блюда тоже есть свой замысел.</p>
              </StationHeading>
              <MenuBook />
            </li>
            <li className="process-station station-preparation" data-step="03">
              <StationHeading number="03" title="Готовлю к встрече">
                <p>Закупаю продукты и начинаю работу на кухне: делаю заготовки, готовлю соусы и маринады. То, что требует времени, готовлю заранее.</p>
              </StationHeading>
              <ChefStoryVideo />
            </li>
            <li className="process-station station-evening" data-step="04">
              <StationHeading number="04" title="Ваш вечер">
                <p>Вы встречаете гостей и садитесь за стол вместе с ними. Я готовлю и подаю блюда.</p>
                <p>На мастер-классе вы участвуете в приготовлении: работаем вместе, а потом вместе пробуем то, что получилось.</p>
              </StationHeading>
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
    <footer className="site-footer sheet"><a className="wordmark" href="#top">Evgen Grebenik</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram @evg.chef</a></footer>
  </>;
}
