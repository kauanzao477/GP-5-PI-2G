const { criarErro } = require("../middlewares/errorMiddleware");
const firestoreService = require("../services/firestoreService");

async function salvarPerfil(req, res, next) {
  try {
    const { uid, email } = req.usuario;

    const { nome, sobrenome, telefone } = req.body;

    const dadosPerfil = {
      nome: nome || "",
      sobrenome: sobrenome || "",
      telefone: telefone || "",
      email: email,
      criadoEm: new Date().toISOString(),
    };

    await firestoreService.salvarUsuario(uid, dadosPerfil);

    return res.status(200).json({
      sucesso: true,
      mensagem: "perfil salvo com sucesso",
      dados: dadosPerfil,
    });
  } catch (erro) {
    next(erro);
  }
}

async function buscarPerfil(req, res, next) {
  try {
    const { uid } = req.usuario;

    const usuario = await firestoreService.buscarUsuario(uid);

    if (!usuario) {
      throw criarErro("perfil nao encontrado", 404);
    }

    return res.status(200).json({
      sucesso: true,
      dados: usuario,
    });
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  salvarPerfil,
  buscarPerfil,
};