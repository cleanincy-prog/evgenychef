import ChefStoryVideo from "./chef-story-video";
import ConversationVideo from "./conversation-video";
import ChefSourcing from "./chef-sourcing";
import DishNotes from "./dish-notes";
import EveningPlanRoute from "./evening-plan-route";
import MenuWorktable from "./menu-worktable";
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
    lead: "Собрать близких за одним столом и спокойно поужинать.",
    description: "Меню составлю по вашим вкусам, приготовление и подачу возьму на себя, а вы сможете насладиться авторским ужином в 7 подач.",
    ...siteImages["private-dinner-wide-v2"],
    alt: "Евгений готовит блюдо на сковороде: видны лицо, руки и подача",
  },
  {
    id: "private-events", name: "Приватные мероприятия",
    lead: "Для встреч, где главное — общение.",
    description: "Подберу и приготовлю закуски и блюда, которые удобно есть за разговором.",
    ...siteImages["private-events"],
    alt: "Евгений готовит блины на открытом воздухе перед гостями",
  },
  {
    id: "masterclasses", name: "Мастер-классы",
    lead: "Для тех, кому интересно готовить самим.",
    description: "Готовим вместе: я показываю техники и приёмы, объясняю, что они меняют в блюде, и помогаю разобраться в процессах. Затем пробуем приготовленное за общим столом.",
    ...siteImages.masterclasses,
    alt: "Участники мастер-класса наблюдают за работой Евгения",
  },
];

function StationHeading({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="station-heading">
    <span className="route-node" data-route-node aria-hidden="true" />
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
      <section className="hero" aria-label="Евгений Гребеник — ваш частный Мастер-Шеф на Кипре">
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
            <div className="hero-copy">
              <h1><span>Евгений</span><span>Гребеник —</span><em>ваш частный</em><span>Мастер-Шеф</span><span>на Кипре</span></h1>
            </div>
            <figure className="hero-portrait"><img {...siteImages["chef-hero-apron"]} sizes="(max-width: 620px) 56vw, 34vw" alt="Евгений Гребеник улыбается, стоя в полосатом поварском фартуке" fetchPriority="high" decoding="async" /></figure>
          </div>
        </div>
      </section>
      <section className="award-proof" aria-label="Опыт шефа">
          <img {...siteImages.masterchef} sizes="(max-width: 620px) 36vw, 23vw" alt="Евгений в белом кителе с конвертом на фоне эмблемы «МастерШеф»" loading="lazy" decoding="async" />
          <div className="award-copy">
            <h2 className="award-title">Больше <span className="numeric-spec">25</span> лет в гастрономии и больше <span className="numeric-spec">20</span> лет работаю шеф-поваром</h2>
            <p className="award-note">В основе моей кухни — опыт лучших кулинарных школ Франции, Швейцарии и Германии, путь к которым мне открыла победа в «МастерШеф. Профессионалы». Полученные знания я переосмыслил в своей кухне — современной, европейской, с авторским характером. Сегодня на Кипре я готовлю для частных ужинов и приватных мероприятий, а на мастер-классах делюсь своим опытом и подходом к приготовлению.</p>
          </div>
      </section>
      <section className="formats" id="formats" aria-labelledby="formats-title">
        <h2 id="formats-title"><span>Какой будет ваш вечер?</span></h2>
        <ul className="format-list">
          {formats.map(format => <li className={`fmt format-${format.id}`} key={format.id}>
            <figure className="format-photo"><div className="format-image"><img src={format.src} srcSet={format.srcSet} sizes="(max-width: 760px) min(calc(95vw - 54px), 436px), min(calc(52.8vw - 20px), 1125px)" alt={format.alt} width={format.width} height={format.height} loading="lazy" decoding="async" /></div></figure>
            <div className="format-caption">
              <h3 className="fmt-name">{format.name}</h3>
              <p className="format-lead">{format.lead}</p>
              <p>{format.description}</p>
            </div>
          </li>)}
        </ul>
      </section>
      <ChefSourcing />
      <section className="evening-plan" aria-labelledby="plan-title">
        <h2 id="plan-title">От разговора — <span>к вашему столу</span></h2>
        <div className="process-board process-board-with-dish">
          <EveningPlanRoute />
          <ol className="process-list">
            <li className="process-station station-conversation" data-step="01">
              <StationHeading title="Знакомимся">
                <p>Расскажите, по какому поводу собираетесь. Вспомним любимые блюда, обсудим, что хочется попробовать и чего точно не должно быть в меню.</p>
                <p>Можно прийти с готовой идеей. Можно начать с одного пожелания.</p>
              </StationHeading>
              <ConversationVideo />
            </li>
            <li className="process-station station-menu" data-step="02" id="menu">
              <StationHeading title="Продумываю меню">
                <p>Из ваших пожеланий складывается меню. Я выбираю продукты и продумываю, как они будут сочетаться между собой.</p>
              </StationHeading>
              <MenuWorktable />
              <DishNotes />
            </li>
            <li className="process-station station-preparation" data-step="03">
              <StationHeading title="Готовлю к встрече">
                <p>Закупаю продукты и начинаю работу на вашей кухне: делаю заготовки, готовлю соусы и маринады. То, что требует времени, готовлю заранее.</p>
              </StationHeading>
              <ChefStoryVideo />
            </li>
            <li className="process-station station-evening" data-step="04">
              <StationHeading title="Ваш вечер">
                <p>Вы проводите время с гостями.</p>
                <p>Я готовлю и подаю блюда.</p>
              </StationHeading>
              <figure className="process-illustration toast-illustration"><img {...siteImages.toast} sizes="(max-width: 620px) calc(100vw - 70px), (max-width: 900px) min(67.88vw, 440px), (max-width: 1440px) min(38.07vw, 440px), min(30.56vw, 660px)" alt="Карандашная иллюстрация: гости поднимают бокалы за общим столом" loading="lazy" decoding="async" /></figure>
            </li>
          </ol>
        </div>
      </section>
      <section className="contact" aria-label="Связаться с Евгением">
        <div className="contact-action">
          <a className="instagram-button" href={instagramUrl} target="_blank" rel="noopener noreferrer">Написать в Instagram <span aria-hidden="true">↗</span></a>
          <p className="instagram-handle">@evg.chef</p>
        </div>
      </section>
    </main>
    <footer className="site-footer sheet"><a className="wordmark" href="#top">Evgen Grebenik</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram @evg.chef</a></footer>
  </>;
}
