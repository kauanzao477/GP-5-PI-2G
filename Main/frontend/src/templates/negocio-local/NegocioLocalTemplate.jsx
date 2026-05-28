// frontend/src/templates/negocio-local/NegocioLocalTemplate.jsx

import { useState, useRef } from "react";

// ── Paletas ──
const colorPalettes = {
  business: [
    { id: "business-warm",    colors: ["#2c1810", "#854442", "#be9b7b", "#fff4e6"] },
    { id: "business-fresh",   colors: ["#1b4332", "#40916c", "#95d5b2", "#d8f3dc"] },
    { id: "business-elegant", colors: ["#14213d", "#fca311", "#e5e5e5", "#ffffff"] },
    { id: "business-vibrant", colors: ["#d00000", "#ffba08", "#3f88c5", "#032b43"] },
    { id: "business-classic", colors: ["#3d405b", "#81b29a", "#f2cc8f", "#f4f1de"] },
  ],
};

function resolverCores(dados) {
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return { fundo: dados.customPalette[0], primaria: dados.customPalette[1], secundaria: dados.customPalette[2], destaque: dados.customPalette[3] };
  }
  if (dados.selectedPalette) {
    const paleta = colorPalettes.business.find(p => p.id === dados.selectedPalette);
    if (paleta) {
      return { fundo: paleta.colors[0], primaria: paleta.colors[1], secundaria: paleta.colors[2], destaque: paleta.colors[3] };
    }
  }
  return { fundo: "#1b4332", primaria: "#40916c", secundaria: "#95d5b2", destaque: "#d8f3dc" };
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

