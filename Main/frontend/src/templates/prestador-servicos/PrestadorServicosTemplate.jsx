// frontend/src/templates/prestador-servicos/PrestadorServicosTemplate.jsx

import { useState, useRef } from "react";

// ── Paletas ──
const colorPalettes = {
  service: [
    { id: "service-trust",  colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef"] },
    { id: "service-energy", colors: ["#ff4800", "#ff6d00", "#ff8500", "#ffaa00"] },
    { id: "service-nature", colors: ["#284b63", "#3c6e71", "#d9d9d9", "#ffffff"] },
    { id: "service-bold",   colors: ["#10002b", "#5a189a", "#9d4edd", "#e0aaff"] },
    { id: "service-clean",  colors: ["#212529", "#495057", "#adb5bd", "#f8f9fa"] },
  ],
};

function resolverCores(dados) {
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return { fundo: dados.customPalette[0], primaria: dados.customPalette[1], secundaria: dados.customPalette[2], destaque: dados.customPalette[3] };
  }
  if (dados.selectedPalette) {
    const paleta = colorPalettes.service.find(p => p.id === dados.selectedPalette);
    if (paleta) {
      return { fundo: paleta.colors[0], primaria: paleta.colors[1], secundaria: paleta.colors[2], destaque: paleta.colors[3] };
    }
  }
  return { fundo: "#1A1A2E", primaria: "#FF6B00", secundaria: "#FF8500", destaque: "#FFF3E8" };
}

function fundoEscuro(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

// ── Texto editável ──
function TextoEditavel({ valor, onSalvar, multiline = false, style = {} }) {
  const [conteudo, setConteudo] = useState(valor || "");
  const [editando, setEditando] = useState(false);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    setConteudo(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSalvar(v), 1000);
  };

  const estiloBase = {
    background: "transparent", border: "none",
    borderBottom: editando ? "2px solid currentColor" : "2px solid transparent",
    outline: "none", font: "inherit", color: "inherit", width: "100%",
    padding: "2px 0", cursor: "text", transition: "border-color 0.2s",
    ...style,
  };

  return (
    <div style={{ position: "relative", marginBottom: editando ? 22 : 0, transition: "margin 0.2s" }}>
      {multiline ? (
        <textarea value={conteudo} onChange={handleChange}
          onFocus={() => setEditando(true)} onBlur={() => setEditando(false)}
          style={{ ...estiloBase, resize: "none", minHeight: 80, lineHeight: "inherit" }} rows={4} />
      ) : (
        <input type="text" value={conteudo} onChange={handleChange}
          onFocus={() => setEditando(true)} onBlur={() => setEditando(false)}
          style={estiloBase} />
      )}
      {editando && (
        <span style={{ position: "absolute", bottom: -20, left: 0, fontSize: "0.7rem", opacity: 0.7, fontWeight: 600, whiteSpace: "nowrap" }}>
          ✏️ Editando — salvo automaticamente
        </span>
      )}
    </div>
  );
}

