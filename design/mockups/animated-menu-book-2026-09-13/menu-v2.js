(() => {
  'use strict';
  const recipes = [
    { key: 'duck', name: 'Утиная грудка', short: 'Утка', subtitle: 'Сельдерей · морковь · соус',
      parts: [ ['Утиная грудка', 'Обжариваем до румяной, хрустящей кожи.'], ['Сельдерей', 'Готовим нежное, гладкое пюре.'], ['Морковь и зелень', 'Морковь запекаем и глазируем. Зелень оставляем свежей.'], ['Соус', 'Увариваем до насыщенного вкуса.'] ],
      finish: 'На пюре выкладываем утку, добавляем морковь, зелень и завершаем подачу соусом.' },
    { key: 'octopus', name: 'Осьминог', short: 'Осьминог', subtitle: 'Вяленые томаты · оливки · зелень',
      parts: [ ['Осьминог', 'Обжариваем до золотистых краёв.'], ['Томаты', 'Вялим, чтобы вкус стал насыщеннее.'], ['Оливки и зелень', 'Оливки маринуем с травами. Добавляем свежую зелень.'], ['Томатный соус', 'Увариваем до бархатистой текстуры.'] ],
      finish: 'Осьминога укладываем на соус, добавляем томаты, маринованные оливки и свежую зелень.' },
    { key: 'lamb', name: 'Каре ягнёнка', short: 'Каре ягнёнка', subtitle: 'Розмарин · корнеплоды · мясной соус',
      parts: [ ['Каре ягнёнка', 'Обжариваем и доводим в духовке.'], ['Розмарин', 'Ароматизируем мясо при приготовлении.'], ['Корнеплоды', 'Запекаем до золотистого края.'], ['Мясной соус', 'Увариваем, чтобы подчеркнуть вкус ягнёнка.'] ],
      finish: 'Подаём каре с запечёнными корнеплодами, розмарином и глянцевым мясным соусом.' }
  ];
  const $ = selector => document.querySelector(selector);
  const book = $('#menu-book');
  const status = $('#animation-status');
  const playButton = $('#play');
  const pauseButton = $('#pause');
  const sketchButton = $('#sketch');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = () => innerWidth <= 900;
  const loaded = new Map();
  let first = 0;
  let requestId = 0;
  let uid = 0;
  let animations = [];
  let timeline = null;
  let raf = 0;
  let paused = false;
  let mode = 'final';
  let layoutWidth = innerWidth;
  let compactLayout = compact();
  let resizeTimer = 0;
  const ns = 'http://www.w3.org/2000/svg';
  function svgElement(tag, attrs = {}) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  }
  function cutout(key, index, photographicOnly = false) {
    const asset = window.MENU_BOOK_FOOD[key];
    const part = asset.parts[index];
    const [x, y, w, h] = part.photoRect;
    const id = `art-${++uid}`;
    const visual = document.createElement('div');
    visual.className = 'cutout';
    visual.dataset.part = index;
    visual.style.setProperty('--ratio', `${w} / ${h}`);
    const defsSvg = svgElement('svg', {width:0,height:0,'aria-hidden':'true'});
    defsSvg.style.position = 'absolute';
    const defs = svgElement('defs');
    const clip = svgElement('clipPath', {id:`clip-${id}`,clipPathUnits:'objectBoundingBox'});
    clip.append(svgElement('path', {d:part.clipPath,'clip-rule':'evenodd',fill:'black'}));
    defs.append(clip); defsSvg.append(defs);
    const color = document.createElement('div');
    color.className = 'photo-layer';
    color.style.clipPath = `url(#clip-${id})`;
    const photo = new Image();
    photo.className = 'food-photo';
    photo.alt = ''; photo.draggable = false; photo.decoding = 'async'; photo.src = asset.photoSrc;
    Object.assign(photo.style, {width:`${asset.photoSize[0]/w*100}%`,height:`${asset.photoSize[1]/h*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`});
    color.append(photo);
    visual.append(defsSvg, color);
    if (photographicOnly) return visual;
    const pencil = svgElement('svg', {class:'pencil-image',viewBox:`0 0 ${w} ${h}`,'aria-hidden':'true'});
    const pencilClip = svgElement('clipPath', {id:`pencil-clip-${id}`,clipPathUnits:'objectBoundingBox'});
    pencilClip.append(svgElement('path',{d:part.pencilClipPath,'clip-rule':'evenodd',fill:'black'}));
    defs.append(pencilClip);
    pencil.style.clipPath = `url(#pencil-clip-${id})`;
    const pencilDefs = svgElement('defs');
    const mask = svgElement('mask', {id:`pencil-${id}`,maskUnits:'userSpaceOnUse',x:0,y:0,width:w,height:h});
    mask.append(svgElement('rect',{width:w,height:h,fill:'black'}));
    for (let i=0; i<24; i++) {
      const sy = h * (i-.5) / 22;
      const path = svgElement('path', {class:'pencil-stroke',pathLength:1,'stroke-width':h*.135,
        d:`M${-w*.15} ${sy+h*.06} Q${w*.43} ${sy-h*.04} ${w*1.15} ${sy}`});
      mask.append(path);
    }
    pencilDefs.append(mask);
    const group = svgElement('g', {mask:`url(#pencil-${id})`});
    const [sx,sy,sw,sh] = part.pencilRect;
    group.append(svgElement('image',{href:asset.pencilSrc,x:-sx*w/sw,y:-sy*h/sh,width:asset.pencilSize[0]*w/sw,height:asset.pencilSize[1]*h/sh,preserveAspectRatio:'none'}));
    pencil.append(pencilDefs,group);
    visual.append(pencil);
    return visual;
  }
  function makePage(recipe, index) {
    const page = document.createElement('article');
    page.className = 'recipe-page'; page.dataset.recipe = recipe.key;
    page.setAttribute('aria-labelledby',`title-${recipe.key}`);
    const header = document.createElement('header'); header.className = 'recipe-heading';
    const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = recipe.subtitle;
    const title = document.createElement('h2'); title.id = `title-${recipe.key}`; title.tabIndex = -1; title.textContent = recipe.name;
    header.append(eyebrow,title);
    const list = document.createElement('ol'); list.className = 'recipe-ingredients'; list.setAttribute('aria-label','Ингредиенты и приготовление');
    recipe.parts.forEach(([name, action], partIndex) => {
      const row = document.createElement('li'); row.className = 'recipe-ingredient';
      const operation = document.createElement('div'); operation.className = 'operation';
      const heading = document.createElement('h3'); heading.textContent = name;
      const description = document.createElement('p'); description.textContent = action;
      const leader = svgElement('svg',{class:'ingredient-leader',viewBox:'0 0 160 12',preserveAspectRatio:'none','aria-hidden':'true'});
      leader.append(svgElement('path',{d:'M0 7Q83 9 157 4'}));
      operation.append(heading,description,leader);
      const art = document.createElement('div'); art.className = 'ingredient-art'; art.setAttribute('aria-hidden','true'); art.append(cutout(recipe.key,partIndex));
      row.append(operation,art); list.append(row);
    });
    const cue = document.createElement('div'); cue.className = 'assembly-cue'; cue.setAttribute('aria-hidden','true');
    const cueText = document.createElement('span'); cueText.textContent = 'Собираем подачу';
    const arrow = svgElement('svg',{viewBox:'0 0 48 25'});
    arrow.append(svgElement('path',{d:'M2 3C27 0 37 9 38 23M38 23L30 16M38 23L44 14',pathLength:1}));
    cue.append(cueText,arrow);
    const figure = document.createElement('figure'); figure.className = 'recipe-serving';
    const plate = document.createElement('div'); plate.className = 'recipe-plate'; plate.setAttribute('role','img'); plate.setAttribute('aria-label',`${recipe.name}: готовая ресторанная подача на тарелке`); plate.append(cutout(recipe.key,4));
    const caption = document.createElement('figcaption'); caption.textContent = recipe.finish;
    figure.append(plate,caption);
    const footer = document.createElement('footer'); footer.className = 'page-footer';
    const signature = document.createElement('span'); signature.textContent = 'Евгений Гребеник';
    const number = document.createElement('span'); number.className = 'page-number'; number.textContent = String(index+1).padStart(2,'0');
    footer.append(signature,number);
    page.append(header,list,cue,figure,footer);
    return page;
  }
  function stop() {
    cancelAnimationFrame(raf); animations.forEach(a=>a.cancel()); animations=[]; timeline=null; paused=false;
    pauseButton.hidden=true; pauseButton.textContent='Пауза';
    book.querySelectorAll('.recipe-flight').forEach(el=>el.remove());
    book.dataset.playing='false';
  }
  function setMode(next, announce=true) {
    stop(); mode=next; book.dataset.state=next;
    book.querySelectorAll('.cutout').forEach(el=>{
      const plate = Boolean(el.closest('.recipe-plate'));
      el.querySelector('.photo-layer').style.opacity = next==='final' && plate ? '1' : '0';
      const pencil=el.querySelector('.pencil-image'); if(pencil) pencil.style.opacity=next==='final' && plate ? '0':'1';
      el.querySelectorAll('.pencil-stroke').forEach(stroke=>stroke.style.strokeDashoffset='0');
    });
    sketchButton.textContent=next==='final'?'Вернуть рисунок':'Показать подачу';
    $('#play-label').textContent='Оживить меню';
    if(announce) status.textContent=next==='final'?'Карандашный замысел — и готовое блюдо на той же странице.':'Карандашный эскиз. Нажмите «Оживить меню», чтобы увидеть сборку.';
  }
  function loadAsset(key) {
    if(loaded.has(key)) return loaded.get(key);
    const item=window.MENU_BOOK_FOOD[key];
    const promise=Promise.all([item.photoSrc,item.pencilSrc].map(src=>{const image=new Image();image.src=src;return image.decode();})).catch(error=>{loaded.delete(key);throw error;});
    loaded.set(key,promise); return promise;
  }
  function updateNavigation() {
    const count=compact()?1:2;
    $('#previous').disabled=first===0;
    $('#next').disabled=first+count>=recipes.length;
    $('#previous-label').textContent=first>0?recipes[first-1].short:'Назад';
    $('#next-label').textContent=first+count<recipes.length?recipes[first+count].short:'Далее';
    $('#page-range').textContent=compact()?`${String(first+1).padStart(2,'0')} / 03`:`${String(first+1).padStart(2,'0')}–${String(first+2).padStart(2,'0')} / 03`;
  }
  async function render({playAfter=false, scroll=false}={}) {
    const version=++requestId; stop();
    const count=compact()?1:2; first=Math.max(0,Math.min(first,recipes.length-count));
    const visible=recipes.slice(first,first+count);
    book.replaceChildren(...visible.map((recipe,index)=>makePage(recipe,first+index)));
    book.setAttribute('aria-label',visible.map(recipe=>recipe.name).join(' и '));
    book.setAttribute('aria-busy','true'); playButton.disabled=true; sketchButton.disabled=true;
    $('#error-message').hidden=true; updateNavigation(); setMode('sketch',false); status.textContent='Готовлю страницы…';
    try {
      await Promise.all(visible.map(recipe=>loadAsset(recipe.key))); await document.fonts.ready;
      await Promise.all([...book.querySelectorAll('.food-photo')].map(image=>image.decode()));
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      if(version!==requestId)return;
      book.setAttribute('aria-busy','false');playButton.disabled=false;sketchButton.disabled=false;
      setMode('final');
      if(scroll){book.querySelector('h2').focus({preventScroll:true});window.scrollTo({top:Math.max(0,book.getBoundingClientRect().top+scrollY-30),behavior:'instant'});}
      if(playAfter&&!reduced.matches)play();
    }catch{
      if(version!==requestId)return;
      book.setAttribute('aria-busy','false');$('#error-message').hidden=false;status.textContent='Страницы доступны; изображение можно загрузить повторно.';
    }
  }
  function animate(el,frames,options){const animation=el.animate(frames,{fill:'both',...options});animations.push(animation);return animation;}
  function play(){
    if(playButton.disabled)return;
    if(reduced.matches){setMode('final');status.textContent='Готовая подача. Движение отключено в настройках устройства.';return;}
    setMode('sketch',false);mode='animating';book.dataset.playing='true';pauseButton.hidden=false;$('#play-label').textContent='Начать заново';
    timeline=animate(book,[{opacity:1},{opacity:1}],{duration:9000});const active=timeline;
    [...book.querySelectorAll('.recipe-page')].forEach((page,pageIndex)=>{
      const lag=pageIndex*140;
      page.querySelectorAll('.cutout').forEach(el=>{
        const index=Number(el.dataset.part);const plate=index===4;
        const start=(plate?4570:160+index*230)+lag;
        el.querySelectorAll('.pencil-stroke').forEach((stroke,line)=>animate(stroke,[{strokeDashoffset:1},{strokeDashoffset:0}],{delay:start+line*(plate?31:28),duration:plate?1050:1320,easing:'ease-in-out'}));
        const ink=el.querySelector('.pencil-image');const photo=el.querySelector('.photo-layer');
        if(plate){
          animate(ink,[{opacity:0},{opacity:1,offset:.15},{opacity:1,offset:.65},{opacity:0}],{delay:4490+lag,duration:3770});
          animate(photo,[{opacity:0},{opacity:1}],{delay:6870+lag,duration:1350,easing:'ease-in-out'});
        }else{
          animate(photo,[{opacity:0},{opacity:1,offset:.18},{opacity:1,offset:.67},{opacity:0}],{delay:2410+index*200+lag,duration:3620,easing:'ease-in-out'});
          animate(ink,[{opacity:1},{opacity:0,offset:.18},{opacity:0,offset:.67},{opacity:1}],{delay:2510+index*200+lag,duration:3470,easing:'ease-in-out'});
        }
      });
      animate(page.querySelector('.assembly-cue path'),[{strokeDasharray:'1',strokeDashoffset:1},{strokeDasharray:'1',strokeDashoffset:0}],{delay:3710+lag,duration:1200});
    });
    let sent=false,last=-1;
    const tick=()=>{
      if(timeline!==active)return;
      const time=Number(active.currentTime||0);const phase=time<2450?0:time<4050?1:time<6870?2:3;
      if(phase!==last&&!paused){status.textContent=['Карандашом намечаем форму и текстуру ингредиентов.','Штрихи оживают — появляются цвет и фактура.','Собираем компоненты на тарелке.','Завершаем соусом и зеленью. Подача готова.'][phase];last=phase;}
      if(time>=3950&&!sent){sent=true;assemble(time);}
      raf=requestAnimationFrame(tick);
    };raf=requestAnimationFrame(tick);
    active.finished.then(()=>{if(timeline!==active)return;setMode('final');$('#play-label').textContent='Повторить сборку';}).catch(()=>{});
  }
  function assemble(elapsed){
    [...book.querySelectorAll('.recipe-page')].forEach((page,pageIndex)=>{
      const target=page.querySelector('.recipe-plate .cutout').getBoundingClientRect();const parent=page.getBoundingClientRect();
      const nodes=[...page.querySelectorAll('.recipe-ingredient .cutout')];
      [3,1,0,2].forEach((part,order)=>{
        const from=nodes[part].getBoundingClientRect();const flight=document.createElement('div');flight.className='recipe-flight';flight.setAttribute('aria-hidden','true');
        flight.append(cutout(page.dataset.recipe,part,true));
        Object.assign(flight.style,{left:`${from.left-parent.left}px`,top:`${from.top-parent.top}px`,width:`${from.width}px`,height:`${from.height}px`});page.append(flight);
        const points=[[.53,.47],[.44,.51],[.60,.65],[.49,.62]];const [tx,ty]=points[part];
        const dx=target.left+target.width*tx-from.left-from.width/2;const dy=target.top+target.height*ty-from.top-from.height/2;
        const motion=animate(flight,[{transform:'translate(0,0) scale(1)',opacity:0},{transform:'translate(0,0) scale(1)',opacity:1,offset:.08},{transform:`translate(${dx}px,${dy}px) scale(.8)`,opacity:.9,offset:.81},{transform:`translate(${dx}px,${dy}px) scale(.8)`,opacity:0}],{delay:Math.max(0,4150+order*400+pageIndex*140-elapsed),duration:1770,easing:'cubic-bezier(.38,0,.27,1)'});
        if(paused)motion.pause();
      });
    });
  }
  function togglePause(){if(!timeline)return;paused=!paused;animations.forEach(a=>paused?a.pause():a.play());pauseButton.textContent=paused?'Продолжить':'Пауза';status.textContent=paused?'Анимация на паузе.':'Продолжаем сборку блюда.';}
  $('#next').addEventListener('click',()=>{first++;render({playAfter:true,scroll:true});});
  $('#previous').addEventListener('click',()=>{first--;render({playAfter:true,scroll:true});});
  playButton.addEventListener('click',play);pauseButton.addEventListener('click',togglePause);
  sketchButton.addEventListener('click',()=>setMode(mode==='final'?'sketch':'final'));
  $('#retry').addEventListener('click',()=>render());
  reduced.addEventListener('change',()=>{if(reduced.matches)setMode('final');});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&timeline&&!paused)togglePause();});
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{
      if(innerWidth<240||innerWidth===layoutWidth)return;
      layoutWidth=innerWidth;if(timeline)setMode('final');
      if(compact()!==compactLayout){compactLayout=compact();render();}
    },100);
  });
  if(!window.MENU_BOOK_FOOD){status.textContent='Не удалось загрузить меню. Обновите страницу.';return;}
  render().then(()=>{
    if(playButton.disabled||reduced.matches)return;
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();play();}},{threshold:.3});observer.observe(book);
  });
})();
