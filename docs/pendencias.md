# Pendências do site novo

Atualizado a cada página entregue. Última atualização: páginas Martelinho de Ouro, Serviços, Localização e Cursos. No código, tudo o que depende do cliente está marcado com `[CONFIRMAR]`.

## Confirmar com o cliente

Decisão do cliente: **tudo o que está no site antigo vale** (e-mail, "+1.000 clientes", "resposta em menos de 2 minutos", "até 60% mais barato", garantia, horário para as duas unidades, depoimentos, textos de serviços e cursos). Motos confirmadas pelo próprio cliente. Continua em aberto só o que não está no site antigo:

| # | O quê | Onde aparece | Situação hoje |
|---|---|---|---|
| 1 | Link do perfil da LM no Google | Botão "Ver avaliações no Google" (Home e Serviços) | Hoje abre uma busca no Google Maps |
| 2 | CEP do Brooklin | Rodapé, Localização, dados estruturados | Em branco |
| 3 | De qual unidade são as fachadas? | Home (Unidades), Localização (topo e "Conheça nossa estrutura") | `hero2.jpg` foi usada como Santo Amaro. `localhero.png` aparece só como "Fachada", sem unidade |
| 4 | A cabine das fotos (paredes de vidro, teto de LED hexagonal) é a do Brooklin? | Home (Unidades), Serviços (Pintura premium), Localização (estrutura), imagem de compartilhamento | Assumido que sim, porque o site antigo diz que a cabine fica no Brooklin |

Informativo, sem pendência:
- Vídeo do hero: corte de 12s do vídeo real do martelinho (Nissan Kicks). Se for gerado outro vídeo, é só trocar `public/assets/video/hero.mp4`.
- `video2.mp4` (animação genérica de carro) não foi usado: não mostra o trabalho da LM e tem qualidade baixa.
- O cartão "Lavagem detalhada" virou "Estética completa", com o texto literal do site antigo.
- Mapas da Localização: usam o link de incorporação do Google Maps, sem chave de API. Não deu para vê-los carregando aqui (a rede deste ambiente bloqueia o Google Maps). Conferir na Vercel.
- Cursos: o site antigo não tinha preço, carga horária, datas nem nome dos professores, e o site novo também não tem. Se o cliente quiser, dá para acrescentar.
- A página Cursos tem funil próprio: botão "Falar com consultor" no topo e na barra fixa, com as mensagens de WhatsApp do site antigo.

## Fotos que faltam

Cada uma aparece no site como um quadro tracejado com o nome entre colchetes.

| Foto | Onde entra |
|---|---|
| **Mais pares de antes e depois, do mesmo ângulo e com a mesma luz.** Hoje só há 1 par bom (Nissan Kicks, tirado do vídeo). É a prova mais forte do site. Dica para o cliente: celular apoiado no mesmo lugar, mesma distância, antes e depois do reparo | Home (antes e depois), Martelinho (resultados) |
| **Sala de espera** (o site cita Wi-Fi, TV e café, mas não há foto) | Localização (estrutura) |
| **Turma em aula prática na oficina** | Cursos |
| **Certificado de conclusão da LM** | Cursos |
| **Fachada do Brooklin** | Localização (hoje sem foto própria) |
| **Fachada de Santo Amaro em resolução maior** (a atual tem 1069 px de largura) | Home, Localização |
| Opcional: equipe trabalhando, com rosto, para dar confiança | Home, Cursos |
| Opcional: fotos da oficina em resolução maior (`local1.png` e `car1.png` têm menos de 500 px) | Localização (estrutura) |

## Mídia recebida e onde foi usada

| Arquivo recebido | Uso |
|---|---|
| `logo-lm-full.png` | Cabeçalho, rodapé, CTA final, favicon, imagem de compartilhamento. Cores do site tiradas dele |
| `video mostrando martelinho de ouro - indispensavel.mp4` | Hero da home (corte de 12s), par do antes/depois, fotos dos passos do processo e do técnico, topo de Cursos. Vídeo inteiro (50s, com som) na página Martelinho |
| `processo de moto - indispensaverl.mp4` | Serviços: corte de 10s sem som, tocando em loop em "Estética completa" ("Também para motos") |
| Fotos do WhatsApp (Toyota Yaris, cabine) | Unidade Brooklin, serviço de funilaria, imagem de compartilhamento |
| Fotos do WhatsApp (espuma: Mercedes e Defender) | Serviço de estética |
| `hero2.jpg` (fachada) | Unidade Santo Amaro |
| `serv1.jpg` (Porsche 911) | Serviço de pintura |
| `serv4.png` (capô azul do Creta) | Cursos (Polimento profissional) |
| `local1.png`, `localhero.png`, `car1.png` | Localização (estrutura) |
| Demais fotos do site antigo | Convertidas para WebP em `public/assets/img/` para as próximas páginas. As do Instagram (`insta1..6`) ficaram de fora: são capturas de tela pequenas, com o ícone do Reels |

Observações:
- `hero1.jpg` (Harley) tem o **logo antigo amarelo** na parede ao fundo. A versão salva foi cortada para esconder a placa.
- Várias fotos antigas estavam de cabeça para baixo por causa da rotação EXIF. Já foram corrigidas.
- As 3 fotos duplicadas do WhatsApp foram ignoradas.