export default function NegocioLocalTemplate({ dados, onCampoEditado }) {
  const d = dados || {};
  const cores = resolverCores(d);
  const whatsappNumero = (d.businessContact?.whatsapp || "").replace(/\D/g, "");
  const wppLink = whatsappNumero ? `https://wa.me/${whatsappNumero}?text=${encodeURIComponent("Olá! Gostaria de saber mais.")}` : "#";

  const textoHero = fundoEscuro(cores.fundo) ? "white" : "#111827";
  const textoSec = fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  const salvar = (campo) => (valor) => onCampoEditado(campo, valor);
  const salvarServico = (i, campo) => (valor) => onCampoEditado(`services.${i}.${campo}`, valor);

  // Montar horários legíveis
  const diasSemana = [
    { id: "monday", label: "Segunda" }, { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" }, { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" }, { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const sectionLabel = {
    fontSize: "0.8rem", fontWeight: 700, color: cores.primaria,
    letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8,
  };

  const cardStyle = {
    background: "white", borderRadius: 20, padding: 32,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderTop: `4px solid ${cores.primaria}`,
  };

  const btnPrimario = {
    padding: "14px 28px", borderRadius: 50, background: "#25D366",
    color: "white", fontWeight: 700, textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "none", cursor: "pointer", fontSize: "0.95rem",
    boxShadow: "0 4px 18px rgba(37,211,102,0.4)",
  };

  const btnGhost = {
    padding: "14px 28px", borderRadius: 50,
    border: `2px solid ${fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.3)" : cores.primaria}`,
    color: fundoEscuro(cores.fundo) ? "white" : cores.primaria,
    fontWeight: 700, textDecoration: "none", display: "inline-flex",
    alignItems: "center", gap: 8,
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Nunito', sans-serif", color: "#111827" }}>

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: `rgba(${fundoEscuro(cores.fundo) ? "0,0,0" : "255,255,255"},0.95)`,
        backdropFilter: "blur(10px)", padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: cores.primaria,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
          }}>🏪</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: textoHero }}>{d.businessName || "Seu Negócio"}</div>
            <div style={{ fontSize: "0.7rem", color: cores.primaria, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
              Negócio Local
            </div>
          </div>
        </div>
        {whatsappNumero && (
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={{
            ...btnPrimario, padding: "10px 22px", fontSize: "0.82rem",
          }}>📲 Contato</a>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(150deg, ${cores.fundo} 0%, ${cores.primaria} 100%)`,
        padding: "120px 40px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `rgba(255,255,255,0.15)`, border: "1px solid rgba(255,255,255,0.2)",
              padding: "7px 18px", borderRadius: 50, fontSize: "0.7rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: 2, color: cores.destaque, marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, background: "#25D366", borderRadius: "50%" }} />
              Aberto agora
            </div>

            <div style={{ color: textoHero }}>
              <TextoEditavel valor={d.businessName || "Nome do Negócio"} onSalvar={salvar("businessName")}
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900 }} />
            </div>

            <div style={{ color: textoSec, marginTop: 8, marginBottom: 32 }}>
              <TextoEditavel valor={d.history ? d.history.substring(0, 120) + "..." : "Descrição do seu negócio"}
                onSalvar={salvar("history")}
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }} />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {whatsappNumero && (
                <a href={wppLink} target="_blank" rel="noopener noreferrer" style={btnPrimario}>📲 WhatsApp</a>
              )}
              <a href="#servicos" style={btnGhost}>Ver Serviços ↓</a>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              {d.businessTime && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: cores.destaque }}>{d.businessTime}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>de experiência</div>
                </div>
              )}
              {d.services?.length > 0 && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: cores.destaque }}>{d.services.length}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>serviços</div>
                </div>
              )}
            </div>
          </div>

          {/* Fotos hero */}
          <div style={{
            width: "100%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden",
            background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.3)", display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column", gap: 12,
            color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontWeight: 700,
          }}>
            {d.photos?.[0]?.preview ? (
              <img src={d.photos[0].preview} alt="Foto principal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <>
                <span style={{ fontSize: "5rem" }}>🏪</span>
                <small>Foto do negócio</small>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ SOBRE / HISTÓRIA ══ */}
      <section id="sobre" style={{ padding: "100px 60px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center",
          }}>
            <div style={{
              aspectRatio: "4/5", borderRadius: 24, overflow: "hidden",
              background: `linear-gradient(135deg, ${cores.destaque}, #EDF3EF)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {d.photos?.[1]?.preview ? (
                <img src={d.photos[1].preview} alt="Sobre" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "4rem", opacity: 0.3 }}>📖</span>
              )}
            </div>
            <div>
              <span style={sectionLabel}>Nossa História</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 6 }}>
                Sobre o {d.businessName || "Negócio"}
              </h2>
              <div style={{ color: cores.primaria, fontWeight: 700, marginBottom: 18 }}>
                {d.businessTime ? `${d.businessTime} de tradição e qualidade` : ""}
              </div>
              <TextoEditavel
                valor={d.history || "Conte a história do seu negócio..."}
                onSalvar={salvar("history")}
                multiline
                style={{ color: "#374151", lineHeight: 1.85, fontSize: "0.94rem" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVIÇOS ══ */}
      {d.services?.length > 0 && (
        <section id="servicos" style={{ padding: "100px 60px", background: "#EDF3EF" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={sectionLabel}>🛎️ Serviços</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>O que oferecemos</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {d.services.map((serv, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 15,
                  background: "white", borderRadius: 14, padding: "20px 22px",
                  border: "2px solid #DCE9DF", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "0.25s",
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 13, background: cores.destaque,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", flexShrink: 0,
                  }}>🛎️</div>
                  <div style={{ flex: 1 }}>
                    <TextoEditavel valor={serv.name || "Serviço"} onSalvar={salvarServico(i, "name")}
                      style={{ fontWeight: 800, fontSize: "0.97rem" }} />
                    {serv.description && (
                      <TextoEditavel valor={serv.description} onSalvar={salvarServico(i, "description")}
                        style={{ fontSize: "0.8rem", color: "#5A6E5F", marginTop: 2 }} />
                    )}
                  </div>
                  {serv.price && (
                    <div style={{
                      flexShrink: 0, background: "#FDEAE5", color: "#E07A5F",
                      fontSize: "0.88rem", fontWeight: 800, padding: "5px 13px", borderRadius: 50,
                    }}>{serv.price}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ GALERIA ══ */}
      {d.photos?.length > 0 && (
        <section style={{ padding: "100px 60px", background: "white" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={sectionLabel}>📸 Espaço</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Conheça nosso local</h2>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
            }}>
              {d.photos.map((foto, i) => (
                <div key={i} style={{
                  borderRadius: 14, overflow: "hidden", height: i === 0 ? 300 : 230,
                  gridColumn: i === 0 ? "span 2" : "span 1",
                  background: `linear-gradient(135deg, ${cores.destaque}, #EDF3EF)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {foto.preview ? (
                    <img src={foto.preview} alt={`Foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>🖼️</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LOCALIZAÇÃO + HORÁRIOS + CONTATO ══ */}
      <section id="local" style={{ padding: "100px 60px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={sectionLabel}>📍 Localização</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Como nos encontrar</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Mapa placeholder */}
            <div style={{
              borderRadius: 24, height: 420,
              background: `linear-gradient(135deg, ${cores.destaque}, #EDF3EF)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 12, color: "#5A6E5F", fontSize: "0.85rem",
            }}>
              <span style={{ fontSize: "3.5rem", opacity: 0.3 }}>🗺️</span>
              <small>Mapa será exibido aqui</small>
              {d.cep && <span style={{ fontWeight: 700 }}>CEP: {d.cep}</span>}
            </div>

            {/* Cards info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Endereço */}
              <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11, background: cores.destaque,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                  }}>📍</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800 }}>Endereço</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#5A6E5F", lineHeight: 1.8 }}>
                  <strong>CEP: {d.cep || "Não informado"}</strong><br />
                  {d.reference && <em>🅿️ {d.reference}</em>}
                </p>
              </div>

              {/* Horários */}
              <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11, background: cores.destaque,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                  }}>🕐</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800 }}>Horários</h3>
                </div>
                {diasSemana.map(dia => {
                  const h = d.hours?.[dia.id];
                  return (
                    <div key={dia.id} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "9px 0", borderBottom: "1px solid #DCE9DF", fontSize: "0.87rem",
                    }}>
                      <span style={{ fontWeight: 800 }}>{dia.label}</span>
                      <span style={{ color: h?.open ? "#5A6E5F" : "#E07A5F", fontWeight: 600 }}>
                        {h?.open ? `${h.start || "09:00"} – ${h.end || "18:00"}` : "Fechado"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Contato */}
              <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11, background: cores.destaque,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                  }}>📞</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800 }}>Contato</h3>
                </div>
                {d.businessContact?.whatsapp && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #DCE9DF" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>📱</div>
                    <div>
                      <div style={{ fontSize: "0.67rem", color: "#9EB09F", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>WhatsApp</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800 }}>{d.businessContact.whatsapp}</div>
                    </div>
                  </div>
                )}
                {d.businessContact?.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #DCE9DF" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>📞</div>
                    <div>
                      <div style={{ fontSize: "0.67rem", color: "#9EB09F", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>Telefone</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800 }}>{d.businessContact.phone}</div>
                    </div>
                  </div>
                )}
                {d.businessContact?.email && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✉️</div>
                    <div>
                      <div style={{ fontSize: "0.67rem", color: "#9EB09F", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>E-mail</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 800 }}>{d.businessContact.email}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REDES SOCIAIS ══ */}
      {(d.businessContact?.instagram || d.businessContact?.facebook || d.businessContact?.tiktok || d.businessContact?.youtube) && (
        <section style={{ padding: "60px 60px", background: "white", textAlign: "center" }}>
          <span style={sectionLabel}>Redes Sociais</span>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
            {d.businessContact?.instagram && (
              <a href={d.businessContact.instagram.startsWith("http") ? d.businessContact.instagram : `https://instagram.com/${d.businessContact.instagram.replace("@", "")}`}
                target="_blank" rel="noopener noreferrer"
                style={{ width: 50, height: 50, borderRadius: "50%", background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", textDecoration: "none" }}>
                📸
              </a>
            )}
            {d.businessContact?.facebook && (
              <a href={d.businessContact.facebook.startsWith("http") ? d.businessContact.facebook : `https://facebook.com/${d.businessContact.facebook}`}
                target="_blank" rel="noopener noreferrer"
                style={{ width: 50, height: 50, borderRadius: "50%", background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", textDecoration: "none" }}>
                👤
              </a>
            )}
            {d.businessContact?.tiktok && (
              <a href={d.businessContact.tiktok.startsWith("http") ? d.businessContact.tiktok : `https://tiktok.com/@${d.businessContact.tiktok.replace("@", "")}`}
                target="_blank" rel="noopener noreferrer"
                style={{ width: 50, height: 50, borderRadius: "50%", background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", textDecoration: "none" }}>
                🎵
              </a>
            )}
            {d.businessContact?.youtube && (
              <a href={d.businessContact.youtube.startsWith("http") ? d.businessContact.youtube : `https://youtube.com/${d.businessContact.youtube}`}
                target="_blank" rel="noopener noreferrer"
                style={{ width: 50, height: 50, borderRadius: "50%", background: cores.destaque, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", textDecoration: "none" }}>
                🎬
              </a>
            )}
          </div>
        </section>
      )}

      {/* ══ CTA ══ */}
      <section style={{
        background: `linear-gradient(135deg, ${cores.primaria}, ${cores.fundo})`,
        padding: "72px 24px", textAlign: "center", color: "white",
      }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12 }}>
          Venha nos visitar!
        </h2>
        <p style={{ fontSize: "1.02rem", opacity: 0.8, marginBottom: 28 }}>
          Entre em contato pelo WhatsApp. Rápido, fácil e sem complicação!
        </p>
        {whatsappNumero && (
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={btnPrimario}>📲 Chamar no WhatsApp</a>
        )}
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: fundoEscuro(cores.fundo) ? "rgba(0,0,0,0.5)" : cores.fundo,
        color: fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
        textAlign: "center", padding: "48px 40px", fontSize: "0.9rem",
      }}>
        <p style={{ fontWeight: 800, fontSize: "1.2rem", color: fundoEscuro(cores.fundo) ? "white" : cores.fundo, marginBottom: 6 }}>
          {d.businessName || "Seu Negócio"}
        </p>
        <p>© 2025 {d.businessName} — Todos os direitos reservados</p>
      </footer>

      {/* ══ WHATSAPP FLUTUANTE ══ */}
      {whatsappNumero && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{
            background: "white", padding: "10px 16px", borderRadius: 12,
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)", fontSize: "0.8rem", fontWeight: 700,
            borderLeft: "3px solid #25D366",
          }}>🏪 Fale conosco!</div>
          <a href={wppLink} target="_blank" rel="noopener noreferrer" style={{
            width: 64, height: 64, borderRadius: "50%", background: "#25D366", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem",
            textDecoration: "none", boxShadow: "0 4px 22px rgba(37,211,102,0.5)",
          }}>📱</a>
        </div>
      )}
    </div>
  );
}