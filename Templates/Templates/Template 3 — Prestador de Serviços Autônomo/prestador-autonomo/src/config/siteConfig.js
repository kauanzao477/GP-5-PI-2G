// ╔══════════════════════════════════════════════════════════╗
// ║  CONFIGURAÇÃO COMPLETA DO SITE                          ║
// ║  Altere TODAS as informações aqui                       ║
// ╚══════════════════════════════════════════════════════════╝

const siteConfig = {

  // ─── INFORMAÇÕES PESSOAIS ───
  profissional: {
    nome: "Carlos Silva",
    profissao: "Eletricista Profissional",
    fraseImpacto: "Serviço rápido e garantido!",
    subtitulo: "Mais de 15 anos resolvendo seus problemas elétricos com segurança e qualidade.",
    whatsapp: "5511999999999",           // número com DDI+DDD sem espaços
    whatsappMensagem: "Olá! Gostaria de solicitar um orçamento.",
    telefone: "(11) 99999-9999",
    email: "carlos.eletricista@email.com",
    // Foto do profissional (coloque o caminho da imagem)
    foto: null,  // Ex: "/images/perfil.jpg" ou "https://..."
  },

  // ─── SERVIÇOS ───
  servicos: [
    {
      icone: "⚡",
      titulo: "Instalação Elétrica",
      descricao: "Instalação completa residencial e comercial"
    },
    {
      icone: "🔌",
      titulo: "Manutenção Preventiva",
      descricao: "Revisão e manutenção de toda rede elétrica"
    },
    {
      icone: "🏠",
      titulo: "Reformas",
      descricao: "Reforma elétrica completa com padrão de segurança"
    },
    {
      icone: "💡",
      titulo: "Iluminação",
      descricao: "Projetos de iluminação LED e decorativa"
    },
    {
      icone: "🔧",
      titulo: "Quadro de Força",
      descricao: "Instalação e troca de disjuntores e quadros"
    },
    {
      icone: "🛡️",
      titulo: "Aterramento",
      descricao: "Sistema de aterramento e proteção contra surtos"
    },
  ],

  // ─── POR QUE ME CONTRATAR ───
  diferenciais: [
    {
      icone: "🏆",
      titulo: "15+ Anos de Experiência",
      descricao: "Mais de uma década atendendo clientes satisfeitos em toda a região."
    },
    {
      icone: "⚡",
      titulo: "Atendimento Rápido",
      descricao: "Resposta imediata e agendamento para o mais breve possível."
    },
    {
      icone: "💰",
      titulo: "Preço Justo",
      descricao: "Orçamento transparente, sem surpresas. Você sabe exatamente o que está pagando."
    },
    {
      icone: "✅",
      titulo: "Garantia no Serviço",
      descricao: "Todo trabalho realizado possui garantia. Sua segurança é nossa prioridade."
    },
  ],

  // ─── TEXTO GERADO PELA IA (seção "Sobre") ───
  textoSobre: `Com mais de 15 anos de experiência no mercado, ofereço serviços elétricos 
  de alta qualidade para residências e comércios. Trabalho com materiais de primeira linha, 
  sigo todas as normas de segurança (NR-10) e garanto um atendimento rápido e profissional. 
  Meu compromisso é entregar um serviço impecável, com preço justo e garantia total. 
  Solicite seu orçamento sem compromisso!`,

  // ─── PORTFÓLIO / FOTOS DE TRABALHOS ───
  portfolio: [
    {
      titulo: "Quadro Elétrico Residencial",
      descricao: "Troca completa do quadro de força",
      imagemAntes: null,   // Ex: "/images/antes1.jpg"
      imagemDepois: null,  // Ex: "/images/depois1.jpg"
      imagemUnica: null,   // Caso não tenha antes/depois
    },
    {
      titulo: "Iluminação Comercial",
      descricao: "Projeto de LED para loja",
      imagemAntes: null,
      imagemDepois: null,
      imagemUnica: null,
    },
    {
      titulo: "Reforma Elétrica Completa",
      descricao: "Casa antiga com fiação nova",
      imagemAntes: null,
      imagemDepois: null,
      imagemUnica: null,
    },
    {
      titulo: "Instalação de Tomadas",
      descricao: "Pontos novos para home office",
      imagemAntes: null,
      imagemDepois: null,
      imagemUnica: null,
    },
  ],

  // ─── ATENDIMENTO ───
  atendimento: {
    regioes: [
      "São Paulo - Zona Sul",
      "São Paulo - Zona Oeste",
      "Taboão da Serra",
      "Embu das Artes",
      "Itapecerica da Serra",
    ],
    horario: {
      semana: "08:00 às 18:00",
      sabado: "08:00 às 14:00",
      domingo: "Emergências",
    },
  },

  // ─── DEPOIMENTOS (opcional) ───
  depoimentos: [
    {
      nome: "Maria Souza",
      texto: "Excelente profissional! Chegou no horário, resolveu tudo rapidinho e ainda deixou tudo limpo.",
      estrelas: 5,
      foto: null, // Ex: "/images/cliente1.jpg"
    },
    {
      nome: "João Pereira",
      texto: "Preço justo e trabalho impecável. Já indiquei para toda minha família!",
      estrelas: 5,
      foto: null,
    },
    {
      nome: "Ana Costa",
      texto: "Fez a reforma elétrica da minha casa inteira. Super profissional e atencioso.",
      estrelas: 5,
      foto: null,
    },
  ],

  // ─── REDES SOCIAIS (opcional) ───
  redesSociais: {
    instagram: "",   // Ex: "https://instagram.com/carlos.eletricista"
    facebook: "",    // Ex: "https://facebook.com/carloseletricista"
    youtube: "",
    tiktok: "",
  },
};

export default siteConfig;