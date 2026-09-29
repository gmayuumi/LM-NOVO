# LM Estética Automotiva — briefing do novo site

Este arquivo é o briefing do projeto. Leia inteiro antes de qualquer tarefa. Onde houver [CONFIRMAR], não invente: deixe marcado e me avise no fim.

## O cliente

LM Estética Automotiva, São Paulo, Zona Sul. Especialidade principal: **martelinho de ouro** (remoção de amassados sem pintura, preservando a pintura original). Também faz funilaria, pintura premium e estética completa (polimento, vitrificação, higienização interna).

Duas unidades, e isso é um diferencial real que o site atual subaproveita:
- Matriz, Santo Amaro: R. Padre José de Anchieta, 735. Estacionamento gratuito, sala de espera climatizada com café.
- Unidade de pintura, Brooklin: Av. Roque Petroni Júnior, 118. Cabine exclusiva de pintura com estufa (ambiente sem poeira, secagem controlada, cor fiel ao original de fábrica).

Horário: seg a sex 8h–18h, sáb 8h–16h.
WhatsApp: (11) 99174-0995 → https://wa.me/5511991740995
Instagram: https://www.instagram.com/lmesteticautomotivasp/
E-mail: contato@lmestetica.com.br [CONFIRMAR se ainda é esse]
Também oferece **cursos** (página própria no site atual).

## Público

Dono de carro de médio a alto padrão na Zona Sul de SP (BMW, Jeep Compass, Civic e similares), que acabou de levar um amassado ou quer o carro com cara de concessionária. Tem medo de três coisas: perder a pintura original, desvalorizar o carro e ficar dias sem ele. Decide rápido e decide pelo WhatsApp.

Os alunos dos cursos são outro público. Não misture os dois funis na home: cursos têm página própria e um link discreto na navegação.

## Objetivo do site

Uma conversão só: **abrir conversa no WhatsApp** pedindo orçamento. Cada serviço tem seu próprio link com mensagem pré-preenchida citando o serviço. Botão de WhatsApp fixo no mobile, sem cobrir conteúdo.

O argumento central é: *o amassado sai, a pintura original fica, e em horas, não em dias.* Tudo no site serve a isso ou às provas disso (antes/depois, avaliações, estrutura das unidades).

## Identidade visual

- Posicionamento: "A Arte de Restaurar a Perfeição".
- Base preta/grafite. Acento **azul**, tirado do logo novo (o cliente trocou de logo; o laranja/dourado do site atual não é mais usado). Hex exato a extrair do logo. [CONFIRMAR quando o logo chegar] Usado com parcimônia: CTAs e um ou dois momentos de destaque, não em toda seção.
- Fontes: Bebas Neue (títulos), Roboto Condensed (apoio/subtítulos), Poppins (texto corrido).
- Hero com vídeo: hoje é um corte de 12s do vídeo real de martelinho (Nissan Kicks) em `public/assets/video/hero.mp4`, com poster em imagem e fallback se o vídeo não carregar. Se eu gerar outro vídeo, ele substitui esse.

## Direção de design

- O momento memorável é a **transformação**: antes/depois interativo (slider arrastável) é o elemento em que o design gasta a ousadia. O resto fica sóbrio e disciplinado.
- Nada de kit genérico de IA: sem cards idênticos com a mesma sombra, sem rótulo em caixa-alta em cima de todo título, sem numeração 01/02/03 se o conteúdo não for sequência.
- **Animação (decisão do cliente, substitui a regra antiga de "só uma entrada no hero"):** o site deve impressionar, com animação de scroll, parallax e efeitos visuais. Linguagem de movimento única: a **luz de inspeção** (varredura de luz revelando conteúdo, barra de LED, reflexo endireitando), não fade-in genérico. Tudo desliga com `prefers-reduced-motion` e o site continua funcionando sem JS.
- Linguagem visual tirada do mundo da oficina e da pintura: reflexo em lataria, luz de inspeção, textura de metal, precisão. Não decoração abstrata.
- Mobile first. A maioria do tráfego vem do Instagram e do WhatsApp, no celular.
- Acessibilidade básica: contraste legível sobre preto, foco visível, `prefers-reduced-motion` respeitado.

## Estrutura

Mantenha as páginas: Home, Martelinho de Ouro, Serviços, Cursos, Localização. Na home, a ordem sugerida é: hero com CTA → martelinho de ouro (por que preserva o valor do carro) → antes/depois → outros serviços → as duas unidades (com o diferencial da cabine) → avaliações → CTA final. Pode propor outra ordem se tiver um motivo concreto, mas me mostre antes.

## Copy

- Português do Brasil, direto, frases curtas, voz ativa. Fale de resultado para o dono do carro, não de técnica pela técnica.
- CTAs dizem o que acontece: "Pedir orçamento no WhatsApp", não "Saiba mais".
- Reaproveite o conteúdo real do site atual. Não invente números, prazos, garantias ou prêmios.
- "+1.000 clientes atendidos" e "resposta em menos de 2 minutos" estão no site atual. [CONFIRMAR se continuam valendo]

## Provas e imagens

- **Proibido foto de banco de imagem** (Pexels, Unsplash etc.). Use só os arquivos que já existem em `assets/` do site atual e os que eu adicionar.
- Onde faltar foto real, deixe um placeholder visível e nomeado (ex.: `[FOTO: fachada Santo Amaro]`) e liste todas no fim, para eu pedir ao cliente.
- Avaliações: as do site atual (João S., Maria O., Carlos P.) não têm fonte. Não crie depoimentos novos. Monte a seção pronta para receber avaliações reais do Google, com nome e link para o perfil. [CONFIRMAR se as atuais são reais]

## Técnico e SEO (bugs do site atual para corrigir)

- `canonical` e `og:url` apontam para lmestetica.com.br, um domínio diferente. Corrigir para https://www.lmesteticautomotiva.com.br/ em todas as páginas (cada página com seu próprio canonical).
- `og:image` é uma foto do Pexels. Trocar por uma imagem real da LM (1200×630) para a prévia no WhatsApp ficar certa.
- `<title>` e `og:title` estão diferentes. Unificar.
- O ícone do Instagram no cabeçalho aponta para instagram.com genérico. Apontar para o perfil da LM.
- Adicionar dados estruturados JSON-LD tipo `AutoRepair`, uma entrada para cada unidade, com endereço, horário e telefone.
- SEO local: termos como martelinho de ouro em Santo Amaro, Brooklin, Zona Sul SP, nos títulos e descrições, de forma natural.
- Mantenha o Google Tag Manager (GTM-TBDKS699) em todas as páginas.
- Stack: **Astro** (páginas estáticas) + **GSAP/ScrollTrigger** + **Lenis**, publicado na Vercel. URLs antigas (`/martelinho.html` etc.) continuam funcionando. Imagens em WebP com `width`/`height` e `loading="lazy"` abaixo da dobra. Meta: página rápida no 4G mesmo com as animações.

## Processo

1. Antes de escrever código, me entregue um plano curto: paleta com os hex, papel de cada fonte, wireframe em ASCII da home no mobile e o que vai ser o elemento memorável. Revise o plano procurando o que parece padrão genérico e corrija antes de seguir.
2. Construa página por página, começando pela home.
3. Ao terminar cada página, tire screenshots em 390px e 1440px, revise e corrija o que estiver quebrado ou genérico.
4. No fim, me entregue: o que mudou, a lista de [CONFIRMAR] em aberto e a lista de fotos que faltam.
