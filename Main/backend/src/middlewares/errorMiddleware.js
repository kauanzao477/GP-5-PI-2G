function tratarErros(erro, req, res, next) {
  console.error("erro:", erro.message);
  console.error(erro.stack);

  const statusCode = erro.statusCode || 500;

  return res.status(statusCode).json({
    sucesso: false,
    mensagem: erro.message || "ocorreu um erro interno no servidor",
    detalhes: process.env.NODE_ENV === "development" ? erro.stack : undefined,
  });
}

function criarErro(mensagem, statusCode = 500) {
  const erro = new Error(mensagem);
  erro.statusCode = statusCode;
  return erro;
}

module.exports = { tratarErros, criarErro };