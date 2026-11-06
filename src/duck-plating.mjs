import { flavorNotes } from './content.mjs';

const firstPoints = {
  duck: [933.579, 432.568], puree: [855.268, 542.091],
  sauce: [573.688, 382.329], physalis: [1498.362, 669.252],
};

export function renderDuckPlating() {
  return `<div class="duck-stage" data-duck-plating data-tracks="/media/chef/duck-plating/tracks.json">
    <div class="duck-diagram">
      <div class="duck-visual"><video id="duck-film" width="1920" height="1080" muted playsinline controls preload="none" src="/media/chef/duck-plating/video.mp4" poster="/media/chef/duck-plating/poster.webp" aria-label="Повар завершает подачу утки с картофельным пюре" aria-describedby="duck-notes">
        <a href="/media/chef/duck-plating/video.mp4">Посмотреть видео</a>
      </video></div>
      <dl class="duck-notes" id="duck-notes">${flavorNotes.map(note => `<div class="duck-note duck-note--${note.id}" data-duck-note="${note.id}"><dt>${note.title}</dt><dd>${note.text}</dd></div>`).join('')}</dl>
      <svg class="duck-arrows" aria-hidden="true">${flavorNotes.map(note => `<g data-duck-arrow="${note.id}" data-first-point="${firstPoints[note.id].join(',')}"><path class="duck-arrow-outline" data-line/><path data-line/><path class="duck-arrow-head duck-arrow-outline" data-head/><path class="duck-arrow-head" data-head/></g>`).join('')}</svg>
    </div>
    <div class="duck-foot">
      <p class="duck-credit">Видео: DC Studio / <a href="https://www.vecteezy.com/free-videos/slow-motion" target="_blank" rel="noopener noreferrer">Slow Motion Stock Videos by Vecteezy</a></p>
      <button class="duck-toggle" type="button" aria-controls="duck-film" aria-label="Воспроизвести видео подачи" hidden><span data-duck-control>Смотреть</span><svg viewBox="0 0 24 24" aria-hidden="true"><path data-duck-icon d="m8 5 11 7-11 7Z"/></svg></button>
    </div>
  </div>`;
}
