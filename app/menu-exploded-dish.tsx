/* eslint-disable @next/next/no-img-element -- locally masked real photographs */

const assets = "/media/menu/exploded/";
const notes = [
  { key: "side", title: "Гарнир", description: "Дополняет основной продукт и раскрывает его вкус." },
  { key: "main", title: "Основной продукт", description: "Задаёт вкус и характер блюда." },
  { key: "texture", title: "Текстуры", description: "От нежного до хрустящего — разные ощущения в одном блюде." },
  { key: "sauce", title: "Соус", description: "Собирает вкусы вместе." },
];

export default function MenuExplodedDish() {
  return <figure className="menu-plate menu-exploded" aria-label="Замысел блюда: гарнир, основной продукт, текстуры и соус над готовой подачей">
    <div className="menu-dish-stage">
      <img className="menu-room" src={`${assets}room.svg`} width="700" height="950" alt="" aria-hidden="true" loading="lazy" />
      <div className="dish-layers" aria-hidden="true">
        <img className="dish-basil dish-basil-one" src={`${assets}basil.webp`} width="179" height="391" alt="" loading="lazy" decoding="async" />
        <img className="dish-basil dish-basil-two" src={`${assets}basil.webp`} width="179" height="391" alt="" loading="lazy" decoding="async" />
        <img className="dish-basil dish-basil-three" src={`${assets}basil.webp`} width="179" height="391" alt="" loading="lazy" decoding="async" />
        <img className="dish-scallop" src={`${assets}scallop-360.webp`} srcSet={`${assets}scallop-360.webp 360w, ${assets}scallop.webp 735w`} sizes="(max-width: 620px) 31vw, (max-width: 900px) 180px, 13vw" width="735" height="622" alt="" loading="lazy" decoding="async" />
        <img className="dish-panko" src={`${assets}panko-320.webp`} srcSet={`${assets}panko-320.webp 320w, ${assets}panko.webp 640w`} sizes="(max-width: 620px) 25vw, (max-width: 900px) 150px, 11vw" width="640" height="491" alt="" loading="lazy" decoding="async" />
        <img className="dish-flake dish-flake-one" src={`${assets}panko-flake.webp`} width="73" height="34" alt="" loading="lazy" decoding="async" />
        <img className="dish-flake dish-flake-two" src={`${assets}panko-flake.webp`} width="73" height="34" alt="" loading="lazy" decoding="async" />
        <img className="dish-flake dish-flake-three" src={`${assets}panko-flake.webp`} width="73" height="34" alt="" loading="lazy" decoding="async" />
        <img className="dish-sauce" src={`${assets}sauce.webp`} width="148" height="120" alt="" loading="lazy" decoding="async" />
      </div>
      <img className="menu-plate-photo dish-finished" src={`${assets}scallop-plate-600.webp`} srcSet={`${assets}scallop-plate-600.webp 600w, ${assets}scallop-plate.webp 1200w`} sizes="(max-width: 620px) calc(100vw - 69px), (max-width: 900px) 600px, 43vw" width="1200" height="946" alt="Фотография готовой подачи: обжаренные морские гребешки с зеленью на тёмной тарелке" loading="lazy" decoding="async" />
      <svg className="dish-arrows" viewBox="0 0 700 950" preserveAspectRatio="none" aria-hidden="true">
        <path d="M494 90 Q448 91 413 111 M424 99 L412 111 L428 114" />
        <path d="M202 234 Q232 216 275 219 M264 211 L277 219 L266 226" />
        <path d="M498 353 Q454 362 424 341 M433 351 L422 340 L437 339" />
        <path d="M187 475 Q233 446 282 450 M271 441 L284 450 L269 455" />
      </svg>
      <dl className="dish-annotations">
        {notes.map(note => <div className={`dish-note dish-note-${note.key}`} key={note.key}>
          <dt>{note.title}</dt><dd>{note.description}</dd>
        </div>)}
      </dl>
    </div>
    <figcaption className="dish-caption">
      <dl className="dish-mobile-notes">
        {notes.map(note => <div key={note.key}><dt>{note.title}</dt><dd>{note.description}</dd></div>)}
      </dl>
      <a className="dish-photo-credit" href="/media/menu/exploded/credits.html" target="_blank" rel="noopener noreferrer">Источники фотографий <span aria-hidden="true">↗</span></a>
    </figcaption>
  </figure>;
}
