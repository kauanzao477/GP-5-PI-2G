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

async function processarDadosSite(dadosFormulario) {
  const { tipoTemplate } = dadosFormulario;

  if (tipoTemplate !== "portfolio") {
    return dadosFormulario;
  }

  const camposParaIA = {
    aboutMe: dadosFormulario.aboutMe || "",
    companies: (dadosFormulario.companies || []).map(emp => ({
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
    const resposta = await groq.chat.completions.create({
      model: MODELO,
      messages: [
        {
          role: "system",
          content: "Você melhora textos de portfólios. Retorne JSON válido sem markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const textoResposta = resposta.choices[0].message.content;
    const textoLimpo = textoResposta
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const melhorias = JSON.parse(textoLimpo);
    console.log("✅ IA processou os dados com sucesso");

    const dadosFinais = {
      ...dadosFormulario,
      aboutMe: melhorias.aboutMe || dadosFormulario.aboutMe,
      companies: (dadosFormulario.companies || []).map((emp, i) => ({
        ...emp,
        description: melhorias.companies?.[i]?.description ?? emp.description,
      })),
    };

    return dadosFinais;

  } catch (erro) {
    console.error("Erro ao processar com IA:", erro.message);
    return dadosFormulario;
  }
}

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