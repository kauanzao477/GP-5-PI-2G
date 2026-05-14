import { useState, useRef } from "react";

// ── Paletas (mesmas do FormPage) ──
const colorPalettes = {
  portfolio: [
    { id: "portfolio-modern",    colors: ["#1a1a2e", "#4a4e69", "#9a8c98", "#c9ada7"] },
    { id: "portfolio-tech",      colors: ["#0f0e17", "#ff8906", "#f25f4c", "#e53170"] },
    { id: "portfolio-minimal",   colors: ["#fafafa", "#232323", "#6c757d", "#adb5bd"] },
    { id: "portfolio-creative",  colors: ["#2d3047", "#419d78", "#e0a458", "#ffdbb5"] },
    { id: "portfolio-corporate", colors: ["#1b263b", "#415a77", "#778da9", "#e0e1dd"] },
  ],
};

// ── Resolve as cores a partir dos dados do formulário ──
function resolverCores(dados) {
  // Se usou paleta customizada
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return {
      fundo:      dados.customPalette[0],
      primaria:   dados.customPalette[1],
      secundaria: dados.customPalette[2],
      destaque:   dados.customPalette[3],
    };
  }

  // Se selecionou uma paleta predefinida
  if (dados.selectedPalette) {
    const todasPaletas = [
      ...colorPalettes.portfolio,
    ];
    const paleta = todasPaletas.find(p => p.id === dados.selectedPalette);
    if (paleta) {
      return {
        fundo:      paleta.colors[0],
        primaria:   paleta.colors[1],
        secundaria: paleta.colors[2],
        destaque:   paleta.colors[3],
      };
    }
  }

  // Fallback: azul padrão
  return {
    fundo:      "#1E3A8A",
    primaria:   "#3B82F6",
    secundaria: "#93C5FD",
    destaque:   "#DBEAFE",
  };
}

// ── Calcula se um fundo é escuro ou claro (para decidir cor do texto) ──
function fundoEscuro(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Fórmula de luminância
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia < 0.5;
}

// ── Componente de texto editável inline ──
function TextoEditavel({ valor, onSalvar, multiline = false, style = {} }) {
  const [conteudo, setConteudo] = useState(valor || "");
  const [editando, setEditando] = useState(false);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const novoValor = e.target.value;
    setConteudo(novoValor);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSalvar(novoValor);
    }, 1000);
  };

  const estiloBase = {
    background: "transparent",
    border: "none",
    borderBottom: editando ? `2px solid currentColor` : "2px solid transparent",
    outline: "none",
    font: "inherit",
    color: "inherit",
    width: "100%",
    padding: "2px 0",
    cursor: "text",
    transition: "border-color 0.2s",
    opacity: editando ? 1 : 0.95,
    ...style
  };

  return (
    <div style={{ position: "relative", marginBottom: editando ? 22 : 0, transition: "margin 0.2s" }}>
      {multiline ? (
        <textarea
          value={conteudo}
          onChange={handleChange}
          onFocus={() => setEditando(true)}
          onBlur={() => setEditando(false)}
          style={{ ...estiloBase, resize: "none", minHeight: 80, lineHeight: "inherit" }}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={conteudo}
          onChange={handleChange}
          onFocus={() => setEditando(true)}
          onBlur={() => setEditando(false)}
          style={estiloBase}
        />
      )}
      {editando && (
        <span style={{
          position: "absolute", bottom: -20, left: 0,
          fontSize: "0.7rem", opacity: 0.7, fontWeight: 600,
          whiteSpace: "nowrap"
        }}>
          ✏️ Editando — salvo automaticamente
        </span>
      )}
    </div>
  );
}

