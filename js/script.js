(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---------- Thoranam (mango leaves + marigolds) ---------- */
  (function(){
    const svg = document.getElementById('thoranam'); const H = 106;
    const defs = '<defs>'+
      '<linearGradient id="tLeaf" x1="0" x2="1"><stop offset="0" stop-color="#1E6A2A"/><stop offset=".5" stop-color="#43A047"/><stop offset="1" stop-color="#1B5E20"/></linearGradient>'+
      '<radialGradient id="tMari" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFD54F"/><stop offset=".55" stop-color="#FF9800"/><stop offset="1" stop-color="#E65100"/></radialGradient>'+
      '<radialGradient id="tYel" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFF59D"/><stop offset=".55" stop-color="#FFCA28"/><stop offset="1" stop-color="#F9A825"/></radialGradient>'+
      '<radialGradient id="tJas" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E8E2CF"/></radialGradient>'+
      '</defs>';
    const flower = (x,y,r,g) => '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" fill="url(#'+g+')" stroke="rgba(140,55,0,.5)" stroke-width="1.1" stroke-dasharray="1.6 1.3"/>';
    function draw(){
      const w = Math.max(300, Math.round(svg.getBoundingClientRect().width || innerWidth));
      svg.setAttribute('viewBox','0 0 '+w+' '+H);
      svg.setAttribute('preserveAspectRatio','xMidYMin meet');
      /* mango leaves hanging from the rope */
      const gap = 22, n = Math.ceil(w/gap)+1, off = (w-(n-1)*gap)/2;
      let leaves = '';
      for(let i=0;i<n;i++){
        const x = off+i*gap, rot = (i%2 ? 5 : -5), L = 40+(i%3)*5;
        leaves += '<g transform="translate('+x.toFixed(1)+',7) rotate('+rot+')"><g class="sw" style="animation-delay:-'+((i*0.37)%3.2).toFixed(2)+'s"><path d="M0 0 C-8 '+(L*.3)+' -7 '+(L*.72)+' 0 '+L+' C7 '+(L*.72)+' 8 '+(L*.3)+' 0 0Z" fill="url(#tLeaf)" stroke="#14481A" stroke-width=".6"/><path d="M0 2 V'+(L-3)+'" stroke="#A5D6A7" stroke-width=".7" opacity=".8"/></g></g>';
      }
      /* drooping marigold swags across the full width */
      const swN = Math.max(2, Math.round(w/230)), sw = w/swN;
      let swags = '';
      for(let k=0;k<swN;k++){
        const x0 = k*sw, x1 = (k+1)*sw, cx = (x0+x1)/2, depth = Math.min(44, sw*.2)+16, cy = 8+2*depth;
        const m = Math.max(12, Math.floor(sw*1.12/9));
        for(let j=1;j<m;j++){
          const t = j/m, a = (1-t)*(1-t), b = 2*(1-t)*t, c = t*t;
          swags += flower(a*x0+b*cx+c*x1, a*8+b*cy+c*8, 5.2, j%4===0 ? 'tJas' : (j%2 ? 'tMari' : 'tYel'));
        }
      }
      /* hanging strands where swags meet */
      let strands = '';
      for(let k=0;k<=swN;k++){
        const x = Math.min(w-7, Math.max(7, k*sw));
        strands += '<g class="sw" style="animation-delay:-'+(k*0.9).toFixed(1)+'s;animation-duration:2.6s">';
        strands += '<line x1="'+x+'" y1="8" x2="'+x+'" y2="'+(H-16)+'" stroke="#E7B54A" stroke-width="1"/>';
        for(let j=0;j<6;j++) strands += flower(x, 20+j*12, j%2 ? 5 : 6.2, j===2 ? 'tJas' : (j%2 ? 'tYel' : 'tMari'));
        strands += '<path d="M'+(x-4)+' '+(H-16)+' l4 13 l4 -13z" fill="#C0182F"/><circle cx="'+x+'" cy="'+(H-16)+'" r="2.4" fill="#F3D58A"/></g>';
      }
      const rope = '<path d="M0 7 H'+w+'" stroke="#7A5212" stroke-width="4.5"/><path d="M0 7 H'+w+'" stroke="#F3D58A" stroke-width="2" stroke-dasharray="5 3"/>';
      svg.innerHTML = defs + leaves + swags + strands + rope;
    }
    draw();
    let tt; addEventListener('resize', ()=>{ clearTimeout(tt); tt = setTimeout(draw, 120); });
  })();

  /* leaves on muhurthakaal art */
  (function(){
    const g = document.getElementById('leaves'); let s='';
    for(let i=0;i<13;i++){ const x=10+i*20, t=x/260, y=34+36*4*t*(1-t)*0.98;
      s+='<path transform="translate('+x+','+y+')" d="M0 0 C-5 10 -4 22 0 32 C4 22 5 10 0 0Z"/>'; }
    g.innerHTML = s;
  })();

  /* ---------- Petals ---------- */
  const pc = document.getElementById('petals'), px = pc.getContext('2d');
  let petals = [], raf = null;
  function sizePetals(){ const d=Math.min(devicePixelRatio||1,2); pc.width=innerWidth*d; pc.height=innerHeight*d; px.setTransform(d,0,0,d,0,0); }
  sizePetals(); addEventListener('resize', sizePetals);
  const colours = ['#F6DE97','#D4A63F','#FFB300','#C0182F','#FFF3CC','#E8A33A'];
  function burst(count, fromY){
    if(reduce) return;
    for(let i=0;i<count;i++){
      petals.push({x:Math.random()*innerWidth, y:(fromY ?? -20) - Math.random()*innerHeight*0.6,
        vy:1+Math.random()*1.8, vx:-.5+Math.random(), r:4+Math.random()*5, a:Math.random()*6.28, va:-.05+Math.random()*.1,
        sway:Math.random()*6.28, c:colours[(Math.random()*colours.length)|0]});
    }
    if(!raf) raf = requestAnimationFrame(tick);
  }
  function tick(){
    px.clearRect(0,0,innerWidth,innerHeight);
    petals = petals.filter(p=>p.y < innerHeight+30);
    for(const p of petals){
      p.sway += .03; p.y += p.vy; p.x += p.vx + Math.sin(p.sway)*.6; p.a += p.va;
      px.save(); px.translate(p.x,p.y); px.rotate(p.a); px.fillStyle=p.c; px.globalAlpha=.92;
      px.beginPath(); px.ellipse(0,0,p.r,p.r*.55,0,0,Math.PI*2); px.fill(); px.restore();
    }
    raf = petals.length ? requestAnimationFrame(tick) : (px.clearRect(0,0,innerWidth,innerHeight), null);
  }

  /* ---------- Music (generated: tanpura drone + Mohanam melody) ---------- */
  const musicBtn = document.getElementById('music');
  let ac=null, master=null, playing=false, sched=null, nextDrone=0, nextNote=0, droneStep=0, noteIdx=0;
  const SA = 146.83; // D3
  const scale = [1, 9/8, 5/4, 3/2, 5/3, 2, 9/4, 5/2];
  const tune = [[2,1],[4,1],[3,2],[2,1],[1,1],[0,2],[1,1],[2,1],[3,1],[4,1],[5,2],[4,2],[3,1],[4,1],[3,1],[2,1],[1,2],[2,2],
                [5,1],[6,1],[7,2],[6,1],[5,1],[4,2],[3,1],[4,1],[2,1],[1,1],[0,3],[-1,1]];
  const BEAT = .52;
  function pluck(f,t){
    const o=ac.createOscillator(), g=ac.createGain(), lp=ac.createBiquadFilter();
    o.type='sawtooth'; o.frequency.value=f; lp.type='lowpass'; lp.frequency.value=1100; lp.Q.value=4;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.16,t+.02); g.gain.exponentialRampToValueAtTime(.0008,t+3.2);
    o.connect(lp).connect(g).connect(master); o.start(t); o.stop(t+3.3);
  }
  function voice(f,t,dur){
    const o=ac.createOscillator(), o2=ac.createOscillator(), g=ac.createGain(), v=ac.createOscillator(), vg=ac.createGain();
    o.type='sine'; o2.type='triangle'; o.frequency.value=f; o2.frequency.value=f*2;
    v.frequency.value=5.2; vg.gain.value=f*.006; v.connect(vg); vg.connect(o.frequency); vg.connect(o2.frequency);
    const g2=ac.createGain(); g2.gain.value=.12; o2.connect(g2).connect(g); o.connect(g);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.22,t+.09); g.gain.setValueAtTime(.2,t+dur*.7); g.gain.exponentialRampToValueAtTime(.001,t+dur+.35);
    g.connect(master); [o,o2,v].forEach(x=>{x.start(t); x.stop(t+dur+.4)});
  }
  function scheduler(){
    const ahead = ac.currentTime + .4;
    while(nextDrone < ahead){ const pat=[SA*3/4, SA, SA, SA/2]; pluck(pat[droneStep%4], nextDrone); droneStep++; nextDrone += 1.05; }
    while(nextNote < ahead){ const [d,b]=tune[noteIdx%tune.length]; if(d>=0) voice(SA*2*scale[d], nextNote, b*BEAT); nextNote += b*BEAT; noteIdx++; }
  }
  function play(){
    try{
      if(!ac){ ac = new (window.AudioContext||window.webkitAudioContext)(); master = ac.createGain(); master.gain.value=0;
        const comp=ac.createDynamicsCompressor(); master.connect(comp).connect(ac.destination); }
      ac.resume(); const t=ac.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value,t); master.gain.linearRampToValueAtTime(.5,t+1.5);
      nextDrone = nextNote = t+.1; sched = setInterval(scheduler, 100); playing = true;
    }catch(e){ playing=false; }
    syncBtn();
  }
  function pause(){
    if(!ac) return; const t=ac.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value,t); master.gain.linearRampToValueAtTime(0,t+.4);
    clearInterval(sched); sched=null; playing=false; syncBtn();
  }
  function syncBtn(){ musicBtn.classList.toggle('playing',playing); musicBtn.setAttribute('aria-pressed',playing); musicBtn.setAttribute('aria-label', playing?'Pause music':'Play music'); }
  musicBtn.addEventListener('click',()=> playing?pause():play());
  document.addEventListener('visibilitychange',()=>{ if(document.hidden && playing){ pause(); musicBtn.dataset.resume='1'; } else if(!document.hidden && musicBtn.dataset.resume){ delete musicBtn.dataset.resume; play(); } });

  /* ---------- Gate ---------- */
  const gate = document.getElementById('gate');
  root.classList.add('locked');
  document.getElementById('openBtn').addEventListener('click', ()=>{
    gate.classList.add('open'); play(); musicBtn.classList.add('show'); document.body.classList.add('opened'); startReveals();
    setTimeout(()=>burst(70), reduce?0:500);
    setTimeout(()=>{ gate.classList.add('gone'); root.classList.remove('locked'); }, reduce?50:1500);
    setTimeout(()=>{ gate.remove(); }, reduce?100:2400);
  });

  /* ---------- Scratch card ---------- */
  const wrapEl = document.getElementById('scratch'), cv = document.getElementById('scratchCanvas'), cx = cv.getContext('2d', {willReadFrequently:true});
  let revealed=false, scratching=false, last=null, moves=0;
  function paintFoil(){
    if(revealed) return;
    const r = wrapEl.getBoundingClientRect(), d = Math.min(devicePixelRatio||1,2);
    cv.width = r.width*d; cv.height = r.height*d; cx.setTransform(d,0,0,d,0,0);
    const w=r.width, h=r.height;
    const g = cx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'#B8862B'); g.addColorStop(.25,'#F6DA8B'); g.addColorStop(.5,'#C9972F'); g.addColorStop(.75,'#F3D27A'); g.addColorStop(1,'#A6761F');
    cx.globalCompositeOperation='source-over'; cx.fillStyle=g; cx.fillRect(0,0,w,h);
    for(let i=0;i<w*h/90;i++){ cx.fillStyle = Math.random()<.5?'rgba(255,248,220,.35)':'rgba(120,80,10,.18)'; cx.fillRect(Math.random()*w, Math.random()*h, 1.2, 1.2); }
    cx.strokeStyle='rgba(110,70,10,.35)'; cx.lineWidth=1; cx.strokeRect(8.5,8.5,w-17,h-17);
    cx.fillStyle='#5E3A06'; cx.textAlign='center'; cx.textBaseline='middle';
    cx.font = '400 '+Math.round(Math.min(w/12,30))+'px Marcellus, serif'; cx.fillText('Scratch here', w/2, h/2-8);
    cx.font = 'italic 400 16px "EB Garamond", serif'; cx.fillStyle='rgba(94,58,6,.8)'; cx.fillText('to reveal our date', w/2, h/2+22);
  }
  function point(e){ const r=cv.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; }
  function scratchTo(p){
    cx.globalCompositeOperation='destination-out'; cx.lineCap='round'; cx.lineJoin='round'; cx.lineWidth=42;
    cx.beginPath(); cx.moveTo(last?last.x:p.x, last?last.y:p.y); cx.lineTo(p.x,p.y); cx.stroke();
    cx.beginPath(); cx.arc(p.x,p.y,21,0,Math.PI*2); cx.fill(); last=p;
    if(++moves % 6 === 0) check();
  }
  function check(){
    const {width:w,height:h} = cv; const data = cx.getImageData(0,0,w,h).data; let clear=0, total=0;
    for(let i=3;i<data.length;i+=4*24){ total++; if(data[i]<100) clear++; }
    if(clear/total > .45) reveal();
  }
  function reveal(){
    if(revealed) return; revealed=true; wrapEl.classList.add('revealed');
    document.getElementById('muhurtham').classList.add('show');
    document.getElementById('scratchHint').textContent = 'Save the date, we’ll be waiting for you.';
    const r = wrapEl.getBoundingClientRect(); burst(60, r.top);
  }
  cv.addEventListener('pointerdown', e=>{ scratching=true; last=null; cv.setPointerCapture(e.pointerId); scratchTo(point(e)); });
  cv.addEventListener('pointermove', e=>{ if(scratching) scratchTo(point(e)); });
  ['pointerup','pointercancel','pointerleave'].forEach(t=>cv.addEventListener(t,()=>{ scratching=false; last=null; }));
  document.getElementById('revealBtn').addEventListener('click', reveal);
  paintFoil();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{ if(moves===0) paintFoil(); });
  let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ if(moves===0) paintFoil(); },150); });

  /* ---------- Countdown ---------- */
  const target = Date.UTC(2026,11,13,5,0,0); // 13 Dec 2026, 10:30 IST
  const el = id=>document.getElementById(id), pad = n=>String(n).padStart(2,'0');
  function set(id,v){ const b=el(id); if(b.textContent!==v){ b.textContent=v; if(!reduce){ b.classList.remove('tick'); void b.offsetWidth; b.classList.add('tick'); } } }
  function tickCd(){
    let ms = target - Date.now();
    if(ms <= 0){
      el('tiles').outerHTML = '<p class="married">Today, we become one</p>';
      return false;
    }
    const s=Math.floor(ms/1000);
    set('cd-d',pad(Math.floor(s/86400))); set('cd-h',pad(Math.floor(s%86400/3600)));
    set('cd-m',pad(Math.floor(s%3600/60))); set('cd-s',pad(s%60));
    return true;
  }
  if(tickCd()){ const iv=setInterval(()=>{ if(!tickCd()) clearInterval(iv); },1000); }

  /* ---------- Gold dust ---------- */
  document.querySelectorAll('.dust').forEach(d=>{
    let s=''; for(let i=0;i<14;i++){
      s+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;--t:'+(3+Math.random()*4).toFixed(1)+'s;--d:-'+(Math.random()*6).toFixed(1)+'s"></i>';
    } d.innerHTML=s;
  });

  /* ---------- Scroll reveal ---------- */
  function startReveals(){
    const els=document.querySelectorAll('.reveal,.write');
    if(reduce || !('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.15, rootMargin:'0px 0px -6% 0px'});
    els.forEach(e=>io.observe(e));
  }
  if(!document.getElementById('gate')) startReveals();
})();
