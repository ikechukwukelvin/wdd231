/* File: chamber/scripts/discover.js */
(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  const lm = document.lastModified || '';
  document.getElementById('lastModified').textContent = lm ? 'Last modified: '+lm : '';

  const GRID=document.getElementById('discover-grid');
  const VISIT_TEXT=document.getElementById('visit-text');
  const OVERLAY=document.getElementById('visitor-overlay');
  const CLOSE=document.getElementById('close-visit-msg');

  fetch('data/discover.json').then(r=>r.json()).then(data=>buildCards(data));

  function daysBetween(a,b){const d=86400000;return Math.floor(Math.abs(a-b)/d)}

  try{
    const LAST=localStorage.getItem('riverbend_last_visit');
    const now=Date.now();
    if(!LAST){VISIT_TEXT.textContent='Welcome! Let us know if you have any questions.'}
    else{const diff=daysBetween(now,Number(LAST));
      if(diff===0)VISIT_TEXT.textContent='Back so soon! Awesome!';
      else if(diff===1)VISIT_TEXT.textContent='You last visited 1 day ago.';
      else VISIT_TEXT.textContent=`You last visited ${diff} days ago.`}
    localStorage.setItem('riverbend_last_visit',String(now))
  }catch(e){VISIT_TEXT.textContent='Welcome! Let us know if you have any questions.'}

  CLOSE.addEventListener('click',()=>OVERLAY.style.display='none');

  function buildCards(items){
    const areas=['a','b','c','d','e','f','g','h'];
    GRID.innerHTML='';
    items.forEach((it,idx)=>{
      const card=document.createElement('article');
      card.className='card';
      card.setAttribute('data-area',areas[idx]||'');

      const fig=document.createElement('figure');
      const img=document.createElement('img');
      img.src=it.image;img.alt=it.title;
      fig.appendChild(img);

      const content=document.createElement('div');content.className='card-content';
      const h2=document.createElement('h2');h2.textContent=it.title;
      const addr=document.createElement('address');addr.textContent=it.address;
      const p=document.createElement('p');p.textContent=it.description;
      const btn=document.createElement('button');btn.className='btn';btn.textContent='Learn more';
      content.append(h2,addr,p,btn);

      card.append(fig,content);
      GRID.appendChild(card);
    })
  }
})();