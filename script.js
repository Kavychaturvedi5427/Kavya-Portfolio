/* ================================================================
   KAVYA CHATURVEDI — PORTFOLIO v10 | script.js
================================================================ */
'use strict';

/* ── CURSOR ── */
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
let mx=0, my=0, ox=0, oy=0;

document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  c1.style.left = mx+'px';
  c1.style.top  = my+'px';
});
(function lag(){
  ox += (mx-ox) * 0.12;
  oy += (my-oy) * 0.12;
  c2.style.left = ox+'px';
  c2.style.top  = oy+'px';
  requestAnimationFrame(lag);
})();

const sc=(cls,on)=>document.body.classList.toggle(cls,on);
document.addEventListener('mouseover', e=>{
  const a=!!e.target.closest('a,button,.chip,.stab,.pcard,.clink,.lbtn,.fsubmit,.fab,.nav__hire,.nav__resume,.nav__icon,.hclink,.si-item,.soc-btn');
  const t=!!e.target.closest('input,textarea');
  sc('cl',a&&!t); sc('ct',t);
});
document.addEventListener('mouseout',()=>{sc('cl',false);sc('ct',false)});
document.addEventListener('mousedown',()=>sc('cd',true));
document.addEventListener('mouseup',()=>sc('cd',false));

/* ── TYPEWRITER ── */
const words=['Software Developer','Android Developer','Java Engineer','Firebase Specialist','Problem Solver'];
let wi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function typeLoop(){
  if(!tel)return;
  const w=words[wi];
  tel.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci===w.length){del=true;setTimeout(typeLoop,1800);return}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  setTimeout(typeLoop,del?42:82);
}
typeLoop();

/* ── SKILL TABS ── */
let at=0;
const tabs=document.querySelectorAll('.stab[data-tab]');
const panels=document.querySelectorAll('.skill-panel');
function switchTab(i){
  at=i;
  tabs.forEach((t,j)=>t.classList.toggle('active',j===i));
  panels.forEach((p,j)=>p.classList.toggle('active',j===i));
}
tabs.forEach((t,i)=>t.addEventListener('click',()=>switchTab(i)));
document.getElementById('tab-prev')?.addEventListener('click',()=>switchTab((at-1+tabs.length)%tabs.length));
document.getElementById('tab-next')?.addEventListener('click',()=>switchTab((at+1)%tabs.length));

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*55);ro.unobserve(e.target)}
  });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── NAV ACTIVE ── */
const navLinks=document.querySelectorAll('.nav__link[data-sec]');
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) navLinks.forEach(a=>a.classList.toggle('active',a.dataset.sec===e.target.id));
  });
},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(s=>so.observe(s));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('[data-sec]').forEach(el=>{
  el.addEventListener('click',()=>{
    document.getElementById(el.dataset.sec)?.scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('mobile-drawer')?.classList.remove('open');
  });
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

/* ── MOBILE MENU ── */
const drawer=document.getElementById('mobile-drawer');
document.getElementById('mob-btn')?.addEventListener('click',()=>drawer?.classList.toggle('open'));

/* ── FAB ── */
document.getElementById('fab')?.addEventListener('click',()=>
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})
);

/* ── INJECT IMAGES ── */
window.addEventListener('DOMContentLoaded',()=>{
  if(typeof LEDGER_IMG!=='undefined') document.querySelectorAll('[data-img="ledger"]').forEach(el=>el.src=LEDGER_IMG);
  if(typeof UNIGO_IMG!=='undefined')  document.querySelectorAll('[data-img="unigo"]').forEach(el=>el.src=UNIGO_IMG);
  if(typeof FRUITS_IMG!=='undefined') document.querySelectorAll('[data-img="fruits"]').forEach(el=>el.src=FRUITS_IMG);
});

/* ── CONTACT FORM ── */
const EMAILJS_PK='YOUR_PUBLIC_KEY';
const EMAILJS_SID='YOUR_SERVICE_ID';
const EMAILJS_TID='YOUR_TEMPLATE_ID';
const form=document.getElementById('contact-form');
const statusEl=document.getElementById('form-status');
const submitBtn=document.getElementById('form-submit');
if(form){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=document.getElementById('f-name').value.trim();
    const email=document.getElementById('f-email').value.trim();
    const msg=document.getElementById('f-message').value.trim();
    if(!name||!email||!msg){showStatus('Please fill in all fields.',false);return}
    submitBtn.disabled=true;
    submitBtn.innerHTML='<span class="material-icons-round" style="font-size:1rem;animation:spin .7s linear infinite">autorenew</span> Sending…';
    if(EMAILJS_PK!=='YOUR_PUBLIC_KEY'){
      try{
        await emailjs.send(EMAILJS_SID,EMAILJS_TID,{from_name:name,from_email:email,reply_to:email,message:msg},EMAILJS_PK);
        showStatus("✓ Sent! I'll reply soon.",true);form.reset();
      }catch{gmailFallback(name,email,msg)}
    }else{gmailFallback(name,email,msg)}
    submitBtn.disabled=false;
    submitBtn.innerHTML='<span class="material-icons-round" style="font-size:1rem">send</span>Send Message';
  });
}
function gmailFallback(n,e,m){
  const b=encodeURIComponent(`Hi Kavya,\n\nName: ${n}\nEmail: ${e}\n\nMessage:\n${m}`);
  window.open(`https://mail.google.com/mail/?view=cm&to=kavya58chaturvedi@gmail.com&su=${encodeURIComponent('Portfolio Contact from '+n)}&body=${b}`,'_blank');
  showStatus('✓ Opening Gmail with your message pre-filled…',true);
}
function showStatus(msg,ok){
  statusEl.textContent=msg;
  statusEl.className='fstatus '+(ok?'ok':'err');
  setTimeout(()=>statusEl.className='fstatus',5000);
}
const ss=document.createElement('style');
ss.textContent='@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(ss);
