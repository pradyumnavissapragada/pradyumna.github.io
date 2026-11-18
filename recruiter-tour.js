(()=>{'use strict';
const launchTarget=document.querySelector('.hero .actions');if(!launchTarget||!('HTMLDialogElement'in window))return;
const steps=[
{label:'01 / CAREER IMPACT',heading:'11+ years building confidence in quality.',copy:'From hands-on automation engineering to Senior SDET and QA/Release Lead, with cross-functional collaboration across distributed teams.',evidence:'Career evidence',detail:'Explore the employer timeline, automation transformation outcomes and delivery achievements. Figures shown in the portfolio are professional claims, not live telemetry.',section:'#impact',links:[['Career journey','#experience'],['Achievements','#impact']]},
{label:'02 / TECHNICAL EVIDENCE',heading:'Automation you can inspect.',copy:'See how Playwright + TypeScript connects browser journeys, API validation, reusable fixtures and continuous integration.',evidence:'Open source and CI',detail:'Inspect the actual PlaywrightDemo repository and GitHub Actions results. The API in the demo is local, not a production service.',section:'#framework',links:[['Playwright source','https://github.com/pradyumnavissapragada/PlaywrightDemo'],['CI test runs','https://github.com/pradyumnavissapragada/PlaywrightDemo/actions']]},
{label:'03 / RELEASE LEADERSHIP',heading:'Evidence-led GO / NO-GO decisions.',copy:'Explore how objectives, critical-path coverage, regression results, defects and accepted residual risk inform release readiness.',evidence:'Quality Lab simulation',detail:'Try the interactive release simulator. Its sample thresholds represent illustrative team policy rather than mandatory ISTQB criteria.',section:'#lab',links:[['Quality Lab','#lab'],['Contact','#contact']]}
];
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const launch=make('button','tour-launch','✦ Take the 2-minute recruiter tour');launch.type='button';launchTarget.append(launch);
const dialog=make('dialog','tour-dialog');dialog.setAttribute('aria-label','Guided recruiter portfolio tour');
const shell=make('div','tour-shell'),top=make('div','tour-top'),kicker=make('span','tour-kicker','RECRUITER EXPERIENCE'),close=make('button','tour-close','×');close.type='button';close.setAttribute('aria-label','Close tour');top.append(kicker,close);
const progress=make('div','tour-progress');const bars=[0,1,2].map(()=>{const bar=make('span');progress.append(bar);return bar;});
const count=make('p','tour-step'),heading=make('h2','tour-heading'),copy=make('p','tour-copy'),evidence=make('div','tour-evidence'),links=make('div','tour-links'),actions=make('div','tour-actions');
const back=make('button','tour-secondary','Back'),next=make('button','tour-primary','Next step →'),skip=make('button','tour-skip','Skip tour');
for(const b of [back,next,skip])b.type='button';
actions.append(back,next,skip);shell.append(top,progress,count,heading,copy,evidence,links,actions);dialog.append(shell);document.body.append(dialog);
let current=0;let previousFocus=null;
function render(){const s=steps[current];count.textContent='STEP '+(current+1)+' OF '+steps.length+' · ABOUT '+(current===0?'40':current===1?'40':'30')+' SECONDS';heading.textContent=s.heading;copy.textContent=s.copy;evidence.replaceChildren(make('strong','',s.evidence),make('p','',s.detail));links.replaceChildren();for(const [label,href] of s.links){const a=make('a','',label+' ↗');a.href=href;if(href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}else a.addEventListener('click',()=>dialog.close());links.append(a);}bars.forEach((bar,i)=>bar.classList.toggle('active',i<=current));back.disabled=current===0;next.textContent=current===steps.length-1?'Finish and explore ↗':'Next step →';}
launch.addEventListener('click',()=>{previousFocus=document.activeElement;current=0;render();dialog.showModal();close.focus();});
close.addEventListener('click',()=>dialog.close());skip.addEventListener('click',()=>dialog.close());
back.addEventListener('click',()=>{if(current>0){current--;render();heading.focus?.();}});
next.addEventListener('click',()=>{if(current<steps.length-1){current++;render();}else{dialog.close();document.querySelector('#lab')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{previousFocus?.focus?.();});
})();
