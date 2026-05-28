const { criarErro } = require("../middlewares/errorMiddleware");
const firestoreService = require("../services/firestoreService");
const hostingService = require("../services/hostingService");

async function criarSite(req, res, next) {
  try {
    const { uid } = req.usuario;

    const { tipoTemplate, dadosOriginais, dadosProcessados } = req.body;

    if (!tipoTemplate) {
      throw criarErro("o tipo de template é obrigatório", 400);
    }
    
    const templateValidos = ["portfolio", "negocio-local", "prestador-servicos"];
    if (!templateValidos.includes(tipoTemplate)) {
      throw criarErro(
        `template invalido. Escolha entre: ${templateValidos.join(", ")}`,
        400
      );
    }
    
    const sitesExistentes = await firestoreService.listarSitesDoUsuario(uid);

    if (sitesExistentes.length >= 1) {
      throw criarErro(
        "voce já possui um site criado. Delete o existente para criar um novo",
        400
      );
    }
    
    const dadosSite = {
      uidUsuario: uid,
      tipoTemplate,
      dadosOriginais: dadosOriginais || {},
      dadosProcessados: dadosProcessados || {},
      publicado: false,
      slug: null,
      urlPublica: null,
      status: "rascunho",
    };

    const siteId = await firestoreService.salvarSite(dadosSite);

    const urlPreview = hostingService.gerarUrlPreview(siteId);

    return res.status(201).json({
      sucesso: true,
      mensagem: "site criado com sucesso. Revise os dados e publique",
      dados: {
        siteId,
        urlPreview,
        status: "rascunho",
      },
    });
  } catch (erro) {
    next(erro);
  }
}

async function listarMeusSites(req, res, next) {
  try {
    const { uid } = req.usuario;

    const sites = await firestoreService.listarSitesDoUsuario(uid);

    return res.status(200).json({
      sucesso: true,
      quantidade: sites.length,
      dados: sites,
    });
  } catch (erro) {
    next(erro);
  }
}

async function buscarSite(req, res, next) {
  try {
    const { uid } = req.usuario;
    const { siteId } = req.params;

    const site = await firestoreService.buscarSitePorId(siteId);
    
    if (!site) {
      throw criarErro("site nao encontrado", 404);
    }
    
    if (site.uidUsuario !== uid) {
      throw criarErro("voce nao tem permissao para acessar este site", 403);
    }

    return res.status(200).json({
      sucesso: true,
      dados: site,
    });
  } catch (erro) {
    next(erro);
  }
}

async function atualizarSite(req, res, next) {
  try {
    const { uid } = req.usuario;
    const { siteId } = req.params;
    const dadosAtualizados = req.body;

    const site = await firestoreService.buscarSitePorId(siteId);

    if (!site) {
      throw criarErro("site nao encontrado", 404);
    }

    if (site.uidUsuario !== uid) {
      throw criarErro("voce nao tem permissao para editar este site", 403);
    }
    
    if (site.publicado && dadosAtualizados.slug) {
      throw criarErro(
        "o slug nao pode ser alterado apos a publicacao do site",
        400
      );
    }
    
    await firestoreService.atualizarSite(siteId, dadosAtualizados);

    return res.status(200).json({
      sucesso: true,
      mensagem: "site atualizado com sucesso",
    });
  } catch (erro) {
    next(erro);
  }
}

async function publicarSite(req, res, next) {
  try {
    const { uid } = req.usuario;
    const { siteId } = req.params;
    const { slug } = req.body;
    
    if (!slug) {
      throw criarErro("O slug (endereço do site) é obrigatorio", 400);
    }
    
    const formatoSlugValido = /^[a-z0-9-]{3,30}$/.test(slug);
    if (!formatoSlugValido) {
      throw criarErro(
        "Slug invalido. Use apenas letras minusculas, numeros e hifens (3-30 caracteres)",
        400
      );
    }
    
    const site = await firestoreService.buscarSitePorId(siteId);

    if (!site) {
      throw criarErro("site nao encontrado.", 404);
    }

    if (site.uidUsuario !== uid) {
      throw criarErro("voce nao tem permissao para publicar este site", 403);
    }

    const slugDisponivel = await firestoreService.verificarSlugDisponivel(slug);
    if (!slugDisponivel) {
      throw criarErro(
        "este endereço ja está em uso, escolha outro slug.",
        409
      );
    }

    const dadosPublicacao = await hostingService.publicarSite(siteId, slug);

    return res.status(200).json({
      sucesso: true,
      mensagem: "site publicado com sucesso. compartilhe o link abaixo",
      dados: dadosPublicacao,
    });
  } catch (erro) {
    next(erro);
  }
}

async function deletarSite(req, res, next) {
  try {
    const { uid } = req.usuario;
    const { siteId } = req.params;

    const site = await firestoreService.buscarSitePorId(siteId);

    if (!site) {
      throw criarErro("site nao encontrado", 404);
    }

    if (site.uidUsuario !== uid) {
      throw criarErro("voce nao tem permissao para deletar este site", 403);
    }

    await firestoreService.deletarSite(siteId);

    return res.status(200).json({
      sucesso: true,
      mensagem: "site deletado com sucesso",
    });
  } catch (erro) {
    next(erro);
  }
}

async function acessarSitePublico(req, res, next) {
  try {
    const { slug } = req.params;
    const templateRenderer = require("../services/templateRenderer");

    const site = await hostingService.buscarSitePublico(slug);

    if (!site) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html><head><title>Site não encontrado</title>
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
            <p>Este site não existe ou não está publicado.</p>
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
    return res.send(html);

  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  criarSite,
  listarMeusSites,
  buscarSite,
  atualizarSite,
  publicarSite,
  deletarSite,
  acessarSitePublico,
};