export default function PrestadorServicosTemplate({ dados, onCampoEditado }) {
  const d = dados || {};
  const cores = resolverCores(d);
  const whatsappNumero = (d.providerContact?.whatsapp || "").replace(/\D/g, "");
  const wppLink = whatsappNumero
    ? `https://wa.me/${whatsappNumero}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}`
    : "#";

  const textoHero = fundoEscuro(cores.fundo) ? "white" : "#111827";
  const textoSec = fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  const salvar = (campo) => (valor) => onCampoEditado(campo, valor);
  const salvarServico = (i, campo) => (valor) => onCampoEditado(`providerServices.${i}.${campo}`, valor);

  const diasSemana = [
    { id: "monday", label: "Segunda" }, { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" }, { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" }, { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const sectionLabel = {
    fontSize: "0.8rem", fontWeight: 700, color: cores.primaria,
    letterSpacing: 2, textTransform: "uppercase", display: "inline-block", marginBottom: 10,
  };

  const cardStyle = {
    background: "white", borderRadius: 12, padding: 28,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  };

  const btnPrimario = {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "#25D366", color: "white", padding: "18px 36px",
    borderRadius: 50, fontSize: "1.05rem", fontWeight: 800,
    border: "none", cursor: "pointer", textDecoration: "none",
    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
  };

  const btnGhost = {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "transparent", color: "white", padding: "18px 36px",
    borderRadius: 50, fontSize: "1rem", fontWeight: 700,
    border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#333" }}>

      {/* ══ HEADER ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e0e0e0", padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 42, height: 42, background: cores.primaria, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem", color: "white",
          }}>🔧</div>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 800, color: cores.fundo, lineHeight: 1.2 }}>
              {d.name || "Seu Nome"}
            </h1>
            <span style={{ fontSize: "0.75rem", color: cores.primaria, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {d.profession || "Profissão"}
            </span>
          </div>
        </div>
        {whatsappNumero && (
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#25D366", color: "white", padding: "10px 20px",
            borderRadius: 50, fontWeight: 700, fontSize: "0.85rem",
            textDecoration: "none",
          }}>📱 <span>Orçamento Grátis</span></a>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section style={{
        padding: "120px 20px 60px", minHeight: "85vh", display: "flex", alignItems: "center",
        background: `linear-gradient(135deg, ${cores.fundo} 0%, ${fundoEscuro(cores.fundo) ? cores.primaria + "33" : cores.fundo} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
        }}>
          <div style={{ color: textoHero }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `rgba(${fundoEscuro(cores.fundo) ? "255,255,255" : "0,0,0"},0.1)`,
              border: `1px solid rgba(${fundoEscuro(cores.fundo) ? "255,255,255" : "0,0,0"},0.15)`,
              padding: "8px 18px", borderRadius: 50, fontSize: "0.8rem", fontWeight: 600,
              color: cores.primaria, marginBottom: 24, textTransform: "uppercase", letterSpacing: 1,
            }}>
              <span style={{ width: 8, height: 8, background: "#25D366", borderRadius: "50%" }} />
              Disponível agora
            </div>

            <TextoEditavel valor={d.name || "Seu Nome"} onSalvar={salvar("name")}
              style={{ fontSize: "3.2rem", fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }} />

            <div style={{ color: cores.primaria, marginBottom: 16 }}>
              <TextoEditavel valor={d.profession || "Sua Profissão"} onSalvar={salvar("profession")}
                style={{ fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }} />
            </div>

            <div style={{ color: textoSec, marginBottom: 36, lineHeight: 1.7, maxWidth: 480 }}>
              <TextoEditavel valor={d.trustParagraph || "Descreva por que os clientes devem confiar em você..."}
                onSalvar={salvar("trustParagraph")} multiline
                style={{ fontSize: "1.05rem" }} />
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {whatsappNumero && (
                <a href={wppLink} target="_blank" rel="noopener noreferrer" style={btnPrimario}>📲 Solicitar Orçamento</a>
              )}
              <a href="#servicos" style={btnGhost}>Ver Serviços ↓</a>
            </div>

            <div style={{
              display: "flex", gap: 32, marginTop: 40, paddingTop: 32,
              borderTop: `1px solid rgba(${fundoEscuro(cores.fundo) ? "255,255,255" : "0,0,0"},0.1)`,
            }}>
              {d.experience && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: cores.primaria }}>{d.experience}</div>
                  <div style={{ fontSize: "0.8rem", color: textoSec, textTransform: "uppercase", letterSpacing: 1 }}>Experiência</div>
                </div>
              )}
              {d.clientsServed && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: cores.primaria }}>{d.clientsServed}</div>
                  <div style={{ fontSize: "0.8rem", color: textoSec, textTransform: "uppercase", letterSpacing: 1 }}>Clientes</div>
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: cores.primaria }}>100%</div>
                <div style={{ fontSize: "0.8rem", color: textoSec, textTransform: "uppercase", letterSpacing: 1 }}>Garantia</div>
              </div>
            </div>
          </div>

          {/* Foto */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              width: 380, height: 450, borderRadius: 20, overflow: "hidden",
              border: `4px solid ${cores.primaria}44`,
              background: `linear-gradient(135deg, ${cores.primaria}33, ${cores.primaria}11)`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, color: "rgba(255,255,255,0.3)",
            }}>
              {d.photo?.preview ? (
                <img src={d.photo.preview} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <span style={{ fontSize: "5rem" }}>👷</span>
                  <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1 }}>Sua foto aqui</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVIÇOS ══ */}
      {d.providerServices?.length > 0 && (
        <section id="servicos" style={{ padding: "80px 20px", background: "#F8F9FA" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span style={sectionLabel}>O que eu faço</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: cores.fundo }}>Serviços Realizados</h2>
              <p style={{ fontSize: "1.05rem", color: "#666", marginTop: 12 }}>Conheça os serviços que ofereço com qualidade e garantia</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {d.providerServices.filter(s => s.name?.trim()).map((serv, i) => (
                <div key={i} style={{
                  ...cardStyle, textAlign: "center", position: "relative", overflow: "hidden",
                  border: "2px solid transparent", transition: "0.3s",
                }}>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: 16 }}>🔧</span>
                  <TextoEditavel valor={serv.name} onSalvar={salvarServico(i, "name")}
                    style={{ fontSize: "1.1rem", fontWeight: 800, color: cores.fundo, textAlign: "center" }} />
                  {serv.description && (
                    <TextoEditavel valor={serv.description} onSalvar={salvarServico(i, "description")}
                      style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.5, marginTop: 8, textAlign: "center" }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              {whatsappNumero && (
                <a href={wppLink} target="_blank" rel="noopener noreferrer" style={btnPrimario}>📲 Solicitar Orçamento Grátis</a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ POR QUE ME CONTRATAR ══ */}
      <section style={{ padding: "80px 20px", background: cores.fundo, color: textoHero }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ ...sectionLabel, color: cores.secundaria }}>Diferenciais</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: textoHero }}>Por que me contratar?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { icone: "🏆", titulo: `${d.experience || "Anos"} de Experiência`, desc: "Profissional experiente e qualificado." },
              { icone: "⚡", titulo: "Atendimento Rápido", desc: "Resposta imediata e agendamento ágil." },
              { icone: "💰", titulo: "Preço Justo", desc: "Orçamento transparente, sem surpresas." },
              { icone: "✅", titulo: "Garantia no Serviço", desc: "Todo trabalho com garantia de qualidade." },
            ].map((dif, i) => (
              <div key={i} style={{
                display: "flex", gap: 20,
                background: fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: 12, padding: 28, transition: "0.3s",
              }}>
                <div style={{
                  fontSize: "2.5rem", flexShrink: 0, width: 60, height: 60,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${cores.primaria}22`, borderRadius: 14,
                }}>{dif.icone}</div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: 8 }}>{dif.titulo}</h3>
                  <p style={{ fontSize: "0.9rem", color: textoSec, lineHeight: 1.6 }}>{dif.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Texto de confiança */}
          {d.trustParagraph && (
            <div style={{
              marginTop: 48, background: `${cores.primaria}1A`,
              borderLeft: `4px solid ${cores.primaria}`,
              borderRadius: "0 12px 12px 0", padding: "28px 32px",
            }}>
              <TextoEditavel valor={d.trustParagraph} onSalvar={salvar("trustParagraph")} multiline
                style={{ fontSize: "1rem", color: textoSec, lineHeight: 1.8, fontStyle: "italic" }} />
            </div>
          )}
        </div>
      </section>

      {/* ══ PORTFÓLIO (ANTES E DEPOIS) ══ */}
      {d.beforeAfter?.length > 0 && (
        <section style={{ padding: "80px 20px", background: "white" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span style={sectionLabel}>Portfólio</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: cores.fundo }}>Fotos de Trabalhos</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {d.beforeAfter.map((item, i) => (
                <div key={i} style={{ ...cardStyle, overflow: "hidden", padding: 0 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 200 }}>
                    {/* Antes */}
                    <div style={{ position: "relative", overflow: "hidden", background: "#F8F9FA" }}>
                      <span style={{
                        position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.7)", color: "white",
                        fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: 50,
                        textTransform: "uppercase", zIndex: 2,
                      }}>Antes</span>
                      {item.before?.preview ? (
                        <img src={item.before.preview} alt="Antes" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#999", gap: 6 }}>
                          <span style={{ fontSize: "2rem", opacity: 0.4 }}>📷</span>
                          <span style={{ fontSize: "0.75rem" }}>Foto Antes</span>
                        </div>
                      )}
                    </div>
                    {/* Depois */}
                    <div style={{ position: "relative", overflow: "hidden", background: "#F8F9FA" }}>
                      <span style={{
                        position: "absolute", top: 8, left: 8, background: "rgba(37,211,102,0.9)", color: "white",
                        fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: 50,
                        textTransform: "uppercase", zIndex: 2,
                      }}>Depois</span>
                      {item.after?.preview ? (
                        <img src={item.after.preview} alt="Depois" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#999", gap: 6 }}>
                          <span style={{ fontSize: "2rem", opacity: 0.4 }}>📷</span>
                          <span style={{ fontSize: "0.75rem" }}>Foto Depois</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: cores.fundo, marginBottom: 4 }}>
                      {item.title || `Trabalho #${i + 1}`}
                    </h3>
                    {item.description && (
                      <p style={{ fontSize: "0.85rem", color: "#666" }}>{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ ATENDIMENTO: REGIÕES + HORÁRIOS + CONTATO ══ */}
      <section id="atendimento" style={{ padding: "80px 20px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={sectionLabel}>Atendimento</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: cores.fundo }}>Como me encontrar</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {/* Regiões */}
            <div style={{ ...cardStyle, textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>📍</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: cores.fundo, marginBottom: 16 }}>Regiões Atendidas</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {d.regions?.filter(r => r?.trim()).map((regiao, i) => (
                  <li key={i} style={{
                    fontSize: "0.9rem", color: "#666", padding: "8px 0",
                    borderBottom: "1px solid #e0e0e0", display: "flex",
                    alignItems: "center", gap: 8, justifyContent: "center",
                  }}>
                    <span style={{ color: "#28A745", fontWeight: 700 }}>✓</span>
                    {regiao}
                  </li>
                ))}
              </ul>
            </div>

            {/* Horários */}
            <div style={{ ...cardStyle, textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🕐</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: cores.fundo, marginBottom: 16 }}>Horário de Atendimento</h3>
              {diasSemana.map(dia => {
                const h = d.providerHours?.[dia.id];
                return (
                  <div key={dia.id} style={{
                    display: "flex", justifyContent: "space-between", padding: "10px 0",
                    borderBottom: "1px solid #e0e0e0", fontSize: "0.9rem",
                  }}>
                    <span style={{ fontWeight: 700, color: cores.fundo }}>{dia.label}</span>
                    <span style={{ color: h?.open ? "#666" : "#E07A5F" }}>
                      {h?.open ? `${h.start || "08:00"} – ${h.end || "18:00"}` : "Fechado"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contato */}
            <div style={{ ...cardStyle, textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>📞</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: cores.fundo, marginBottom: 16 }}>Contato</h3>
              {d.providerContact?.whatsapp && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #e0e0e0", textAlign: "left" }}>
                  <div style={{ fontSize: "1.3rem", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: cores.destaque, borderRadius: 10 }}>📱</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#999", textTransform: "uppercase", letterSpacing: 0.5 }}>WhatsApp</div>
                    <div style={{ fontWeight: 700, color: cores.fundo }}>{d.providerContact.whatsapp}</div>
                  </div>
                </div>
              )}
              {d.providerContact?.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #e0e0e0", textAlign: "left" }}>
                  <div style={{ fontSize: "1.3rem", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: cores.destaque, borderRadius: 10 }}>📞</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#999", textTransform: "uppercase", letterSpacing: 0.5 }}>Telefone</div>
                    <div style={{ fontWeight: 700, color: cores.fundo }}>{d.providerContact.phone}</div>
                  </div>
                </div>
              )}
              {d.providerContact?.email && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", textAlign: "left" }}>
                  <div style={{ fontSize: "1.3rem", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: cores.destaque, borderRadius: 10 }}>✉️</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#999", textTransform: "uppercase", letterSpacing: 0.5 }}>E-mail</div>
                    <div style={{ fontWeight: 700, color: cores.fundo, fontSize: "0.8rem" }}>{d.providerContact.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section style={{
        background: `linear-gradient(135deg, ${cores.primaria}, ${cores.secundaria})`,
        padding: "60px 20px", textAlign: "center", color: "white",
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: 12 }}>Precisa de um orçamento?</h2>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: 28 }}>
          Fale comigo agora mesmo pelo WhatsApp. Resposta rápida e sem compromisso!
        </p>
        {whatsappNumero && (
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={{
            ...btnPrimario, background: "white", color: "#25D366",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)", fontSize: "1.15rem", padding: "20px 44px",
          }}>📲 Chamar no WhatsApp</a>
        )}
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: cores.fundo, color: "rgba(255,255,255,0.5)",
        padding: "30px 20px", textAlign: "center", fontSize: "0.85rem",
      }}>
        <p>© {new Date().getFullYear()} <a href="#inicio" style={{ color: cores.primaria, fontWeight: 600, textDecoration: "none" }}>{d.name || "Profissional"}</a> — {d.profession || ""}</p>
        <p style={{ marginTop: 4, fontSize: "0.75rem", opacity: 0.6 }}>Todos os direitos reservados</p>
      </footer>

      {/* ══ WHATSAPP FLUTUANTE ══ */}
      {whatsappNumero && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
        }}>
          <div style={{
            background: "white", color: "#333", padding: "10px 16px",
            borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap",
          }}>💬 Fale comigo agora!</div>
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={{
            width: 64, height: 64, borderRadius: "50%", background: "#25D366",
            color: "white", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          }}>📱</a>
        </div>
      )}
    </div>
  );
}