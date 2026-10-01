// Interações do site (funcionam sempre) + aparecer ao rolar (só sem reduced-motion).
// Sem GSAP nem rolagem suave: nada trava a tela na rolagem.

declare global {
  interface Window {
    __lmMov?: boolean;
  }
}

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const economiaDados = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

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
      // espera o menu ficar visível para mover o foco
      requestAnimationFrame(() => menu.querySelector<HTMLElement>('a[href]')?.focus());
    } else if (devolverFoco) botao.focus();
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

/* ---------- vídeos curtos que tocam sozinhos quando aparecem ---------- */
function iniciarVideosLoop() {
  document.querySelectorAll<HTMLElement>('[data-video-auto]').forEach((caixa) => {
    const video = caixa.querySelector('video');
    const botao = caixa.querySelector<HTMLButtonElement>('button');
    if (!video || !botao) return;
    // Menos movimento ou economia de dados: fica com os controles do navegador.
    if (reduzMovimento || economiaDados) return;
    video.controls = false;
    botao.hidden = false;
    const rotulo = botao.querySelector('[data-rotulo]');
    let pausadoPeloUsuario = false;
    const mostrar = (tocando: boolean) => {
      botao.toggleAttribute('data-pausado', !tocando);
      if (rotulo) rotulo.textContent = tocando ? 'Pausar vídeo' : 'Tocar vídeo';
    };
    botao.addEventListener('click', () => {
      pausadoPeloUsuario = !video.paused;
      if (video.paused) video.play().then(() => mostrar(true)).catch(() => mostrar(false));
      else {
        video.pause();
        mostrar(false);
      }
    });
    new IntersectionObserver(
      ([entrada]) => {
        if (pausadoPeloUsuario) return;
        if (entrada.isIntersecting) video.play().then(() => mostrar(true)).catch(() => mostrar(false));
        else video.pause();
      },
      { rootMargin: '120px 0px' },
    ).observe(caixa);
  });
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
function iniciarComparadores() {
  document.querySelectorAll<HTMLElement>('[data-comparar]').forEach((el) => {
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
  });
}

/* ---------- aparecer ao rolar ---------- */
function iniciarRevelar() {
  const alvos = document.querySelectorAll<HTMLElement>('[data-revelar]');
  const io = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visivel');
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  const comecar = () => alvos.forEach((el) => io.observe(el));
  // Com o preloader na tela, espera ele sair para o topo aparecer junto com a luz
  const html = document.documentElement;
  if (html.classList.contains('carregando') && !html.classList.contains('saindo')) {
    document.addEventListener('lm:pronto', comecar, { once: true });
  } else comecar();
}

iniciarTopo();
iniciarMenu();
iniciarVideosLoop();
iniciarBarraWhats();
iniciarComparadores();
// Avisa o <head> que o script subiu (senão ele tira .mov em 3,5s).
window.__lmMov = true;
if (!reduzMovimento) iniciarRevelar();
