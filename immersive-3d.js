/* Portfolio 3D: progressive enhancement; no external libraries or tracking. */
(()=>{'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile=window.matchMedia('(max-width: 800px)');
const hero=document.querySelector('.hero');
const mission=document.querySelector('.mission');
const cards=[...document.querySelectorAll('.pathway-card,.brief,.impact-card,.framework-card,.project-card')];
if(!hero||!mission)return;
const toolbar=document.createElement('div');toolbar.className='immersive-toolbar';
const toggle=document.createElement('button');toggle.type='button';toggle.className='immersive-toggle';toggle.textContent='3D effects: On';toggle.setAttribute('aria-label','Toggle interactive 3D effects');
const hint=document.createElement('span');hint.className='immersive-hint';hint.textContent='Move your pointer over the cards to explore';
toolbar.append(toggle,hint);
const actions=document.querySelector('.hero .actions');if(actions)actions.insertAdjacentElement('afterend',toolbar);
let enabled=!reduced.matches&&!mobile.matches;
const apply=()=>{document.body.classList.toggle('immersive-off',!enabled);toggle.setAttribute('aria-pressed',String(enabled));toggle.textContent='3D effects: '+(enabled?'On':'Off');};
apply();
toggle.addEventListener('click',()=>{enabled=!enabled;apply();if(!enabled)resetAll();});
function reset(el){el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');}
function resetAll(){[mission,...cards].forEach(reset);}
function tilt(el,e,scale){if(!enabled||reduced.matches||mobile.matches)return;const r=el.getBoundingClientRect();if(!r.width||!r.height)return;const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--tilt-x',(-y*scale).toFixed(2)+'deg');el.style.setProperty('--tilt-y',(x*scale).toFixed(2)+'deg');el.style.setProperty('--shine-x',((x+.5)*100)+'%');el.style.setProperty('--shine-y',((y+.5)*100)+'%');}
for(const el of [mission,...cards]){el.addEventListener('pointermove',e=>tilt(el,e,el===mission?10:6),{passive:true});el.addEventListener('pointerleave',()=>reset(el));el.addEventListener('blur',()=>reset(el),true);}
hero.addEventListener('pointermove',e=>{if(!enabled||mobile.matches||reduced.matches)return;const r=hero.getBoundingClientRect();hero.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');hero.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');},{passive:true});
if('IntersectionObserver' in window&&!reduced.matches){const targets=[...document.querySelectorAll('.section')];const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.06,rootMargin:'0px 0px 40px 0px'});targets.forEach(el=>{el.classList.add('immersive-reveal');observer.observe(el);});}
const mediaChange=()=>{if(reduced.matches||mobile.matches){enabled=false;resetAll();}else{enabled=true;}apply();};
reduced.addEventListener?.('change',mediaChange);mobile.addEventListener?.('change',mediaChange);
})();
