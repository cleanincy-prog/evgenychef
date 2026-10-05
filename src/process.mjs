import { chef, stages, products, flavorNotes } from './content.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" stroke-width="1.3"/></svg>';
const number = index => String(index + 1).padStart(2, '0');
const photo = (file, small, width, height, alt, className = 'story-photo', sizes = '100vw') => `<img class="${className}" src="/media/chef/${file}" srcset="/media/chef/${small} ${small.includes('600') ? 600 : small.includes('512') ? 512 : small.includes('400') ? 400 : 768}w, /media/chef/${file} ${width}w" sizes="${sizes}" width="${width}" height="${height}" alt="${escape(alt)}" loading="lazy" decoding="async">`;
const paragraphs = text => text.split('\n\n').map(p => `<p>${escape(p)}</p>`).join('');

const chapters = [
  { id: 'letter-conversation', name: 'Знакомимся', label: 'Всё начинается с разговора', source: 0, kind: 'conversation',
    media: '<img class="story-photo" src="/media/chef/letter/conversation-reference.png" width="1122" height="1402" alt="Евгений общается с гостями за столом на террасе" loading="lazy" decoding="async">' },
  { id: 'letter-menu', name: 'Продумываю меню', label: 'От пожеланий — к сочетаниям', source: 1, kind: 'menu',
    media: photo('letter/menu-planning.webp', 'letter/menu-planning-768.webp', 1600, 1067, 'Руки листают тетрадь с ингредиентами и кулинарными заметками') },
  { id: 'ingredients', name: 'Магия начинается с выбора', label: 'Кипр · Продукты для вашего меню', kind: 'ingredients', media: '' },
  { id: 'menu', name: 'Собираю вкус', label: 'Каждый продукт играет свою роль', kind: 'taste',
    media: photo('letter/menu/duck-pan.webp', 'letter/menu/duck-pan-512.webp', 1024, 683, '', 'story-photo story-photo--texture') },
  { id: 'letter-preparation', name: 'Подготовку беру на себя', label: 'Работа на кухне · Видео Евгения', source: 2, kind: 'preparation',
    media: `<img class="story-photo story-photo--film-backdrop" src="/media/chef/preparation-poster.webp" width="540" height="960" alt="" loading="lazy" decoding="async"><video class="story-film" id="preparation-film" src="/media/chef/preparation.mp4" poster="/media/chef/preparation-poster.webp" width="540" height="960" playsinline loop preload="none" aria-label="Евгений раскладывает инструменты и делает заготовки на кухне" data-letter-video><a href="/media/chef/preparation.mp4">Смотреть видео подготовки</a></video>` },
  { id: 'letter-evening', name: 'Этот вечер — ваш', label: 'Время за вашим столом', source: 3, kind: 'evening',
    media: photo('letter/evening-chef-wine.webp', 'letter/evening-chef-wine-768.webp', 1448, 1086, 'Иллюстрация: Евгений наливает вино гостю за ужином при свечах на террасе виллы') },
];

