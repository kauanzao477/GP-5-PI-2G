// backend/services/groqService.js

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODELO = "llama-3.3-70b-versatile";

async function sugerirSlugs(dadosFormulario) {
  const prompt = `Sugira 5 slugs para URL de site.
Tipo: ${dadosFormulario.tipoTemplate}
Nome: ${dadosFormulario.nome || "Não informado"}
Profissão: ${dadosFormulario.profissaoOuNegocio || "Não informado"}
Regras: letras minúsculas, números e hífens, 3-30 caracteres.
Retorne APENAS: {"sugestoes": ["slug1", "slug2", "slug3", "slug4", "slug5"]}`;

  try {
    const resposta = await groq.chat.completions.create({
      model: MODELO,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 150,
    });

    const textoResposta = resposta.choices[0].message.content;
    const jsonResposta = JSON.parse(textoResposta);
    return jsonResposta.sugestoes || [];

  } catch (erro) {
    console.error("Erro ao gerar sugestões de slug:", erro.message);
    return gerarSugestoesBasicas(dadosFormulario.nome);
  }
}

// ══════════════════════════════════════════════
// PROCESSADOR PRINCIPAL — roteia por template
// ══════════════════════════════════════════════
async function processarDadosSite(dadosFormulario) {
  const { tipoTemplate } = dadosFormulario;

  switch (tipoTemplate) {
    case "portfolio":
      return processarPortfolio(dadosFormulario);
    case "negocio-local":
      return processarNegocioLocal(dadosFormulario);
    case "prestador-servicos":
      return processarPrestadorServicos(dadosFormulario);
    default:
      console.warn(`Tipo de template desconhecido: ${tipoTemplate}. Retornando dados originais.`);
      return dadosFormulario;
  }
}

// ══════════════════════════════════════════════
// PORTFOLIO — aboutMe + companies.description
// ══════════════════════════════════════════════
async function processarPortfolio(dados) {
  const camposParaIA = {
    aboutMe: dados.aboutMe || "",
    companies: (dados.companies || []).map(emp => ({
      name: emp.name || "",
      role: emp.role || "",
      description: emp.description || "",
    })),
  };

  const prompt = `Melhore estes textos de portfólio profissional em português brasileiro.

DADOS:
aboutMe: "${camposParaIA.aboutMe}"
companies: ${JSON.stringify(camposParaIA.companies)}

TAREFAS:
1. "aboutMe": reescreva de forma profissional em 2-3 parágrafos, corrija gramática.
2. Cada "description" das companies: formalize se existir. Se estiver vazio, deixe vazio.

REGRAS:
- Não invente informações
- Não altere name, role ou outros campos
- Retorne APENAS este JSON sem markdown:
{
  "aboutMe": "texto melhorado",
  "companies": [{"name": "...", "role": "...", "description": "..."}]
}`;

  try {
    const melhorias = await chamarIA(prompt);

    return {
      ...dados,
      aboutMe: melhorias.aboutMe || dados.aboutMe,
      companies: (dados.companies || []).map((emp, i) => ({
        ...emp,
        description: melhorias.companies?.[i]?.description ?? emp.description,
      })),
    };

  } catch (erro) {
    console.error("Erro ao processar portfolio com IA:", erro.message);
    return dados;
  }
}

// ══════════════════════════════════════════════
// NEGÓCIO LOCAL — history + services.description
// ══════════════════════════════════════════════
async function processarNegocioLocal(dados) {
  const camposParaIA = {
    businessName: dados.businessName || "",
    history: dados.history || "",
    services: (dados.services || []).map(s => ({
      name: s.name || "",
      description: s.description || "",
      price: s.price || "",
    })),
  };

  const prompt = `Melhore estes textos de um site de negócio local em português brasileiro.

DADOS:
Nome do negócio: "${camposParaIA.businessName}"
História: "${camposParaIA.history}"
Serviços: ${JSON.stringify(camposParaIA.services)}

TAREFAS:
1. "history": reescreva de forma envolvente e profissional em 2-3 parágrafos. Transmita tradição, qualidade e paixão pelo que faz. Corrija gramática.
2. Cada "description" dos serviços: formalize e torne mais atrativa para o cliente. Se estiver vazio, crie uma descrição curta (1-2 frases) baseada no nome do serviço.

REGRAS:
- Não invente informações sobre o negócio que não estejam implícitas nos dados
- Não altere name, price ou outros campos
- Mantenha o tom acolhedor e confiável
- Retorne APENAS este JSON sem markdown:
{
  "history": "texto melhorado",
  "services": [{"name": "...", "description": "...", "price": "..."}]
}`;

  try {
    const melhorias = await chamarIA(prompt);

    return {
      ...dados,
      history: melhorias.history || dados.history,
      services: (dados.services || []).map((serv, i) => ({
        ...serv,
        description: melhorias.services?.[i]?.description ?? serv.description,
      })),
    };

  } catch (erro) {
    console.error("Erro ao processar negócio local com IA:", erro.message);
    return dados;
  }
}

