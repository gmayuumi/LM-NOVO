// Interações do site (funcionam sempre) + movimento (só sem reduced-motion).
import type LenisTipo from 'lenis';

declare global {
  interface Window {
    __lmMov?: boolean;
    __lenis?: LenisTipo;
  }
}

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const economiaDados = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const telaGrande = () => window.matchMedia('(min-width: 60rem)').matches;

/* ---------- topo: vira vidro fosco depois de rolar ---------- */
function iniciarTopo() {
  const topo = document.querySelector<HTMLElement>('[data-topo]');
  if (!topo) return;
  const atualizar = () => topo.toggleAttribute('data-solido', window.scrollY > 24);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

/* ---------- menu em tela cheia (celular) ---------- */
function iniciarMenu() {
  const botao = document.querySelector<HTMLButtonElement>('[data-menu-botao]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const rotulo = document.querySelector('[data-menu-rotulo]');
  if (!botao || !menu) return;

  const aberto = () => botao.getAttribute('aria-expanded') === 'true';
  const definir = (abrir: boolean, devolverFoco = false) => {
    botao.setAttribute('aria-expanded', String(abrir));
    menu.toggleAttribute('data-aberto', abrir);
    if (rotulo) rotulo.textContent = abrir ? 'Fechar' : 'Menu';
    document.documentElement.style.overflow = abrir ? 'hidden' : '';
    if (abrir) {
      window.__lenis?.stop();
      // espera o menu ficar visível para mover o foco
      requestAnimationFrame(() => menu.querySelector<HTMLElement>('a[href]')?.focus());
    } else {
      window.__lenis?.start();
      if (devolverFoco) botao.focus();
    }
  };

  botao.addEventListener('click', () => definir(!aberto()));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => definir(false)));
  document.addEventListener('keydown', (e) => {
    if (!aberto()) return;
    if (e.key === 'Escape') {
      definir(false, true);
      return;
    }
    if (e.key === 'Tab') {
      // mantém o foco dentro do menu aberto
      const focaveis = [botao, ...menu.querySelectorAll<HTMLElement>('a[href]')];
      const i = focaveis.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        focaveis[focaveis.length - 1].focus();
      } else if (!e.shiftKey && i === focaveis.length - 1) {
        e.preventDefault();
        focaveis[0].focus();
      }
    }
  });
  window.matchMedia('(min-width: 60rem)').addEventListener('change', (e) => {
    if (e.matches && aberto()) definir(false);
  });
}

