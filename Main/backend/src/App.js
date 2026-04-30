const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/firebase");

const authRoutes = require("./routes/authRoutes");
const siteRoutes = require("./routes/siteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const { tratarErros } = require("./middlewares/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: "MeuSiteJá backend está rodando",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/sites", siteRoutes);

app.use("/api/ia", aiRoutes);

app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    mensagem: `Rota não encontrada: ${req.method} ${req.path}`,
  });
});

app.use(tratarErros);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log("=".repeat(50));
  console.log("MeuSiteJá Backend iniciado");
  console.log(`servidor rodando na porta: ${PORTA}`);
  console.log(`url local: http://localhost:${PORTA}`);
  console.log(`ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log("=".repeat(50));
});

module.exports = app;