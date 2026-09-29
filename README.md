# LM Estética Automotiva: site

Site novo da LM Estética Automotiva (martelinho de ouro, funilaria, pintura e estética), em Santo Amaro e no Brooklin, São Paulo.

- **Astro**: páginas estáticas, rápidas e boas para o Google.
- **GSAP + ScrollTrigger**: animações de scroll (varredura de luz, parallax, antes/depois fixo na tela).
- **Lenis**: rolagem suave.

Tudo desliga com "reduzir movimento" do celular, e o site funciona sem JavaScript.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera a pasta dist/
npm run preview  # serve a pasta dist/
```

## Onde fica cada coisa

| Caminho | O quê |
|---|---|
| `CLAUDE.md` | Briefing do projeto |
| `docs/conteudo-site-atual.md` | Todo o conteúdo do site antigo |
| `docs/pendencias.md` | O que falta confirmar com o cliente e fotos que faltam |
| `src/data/site.ts` | Telefone, WhatsApp, mensagens, endereços, horário |
| `src/pages/` | Uma página por arquivo |
| `src/components/` | Cabeçalho, rodapé, hero das páginas internas, antes/depois, processo, FAQ, avaliações, CTA final, barra do WhatsApp |
| `src/scripts/site.ts` | Interações e animações |
| `src/styles/global.css` | Cores, fontes e estilos gerais |
| `public/assets/` | Fotos (WebP), vídeos, fontes |

## Publicar

O site atual está na Vercel. Basta conectar este repositório no projeto: a Vercel reconhece o Astro sozinha. O `vercel.json` mantém as URLs antigas (`/martelinho.html` redireciona para `/martelinho`).
