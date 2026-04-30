const express = require("express");
const roteador = express.Router();

const aiController = require("../controllers/aiController");
const { verificarToken } = require("../middlewares/authMiddleware");

roteador.post("/sugerir-slugs", verificarToken, aiController.sugerirSlugs);

roteador.post(
  "/processar-formulario",
  verificarToken,
  aiController.processarFormulario
);

module.exports = roteador;