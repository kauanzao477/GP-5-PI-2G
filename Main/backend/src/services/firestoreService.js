const { db } = require("../config/firebase");

async function salvarUsuario(uid, dadosUsuario) {
  const referenciaUsuario = db.collection("usuarios").doc(uid);

  await referenciaUsuario.set(
    {
      ...dadosUsuario,
      uid: uid,
      atualizadoEm: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log(`usuario ${uid} salvo no firestore`);
}

async function buscarUsuario(uid) {
  const documentoUsuario = await db.collection("usuarios").doc(uid).get();

  if (!documentoUsuario.exists) {
    return null;
  }

  return documentoUsuario.data();
}

async function salvarSite(dadosSite) {
  const referenciaSite = await db.collection("sites").add({
    ...dadosSite,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  });

  console.log(`site criado com ID: ${referenciaSite.id}`);

  return referenciaSite.id;
}

async function atualizarSite(siteId, dadosAtualizados) {
  await db
    .collection("sites")
    .doc(siteId)
    .update({
      ...dadosAtualizados,
      atualizadoEm: new Date().toISOString(),
    });

  console.log(`site ${siteId} atualizado`);
}

async function buscarSitePorId(siteId) {
  const documentoSite = await db.collection("sites").doc(siteId).get();

  if (!documentoSite.exists) {
    return null;
  }

  return { id: documentoSite.id, ...documentoSite.data() };
}

async function buscarSitePorSlug(slug) {
  const consulta = await db
    .collection("sites")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (consulta.empty) {
    return null;
  }

  const documento = consulta.docs[0];
  return { id: documento.id, ...documento.data() };
}

async function listarSitesDoUsuario(uid) {
  const consulta = await db
    .collection("sites")
    .where("uidUsuario", "==", uid)
    .orderBy("criadoEm", "desc")
    .get();

  const sites = consulta.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return sites;
}

async function deletarSite(siteId) {
  await db.collection("sites").doc(siteId).delete();
  console.log(`site ${siteId} deletado`);
}

async function verificarSlugDisponivel(slug) {
  const siteExistente = await buscarSitePorSlug(slug);

  return siteExistente === null;
}

module.exports = {
  salvarUsuario,
  buscarUsuario,
  salvarSite,
  atualizarSite,
  buscarSitePorId,
  buscarSitePorSlug,
  listarSitesDoUsuario,
  deletarSite,
  verificarSlugDisponivel,
};