function ingredients() {
  return `<div class="story-body"><p>Выбор продукта — такая же важная часть моей работы, как приготовление. Свежесть и качество мяса, рыбы и морепродуктов задают вкус задолго до того, как я начинаю готовить.</p></div>
    <dl class="story-products">${products.map(product => `<div><dt>${escape(product.title)}</dt><dd>${escape(product.text)}</dd></div>`).join('')}</dl>`;
}
function ingredientPhotos() {
  return `<div class="story-ingredient-details">
      <figure class="story-ingredient-main">${photo('letter/menu/duck-ingredients.webp', 'letter/menu/duck-ingredients-600.webp', 1200, 900, 'Утиные грудки, шиитаке, морковь, шалот и травы перед приготовлением', 'story-detail-photo', '(max-width:767px) 72vw, 566px')}</figure>
      <figure>${photo('letter/menu/vegetables.webp', 'letter/menu/vegetables-400.webp', 800, 919, 'Грибы шиитаке, овощи и зелень на деревянной доске', 'story-detail-photo', '(max-width:767px) 35vw, 280px')}</figure>
      <figure>${photo('letter/menu/duck-pan.webp', 'letter/menu/duck-pan-512.webp', 1024, 683, '', 'story-detail-photo', '(max-width:767px) 35vw, 280px')}</figure>
    </div>`;
}
function plate() {
  return `<figure class="story-plate" aria-describedby="taste-notes"><div class="story-plate-image"><img src="/media/chef/atlas-plate-820.webp" srcset="/media/chef/atlas-plate-410.webp 410w, /media/chef/atlas-plate-820.webp 820w" sizes="(max-width:520px) 60vw, 300px" width="820" height="844" loading="lazy" decoding="async" alt="Блюдо Atlas: утка, овощи и шиитаке, пюре из фенхеля и батата, чипсы и соус с юдзу">${flavorNotes.map((note, i) => `<span class="story-plate-point" data-taste-point="${note.id}" style="--x:${note.x * 100}%;--y:${note.y * 100}%" aria-hidden="true">${i + 1}</span>`).join('')}</div><figcaption>Atlas · Одно блюдо, четыре акцента</figcaption></figure>`;
}
function tasteDiagram() {
  return `<div class="story-taste-diagram">
    ${plate()}
    <ol class="story-notes" id="taste-notes" role="list">${flavorNotes.map((note, i) => `<li data-taste-note="${note.id}"><div class="story-note-heading"><span aria-hidden="true">${i + 1}</span><h4>${escape(note.title)}</h4></div><p>${escape(note.text)}</p></li>`).join('')}</ol>
    <svg class="story-taste-leaders" aria-hidden="true">${flavorNotes.map(note => `<path data-taste-leader="${note.id}"/>`).join('')}</svg>
  </div>`;
}
function filmControls() {
  return `<div class="story-film-controls" hidden>
    <button type="button" class="story-sound" aria-controls="preparation-film" data-film-sound aria-label="Выключить звук" aria-pressed="false">Звук <span data-sound-label>вкл.</span></button>
    <span class="sr-only" role="status" data-film-status></span>
  </div>`;
}
export function renderProcess() {
  return `<section id="process" class="journey--cinematic" aria-labelledby="process-title" data-preview="cinematic-story-side-notes-v9">
    <h2 id="process-title" class="sr-only">От разговора — к вашему столу. Как рождается ваш вечер.</h2>
    <div class="story-scenes">${chapters.map((chapter, i) => `<div class="story-step story-step--${chapter.kind}">
      <div class="story-ambient" aria-hidden="true"></div>
      <span class="story-number" aria-hidden="true">${number(i)}</span>
      <article id="${chapter.id}" class="process-card story-scene story-scene--${chapter.kind}" aria-labelledby="${chapter.id}-title">
      <div class="story-media">${chapter.media}</div><div class="story-shade" aria-hidden="true"></div>
      ${i > 0 ? '<div class="story-divider" aria-hidden="true"></div>' : ''}
      <p class="story-scene-label">${chapter.label}</p>
      <div class="story-copy">${chapter.kind === 'ingredients' ? ingredientPhotos() : ''}<h3 id="${chapter.id}-title">${chapter.name}</h3>
        ${chapter.kind === 'ingredients' ? ingredients() : chapter.kind === 'taste' ? '<p class="story-body">Сочность, свежесть, сладость и кислинка дополняют друг друга.</p>' : `<div class="story-body">${paragraphs(stages[chapter.source].text)}</div>`}
        ${chapter.kind === 'preparation' ? `${filmControls()}<noscript><p class="story-film-fallback"><a href="/media/chef/preparation.mp4">Смотреть видео подготовки</a></p></noscript>` : ''}
        ${chapter.kind === 'evening' ? `<a class="story-contact" href="${chef.instagram}" target="_blank" rel="noopener noreferrer">Расскажите мне о вечере <span aria-hidden="true">↗</span></a>` : ''}
      </div>
      ${chapter.kind === 'taste' ? tasteDiagram() : ''}
      </article>
      <a class="story-next" href="#${chapters[i + 1]?.id || 'contact'}" aria-label="${i < 5 ? `Следующий этап: ${chapters[i + 1].name}` : 'Перейти к контактам'}">${arrow}<span>${i < 5 ? `${number(i + 1)} · ${chapters[i + 1].name}` : 'Начнём с вашего «хочу»'}</span></a>
    </div>`).join('')}</div>
  </section>`;
}
