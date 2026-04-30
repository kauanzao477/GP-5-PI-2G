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

async function processarFormulario(req, res, next) {
  try {
    const dadosFormulario = req.body;

    if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
      throw criarErro("nenhum dado de formulario foi enviado", 400);
    }

    if (!dadosFormulario.tipoTemplate) {
      throw criarErro("o tipo de template é obrigatorio", 400);
    }

    console.log("processando dados do formulario com IA");

    const dadosProcessados = await groqService.processarDadosSite(dadosFormulario);

    return res.status(200).json({
      sucesso: true,
      mensagem: "dados processados com sucesso",
      dados: {
        dadosOriginais: dadosFormulario,
        dadosProcessados: dadosProcessados,
      },
    });
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  sugerirSlugs,
  processarFormulario,
};