// ── Template Principal ──
export default function PortfolioTemplate({ dados, onCampoEditado }) {
  const d = dados || {};
  const cores = resolverCores(d);
  const whatsappNumero = (d.contact?.whatsapp || "").replace(/\D/g, "");

  // Texto sobre fundo principal (hero)
  const textoHero = fundoEscuro(cores.fundo) ? "white" : "#111827";
  // Texto sobre fundo de seção clara
  const textoSecao = fundoEscuro(cores.destaque) ? "white" : "#111827";
  // Texto secundário
  const textoSec = fundoEscuro(cores.fundo)
    ? `rgba(255,255,255,0.75)`
    : `rgba(0,0,0,0.6)`;

  const salvar = (campo) => (valor) => onCampoEditado(campo, valor);
  const salvarEmpresa = (index, campo) => (valor) =>
    onCampoEditado(`companies.${index}.${campo}`, valor);

  // Estilos reutilizáveis baseados nas cores
  const sectionLabel = {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: cores.primaria,
    letterSpacing: 2,
    textTransform: "uppercase",
    display: "block",
    marginBottom: 8
  };

  const cardStyle = {
    background: "white",
    borderRadius: 20,
    padding: 36,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    borderTop: `4px solid ${cores.primaria}`
  };

  const tagStyle = {
    background: cores.destaque,
    color: fundoEscuro(cores.destaque) ? "white" : cores.primaria,
    padding: "8px 20px",
    borderRadius: 50,
    fontWeight: 600,
    fontSize: "0.9rem",
    display: "inline-block"
  };

  const btnPrimario = {
    padding: "14px 28px",
    borderRadius: 50,
    background: cores.primaria,
    color: fundoEscuro(cores.primaria) ? "white" : "#111",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
    border: "none",
    cursor: "pointer"
  };

  const btnSecundario = {
    padding: "14px 28px",
    borderRadius: 50,
    border: `2px solid ${fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.5)" : cores.primaria}`,
    color: fundoEscuro(cores.fundo) ? "white" : cores.primaria,
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block"
  };

  const expIconStyle = {
    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
    background: cores.primaria,
    display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "1.3rem"
  };

  const badgePeriodo = {
    background: cores.destaque,
    color: fundoEscuro(cores.destaque) ? "white" : cores.primaria,
    padding: "3px 12px", borderRadius: 20,
    fontSize: "0.8rem", fontWeight: 600,
    display: "inline-block", marginBottom: 12
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#111827" }}>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        background: cores.fundo,
        padding: "80px 40px"
      }}>
        <div style={{ maxWidth: 700, width: "100%" }}>

          {d.photo?.preview && (
            <img
              src={d.photo.preview}
              alt="Foto profissional"
              style={{
                width: 130, height: 130, borderRadius: "50%",
                border: `5px solid ${cores.secundaria}`,
                objectFit: "cover",
                display: "block", margin: "0 auto 32px",
                boxShadow: `0 10px 40px rgba(0,0,0,0.3)`
              }}
            />
          )}

          <div style={{ color: textoHero }}>
            <TextoEditavel
              valor={d.name || "Seu Nome"}
              onSalvar={salvar("name")}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                textAlign: "center"
              }}
            />
          </div>

          <div style={{ marginTop: 12, marginBottom: 40, color: textoSec }}>
            <TextoEditavel
              valor={d.profession || "Sua Profissão"}
              onSalvar={salvar("profession")}
              style={{ fontSize: "1.2rem", textAlign: "center" }}
            />
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {whatsappNumero && (
              <a href={`https://wa.me/${whatsappNumero}`} target="_blank"
                rel="noopener noreferrer" style={btnPrimario}>
                📲 WhatsApp
              </a>
            )}
            <a href="#contato" style={btnSecundario}>✉️ Contato</a>
          </div>
        </div>
      </section>

      {/* ══ SOBRE ══ */}
      <section id="sobre" style={{ padding: "100px 60px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={sectionLabel}>Sobre Mim</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Quem sou eu</h2>
          </div>

          <div style={{ ...cardStyle, borderTop: `4px solid ${cores.primaria}` }}>
            <TextoEditavel
              valor={d.aboutMe || "Escreva sobre você..."}
              onSalvar={salvar("aboutMe")}
              multiline
              style={{ color: "#374151", lineHeight: 1.9, fontSize: "1.05rem" }}
            />
          </div>

          {d.tags?.length > 0 && (
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 10, justifyContent: "center", marginTop: 32
            }}>
              {d.tags.map((tag, i) => (
                <span key={i} style={tagStyle}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ HABILIDADES ══ */}
      {d.skills?.length > 0 && (
        <section id="skills" style={{
          padding: "100px 60px",
          background: cores.destaque,
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ ...sectionLabel, color: fundoEscuro(cores.destaque) ? cores.secundaria : cores.primaria }}>
                Competências
              </span>
              <h2 style={{
                fontSize: "2.2rem", fontWeight: 800,
                color: fundoEscuro(cores.destaque) ? "white" : "#111827"
              }}>
                O que eu domino
              </h2>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              {d.skills.map((skill, i) => (
                <div key={i} style={{
                  background: fundoEscuro(cores.destaque)
                    ? "rgba(255,255,255,0.15)"
                    : "white",
                  border: `2px solid ${cores.primaria}`,
                  color: fundoEscuro(cores.destaque) ? "white" : cores.primaria,
                  padding: "12px 24px", borderRadius: 50,
                  fontWeight: 600, fontSize: "0.95rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}>
                  {skill.name}
                  {skill.rating > 0 && (
                    <span style={{ marginLeft: 8, color: "#F59E0B" }}>
                      {"★".repeat(skill.rating)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ EXPERIÊNCIA ══ */}
      {d.companies?.length > 0 && (
        <section id="exp" style={{ padding: "100px 60px", background: "white" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={sectionLabel}>Carreira</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Experiência Profissional</h2>
            </div>

            <div style={{ ...cardStyle, borderTop: `4px solid ${cores.primaria}` }}>
              {d.companies.map((emp, i) => (
                <div key={i} style={{
                  display: "flex", gap: 24,
                  paddingBottom: i < d.companies.length - 1 ? 32 : 0,
                  marginBottom: i < d.companies.length - 1 ? 32 : 0,
                  borderBottom: i < d.companies.length - 1
                    ? "1px solid #E2E8F0" : "none"
                }}>
                  <div style={expIconStyle}>💼</div>
                  <div style={{ flex: 1 }}>
                    <TextoEditavel
                      valor={emp.role || "Cargo"}
                      onSalvar={salvarEmpresa(i, "role")}
                      style={{ fontWeight: 800, fontSize: "1.15rem", color: "#111827" }}
                    />
                    <div style={{ color: cores.primaria, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>
                      {emp.name}
                    </div>
                    {emp.duration && (
                      <span style={badgePeriodo}>{emp.duration}</span>
                    )}
                    {emp.description && (
                      <div style={{ marginTop: 8 }}>
                        <TextoEditavel
                          valor={emp.description}
                          onSalvar={salvarEmpresa(i, "description")}
                          multiline
                          style={{ color: "#6B7280", lineHeight: 1.7 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ FORMAÇÃO ══ */}
      {d.education?.length > 0 && (
        <section style={{ padding: "100px 60px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={sectionLabel}>Formação</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Acadêmica</h2>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28
            }}>
              {d.education.map((edu, i) => (
                <div key={i} style={{ ...cardStyle }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>🎓</div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 6 }}>
                    {edu.institution}
                  </div>
                  <div style={{ color: "#6B7280", marginBottom: 8, fontSize: "0.9rem" }}>
                    {edu.type}
                  </div>
                  {edu.date && (
                    <div style={{ fontWeight: 700, color: cores.primaria, fontSize: "0.9rem" }}>
                      {edu.date}
                    </div>
                  )}
                  {edu.current && (
                    <span style={{ ...tagStyle, marginTop: 10, fontSize: "0.8rem" }}>
                      Em andamento
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CONTATO ══ */}
      <section id="contato" style={{ padding: "100px 60px", background: cores.fundo }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ ...sectionLabel, color: cores.secundaria }}>Contato</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: textoHero }}>
              Vamos conversar?
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24
          }}>
            {d.contact?.whatsapp && (
              <div style={{
                background: fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.08)" : "white",
                borderRadius: 20, padding: 32, textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: `1px solid ${fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>📱</div>
                <div style={{ ...sectionLabel, color: cores.secundaria }}>WhatsApp</div>
                <div style={{ fontWeight: 700, marginBottom: 16, color: textoHero }}>
                  {d.contact.whatsapp}
                </div>
                <a href={`https://wa.me/${whatsappNumero}`} target="_blank"
                  rel="noopener noreferrer" style={btnPrimario}>
                  Iniciar Chat
                </a>
              </div>
            )}

            {d.contact?.email && (
              <div style={{
                background: fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.08)" : "white",
                borderRadius: 20, padding: 32, textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: `1px solid ${fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>✉️</div>
                <div style={{ ...sectionLabel, color: cores.secundaria }}>E-mail</div>
                <div style={{
                  fontWeight: 700, marginBottom: 16,
                  wordBreak: "break-all", fontSize: "0.9rem", color: textoHero
                }}>
                  {d.contact.email}
                </div>
                <a href={`mailto:${d.contact.email}`} style={{
                  ...btnSecundario,
                  border: `2px solid ${cores.secundaria}`,
                  color: cores.secundaria
                }}>
                  Enviar E-mail
                </a>
              </div>
            )}

            {d.contact?.location && (
              <div style={{
                background: fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.08)" : "white",
                borderRadius: 20, padding: 32, textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: `1px solid ${fundoEscuro(cores.fundo)
                  ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>📍</div>
                <div style={{ ...sectionLabel, color: cores.secundaria }}>Localização</div>
                <div style={{ fontWeight: 700, color: textoHero }}>
                  {d.contact.location}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: fundoEscuro(cores.fundo)
          ? "rgba(0,0,0,0.4)"
          : cores.secundaria,
        color: fundoEscuro(cores.fundo) ? "rgba(255,255,255,0.6)" : "white",
        textAlign: "center",
        padding: "48px 40px",
        fontSize: "0.9rem"
      }}>
        <p>© 2025 {d.name} · Feito com 💙</p>
        <p style={{ marginTop: 6, opacity: 0.8 }}>{d.profession}</p>
      </footer>

    </div>
  );
}