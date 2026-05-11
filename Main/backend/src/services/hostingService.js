const { db } = require("../config/firebase");
require("dotenv").config();

const URL_BASE = process.env.BASE_URL || "https://meusiteja.com";

async function publicarSite(siteId, slug) {
  const urlPublica = `${URL_BASE}/usuarios/${slug}`;

  await db.collection("sites").doc(siteId).update({
    publicado: true,
    slug: slug,
    urlPublica: urlPublica,
    publicadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  });

  console.log(`Site ${siteId} publicado em: ${urlPublica}`);

  return {
    siteId,
    slug,
    urlPublica,
    publicadoEm: new Date().toISOString(),
  };
}

async function despublicarSite(siteId) {
  await db.collection("sites").doc(siteId).update({
    publicado: false,
    atualizadoEm: new Date().toISOString(),
  });

  console.log(`site ${siteId} despublicado`);
}

function gerarUrlPreview(siteId) {
  return `${URL_BASE}/preview/${siteId}`;
}

async function buscarSitePublico(slug) {
  const consulta = await db
    .collection("sites")
    .where("slug", "==", slug)
    .where("publicado", "==", true)
    .limit(1)
    .get();

  if (consulta.empty) {
    return null;
  }

  const documento = consulta.docs[0];
  const dados = documento.data();

  return {
    id: documento.id,
    tipoTemplate: dados.tipoTemplate,
    dadosSite: dados.dadosProcessados || dados.dadosOriginais,
    slug: dados.slug,
    urlPublica: dados.urlPublica,
    publicadoEm: dados.publicadoEm,
  };
}

module.exports = {
  publicarSite,
  despublicarSite,
  gerarUrlPreview,
  buscarSitePublico,
};