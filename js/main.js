/* Pituki Estudio — interacciones: scroll reveal + swap de nav segun banda */

// Reveal escalonado: cada grupo [data-stagger] convierte a sus hijos en elementos
// revelables y les asigna un retraso incremental para que entren en cascada.
document.querySelectorAll('[data-stagger]').forEach(group=>{
  const step = parseFloat(getComputedStyle(group).getPropertyValue('--stagger-step')) || 85;
  Array.from(group.children).forEach((child, i)=>{
    child.classList.add('rv');
    child.style.transitionDelay = (i * step) + 'ms';
  });
});

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('on');
      // Una vez revelado, limpiamos el delay para que hover/otros estados no se retrasen
      e.target.addEventListener('transitionend', ()=>{ e.target.style.transitionDelay = ''; }, {once:true});
      io.unobserve(e.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// swap nav logo + style depending on which band is behind it
const nav = document.getElementById('mainNav');
const navLogo = document.getElementById('navLogo');
const logos = { white:'data:image/png;base64,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', black:'data:image/png;base64,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' };
const bands = document.querySelectorAll('.band');
const navIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const dark = e.target.classList.contains('band-black');
      nav.classList.toggle('dark', dark);
      navLogo.src = dark ? logos.white : logos.black;
    }
  });
}, {rootMargin:'-50% 0px -49% 0px'});
bands.forEach(b=>navIO.observe(b));

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ---- Barra de progreso de scroll + sombra del nav (un solo rAF) ---- */
const progress = document.getElementById('progress');
let ticking = false;
function onScroll(){
  const st = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? st / max : 0;
  if(progress) progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  nav.classList.toggle('scrolled', st > 8);

  // Parallax sutil del hero: el contenido se aleja y se atenua al bajar
  if(hero && !reduce){
    const t = Math.min(st / (window.innerHeight || 800), 1);
    hero.style.transform = 'translateY(' + (t * 46).toFixed(1) + 'px)';
    hero.style.opacity = (1 - t * 0.6).toFixed(3);
  }
  ticking = false;
}
const hero = document.querySelector('.hero-enter');
if(hero && !reduce) hero.style.willChange = 'transform, opacity';
window.addEventListener('scroll', ()=>{
  if(!ticking){ requestAnimationFrame(onScroll); ticking = true; }
}, {passive:true});
onScroll();

