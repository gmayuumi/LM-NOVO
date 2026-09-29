// Dados reais do site antigo (ver docs/conteudo-site-atual.md).
// [CONFIRMAR] marca o que ainda precisa de confirmação do cliente.

export const SITE = {
  nome: 'LM Estética Automotiva',
  url: 'https://www.lmesteticautomotiva.com.br',
  posicionamento: 'A arte de restaurar a perfeição.',
  telefoneExibicao: '(11) 99174-0995',
  telefoneE164: '+5511991740995',
  email: 'contato@lmestetica.com.br',
  instagram: 'https://www.instagram.com/lmesteticautomotivasp/',
  instagramUsuario: '@lmesteticautomotivasp',
  gtm: 'GTM-TBDKS699',
  // [CONFIRMAR link direto do perfil no Google; por enquanto, busca no Maps]
  avaliacoesGoogle:
    'https://www.google.com/maps/search/?api=1&query=LM+Est%C3%A9tica+Automotiva+Santo+Amaro+S%C3%A3o+Paulo',
};

const WHATSAPP = '5511991740995';
export const whats = (mensagem: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

export const MSG = {
  geral: 'Olá! Gostaria de fazer um orçamento.',
  martelinho: 'Olá! Gostaria de um orçamento para o serviço de Martelinho de Ouro.',
  funilaria: 'Olá! Preciso de um orçamento para funilaria.',
  pintura: 'Olá! Preciso de um orçamento para pintura.',
  estetica: 'Olá! Gostaria de um orçamento para estética automotiva.',
  polimento: 'Olá! Gostaria de um orçamento de polimento e vitrificação.',
  higienizacao: 'Olá! Gostaria de um orçamento de higienização interna.',
  moto: 'Olá! Gostaria de um orçamento de estética para a minha moto.',
  foto: 'Olá! Quero enviar a foto do amassado para um pré-orçamento.',
};

// Horário do site antigo, vale para as duas unidades.
export const HORARIO = [
  { dias: 'Segunda a sexta', abre: '08:00', fecha: '18:00', texto: '8h às 18h', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { dias: 'Sábado', abre: '08:00', fecha: '16:00', texto: '8h às 16h', schema: ['Saturday'] },
];

export const UNIDADES = {
  santoAmaro: {
    nome: 'Santo Amaro',
    papel: 'Matriz',
    rua: 'Rua Padre José de Anchieta, 735',
    bairro: 'Santo Amaro',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04742-001',
    rota: 'https://www.google.com/maps/dir/?api=1&destination=Rua+Padre+Jos%C3%A9+de+Anchieta,735,Santo+Amaro,S%C3%A3o+Paulo,SP',
  },
  brooklin: {
    nome: 'Brooklin',
    papel: 'Cabine de pintura',
    rua: 'Av. Roque Petroni Júnior, 118',
    bairro: 'Brooklin',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '', // [CONFIRMAR CEP]
    rota: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Roque+Petroni+J%C3%BAnior,118,Brooklin,S%C3%A3o+Paulo,SP',
  },
};

export const PAGINAS = [
  { href: '/martelinho', rotulo: 'Martelinho de ouro' },
  { href: '/servicos', rotulo: 'Serviços' },
  { href: '/localizacao', rotulo: 'Localização' },
];
export const CURSOS = { href: '/cursos', rotulo: 'Cursos' };
