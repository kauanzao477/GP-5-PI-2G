require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/firebase");

const authRoutes = require("./routes/authRoutes");
const siteRoutes = require("./routes/siteRoutes");
const aiRoutes = require("./routes/aiRoutes");
const templateRenderer = require("./services/templateRenderer");
const hostingService = require("./services/hostingService");

const { tratarErros } = require("./middlewares/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ── Rota raiz ──
app.get("/", (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: "MeuSiteJá backend está rodando",
    timestamp: new Date().toISOString(),
  });
});

// ── Rota pública dos sites criados ──
app.get("/usuarios/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const site = await hostingService.buscarSitePublico(slug);

    if (!site) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Site não encontrado</title>
          <style>
            body{font-family:Inter,sans-serif;display:flex;align-items:center;
            justify-content:center;min-height:100vh;background:#f8f9fa;
            color:#333;text-align:center}
            .box{max-width:400px;padding:40px}
            h1{font-size:3rem;margin-bottom:16px}
            p{color:#666;margin-bottom:24px}
            a{color:#6366f1;font-weight:700}
          </style>
        </head>
        <body>
          <div class="box">
            <h1>404</h1>
            <p>Este site não existe ou não está publicado ainda.</p>
            <a href="/">← Voltar ao início</a>
          </div>
        </body>
        </html>
      `);
    }

    const html = templateRenderer.renderizarSitePublico(
      site.tipoTemplate,
      site.dadosSite
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);

  } catch (erro) {
    console.error("Erro ao servir site público:", erro.message);
    res.status(500).send("<h1>Erro interno</h1>");
  }
});

// ── Rotas da API ──
app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/ia", aiRoutes);

// ── 404 ──
app.use((req, res) => {
  return res.status(404).json({
    sucesso: false,
    mensagem: `Rota não encontrada: ${req.method} ${req.path}`,
  });
});

// ── Erros ──
app.use(tratarErros);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log("=".repeat(50));
  console.log("MeuSiteJá Backend iniciado");
  console.log(`Servidor rodando na porta: ${PORTA}`);
  console.log(`URL local: http://localhost:${PORTA}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log("=".repeat(50));
});

module.exports = app;