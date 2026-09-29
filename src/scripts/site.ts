// Interações do site (funcionam sempre) + movimento (só sem reduced-motion).

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const economiaDados = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/* ---------- menu do celular ---------- */
function iniciarMenu() {
  const botao = document.querySelector<HTMLButtonElement>('.menu-botao');
  const nav = document.getElementById('navegacao');
  if (!botao || !nav) return;

  const definir = (aberto: boolean) => {
    botao.setAttribute('aria-expanded', String(aberto));
    nav.toggleAttribute('data-aberto', aberto);
  };
  botao.addEventListener('click', () => definir(botao.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => definir(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      definir(false);
      botao.focus();
    }
  });
}

/* ---------- vídeo do hero ---------- */
function iniciarVideo() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const botao = document.querySelector<HTMLButtonElement>('[data-hero-pausa]');
  if (!video || !botao) return;
  const rotulo = botao.querySelector('[data-rotulo]');
  let pausadoPeloUsuario = reduzMovimento || economiaDados;

  const mostrar = (tocando: boolean) => {
    botao.hidden = false;
    botao.toggleAttribute('data-pausado', !tocando);
    if (rotulo) rotulo.textContent = tocando ? 'Pausar vídeo' : 'Tocar vídeo';
  };
  const tocar = () => {
    video.preload = 'auto';
    video.play().then(() => mostrar(true)).catch(() => mostrar(false));
  };

  // Se o vídeo não carregar, o poster continua e o botão some.
  video.querySelector('source')?.addEventListener('error', () => (botao.hidden = true));

  botao.addEventListener('click', () => {
    if (video.paused) {
      pausadoPeloUsuario = false;
      tocar();
    } else {
      pausadoPeloUsuario = true;
      video.pause();
      mostrar(false);
    }
  });

  if (pausadoPeloUsuario) mostrar(false);
  else tocar();

  // Economiza bateria: pausa quando o hero sai da tela.
  new IntersectionObserver(([entrada]) => {
    if (pausadoPeloUsuario) return;
    if (entrada.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }).observe(video);
}

/* ---------- barra fixa do WhatsApp (celular) ---------- */
function iniciarBarraWhats() {
  const barra = document.querySelector<HTMLElement>('[data-barra-whats]');
  const ctas = document.querySelectorAll<HTMLElement>('[data-cta-principal]');
  if (!barra || !ctas.length) return;
  const visiveis = new Set<Element>();
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
    barra.toggleAttribute('data-oculta', visiveis.size > 0);
  });
  ctas.forEach((c) => io.observe(c));
}

/* ---------- antes/depois ---------- */
type Comparador = { el: HTMLElement; definir: (v: number) => void };

function iniciarComparadores(): Comparador[] {
  return [...document.querySelectorAll<HTMLElement>('[data-comparar]')].map((el) => {
    const quadro = el.querySelector<HTMLElement>('.comparar__quadro')!;
    const controle = el.querySelector<HTMLInputElement>('.comparar__controle')!;

    const definir = (v: number) => {
      const pos = Math.min(100, Math.max(0, v));
      el.style.setProperty('--pos', `${pos}%`);
      controle.value = String(Math.round(pos));
      controle.setAttribute('aria-valuetext', `${Math.round(pos)}% mostrando o antes`);
    };
    const usado = () => el.classList.add('comparar--usado');
    const posicao = (x: number) => {
      const r = quadro.getBoundingClientRect();
      return ((x - r.left) / r.width) * 100;
    };

    // Mouse: move ao clicar e arrastar. Toque: só arrasto horizontal ou
    // toque rápido; arrasto vertical continua rolando a página.
    let ativo = false;
    let moveu = false;
    let inicioX = 0;
    let tipo = '';
    quadro.addEventListener('pointerdown', (e) => {
      ativo = true;
      moveu = false;
      inicioX = e.clientX;
      tipo = e.pointerType;
      if (tipo !== 'touch') {
        definir(posicao(e.clientX));
        usado();
      }
      quadro.setPointerCapture?.(e.pointerId);
    });
    quadro.addEventListener('pointermove', (e) => {
      if (!ativo) return;
      if (Math.abs(e.clientX - inicioX) > 4) moveu = true;
      if (tipo !== 'touch' || moveu) {
        definir(posicao(e.clientX));
        usado();
      }
    });
    quadro.addEventListener('pointerup', (e) => {
      if (ativo && tipo === 'touch' && !moveu) {
        definir(posicao(e.clientX));
        usado();
      }
      ativo = false;
    });
    quadro.addEventListener('pointercancel', () => (ativo = false));
    controle.addEventListener('input', () => {
      definir(Number(controle.value));
      usado();
    });

    definir(Number(controle.value));
    return { el, definir };
  });
}