// ══════════════════════════════════════════════
// PRESTADOR DE SERVIÇOS — trustParagraph + providerServices.description
// ══════════════════════════════════════════════
async function processarPrestadorServicos(dados) {
  const camposParaIA = {
    name: dados.name || "",
    profession: dados.profession || "",
    experience: dados.experience || "",
    clientsServed: dados.clientsServed || "",
    trustParagraph: dados.trustParagraph || "",
    providerServices: (dados.providerServices || []).map(s => ({
      name: s.name || "",
      description: s.description || "",
    })),
  };

  const prompt = `Melhore estes textos de um site de prestador de serviços em português brasileiro.

DADOS:
Nome: "${camposParaIA.name}"
Profissão: "${camposParaIA.profession}"
Experiência: "${camposParaIA.experience}"
Clientes atendidos: "${camposParaIA.clientsServed}"
Parágrafo de confiança: "${camposParaIA.trustParagraph}"
Serviços: ${JSON.stringify(camposParaIA.providerServices)}

TAREFAS:
1. "trustParagraph": reescreva de forma persuasiva e profissional em 2-3 parágrafos. O objetivo é convencer potenciais clientes a contratar este profissional. Destaque experiência, compromisso com qualidade, garantia e diferenciais. Corrija gramática.
2. Cada "description" dos serviços: formalize e torne mais profissional. Se estiver vazio, crie uma descrição curta (1-2 frases) baseada no nome do serviço e na profissão.

REGRAS:
- Não invente informações que não estejam implícitas nos dados
- Não altere name ou outros campos
- Use os dados reais (experiência, clientes atendidos) no trustParagraph quando possível
- Mantenha tom confiável e profissional
- Retorne APENAS este JSON sem markdown:
{
  "trustParagraph": "texto melhorado",
  "providerServices": [{"name": "...", "description": "..."}]
}`;

  try {
    const melhorias = await chamarIA(prompt);

    return {
      ...dados,
      trustParagraph: melhorias.trustParagraph || dados.trustParagraph,
      providerServices: (dados.providerServices || []).map((serv, i) => ({
        ...serv,
        description: melhorias.providerServices?.[i]?.description ?? serv.description,
      })),
    };

  } catch (erro) {
    console.error("Erro ao processar prestador de serviços com IA:", erro.message);
    return dados;
  }
}

// ══════════════════════════════════════════════
// HELPER — chamada genérica à IA com limpeza
// ══════════════════════════════════════════════
// backend/services/groqService.js — SUBSTITUA a função chamarIA

async function chamarIA(prompt) {
  console.log("🔄 Enviando prompt para Groq...");
  console.log("📝 Tamanho do prompt:", prompt.length, "caracteres");

  const resposta = await groq.chat.completions.create({
    model: MODELO,
    messages: [
      {
        role: "system",
        content: "Você é um redator profissional que melhora textos para sites. Retorne APENAS JSON válido sem markdown, sem ```json, sem explicações."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1200,
  });

  const textoResposta = resposta.choices[0].message.content;
  console.log("📨 Resposta bruta da IA:", textoResposta.substring(0, 200) + "...");

  const textoLimpo = textoResposta
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const resultado = JSON.parse(textoLimpo);
  console.log("✅ JSON parseado com sucesso. Chaves:", Object.keys(resultado));

  return resultado;
}

// ══════════════════════════════════════════════
// FALLBACK de slugs
// ══════════════════════════════════════════════
function gerarSugestoesBasicas(nome) {
  if (!nome) return ["meu-site", "meu-portfolio", "minha-pagina"];

  const nomeFormatado = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return [
    nomeFormatado,
    `${nomeFormatado}-site`,
    `${nomeFormatado}-oficial`,
    `portfolio-${nomeFormatado}`,
    `${nomeFormatado}2025`,
  ];
}

module.exports = {
  sugerirSlugs,
  processarDadosSite,
};