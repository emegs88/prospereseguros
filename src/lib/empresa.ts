// ─────────────────────────────────────────────────────────────────────────
//  DADOS INSTITUCIONAIS — fonte única de verdade.
//
//  Tudo que é "quem somos", contato, compliance e a fundadora (Carla Picinini)
//  vive aqui. Footer, página Sobre, schema.org, deep links de WhatsApp e
//  metadados de SEO consomem este módulo. Mudou o telefone? Muda aqui.
// ─────────────────────────────────────────────────────────────────────────

export const EMPRESA = {
  razaoSocial: "PROSPERE CORRETORA DE SEGUROS LTDA",
  nomeFantasia: "Prospere Seguros",
  cnpj: "67.212.573/0001-50",
  cnae: "66.22-3-00",
  endereco: {
    logradouro: "Av. da Emancipação, 3770",
    complemento: "Bloco E, Box 01",
    bairro: "Jardim do Bosque",
    cidade: "Hortolândia",
    uf: "SP",
    cep: "13.186-237",
  },
  contato: {
    whatsapp: "5519995431000", // E.164 sem "+", pronto para wa.me
    whatsappExibicao: "(19) 99543-1000",
    email: "carla@prospere.com.br",
    instagram: "@prospereseguros",
    instagramUrl: "https://instagram.com/prospereseguros",
    dominio: "prospere.com.br",
    site: "https://prospere.com.br",
  },
  // Registro SUSEP — preencher com o número oficial quando disponível.
  susep: {
    numero: null as string | null,
    rotulo: "Corretora registrada na SUSEP",
  },
  compliance:
    "Prospere Corretora de Seguros Ltda — CNPJ 67.212.573/0001-50. Corretora registrada na SUSEP.",
  promessa: "Cote, compare e contrate em minutos. Sem burocracia.",
  tagline: "PROTEÇÃO HOJE, TRANQUILIDADE SEMPRE.",
} as const;

// ── Fundadora / CEO ──────────────────────────────────────────────────────

export const FUNDADORA = {
  nome: "Carla Picinini",
  cargo: "CEO & Fundadora",
  cargoLongo: "CEO, Fundadora e Corretora Responsável",
  anosExperiencia: 23,
  selo: "Mais de 23 anos de experiência e confiança",
  // Assinatura pessoal usada no hero da página Sobre.
  promessaPessoal:
    "Eu, Carla Picinini, corretora de seguros há mais de 23 anos, ofereço soluções completas para você e sua família.",
  bio: [
    "À frente da Prospere Seguros, Carla Picinini construiu uma trajetória de mais de duas décadas no mercado de seguros, sempre com um princípio simples: tratar cada cliente como parte da família.",
    "Foi essa visão — proteção de verdade, atendimento humano e tecnologia a serviço das pessoas — que deu origem à Prospere: uma corretora digital onde você cota, compara e contrata em minutos, com a segurança de quem entende do assunto há 23 anos.",
  ],
  fotoUrl: "/brand/carla-picinini.jpg", // substituir pela foto oficial
} as const;

// ── Pilares de valor (os 4 do material institucional) ──────────────────────

export interface PilarValor {
  chave: string;
  titulo: string;
  descricao: string;
  icone: "heart" | "target" | "shield-check" | "handshake";
}

export const PILARES: PilarValor[] = [
  {
    chave: "atendimento-humanizado",
    titulo: "Atendimento Humanizado",
    descricao: "Você não é apenas um cliente, é parte da nossa família.",
    icone: "heart",
  },
  {
    chave: "solucoes-personalizadas",
    titulo: "Soluções Personalizadas",
    descricao: "Seguros sob medida para suas necessidades e objetivos.",
    icone: "target",
  },
  {
    chave: "experiencia-confianca",
    titulo: "Experiência e Confiança",
    descricao: "Mais de duas décadas protegendo o que realmente importa.",
    icone: "shield-check",
  },
  {
    chave: "compromisso-com-voce",
    titulo: "Compromisso com Você",
    descricao: "Acompanhamento próximo em todas as etapas da sua vida.",
    icone: "handshake",
  },
];

// ── Números de prova social (placeholder — trocar por dados reais) ──────────

export const NUMEROS = [
  { valor: "23+", rotulo: "anos de experiência" },
  { valor: "8", rotulo: "seguradoras parceiras" },
  { valor: "2 min", rotulo: "para cotar e comparar" },
  { valor: "100%", rotulo: "online, sem burocracia" },
] as const;

// helper: link wa.me com mensagem opcional pré-preenchida
export function whatsappUrl(mensagem?: string): string {
  const base = `https://wa.me/${EMPRESA.contato.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