/* ---------- movimento: luz de inspeção, parallax, cena fixa ---------- */
async function iniciarMovimento(comparadores: Comparador[]) {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const raiz = document.documentElement;
  raiz.classList.add('mov');
  (window as Window & { __lmMov?: boolean }).__lmMov = true;

  // Rolagem suave
  const lenis = new Lenis({ lerp: 0.12, anchors: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Régua de LED no topo mostrando o quanto já rolou
  gsap.to('.progresso', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* Hero: linhas sobem, a luz passa pelo título, o resto chega junto */
  const linhas = gsap.utils.toArray<HTMLElement>('.hero__linha > span');
  if (linhas.length) {
    gsap.set(linhas, { yPercent: 115, visibility: 'visible' });
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .to(linhas, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.1)
      .fromTo(
        linhas,
        { '--brilho': '100%' },
        { '--brilho': '0%', duration: 1.5, ease: 'power2.inOut', stagger: 0.18 },
        0.55,
      )
      .fromTo(
        '.hero__lead, .hero__acoes, .hero__prova',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
        0.5,
      )
      .from('.hero__video', { scale: 1.08, duration: 1.8, ease: 'power2.out' }, 0);

    // Ao rolar, o texto sobe mais rápido que o vídeo (parallax)
    const hero = document.querySelector('.hero');
    gsap.to('.hero__conteudo', {
      yPercent: -22,
      opacity: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__video', {
      scale: 1.14,
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* Varredura de luz: revela títulos, fatos e fotos */
  gsap.utils.toArray<HTMLElement>('[data-varredura]').forEach((el) => {
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      .fromTo(el, { '--rev': '0%', '--luz': 1 }, { '--rev': '100%', duration: 1.05, ease: 'power2.inOut' })
      // a luz apaga antes de chegar à borda, para não sobrar uma linha solta
      .to(el, { '--luz': 0, duration: 0.4, ease: 'power1.in' }, 0.62);
  });

  /* Parallax nas fotos reais */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((moldura) => {
    const img = moldura.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -5, scale: 1.12 },
      {
        yPercent: 5,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: moldura, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* Cabine: as luzes acendem (com a piscada de lâmpada) quando ela entra na tela */
  gsap.utils.toArray<HTMLElement>('[data-acender] img').forEach((img) => {
    gsap.set(img, { filter: 'brightness(0.22) saturate(0.4)' });
    gsap
      .timeline({ scrollTrigger: { trigger: img, start: 'top 72%', once: true } })
      .to(img, { filter: 'brightness(0.95) saturate(0.9)', duration: 0.07 })
      .to(img, { filter: 'brightness(0.35) saturate(0.5)', duration: 0.08 })
      .to(img, { filter: 'brightness(1.05) saturate(1)', duration: 0.06 }, '+=0.12')
      .to(img, { filter: 'brightness(0.6) saturate(0.8)', duration: 0.05 })
      .to(img, { filter: 'brightness(1) saturate(1)', duration: 0.6, ease: 'power2.out' });
  });

  /* Antes/depois: a tela fica parada e a barra de luz atravessa o carro */
  const palco = document.querySelector<HTMLElement>('[data-palco]');
  const comparador = comparadores.find((c) => palco?.contains(c.el));
  if (palco && comparador) {
    const estado = { pos: 94 };
    comparador.definir(estado.pos);
    gsap.to(estado, {
      pos: 6,
      ease: 'power1.inOut',
      onUpdate: () => comparador.definir(estado.pos),
      scrollTrigger: {
        trigger: palco,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });
  }

  /* Selo do CTA: gira até o lugar e o reflexo cromado passa */
  const selo = document.querySelector<HTMLElement>('[data-selo]');
  if (selo) {
    gsap.fromTo(
      selo,
      { rotate: -16, scale: 0.84, '--brilho': '100%' },
      {
        rotate: 0,
        scale: 1,
        '--brilho': '0%',
        ease: 'none',
        scrollTrigger: { trigger: selo, start: 'top bottom', end: 'center 45%', scrub: true },
      },
    );
  }

  // Fontes e imagens mudam alturas: recalcula os gatilhos
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

iniciarMenu();
iniciarVideo();
iniciarBarraWhats();
const comparadores = iniciarComparadores();
if (!reduzMovimento) {
  iniciarMovimento(comparadores).catch(() => document.documentElement.classList.remove('mov'));
}
