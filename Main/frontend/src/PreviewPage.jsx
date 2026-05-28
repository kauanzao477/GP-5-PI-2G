// frontend/src/PreviewPage.jsx — SUBSTITUA a seção do template resolve

import { useState, useRef, useCallback } from "react";
import PortfolioTemplate from "./templates/portfolio/PortfolioTemplate";
import NegocioLocalTemplate from "./templates/negocio-local/NegocioLocalTemplate";
import PrestadorServicosTemplate from "./templates/prestador-servicos/PrestadorServicosTemplate";
import logopng from "../../assets/logopng.png";

const API_URL = "http://localhost:3000";

const TEMPLATE_MAP = {
  "portfolio": PortfolioTemplate,
  "negocio-local": NegocioLocalTemplate,
  "business": NegocioLocalTemplate,
  "prestador-servicos": PrestadorServicosTemplate,
  "service": PrestadorServicosTemplate,
};

export default function PreviewPage({ dados, onBack }) {
  const { siteId, dadosProcessados, token, slug } = dados;

  const [dadosAtuais, setDadosAtuais] = useState(dadosProcessados);
  const [salvando, setSalvando] = useState(false);
  const [publicando, setPublicando] = useState(false);
  const [publicado, setPublicado] = useState(false);
  const [linkGerado, setLinkGerado] = useState("");
  const salvarTimerRef = useRef(null);

  // ── Resolver template ──
  const tipoTemplate = dadosAtuais.template || dadosAtuais.tipoTemplate || "portfolio";
  const TemplateComponent = TEMPLATE_MAP[tipoTemplate] || PortfolioTemplate;

  // LOG para debug
  console.log("═══════════════════════════════════════");
  console.log("🖥️ PREVIEW PAGE");
  console.log("  tipoTemplate resolvido:", tipoTemplate);
  console.log("  TemplateComponent:", TemplateComponent.name || "desconhecido");
  console.log("  dadosAtuais.template:", dadosAtuais.template);
  console.log("  dadosAtuais.tipoTemplate:", dadosAtuais.tipoTemplate);
  console.log("  Campos nos dados:", Object.keys(dadosAtuais));
  
  // Verifica se os campos da IA estão presentes
  if (tipoTemplate === "portfolio" || dadosAtuais.template === "portfolio") {
    console.log("  aboutMe (50 chars):", dadosAtuais.aboutMe?.substring(0, 50));
  }
  if (tipoTemplate === "negocio-local" || dadosAtuais.template === "business") {
    console.log("  history (50 chars):", dadosAtuais.history?.substring(0, 50));
    console.log("  services:", dadosAtuais.services?.length, "itens");
  }
  if (tipoTemplate === "prestador-servicos" || dadosAtuais.template === "service") {
    console.log("  trustParagraph (50 chars):", dadosAtuais.trustParagraph?.substring(0, 50));
    console.log("  providerServices:", dadosAtuais.providerServices?.length, "itens");
  }
  console.log("═══════════════════════════════════════");

  const salvarNoFirestore = useCallback(async (dadosParaSalvar) => {
    setSalvando(true);
    try {
      await fetch(`${API_URL}/api/sites/${siteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ dadosProcessados: dadosParaSalvar })
      });
    } catch (err) {
      console.error("Erro ao salvar automaticamente:", err);
    } finally {
      setSalvando(false);
    }
  }, [siteId, token]);

  const handleCampoEditado = useCallback((caminho, valor) => {
    setDadosAtuais(prev => {
      const novo = JSON.parse(JSON.stringify(prev));
      const partes = caminho.split(".");
      let ref = novo;
      for (let i = 0; i < partes.length - 1; i++) {
        if (ref[partes[i]] === undefined) ref[partes[i]] = {};
        ref = ref[partes[i]];
      }
      ref[partes[partes.length - 1]] = valor;

      clearTimeout(salvarTimerRef.current);
      salvarTimerRef.current = setTimeout(() => {
        salvarNoFirestore(novo);
      }, 1000);

      return novo;
    });
  }, [salvarNoFirestore]);

  const handlePublicar = async () => {
    if (!slug) {
      window.alert("Link do site não encontrado. Volte e preencha o campo de link.");
      return;
    }

    setPublicando(true);
    try {
      const res = await fetch(`${API_URL}/api/sites/${siteId}/publicar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ slug })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || "Erro ao publicar");

      setLinkGerado(`meusiteja.com/usuarios/${slug}`);
      setPublicado(true);

    } catch (err) {
      window.alert("Erro ao publicar: " + err.message);
    } finally {
      setPublicando(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-background">
        <div className="gradient-orb form-orb-1"></div>
        <div className="gradient-orb form-orb-2"></div>
        <div className="gradient-orb form-orb-3"></div>
      </div>

      <header className="form-header">
        <button className="btn-back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="icon-small">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Voltar ao formulário</span>
        </button>

        <div className="form-logo">
          <img src={logopng} alt="Logo MeuSiteJá"
            style={{ height: "13rem", cursor: "pointer" }}
            onClick={() => window.location.href = "/"} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: 600,
            color: salvando ? "#FBBF24" : "#4ADE80",
            display: "flex", alignItems: "center", gap: "0.4rem"
          }}>
            {salvando ? "💾 Salvando..." : "✅ Salvo"}
          </span>

          <span style={{
            fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: 500,
            padding: "0.4rem 0.85rem", background: "rgba(255,255,255,0.05)",
            borderRadius: "50px", border: "1px solid rgba(255,255,255,0.08)"
          }}>
            ✏️ Clique nos textos para editar
          </span>

          {publicado ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: "#4ADE80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Publicado!</span>
              <div style={{
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "8px", padding: "0.5rem 1rem", fontSize: "0.85rem",
                color: "#818CF8", fontWeight: 600
              }}>🔗 {linkGerado}</div>
            </div>
          ) : (
            <button onClick={handlePublicar} disabled={publicando}
              className={`btn ${publicando ? "btn-secondary" : "btn-success"}`}
              style={{ minWidth: 160 }}>
              {publicando ? "Publicando..." : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                  </svg>
                  Publicar site
                </>
              )}
            </button>
          )}
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 1 }}>
        <TemplateComponent
          dados={dadosAtuais}
          onCampoEditado={handleCampoEditado}
        />
      </main>
    </div>
  );
}