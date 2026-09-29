# Pendências do site novo

Atualizado a cada página entregue. Última atualização: home na versão "vitrine de luxo + metálico". No código, tudo o que depende do cliente está marcado com `[CONFIRMAR]`.

## Confirmar com o cliente

Decisão do cliente: **tudo o que está no site antigo vale** (e-mail, "+1.000 clientes", "resposta em menos de 2 minutos", "até 60% mais barato", garantia, horário para as duas unidades, depoimentos, textos de serviços e cursos). Motos confirmadas pelo próprio cliente. Continua em aberto só o que não está no site antigo:

| # | O quê | Onde aparece | Situação hoje |
|---|---|---|---|
| 1 | Link do perfil da LM no Google | Botão "Ver avaliações no Google" | Hoje abre uma busca no Google Maps |
| 2 | CEP do Brooklin | Rodapé, dados estruturados | Em branco |
| 3 | A fachada usada como Santo Amaro é mesmo a de Santo Amaro? | Unidades | Foto `hero2.jpg` do site antigo, sem indicação de unidade |
| 4 | A cabine das fotos (paredes de vidro, teto de LED hexagonal) é a do Brooklin? | Unidades, imagem de compartilhamento | Assumido que sim, porque o site antigo diz que a cabine fica no Brooklin |

Informativo, sem pendência:
- Vídeo do hero: corte de 12s do vídeo real do martelinho (Nissan Kicks). Se for gerado outro vídeo, é só trocar `public/assets/video/hero.mp4`.
- `video2.mp4` (animação genérica de carro) não foi usado: não mostra o trabalho da LM e tem qualidade baixa.
- O cartão "Lavagem detalhada" virou "Estética completa", com o texto literal do site antigo.

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
