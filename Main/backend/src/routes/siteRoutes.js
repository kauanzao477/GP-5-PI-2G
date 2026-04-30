const express = require("express");
const roteador = express.Router();

const siteController = require("../controllers/siteController");
const { verificarToken } = require("../middlewares/authMiddleware");
roteador.get("/publico/:slug", siteController.acessarSitePublico);

roteador.post("/", verificarToken, siteController.criarSite);

roteador.get("/", verificarToken, siteController.listarMeusSites);

roteador.get("/:siteId", verificarToken, siteController.buscarSite);

roteador.put("/:siteId", verificarToken, siteController.atualizarSite);

roteador.post("/:siteId/publicar", verificarToken, siteController.publicarSite);

roteador.delete("/:siteId", verificarToken, siteController.deletarSite);

module.exports = roteador;