/* ---- Spotlight que sigue el cursor en las tarjetas de servicio ---- */
if(finePointer && !reduce){
  document.querySelectorAll('.svc-tile').forEach(tile=>{
    tile.addEventListener('pointermove', e=>{
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      tile.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

/* ---- Validacion del formulario de contacto (sin backend, mensajes inline) ---- */
const form = document.getElementById('contactForm');
if(form){
  const msg = form.querySelector('.form-msg');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rules = {
    'cf-nombre':   v => v.trim().length >= 2,
    'cf-email':    v => emailRe.test(v.trim()),
    'cf-telefono': v => v.replace(/\D/g,'').length >= 7,
    'cf-pais':     v => v.trim().length >= 2,
    'cf-mensaje':  v => v.trim().length >= 10
  };
  function validateField(id){
    const input = document.getElementById(id);
    const group = input.closest('.field-group');
    const ok = rules[id](input.value);
    group.classList.toggle('invalid', !ok);
    return ok;
  }
  // Re-valida en vivo una vez que el campo ya fue marcado como invalido
  Object.keys(rules).forEach(id=>{
    const input = document.getElementById(id);
    input.addEventListener('input', ()=>{
      if(input.closest('.field-group').classList.contains('invalid')) validateField(id);
    });
  });
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const results = Object.keys(rules).map(validateField);
    if(msg){ msg.className = 'form-msg'; msg.textContent = ''; }
    if(results.includes(false)){
      const firstBad = form.querySelector('.field-group.invalid input, .field-group.invalid textarea');
      if(firstBad) firstBad.focus();
      if(msg){ msg.textContent = 'Revisa los campos marcados antes de enviar.'; msg.classList.add('err','show'); }
      return;
    }
    // Conexion sin backend: el formulario llega por correo via FormSubmit (AJAX).
    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('is-loading'); btn.textContent = 'Enviando…';
    if(msg){ msg.className = 'form-msg'; msg.textContent = ''; }
    const nombreVal = document.getElementById('cf-nombre').value.trim();
    const payload = {
      nombre:   nombreVal,
      email:    document.getElementById('cf-email').value.trim(),
      telefono: document.getElementById('cf-telefono').value.trim(),
      pais:     document.getElementById('cf-pais').value.trim(),
      mensaje:  document.getElementById('cf-mensaje').value.trim(),
      _subject: 'Nuevo mensaje desde pituki-estudio.vercel.app',
      _template: 'table',
      // Auto-respuesta de agradecimiento que le llega a quien escribe
      _autoresponse:
        '¡Gracias por escribir a Pituki Estudio, ' + nombreVal + '!\n\n' +
        'Recibimos tu mensaje y nuestro equipo lo revisará muy pronto. Te contactaremos ' +
        'para conversar sobre tu marca y cómo acompañarte con creatividad con propósito.\n\n' +
        'Si prefieres algo más directo, escríbenos por WhatsApp al +502 5131 5816.\n\n' +
        '— El equipo de Pituki Estudio\n"Creatividad con propósito"'
    };
    const restore = () => { btn.classList.remove('is-loading'); btn.textContent = 'Enviar mensaje'; };
    fetch('https://formsubmit.co/ajax/zulgag@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(r => { if(!r.ok) throw new Error('http'); return r.json(); })
    .then(() => {
      form.reset(); restore();
      if(msg){ msg.textContent = 'Gracias, recibimos tu mensaje. Te escribimos muy pronto.'; msg.classList.add('ok','show'); }
    })
    .catch(() => {
      restore();
      if(msg){ msg.textContent = 'No se pudo enviar ahora. Escríbenos directo por WhatsApp al +502 5131 5816.'; msg.classList.add('err','show'); }
    });
  });
}

/* ---- Logo interactivo del hero: "el foco se enciende segun donde esta el mouse" ----
   Un solo loop rAF interpola (spring/lerp) la intensidad de luz --lit y la posicion
   del brillo hacia el cursor. Al cargar hace un "power-on" con parpadeo. ---- */
(function heroLogo(){
  const icon = document.querySelector('.icon-mark');
  const heroSec = icon && icon.closest('section');
  if(!icon || !heroSec) return;

  // Envolvemos el icono en un escenario con una capa de brillo (sin tocar el base64)
  const stage = document.createElement('div'); stage.className = 'logo-stage';
  const glow = document.createElement('span'); glow.className = 'logo-glow'; glow.setAttribute('aria-hidden','true');
  icon.parentNode.insertBefore(stage, icon);
  stage.appendChild(glow); stage.appendChild(icon);

  const IDLE = 0.16;
  let lit = 0, target = 0, gx = 50, gy = 44, tgx = 50, tgy = 44, hovering = false;

  const apply = () => {
    stage.style.setProperty('--lit', lit.toFixed(3));
    stage.style.setProperty('--gx', gx.toFixed(1) + '%');
    stage.style.setProperty('--gy', gy.toFixed(1) + '%');
  };

  if(reduce){ lit = 0.22; apply(); return; }   // respaldo estatico

  heroSec.addEventListener('pointermove', e=>{
    const r = icon.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const near = Math.max(0, 1 - dist / (r.width * 2.4));   // 1 cerca del foco, 0 lejos
    hovering = true;
    target = IDLE + near * 0.95;
    const sr = stage.getBoundingClientRect();
    tgx = ((e.clientX - sr.left) / sr.width) * 100;
    tgy = ((e.clientY - sr.top) / sr.height) * 100;
  });
  heroSec.addEventListener('pointerleave', ()=>{ hovering = false; target = IDLE; tgx = 50; tgy = 44; });

  const loop = (t)=>{
    const breath = hovering ? 0 : Math.sin(t / 900) * 0.05;   // respiracion tenue en reposo
    const tgt = Math.min(1.2, target + breath);
    lit += (tgt - lit) * 0.12;      // lerp -> sensacion de resorte
    gx  += (tgx - gx) * 0.16;
    gy  += (tgy - gy) * 0.16;
    apply();
    requestAnimationFrame(loop);
  };

  // Power-on: parpadeo de encendido y luego reposo
  [[90,0],[150,0.9],[220,0.1],[300,1.15],[380,0.28],[500,1],[720,IDLE]]
    .forEach(([ms,v]) => setTimeout(()=>{ if(!hovering) target = v; }, ms));
  requestAnimationFrame(loop);
})();

/* ---- Botones primarios "magneticos": se inclinan levemente hacia el cursor ---- */
if(finePointer && !reduce){
  document.querySelectorAll('.btn-primary').forEach(btn=>{
    btn.addEventListener('pointermove', e=>{
      const r = btn.getBoundingClientRect();
      const mx = (e.clientX - (r.left + r.width/2)) / r.width;
      const my = (e.clientY - (r.top + r.height/2)) / r.height;
      // incluye el -2px del hover para no perder la elevacion
      btn.style.transform = 'translate(' + (mx*6).toFixed(1) + 'px,' + (my*6 - 2).toFixed(1) + 'px)';
    });
    btn.addEventListener('pointerleave', ()=>{ btn.style.transform = ''; });
  });
}
