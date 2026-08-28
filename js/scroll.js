/* Pituki Estudio — coreografia de scroll (GSAP + ScrollTrigger, alojado local).
   Mejora progresiva: si GSAP no cargo, la pagina funciona igual (contenido visible).
   Filosofia scrollcraft aplicada en codigo: variedad de "devices" atados al scroll,
   un pico emocional ("la idea se enciende") y respeto total a prefers-reduced-motion. */
(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Envolvemos cada palabra de la frase clave en un <span> para revelarla al scroll
  const line = document.querySelector('.sc-words');
  if(line){
    line.innerHTML = line.textContent.trim().split(/\s+/)
      .map(w => '<span class="w">' + w + '</span>').join(' ');
  }

  const mm = gsap.matchMedia();

  /* ===== Solo si el usuario NO pidio reducir movimiento ===== */
  mm.add('(prefers-reduced-motion: no-preference)', () => {

    /* 1) Portafolio cinematografico: cada tarjeta entra creciendo y aclarando,
          y se atenua levemente al salir (scrollcraft "scale & fade"). */
    gsap.utils.toArray('.port-card').forEach(card => {
      gsap.timeline({ scrollTrigger:{ trigger:card, start:'top 92%', end:'bottom 24%', scrub:0.8 } })
        .fromTo(card,
          { autoAlpha:0.35, scale:0.9,  filter:'brightness(0.68)' },
          { autoAlpha:1,    scale:1,    filter:'brightness(1)', ease:'power2.out', duration:1 })
        .to(card, { autoAlpha:0.6, filter:'brightness(0.62)', ease:'power1.in', duration:0.7 }, '>0.3');
    });

    /* 2) Reveal por palabras atado al scroll: la frase "como trabajamos"
          pasa de tenue a nitida, palabra por palabra (scrollcraft "scrubbing text"). */
    if(line){
      gsap.fromTo(line.querySelectorAll('.w'),
        { opacity:0.16 },
        { opacity:1, ease:'none', stagger:0.5,
          scrollTrigger:{ trigger:line, start:'top 80%', end:'bottom 62%', scrub:0.6 } });
    }

    /* 3) Firma: los filamentos de los kickers se "encienden" (se dibujan) al llegar. */
    gsap.utils.toArray('.kicker').forEach(k => {
      gsap.fromTo(k.querySelectorAll('.rule'),
        { scaleX:0, opacity:0.15 },
        { scaleX:1, opacity:0.55, transformOrigin:'center', ease:'power2.out',
          scrollTrigger:{ trigger:k, start:'top 88%', end:'top 55%', scrub:0.5 } });
    });

    /* 4) Parallax de profundidad: la nota del portafolio y el bloque destacado
          flotan a distinto ritmo que el fondo. */
    gsap.utils.toArray('[data-sc-parallax]').forEach(el => {
      const d = parseFloat(el.getAttribute('data-sc-parallax')) || 40;
      gsap.fromTo(el, { y:d }, { y:-d, ease:'none',
        scrollTrigger:{ trigger:el, start:'top bottom', end:'bottom top', scrub:true } });
    });

    ScrollTrigger.refresh();
  });

  /* 5) PICO EMOCIONAL — "la idea se enciende": la seccion CTA se fija mientras
        una luz calida florece detras del titular y este entra en foco.
        Solo en pantallas grandes y con movimiento permitido (fijar en movil
        perjudica el scroll tactil). */
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1000px)', () => {
    const peak = document.querySelector('.sc-peak');
    if(!peak) return;
    const bloom = peak.querySelector('.sc-bloom');
    const heading = peak.querySelector('h2');
    const tl = gsap.timeline({ scrollTrigger:{
      trigger:peak, start:'top top', end:'+=115%', pin:true, scrub:0.7 } });
    tl.fromTo(bloom, { scale:0.35, opacity:0 }, { scale:1.25, opacity:1, ease:'power2.out', duration:1 })
      .fromTo(heading, { scale:0.92, y:24, opacity:0.35 }, { scale:1, y:0, opacity:1, ease:'power2.out', duration:1 }, '<')
      .to({}, { duration:0.6 })                                     // sostener el pico
      .to(bloom, { scale:1.7, opacity:0.75, ease:'power1.inOut', duration:0.8 });
    ScrollTrigger.refresh();
  });

  // Recalcular tras cargar fuentes/imagenes (evita triggers desalineados)
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
