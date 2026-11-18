/* Animate hero stats from 1 to their published totals when visible. */
(()=>{'use strict';
const counters=[...document.querySelectorAll('.hero-stats [data-count-to]')];
if(!counters.length)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const showFinal=el=>{el.textContent=el.dataset.countTo+(el.dataset.countSuffix||'');};
if(reduced.matches||!('IntersectionObserver' in window)){counters.forEach(showFinal);return;}
let started=false;
const start=()=>{
 if(started)return;started=true;
 const duration=1250,startTime=performance.now();
 counters.forEach(el=>{el.textContent='1'+(el.dataset.countSuffix||'');});
 const tick=now=>{
  const progress=Math.min(1,(now-startTime)/duration);
  const eased=1-Math.pow(1-progress,3);
  counters.forEach(el=>{const target=Number(el.dataset.countTo);el.textContent=String(Math.min(target,1+Math.floor((target-1)*eased)))+(el.dataset.countSuffix||'');});
  if(progress<1)requestAnimationFrame(tick);else counters.forEach(showFinal);
 };
 requestAnimationFrame(tick);
};
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();start();}},{threshold:.25});
observer.observe(document.querySelector('.hero-stats'));
})();
