const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODELO = "llama-3.3-70b-versatile";

async function sugerirSlugs(dadosFormulario) {
  const prompt = `
    Você é um assistente que cria slugs para URLs de sites pessoais e empresariais.
    
    Com base nas informações abaixo, sugira 5 opções de slug para a URL do site.
    
    Regras para os slugs:
    - Use apenas letras minúsculas, números e hífens
    - Sem espaços, acentos ou caracteres especiais
    - Entre 3 e 30 caracteres
    - Deve ser fácil de lembrar e digitar
    - Deve representar bem o nome ou negócio
    
    Informações do usuário:
    - Tipo de template: ${dadosFormulario.tipoTemplate}
    - Nome: ${dadosFormulario.nome || "Não informado"}
    - Profissão/Negócio: ${dadosFormulario.profissaoOuNegocio || "Não informado"}
    
    Retorne APENAS um JSON válido com este formato, sem explicações:
    {
      "sugestoes": ["slug1", "slug2", "slug3", "slug4", "slug5"]
    }
  `;

  try {
    const resposta = await groq.chat.completions.create({
      model: MODELO,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    const textoResposta = resposta.choices[0].message.content;

    const jsonResposta = JSON.parse(textoResposta);

    return jsonResposta.sugestoes || [];
  } catch (erro) {
    console.error("erro ao gerar sugestoes de slug:", erro.message);

    return gerarSugestoesBasicas(dadosFormulario.nome);
  }
}

async function processarDadosSite(dadosFormulario) {
  const prompt = `
    Você é um assistente especialista em criação de sites profissionais.
    
    O usuário preencheu um formulário com suas informações. Sua tarefa é:
    1. Organizar e estruturar os dados de forma profissional
    2. Melhorar textos quando necessário (corrigir erros, melhorar clareza)
    3. Preencher campos opcionais que fazem sentido com base no contexto
    4. Retornar os dados organizados em JSON
    
    Template escolhido: ${dadosFormulario.tipoTemplate}
    
    Dados preenchidos pelo usuário:
    ${JSON.stringify(dadosFormulario, null, 2)}
    
    Retorne APENAS um JSON válido com os dados organizados e melhorados.
    Mantenha a estrutura original dos campos, apenas melhore os textos quando necessário.
    Não invente informações que o usuário não forneceu.
  `;

  try {
    const resposta = await groq.chat.completions.create({
      model: MODELO,
      messages: [
        {
          role: "system",
          content:
            "Você organiza dados de formulários para sites profissionais. Retorne sempre JSON válido.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const textoResposta = resposta.choices[0].message.content;

    const textoLimpo = textoResposta
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const dadosProcessados = JSON.parse(textoLimpo);

    return dadosProcessados;
  } catch (erro) {
    console.error("erro ao processar dados com IA:", erro.message);

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
    `${nomeFormatado}2024`,
  ];
}

module.exports = {
  sugerirSlugs,
  processarDadosSite,
};