/* ---------- vídeo do hero (+ luz ambiente no desktop) ---------- */
function iniciarVideo() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const botao = document.querySelector<HTMLButtonElement>('[data-hero-pausa]');
  const ambiente = document.querySelector<HTMLVideoElement>('[data-hero-ambiente]');
  if (!video || !botao) return;
  const rotulo = botao.querySelector('[data-rotulo]');
  let pausadoPeloUsuario = reduzMovimento || economiaDados;

  const mostrar = (tocando: boolean) => {
    botao.hidden = false;
    botao.toggleAttribute('data-pausado', !tocando);
    if (rotulo) rotulo.textContent = tocando ? 'Pausar vídeo' : 'Tocar vídeo';
  };
  const tocarAmbiente = () => {
    if (!ambiente || !telaGrande()) return;
    const fonte = ambiente.querySelector<HTMLSourceElement>('source[data-src]');
    if (fonte && !fonte.getAttribute('src')) {
      fonte.src = fonte.dataset.src ?? '';
      ambiente.load();
    }
    ambiente.play().catch(() => {});
  };
  const tocar = () => {
    video.preload = 'auto';
    video.play().then(() => mostrar(true)).catch(() => mostrar(false));
    tocarAmbiente();
  };
  const pausar = () => {
    video.pause();
    ambiente?.pause();
  };

  // Se o vídeo não carregar, o poster continua e o botão some.
  video.querySelector('source')?.addEventListener('error', () => (botao.hidden = true));

  botao.addEventListener('click', () => {
    if (video.paused) {
      pausadoPeloUsuario = false;
      tocar();
    } else {
      pausadoPeloUsuario = true;
      pausar();
      mostrar(false);
    }
  });

  if (pausadoPeloUsuario) mostrar(false);
  else tocar();

  // Economiza bateria: pausa quando o hero sai da tela.
  new IntersectionObserver(([entrada]) => {
    if (pausadoPeloUsuario) return;
    if (entrada.isIntersecting) {
      video.play().catch(() => {});
      tocarAmbiente();
    } else pausar();
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
    const palco = el.closest<HTMLElement>('[data-palco]');

    const definir = (v: number) => {
      const pos = Math.min(100, Math.max(0, v));
      el.style.setProperty('--pos', `${pos}%`);
      palco?.style.setProperty('--ad', (pos / 100).toFixed(3)); // acende "Antes" ou "Depois"
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

/* ================================================================
   MOVIMENTO
   ================================================================ */
async function iniciarMovimento(comparadores: Comparador[]) {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  document.documentElement.classList.add('mov');
  window.__lmMov = true;

  // Rolagem suave
  const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: false });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const mm = gsap.matchMedia();

  // Régua de LED no topo
  gsap.to('.progresso', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* ---- Hero: as luzes da oficina acendem, a vitrine aparece, o título brilha ---- */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const tubos = gsap.utils.toArray<SVGLineElement>('.teto .tubo', hero);
    const linhas = gsap.utils.toArray<HTMLElement>('.hero__linha > span', hero);
    const intro = gsap.timeline();
    if (tubos.length) {
      gsap.set(tubos, { opacity: 0.05 });
      intro.to(
        tubos,
        { keyframes: { opacity: [0.05, 1, 0.2, 1], easeEach: 'none' }, duration: 0.45, stagger: { each: 0.006, from: 'random' } },
        0,
      );
    }
    intro.fromTo(
      '[data-hero-vitrine]',
      { autoAlpha: 0, scale: telaGrande() ? 0.94 : 1.08 },
      { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
      0.35,
    );
    if (linhas.length) {
      gsap.set(linhas, { yPercent: 110, visibility: 'visible' });
      intro
        .to(linhas, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 0.6)
        .fromTo(linhas, { '--brilho': '100%' }, { '--brilho': '0%', duration: 1.5, stagger: 0.15, ease: 'power2.inOut' }, 1.05);
    }
    intro.fromTo(
      '.hero__lead, .hero__acoes, .hero__prova',
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
      1.0,
    );

    // Ao rolar: o texto sobe mais rápido que a vitrine (parallax) e o teto se afasta
    const saida = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-conteudo]', { yPercent: -20, opacity: 0.1, ease: 'none', scrollTrigger: saida });
    gsap.to('.hero__video', { scale: 1.08, yPercent: 5, ease: 'none', scrollTrigger: saida });
    gsap.to('.hero__teto', { yPercent: -30, opacity: 0.15, ease: 'none', scrollTrigger: saida });
  }

  /* ---- Títulos: sobem e a luz passa pelo cromado ---- */
  gsap.utils.toArray<HTMLElement>('[data-titulo]').forEach((titulo) => {
    const brilho = titulo.querySelector<HTMLElement>('[data-brilho]');
    const tl = gsap
      .timeline({ scrollTrigger: { trigger: titulo, start: 'top 86%', once: true } })
      .from(titulo, { y: 48, autoAlpha: 0, duration: 1, ease: 'power3.out' });
    if (brilho) tl.fromTo(brilho, { '--brilho': '100%' }, { '--brilho': '0%', duration: 1.6, ease: 'power2.inOut' }, 0.25);
  });

  /* ---- Martelinho em 3 passos: tela parada, a luz troca a foto ---- */
  const palcoProcesso = document.querySelector<HTMLElement>('[data-processo-palco]');
  if (palcoProcesso) {
    const passos = gsap.utils.toArray<HTMLElement>('.passo', palcoProcesso);
    const figuras = passos.map((p) => p.querySelector<HTMLElement>('.passo__figura')!);
    const textos = passos.map((p) => p.querySelector<HTMLElement>('.passo__texto')!);
    const ambientes = gsap.utils.toArray<HTMLElement>('.processo__ambiente img', palcoProcesso);
    const contador = gsap.utils.toArray<HTMLElement>('.processo__contador span', palcoProcesso);

    mm.add({ grande: '(min-width: 60rem)', pequeno: '(max-width: 59.99rem)' }, (contexto) => {
      const grande = Boolean(contexto.conditions?.grande);
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: palcoProcesso,
          start: 'top top',
          end: `+=${passos.length * 85}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      tl.to({}, { duration: 0.4 });
      for (let i = 1; i < passos.length; i++) {
        const t = tl.duration();
        tl.fromTo(figuras[i], { '--corte': '100%', '--luz': 1 }, { '--corte': '0%', duration: 1 }, t)
          .to(figuras[i], { '--luz': 0, duration: 0.25 }, t + 0.8)
          .fromTo(contador[i], { '--cheio': 0 }, { '--cheio': 1, duration: 1, ease: 'none' }, t);
        if (grande) {
          tl.to(textos[i - 1], { opacity: 0.26, duration: 0.5 }, t).to(textos[i], { opacity: 1, duration: 0.5 }, t + 0.35);
          if (ambientes[i]) tl.to(ambientes[i], { opacity: 1, duration: 1 }, t);
        } else {
          tl.to(textos[i - 1], { autoAlpha: 0, y: -16, duration: 0.35 }, t).fromTo(
            textos[i],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            t + 0.55,
          );
        }
        tl.to({}, { duration: 0.4 });
      }
    });
  }

  /* ---- Antes/depois: a tela para e a barra de luz atravessa o carro ---- */
  const palcoAD = document.querySelector<HTMLElement>('[data-palco]');
  const comparador = comparadores.find((c) => palcoAD?.contains(c.el));
  if (palcoAD && comparador) {
    const estado = { pos: 94 };
    comparador.definir(estado.pos);
    gsap.to(estado, {
      pos: 6,
      ease: 'power1.inOut',
      onUpdate: () => comparador.definir(estado.pos),
      scrollTrigger: { trigger: palcoAD, start: 'top top', end: '+=140%', pin: true, scrub: 0.6, anticipatePin: 1 },
    });
  }

  /* ---- Vitrine de serviços: desliza para o lado (desktop) ---- */
  const palcoVitrine = document.querySelector<HTMLElement>('[data-vitrine]');
  const trilho = palcoVitrine?.querySelector<HTMLElement>('[data-trilho]');
  const lista = palcoVitrine?.querySelector<HTMLElement>('[data-lista]');
  const barraVitrine = palcoVitrine?.querySelector<HTMLElement>('[data-vitrine-progresso]');
  if (palcoVitrine && trilho && lista) {
    mm.add('(min-width: 60rem)', () => {
      const distancia = () => {
        const estilo = getComputedStyle(trilho);
        const util = trilho.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
        return Math.max(0, lista.scrollWidth - util);
      };
      const deslize = gsap.to(lista, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: palcoVitrine,
          start: 'top top',
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            if (barraVitrine) barraVitrine.style.transform = `scaleX(${st.progress})`;
          },
        },
      });
      gsap.utils.toArray<HTMLElement>('.cartao > img', lista).forEach((foto) => {
        gsap.fromTo(
          foto,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: foto.parentElement, containerAnimation: deslize, start: 'left right', end: 'right left', scrub: true },
          },
        );
      });
      // Teclado: ao focar um link fora da tela, rola até o cartão dele
      const aoFocar = (e: FocusEvent) => {
        const cartao = (e.target as HTMLElement).closest<HTMLElement>('.cartao');
        const st = deslize.scrollTrigger;
        if (!cartao || !st) return;
        const x = Math.min(cartao.offsetLeft - lista.offsetLeft, distancia());
        lenis.scrollTo(st.start + x, { immediate: true });
      };
      lista.addEventListener('focusin', aoFocar);
      return () => lista.removeEventListener('focusin', aoFocar);
    });
  }

  /* ---- Parallax nas fotos reais ---- */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((moldura) => {
    const foto = moldura.querySelector('img');
    if (!foto) return;
    gsap.fromTo(
      foto,
      { yPercent: -5, scale: 1.14 },
      { yPercent: 5, scale: 1.14, ease: 'none', scrollTrigger: { trigger: moldura, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  /* ---- Cabine: as luzes acendem com a piscada de lâmpada ---- */
  gsap.utils.toArray<HTMLElement>('[data-acender] img').forEach((foto) => {
    gsap.set(foto, { filter: 'brightness(0.2) saturate(0.4)' });
    gsap
      .timeline({ scrollTrigger: { trigger: foto.parentElement, start: 'top 65%', once: true } })
      .to(foto, { filter: 'brightness(0.95) saturate(0.9)', duration: 0.07 })
      .to(foto, { filter: 'brightness(0.3) saturate(0.5)', duration: 0.08 })
      .to(foto, { filter: 'brightness(1.08) saturate(1)', duration: 0.06 }, '+=0.12')
      .to(foto, { filter: 'brightness(0.55) saturate(0.8)', duration: 0.05 })
      .to(foto, { filter: 'brightness(1) saturate(1)', duration: 0.6, ease: 'power2.out' });
  });

  /* ---- Varredura de luz genérica (páginas internas) ---- */
  gsap.utils.toArray<HTMLElement>('[data-varredura]').forEach((el) => {
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      .fromTo(el, { '--rev': '0%', '--luz': 1 }, { '--rev': '100%', duration: 1.05, ease: 'power2.inOut' })
      .to(el, { '--luz': 0, duration: 0.4, ease: 'power1.in' }, 0.62);
  });

  /* ---- Selo do CTA: gira até o lugar e o reflexo cromado passa ---- */
  const selo = document.querySelector<HTMLElement>('[data-selo]');
  if (selo) {
    gsap.fromTo(
      selo,
      { rotate: -18, scale: 0.84, '--brilho': '100%' },
      {
        rotate: 0,
        scale: 1,
        '--brilho': '0%',
        ease: 'none',
        scrollTrigger: { trigger: selo, start: 'top bottom', end: 'center 45%', scrub: true },
      },
    );
  }

  // Gatilhos criados fora da ordem da página: ordena e recalcula
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

iniciarTopo();
iniciarMenu();
iniciarVideo();
iniciarBarraWhats();
const comparadores = iniciarComparadores();
if (!reduzMovimento) {
  iniciarMovimento(comparadores).catch(() => document.documentElement.classList.remove('mov'));
}
