const { auth } = require("../config/firebase");

async function verificarToken(req, res, next) {
  const cabecalhoAutorizacao = req.headers.authorization;

  if (!cabecalhoAutorizacao || !cabecalhoAutorizacao.startsWith("Bearer ")) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "token de autenticacao nao fornecido",
    });
  }

  const token = cabecalhoAutorizacao.split("Bearer ")[1];

  try {
    const usuarioDecodificado = await auth.verifyIdToken(token);

    req.usuario = usuarioDecodificado;

    next();
  } catch (erro) {
    console.error("erro ao verificar token:", erro.message);

    return res.status(401).json({
      sucesso: false,
      mensagem: "token invalido ou expirado, faca login novamente",
    });
  }
}

module.exports = { verificarToken };