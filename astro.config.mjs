import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.lmesteticautomotiva.com.br',
  // Gera martelinho.html etc., mantendo as URLs do site antigo.
  build: { format: 'file' },
  trailingSlash: 'never',
  // a proposta de redesenho fica fora do sitemap
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/proposta') })],
});
