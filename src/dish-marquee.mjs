const dishes = ['garden-plate', 'ceramic-dessert', 'roast-plate', 'turquoise-bowl'];

// Decorative photography: the duplicated loop must not repeat screen-reader content.
export function renderDishMarquee() {
  const group = `<div class="dish-marquee-group">${dishes.map(dish => `<div class="dish-marquee-item"><img src="/media/chef/dishes/${dish}-640.webp" srcset="/media/chef/dishes/${dish}-320.webp 320w, /media/chef/dishes/${dish}-640.webp 640w" sizes="(max-width: 767px) 210px, 340px" width="640" height="640" alt="" loading="lazy" decoding="async" draggable="false"></div>`).join('')}</div>`;
  return `<div class="dish-marquee" aria-hidden="true"><div class="dish-marquee-track">${group}${group}</div></div>
          <button class="dish-marquee-toggle" type="button" aria-label="Приостановить движение лент" hidden>
            <svg class="dish-marquee-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>
            <svg class="dish-marquee-play" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>
          </button>`;
}
