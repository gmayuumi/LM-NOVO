# Pendências do site novo

Atualizado a cada página entregue. Última atualização: home na versão "vitrine de luxo + metálico". No código, tudo o que depende do cliente está marcado com `[CONFIRMAR]`.

## Confirmar com o cliente

| # | O quê | Onde aparece | Situação hoje |
|---|---|---|---|
| 1 | E-mail `contato@lmestetica.com.br` ainda funciona? | Rodapé, dados estruturados | Mantido do site antigo |
| 2 | "+1.000 clientes atendidos em SP" continua valendo? | Hero da home | Mantido do site antigo |
| 3 | "Resposta em menos de 2 minutos no horário comercial" continua valendo? | CTA final da home | Mantido do site antigo |
| 4 | "Até 60% mais barato que funilaria e pintura" continua valendo? | Seção martelinho da home | Mantido do site antigo |
| 5 | As avaliações de Maria O., João S. e Carlos P. são reais? | Seção de avaliações | Mantidas sem fonte. O ideal é trocar por avaliações do Google com link do perfil de quem avaliou |
| 6 | Link do perfil da LM no Google | Botão "Ver avaliações no Google" | Hoje abre uma busca no Google Maps |
| 7 | A fachada usada como Santo Amaro é mesmo a de Santo Amaro? | Unidades | Foto `hero2.jpg` do site antigo |
| 8 | A cabine das fotos (paredes de vidro, teto de LED hexagonal) é a do Brooklin? | Unidades, imagem de compartilhamento | Assumido que sim |
| 9 | Horário do Brooklin é o mesmo da matriz? Abre domingo? | Unidades, rodapé, dados estruturados | Usado o mesmo horário para as duas |
| 10 | CEP do Brooklin | Rodapé, dados estruturados | Em branco |
| 11 | Motos entram oficialmente em "Estética completa"? | Serviços da home | Escrito "para carros e motos" por causa do vídeo da Ducati |
| 12 | Vídeo do hero | Home | Corte de 12s do vídeo real do martelinho (Nissan Kicks). Se for gerado outro vídeo, é só trocar `public/assets/video/hero.mp4` |
| 13 | `video2.mp4` (animação genérica de carro) | Não usado | Não mostra o trabalho da LM e tem qualidade baixa |
| 14 | "Lavagem detalhada" é um serviço que a LM oferece com esse nome? | Vitrine de serviços da home | Baseado em "detalhamento minucioso" do site antigo e nas fotos com espuma |
| 15 | Higienização interna inclui extração de sujeira, hidratação de couro e oxi-sanitização? | Vitrine de serviços da home | Texto tirado da descrição do curso de higienização do site antigo |

## Fotos que faltam

- **Mais pares de antes e depois, do mesmo ângulo e com a mesma luz.** Hoje só há 1 par bom (Nissan Kicks, tirado do vídeo). É a prova mais forte do site. Dica para o cliente: celular apoiado no mesmo lugar, mesma distância, antes e depois do reparo.
- **Fachada do Brooklin.**
- **Fachada de Santo Amaro em resolução maior.** A atual tem 1069 px de largura.
- **Sala de espera** (o site cita Wi-Fi, TV e café, mas não há foto).
- Opcional: equipe trabalhando, com rosto, para dar confiança.

## Mídia recebida e onde foi usada

| Arquivo recebido | Uso |
|---|---|
| `logo-lm-full.png` | Cabeçalho, rodapé, CTA final, favicon, imagem de compartilhamento. Cores do site tiradas dele |
| `video mostrando martelinho de ouro - indispensavel.mp4` | Hero (corte de 12s), par do antes/depois, foto do técnico com a barra de luz. Versão completa em `martelinho-completo.mp4` para a página Martelinho |
| `processo de moto - indispensaverl.mp4` | Guardado em `estetica-moto.mp4` para a página Serviços |
| Fotos do WhatsApp (Toyota Yaris, cabine) | Unidade Brooklin, serviço de funilaria, imagem de compartilhamento |
| Fotos do WhatsApp (espuma: Mercedes e Defender) | Serviço de estética |
| `hero2.jpg` (fachada) | Unidade Santo Amaro |
| `serv1.jpg` (Porsche 911) | Serviço de pintura |
| Demais fotos do site antigo | Convertidas para WebP em `public/assets/img/` para as próximas páginas. As do Instagram (`insta1..6`) ficaram de fora: são capturas de tela pequenas, com o ícone do Reels |

Observações:
- `hero1.jpg` (Harley) tem o **logo antigo amarelo** na parede ao fundo. A versão salva foi cortada para esconder a placa.
- Várias fotos antigas estavam de cabeça para baixo por causa da rotação EXIF. Já foram corrigidas.
- As 3 fotos duplicadas do WhatsApp foram ignoradas.
