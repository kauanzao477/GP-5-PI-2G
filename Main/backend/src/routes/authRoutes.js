const express = require("express");
const roteador = express.Router();

const authController = require("../controllers/authController");
const { verificarToken } = require("../middlewares/authMiddleware");

roteador.post("/perfil", verificarToken, authController.salvarPerfil);

roteador.get("/perfil", verificarToken, authController.buscarPerfil);

module.exports = roteador;