const clips = ['cream-piping', 'steak-turning', 'canape-finishing'];

// Decorative footage: the duplicated loop must not repeat screen-reader content.
export function renderDishMarquee() {
  const group = `<div class="dish-marquee-group">${clips.map(clip => `<div class="dish-marquee-item"><video data-src="/media/chef/cooking-reel/${clip}.mp4" poster="/media/chef/cooking-reel/${clip}.webp" width="720" height="720" loop muted playsinline preload="none" disablepictureinpicture disableremoteplayback tabindex="-1"></video></div>`).join('')}</div>`;
  return `<div class="dish-marquee" aria-hidden="true"><div class="dish-marquee-track">${group}${group}</div></div>
          <button class="dish-marquee-toggle" type="button" aria-label="Приостановить движение лент" hidden>
            <svg class="dish-marquee-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>
            <svg class="dish-marquee-play" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>
          </button>`;
}
