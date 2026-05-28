const { criarErro } = require("../middlewares/errorMiddleware");
const groqService = require("../services/groqService");

async function sugerirSlugs(req, res, next) {
  try {
    const { tipoTemplate, nome, profissaoOuNegocio } = req.body;

    if (!tipoTemplate) {
      throw criarErro("o tipo de template é obrigatorio", 400);
    }

    const dadosParaIA = {
      tipoTemplate,
      nome: nome || "",
      profissaoOuNegocio: profissaoOuNegocio || "",
    };

    console.log("gerando sugestões de slug com IA");

    const sugestoes = await groqService.sugerirSlugs(dadosParaIA);

    return res.status(200).json({
      sucesso: true,
      mensagem: "sugestoes geradas com sucesso",
      dados: {
        sugestoes,
      },
    });
  } catch (erro) {
    next(erro);
  }
}

// backend/controllers/aiController.js — SUBSTITUA o processarFormulario

async function processarFormulario(req, res, next) {
  try {
    const dadosFormulario = req.body;

    console.log("═══════════════════════════════════════");
    console.log("📥 RECEBIDO no processarFormulario:");
    console.log("tipoTemplate:", dadosFormulario.tipoTemplate);
    console.log("Campos recebidos:", Object.keys(dadosFormulario));
    console.log("═══════════════════════════════════════");

    if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
      throw criarErro("nenhum dado de formulario foi enviado", 400);
    }

    if (!dadosFormulario.tipoTemplate) {
      throw criarErro("o tipo de template é obrigatorio", 400);
    }

    console.log("🤖 Chamando groqService.processarDadosSite...");

    const dadosProcessados = await groqService.processarDadosSite(dadosFormulario);

    console.log("✅ Dados processados. Campos retornados:", Object.keys(dadosProcessados));

    return res.status(200).json({
      sucesso: true,
      mensagem: "dados processados com sucesso",
      dados: {
        dadosOriginais: dadosFormulario,
        dadosProcessados: dadosProcessados,
      },
    });
  } catch (erro) {
    console.error("❌ ERRO no processarFormulario:", erro.message);
    next(erro);
  }
}

module.exports = {
  sugerirSlugs,
  processarFormulario,
};