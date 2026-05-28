// backend/services/templateRenderer.js

function renderizarSitePublico(tipoTemplate, dados) {
  switch (tipoTemplate) {
    case "portfolio":
      return renderPortfolio(dados);
    case "negocio-local":
      return renderNegocioLocal(dados);
    case "prestador-servicos":
      return renderPrestadorServicos(dados);
    default:
      return "<h1>Template não encontrado</h1>";
  }
}

// ══════════════════════════════════════
// HELPERS
// ══════════════════════════════════════
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function resolverCoresPortfolio(dados) {
  const paletas = {
    "portfolio-modern":    ["#1a1a2e", "#4a4e69", "#9a8c98", "#c9ada7"],
    "portfolio-tech":      ["#0f0e17", "#ff8906", "#f25f4c", "#e53170"],
    "portfolio-minimal":   ["#fafafa", "#232323", "#6c757d", "#adb5bd"],
    "portfolio-creative":  ["#2d3047", "#419d78", "#e0a458", "#ffdbb5"],
    "portfolio-corporate": ["#1b263b", "#415a77", "#778da9", "#e0e1dd"],
  };
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return { fundo: dados.customPalette[0], primaria: dados.customPalette[1], secundaria: dados.customPalette[2], destaque: dados.customPalette[3] };
  }
  const cores = paletas[dados.selectedPalette];
  if (cores) return { fundo: cores[0], primaria: cores[1], secundaria: cores[2], destaque: cores[3] };
  return { fundo: "#1E3A8A", primaria: "#3B82F6", secundaria: "#93C5FD", destaque: "#DBEAFE" };
}

function resolverCoresNegocio(dados) {
  const paletas = {
    "business-warm":    ["#2c1810", "#854442", "#be9b7b", "#fff4e6"],
    "business-fresh":   ["#1b4332", "#40916c", "#95d5b2", "#d8f3dc"],
    "business-elegant": ["#14213d", "#fca311", "#e5e5e5", "#ffffff"],
    "business-vibrant": ["#d00000", "#ffba08", "#3f88c5", "#032b43"],
    "business-classic": ["#3d405b", "#81b29a", "#f2cc8f", "#f4f1de"],
  };
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return { fundo: dados.customPalette[0], primaria: dados.customPalette[1], secundaria: dados.customPalette[2], destaque: dados.customPalette[3] };
  }
  const cores = paletas[dados.selectedPalette];
  if (cores) return { fundo: cores[0], primaria: cores[1], secundaria: cores[2], destaque: cores[3] };
  return { fundo: "#1b4332", primaria: "#40916c", secundaria: "#95d5b2", destaque: "#d8f3dc" };
}

function resolverCoresServico(dados) {
  const paletas = {
    "service-trust":  ["#03045e", "#0077b6", "#00b4d8", "#90e0ef"],
    "service-energy": ["#ff4800", "#ff6d00", "#ff8500", "#ffaa00"],
    "service-nature": ["#284b63", "#3c6e71", "#d9d9d9", "#ffffff"],
    "service-bold":   ["#10002b", "#5a189a", "#9d4edd", "#e0aaff"],
    "service-clean":  ["#212529", "#495057", "#adb5bd", "#f8f9fa"],
  };
  if (dados.useCustomPalette && dados.customPalette?.length === 4) {
    return { fundo: dados.customPalette[0], primaria: dados.customPalette[1], secundaria: dados.customPalette[2], destaque: dados.customPalette[3] };
  }
  const cores = paletas[dados.selectedPalette];
  if (cores) return { fundo: cores[0], primaria: cores[1], secundaria: cores[2], destaque: cores[3] };
  return { fundo: "#1A1A2E", primaria: "#FF6B00", secundaria: "#FF8500", destaque: "#FFF3E8" };
}

function fundoEscuro(hex) {
  if (!hex) return true;
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

function corTexto(fundo) {
  return fundoEscuro(fundo) ? "#ffffff" : "#111827";
}

function corTextoSec(fundo) {
  return fundoEscuro(fundo) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
}

// ══════════════════════════════════════
// PORTFOLIO
// ══════════════════════════════════════
function renderPortfolio(d) {
  const cores = resolverCoresPortfolio(d);
  const wpp = (d.contact?.whatsapp || "").replace(/\D/g, "");
  const wppLink = wpp ? `https://wa.me/${wpp}` : "";
  const texto = corTexto(cores.fundo);
  const textoSec = corTextoSec(cores.fundo);

  const skillsHtml = (d.skills || []).filter(s => s.name?.trim()).map(s => `
    <span style="background:${cores.destaque};color:${fundoEscuro(cores.destaque) ? '#fff' : cores.primaria};padding:12px 24px;border-radius:50px;font-weight:600;font-size:0.95rem;display:inline-block;border:2px solid ${cores.primaria}">
      ${escapeHtml(s.name)} ${s.rating > 0 ? '<span style="color:#F59E0B;margin-left:6px">' + '★'.repeat(s.rating) + '</span>' : ''}
    </span>
  `).join("");

  const companiesHtml = (d.companies || []).map((emp, i, arr) => `
    <div style="display:flex;gap:24px;padding-bottom:${i < arr.length - 1 ? '32px' : '0'};margin-bottom:${i < arr.length - 1 ? '32px' : '0'};border-bottom:${i < arr.length - 1 ? '1px solid #E2E8F0' : 'none'}">
      <div style="width:52px;height:52px;border-radius:14px;flex-shrink:0;background:${cores.primaria};display:flex;align-items:center;justify-content:center;font-size:1.3rem">💼</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:1.15rem;color:#111827">${escapeHtml(emp.role || "Cargo")}</div>
        <div style="color:${cores.primaria};font-weight:600;margin-top:4px;margin-bottom:8px">${escapeHtml(emp.name)}</div>
        ${emp.duration ? `<span style="background:${cores.destaque};color:${fundoEscuro(cores.destaque) ? '#fff' : cores.primaria};padding:3px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;display:inline-block;margin-bottom:12px">${escapeHtml(emp.duration)}</span>` : ''}
        ${emp.description ? `<p style="color:#6B7280;line-height:1.7;margin-top:8px">${escapeHtml(emp.description)}</p>` : ''}
      </div>
    </div>
  `).join("");

  const educationHtml = (d.education || []).map(edu => `
    <div style="background:white;border-radius:20px;padding:36px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">
      <div style="font-size:1.5rem;margin-bottom:12px">🎓</div>
      <div style="font-weight:800;font-size:1rem;margin-bottom:6px">${escapeHtml(edu.institution)}</div>
      <div style="color:#6B7280;margin-bottom:8px;font-size:0.9rem">${escapeHtml(edu.type)}</div>
      ${edu.date ? `<div style="font-weight:700;color:${cores.primaria};font-size:0.9rem">${escapeHtml(edu.date)}</div>` : ''}
      ${edu.current ? `<span style="background:${cores.destaque};color:${fundoEscuro(cores.destaque) ? '#fff' : cores.primaria};padding:8px 20px;border-radius:50px;font-weight:600;font-size:0.8rem;display:inline-block;margin-top:10px">Em andamento</span>` : ''}
    </div>
  `).join("");

  const tagsHtml = (d.tags || []).map(tag => `
    <span style="background:${cores.destaque};color:${fundoEscuro(cores.destaque) ? '#fff' : cores.primaria};padding:8px 20px;border-radius:50px;font-weight:600;font-size:0.9rem;display:inline-block">${escapeHtml(tag)}</span>
  `).join("");

  const contactCards = [];
  if (d.contact?.whatsapp) {
    contactCards.push(`
      <div style="background:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.08)' : 'white'};border-radius:20px;padding:32px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.15);border:1px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}">
        <div style="font-size:2rem;margin-bottom:12px">📱</div>
        <div style="font-size:0.8rem;font-weight:700;color:${cores.secundaria};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">WhatsApp</div>
        <div style="font-weight:700;margin-bottom:16px;color:${texto}">${escapeHtml(d.contact.whatsapp)}</div>
        <a href="${wppLink}" target="_blank" rel="noopener noreferrer" style="padding:14px 28px;border-radius:50px;background:${cores.primaria};color:${fundoEscuro(cores.primaria) ? '#fff' : '#111'};font-weight:700;text-decoration:none;display:inline-block">Iniciar Chat</a>
      </div>
    `);
  }
  if (d.contact?.email) {
    contactCards.push(`
      <div style="background:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.08)' : 'white'};border-radius:20px;padding:32px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.15);border:1px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}">
        <div style="font-size:2rem;margin-bottom:12px">✉️</div>
        <div style="font-size:0.8rem;font-weight:700;color:${cores.secundaria};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">E-mail</div>
        <div style="font-weight:700;margin-bottom:16px;word-break:break-all;font-size:0.9rem;color:${texto}">${escapeHtml(d.contact.email)}</div>
        <a href="mailto:${escapeHtml(d.contact.email)}" style="padding:14px 28px;border-radius:50px;border:2px solid ${cores.secundaria};color:${cores.secundaria};font-weight:700;text-decoration:none;display:inline-block">Enviar E-mail</a>
      </div>
    `);
  }
  if (d.contact?.location) {
    contactCards.push(`
      <div style="background:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.08)' : 'white'};border-radius:20px;padding:32px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.15);border:1px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}">
        <div style="font-size:2rem;margin-bottom:12px">📍</div>
        <div style="font-size:0.8rem;font-weight:700;color:${cores.secundaria};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">Localização</div>
        <div style="font-weight:700;color:${texto}">${escapeHtml(d.contact.location)}</div>
      </div>
    `);
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(d.name || "Portfólio")} — ${escapeHtml(d.profession || "")}</title>
  <meta name="description" content="${escapeHtml((d.aboutMe || '').substring(0, 160))}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{font-family:'Inter',sans-serif;color:#111827;line-height:1.6}
    img{max-width:100%;display:block}
    a{text-decoration:none;color:inherit}
    @media(max-width:768px){
      .hero-section{padding:60px 20px!important;min-height:auto!important}
      .hero-title{font-size:2rem!important}
      .section-padding{padding:60px 20px!important}
      .grid-2{grid-template-columns:1fr!important}
      .grid-3{grid-template-columns:1fr!important}
      .contact-grid{grid-template-columns:1fr!important}
    }
  </style>
</head>
<body>

  <!-- HERO -->
  <section class="hero-section" style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:${cores.fundo};padding:80px 40px">
    <div style="max-width:700px;width:100%">
      ${d.photo?.preview ? `<img src="${d.photo.preview}" alt="${escapeHtml(d.name)}" style="width:130px;height:130px;border-radius:50%;border:5px solid ${cores.secundaria};object-fit:cover;display:block;margin:0 auto 32px;box-shadow:0 10px 40px rgba(0,0,0,0.3)">` : ''}
      <h1 class="hero-title" style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:${texto}">${escapeHtml(d.name || "Seu Nome")}</h1>
      <p style="margin-top:12px;margin-bottom:40px;color:${textoSec};font-size:1.2rem">${escapeHtml(d.profession || "Sua Profissão")}</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
        ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener noreferrer" style="padding:14px 28px;border-radius:50px;background:${cores.primaria};color:${fundoEscuro(cores.primaria) ? '#fff' : '#111'};font-weight:700;display:inline-block">📲 WhatsApp</a>` : ''}
        <a href="#contato" style="padding:14px 28px;border-radius:50px;border:2px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.5)' : cores.primaria};color:${fundoEscuro(cores.fundo) ? '#fff' : cores.primaria};font-weight:700;display:inline-block">✉️ Contato</a>
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section class="section-padding" style="padding:100px 60px;background:#F8FAFC">
    <div style="max-width:900px;margin:0 auto">
      <div style="text-align:center;margin-bottom:48px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Sobre Mim</span>
        <h2 style="font-size:2.2rem;font-weight:800">Quem sou eu</h2>
      </div>
      <div style="background:white;border-radius:20px;padding:36px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">
        <p style="color:#374151;line-height:1.9;font-size:1.05rem;white-space:pre-line">${escapeHtml(d.aboutMe || "")}</p>
      </div>
      ${tagsHtml ? `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:32px">${tagsHtml}</div>` : ''}
    </div>
  </section>

  <!-- HABILIDADES -->
  ${skillsHtml ? `
  <section class="section-padding" style="padding:100px 60px;background:${cores.destaque}">
    <div style="max-width:900px;margin:0 auto">
      <div style="text-align:center;margin-bottom:48px">
        <span style="font-size:0.8rem;font-weight:700;color:${fundoEscuro(cores.destaque) ? cores.secundaria : cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Competências</span>
        <h2 style="font-size:2.2rem;font-weight:800;color:${corTexto(cores.destaque)}">O que eu domino</h2>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">${skillsHtml}</div>
    </div>
  </section>` : ''}

  <!-- EXPERIÊNCIA -->
  ${companiesHtml ? `
  <section class="section-padding" style="padding:100px 60px;background:white">
    <div style="max-width:900px;margin:0 auto">
      <div style="text-align:center;margin-bottom:48px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Carreira</span>
        <h2 style="font-size:2.2rem;font-weight:800">Experiência Profissional</h2>
      </div>
      <div style="background:white;border-radius:20px;padding:36px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">${companiesHtml}</div>
    </div>
  </section>` : ''}

  <!-- FORMAÇÃO -->
  ${educationHtml ? `
  <section class="section-padding" style="padding:100px 60px;background:#F8FAFC">
    <div style="max-width:900px;margin:0 auto">
      <div style="text-align:center;margin-bottom:48px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Formação</span>
        <h2 style="font-size:2.2rem;font-weight:800">Acadêmica</h2>
      </div>
      <div class="grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px">${educationHtml}</div>
    </div>
  </section>` : ''}

  <!-- CONTATO -->
  <section id="contato" class="section-padding" style="padding:100px 60px;background:${cores.fundo}">
    <div style="max-width:900px;margin:0 auto">
      <div style="text-align:center;margin-bottom:48px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.secundaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Contato</span>
        <h2 style="font-size:2.2rem;font-weight:800;color:${texto}">Vamos conversar?</h2>
      </div>
      <div class="contact-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px">${contactCards.join("")}</div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background:${fundoEscuro(cores.fundo) ? 'rgba(0,0,0,0.4)' : cores.secundaria};color:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.6)' : 'white'};text-align:center;padding:48px 40px;font-size:0.9rem">
    <p>© 2025 ${escapeHtml(d.name)} · Feito com 💙</p>
    <p style="margin-top:6px;opacity:0.8">${escapeHtml(d.profession)}</p>
  </footer>

</body>
</html>`;
}

// ══════════════════════════════════════
// NEGÓCIO LOCAL
// ══════════════════════════════════════
function renderNegocioLocal(d) {
  const cores = resolverCoresNegocio(d);
  const wpp = (d.businessContact?.whatsapp || "").replace(/\D/g, "");
  const wppLink = wpp ? `https://wa.me/${wpp}?text=${encodeURIComponent("Olá! Gostaria de saber mais.")}` : "";
  const texto = corTexto(cores.fundo);
  const textoSec = corTextoSec(cores.fundo);

  const diasSemana = [
    { id: "monday", label: "Segunda" }, { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" }, { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" }, { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const servicosHtml = (d.services || []).map(s => `
    <div style="display:flex;align-items:center;gap:15px;background:white;border-radius:14px;padding:20px 22px;border:2px solid #DCE9DF;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
      <div style="width:50px;height:50px;border-radius:13px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0">🛎️</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:0.97rem">${escapeHtml(s.name)}</div>
        ${s.description ? `<div style="font-size:0.8rem;color:#5A6E5F;margin-top:2px">${escapeHtml(s.description)}</div>` : ''}
      </div>
      ${s.price ? `<div style="flex-shrink:0;background:#FDEAE5;color:#E07A5F;font-size:0.88rem;font-weight:800;padding:5px 13px;border-radius:50px">${escapeHtml(s.price)}</div>` : ''}
    </div>
  `).join("");

  const galeriaHtml = (d.photos || []).map((foto, i) => `
    <div style="border-radius:14px;overflow:hidden;height:${i === 0 ? '300' : '230'}px;${i === 0 ? 'grid-column:span 2;' : ''}background:linear-gradient(135deg,${cores.destaque},#EDF3EF);display:flex;align-items:center;justify-content:center">
      ${foto.preview ? `<img src="${foto.preview}" alt="Foto ${i + 1}" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:2.5rem;opacity:0.3">🖼️</span>`}
    </div>
  `).join("");

  const horariosHtml = diasSemana.map(dia => {
    const h = d.hours?.[dia.id];
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #DCE9DF;font-size:0.87rem">
      <span style="font-weight:800">${dia.label}</span>
      <span style="color:${h?.open ? '#5A6E5F' : '#E07A5F'};font-weight:600">${h?.open ? `${h.start || '09:00'} – ${h.end || '18:00'}` : 'Fechado'}</span>
    </div>`;
  }).join("");

  const contatoRows = [];
  if (d.businessContact?.whatsapp) contatoRows.push(`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #DCE9DF"><div style="width:38px;height:38px;border-radius:10px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1rem">📱</div><div><div style="font-size:0.67rem;color:#9EB09F;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">WhatsApp</div><div style="font-size:0.9rem;font-weight:800">${escapeHtml(d.businessContact.whatsapp)}</div></div></div>`);
  if (d.businessContact?.phone) contatoRows.push(`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #DCE9DF"><div style="width:38px;height:38px;border-radius:10px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1rem">📞</div><div><div style="font-size:0.67rem;color:#9EB09F;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">Telefone</div><div style="font-size:0.9rem;font-weight:800">${escapeHtml(d.businessContact.phone)}</div></div></div>`);
  if (d.businessContact?.email) contatoRows.push(`<div style="display:flex;align-items:center;gap:12px;padding:10px 0"><div style="width:38px;height:38px;border-radius:10px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1rem">✉️</div><div><div style="font-size:0.67rem;color:#9EB09F;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">E-mail</div><div style="font-size:0.82rem;font-weight:800">${escapeHtml(d.businessContact.email)}</div></div></div>`);

  const redesHtml = [];
  if (d.businessContact?.instagram) redesHtml.push(`<a href="${d.businessContact.instagram.startsWith('http') ? d.businessContact.instagram : 'https://instagram.com/' + d.businessContact.instagram.replace('@', '')}" target="_blank" rel="noopener" style="width:50px;height:50px;border-radius:50%;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.3rem;text-decoration:none">📸</a>`);
  if (d.businessContact?.facebook) redesHtml.push(`<a href="${d.businessContact.facebook.startsWith('http') ? d.businessContact.facebook : 'https://facebook.com/' + d.businessContact.facebook}" target="_blank" rel="noopener" style="width:50px;height:50px;border-radius:50%;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.3rem;text-decoration:none">👤</a>`);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(d.businessName || "Negócio")}</title>
  <meta name="description" content="${escapeHtml((d.history || '').substring(0, 160))}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:'Inter',sans-serif;color:#111827;line-height:1.6}img{max-width:100%;display:block}a{text-decoration:none;color:inherit}
    .wpp-float{position:fixed;bottom:24px;right:24px;z-index:999;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
    .wpp-btn{width:64px;height:64px;border-radius:50%;background:#25D366;color:white;display:flex;align-items:center;justify-content:center;font-size:2rem;text-decoration:none;box-shadow:0 4px 22px rgba(37,211,102,0.5);animation:pulsa 2s infinite}
    @keyframes pulsa{0%{box-shadow:0 0 0 0 rgba(37,211,102,0.55)}70%{box-shadow:0 0 0 18px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
    @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.sobre-grid{grid-template-columns:1fr!important}.galeria-grid{grid-template-columns:1fr 1fr!important}.local-grid{grid-template-columns:1fr!important}.servicos-grid{grid-template-columns:1fr!important}}
  </style>
</head>
<body>

  <!-- HERO -->
  <section style="min-height:100vh;display:flex;align-items:center;background:linear-gradient(150deg,${cores.fundo} 0%,${cores.primaria} 100%);padding:120px 40px 80px;position:relative;overflow:hidden">
    <div class="hero-grid" style="max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);padding:7px 18px;border-radius:50px;font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:${cores.destaque};margin-bottom:20px"><span style="width:6px;height:6px;background:#25D366;border-radius:50%"></span>Aberto agora</div>
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:${texto}">${escapeHtml(d.businessName || "Nome do Negócio")}</h1>
        <p style="color:${textoSec};margin-top:8px;margin-bottom:32px;font-size:1.05rem;line-height:1.7">${escapeHtml((d.history || '').substring(0, 150))}${(d.history || '').length > 150 ? '...' : ''}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener" style="padding:14px 28px;border-radius:50px;background:#25D366;color:white;font-weight:700;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 18px rgba(37,211,102,0.4)">📲 WhatsApp</a>` : ''}
          <a href="#servicos" style="padding:14px 28px;border-radius:50px;border:2px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.3)' : cores.primaria};color:${fundoEscuro(cores.fundo) ? 'white' : cores.primaria};font-weight:700;display:inline-flex;align-items:center;gap:8px">Ver Serviços ↓</a>
        </div>
      </div>
      <div style="width:100%;aspect-ratio:4/5;border-radius:24px;overflow:hidden;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.15);box-shadow:0 24px 70px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
        ${d.photos?.[0]?.preview ? `<img src="${d.photos[0].preview}" alt="Foto principal" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:5rem;opacity:0.3">🏪</span>`}
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section style="padding:100px 60px;background:#F8FAFC">
    <div class="sobre-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center">
      <div style="aspect-ratio:4/5;border-radius:24px;overflow:hidden;background:linear-gradient(135deg,${cores.destaque},#EDF3EF);display:flex;align-items:center;justify-content:center">
        ${d.photos?.[1]?.preview ? `<img src="${d.photos[1].preview}" alt="Sobre" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:4rem;opacity:0.3">📖</span>`}
      </div>
      <div>
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">Nossa História</span>
        <h2 style="font-size:2rem;font-weight:800;margin-bottom:6px">Sobre o ${escapeHtml(d.businessName || "Negócio")}</h2>
        ${d.businessTime ? `<div style="color:${cores.primaria};font-weight:700;margin-bottom:18px">${escapeHtml(d.businessTime)} de tradição e qualidade</div>` : ''}
        <p style="color:#374151;line-height:1.85;font-size:0.94rem;white-space:pre-line">${escapeHtml(d.history || "")}</p>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS -->
  ${servicosHtml ? `
  <section id="servicos" style="padding:100px 60px;background:#EDF3EF">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:52px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">🛎️ Serviços</span>
        <h2 style="font-size:2.2rem;font-weight:800">O que oferecemos</h2>
      </div>
      <div class="servicos-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">${servicosHtml}</div>
    </div>
  </section>` : ''}

  <!-- GALERIA -->
  ${galeriaHtml ? `
  <section style="padding:100px 60px;background:white">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:52px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">📸 Espaço</span>
        <h2 style="font-size:2.2rem;font-weight:800">Conheça nosso local</h2>
      </div>
      <div class="galeria-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${galeriaHtml}</div>
    </div>
  </section>` : ''}

  <!-- LOCALIZAÇÃO + HORÁRIOS + CONTATO -->
  <section style="padding:100px 60px;background:#F8FAFC">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:52px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:8px">📍 Localização</span>
        <h2 style="font-size:2.2rem;font-weight:800">Como nos encontrar</h2>
      </div>
      <div class="local-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
        <div style="border-radius:24px;height:420px;background:linear-gradient(135deg,${cores.destaque},#EDF3EF);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#5A6E5F">
          <span style="font-size:3.5rem;opacity:0.3">🗺️</span>
          ${d.cep ? `<span style="font-weight:700">CEP: ${escapeHtml(d.cep)}</span>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="background:white;border-radius:20px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">
            <div style="display:flex;align-items:center;gap:11px;margin-bottom:16px"><div style="width:42px;height:42px;border-radius:11px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.2rem">📍</div><h3 style="font-size:1rem;font-weight:800">Endereço</h3></div>
            <p style="font-size:0.9rem;color:#5A6E5F;line-height:1.8"><strong>CEP: ${escapeHtml(d.cep || "Não informado")}</strong>${d.reference ? `<br><em>🅿️ ${escapeHtml(d.reference)}</em>` : ''}</p>
          </div>
          <div style="background:white;border-radius:20px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">
            <div style="display:flex;align-items:center;gap:11px;margin-bottom:16px"><div style="width:42px;height:42px;border-radius:11px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.2rem">🕐</div><h3 style="font-size:1rem;font-weight:800">Horários</h3></div>
            ${horariosHtml}
          </div>
          <div style="background:white;border-radius:20px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,0.08);border-top:4px solid ${cores.primaria}">
            <div style="display:flex;align-items:center;gap:11px;margin-bottom:16px"><div style="width:42px;height:42px;border-radius:11px;background:${cores.destaque};display:flex;align-items:center;justify-content:center;font-size:1.2rem">📞</div><h3 style="font-size:1rem;font-weight:800">Contato</h3></div>
            ${contatoRows.join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  ${redesHtml.length > 0 ? `
  <section style="padding:60px 60px;background:white;text-align:center">
    <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};letter-spacing:2px;text-transform:uppercase">Redes Sociais</span>
    <div style="display:flex;justify-content:center;gap:16px;margin-top:20px">${redesHtml.join("")}</div>
  </section>` : ''}

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,${cores.primaria},${cores.fundo});padding:72px 24px;text-align:center;color:white">
    <h2 style="font-size:2.2rem;font-weight:800;margin-bottom:12px">Venha nos visitar!</h2>
    <p style="font-size:1.02rem;opacity:0.8;margin-bottom:28px">Entre em contato pelo WhatsApp!</p>
    ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener" style="padding:14px 28px;border-radius:50px;background:#25D366;color:white;font-weight:700;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 18px rgba(37,211,102,0.4)">📲 Chamar no WhatsApp</a>` : ''}
  </section>

  <!-- FOOTER -->
  <footer style="background:${fundoEscuro(cores.fundo) ? 'rgba(0,0,0,0.5)' : cores.fundo};color:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'};text-align:center;padding:48px 40px;font-size:0.9rem">
    <p style="font-weight:800;font-size:1.2rem;color:${fundoEscuro(cores.fundo) ? 'white' : cores.fundo};margin-bottom:6px">${escapeHtml(d.businessName || "")}</p>
    <p>© 2025 ${escapeHtml(d.businessName)} — Todos os direitos reservados</p>
  </footer>

  ${wppLink ? `<div class="wpp-float"><div style="background:white;padding:10px 16px;border-radius:12px;box-shadow:0 4px 18px rgba(0,0,0,0.12);font-size:0.8rem;font-weight:700;border-left:3px solid #25D366">🏪 Fale conosco!</div><a href="${wppLink}" target="_blank" rel="noopener" class="wpp-btn">📱</a></div>` : ''}

</body>
</html>`;
}

// ══════════════════════════════════════
// PRESTADOR DE SERVIÇOS
// ══════════════════════════════════════
function renderPrestadorServicos(d) {
  const cores = resolverCoresServico(d);
  const wpp = (d.providerContact?.whatsapp || "").replace(/\D/g, "");
  const wppLink = wpp ? `https://wa.me/${wpp}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}` : "";
  const texto = corTexto(cores.fundo);
  const textoSec = corTextoSec(cores.fundo);

  const diasSemana = [
    { id: "monday", label: "Segunda" }, { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" }, { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" }, { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const servicosHtml = (d.providerServices || []).filter(s => s.name?.trim()).map(s => `
    <div style="background:white;border-radius:12px;padding:32px 24px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      <span style="font-size:3rem;display:block;margin-bottom:16px">🔧</span>
      <h3 style="font-size:1.1rem;font-weight:800;color:${cores.fundo};margin-bottom:8px">${escapeHtml(s.name)}</h3>
      ${s.description ? `<p style="font-size:0.9rem;color:#666;line-height:1.5">${escapeHtml(s.description)}</p>` : ''}
    </div>
  `).join("");

  const diferenciais = [
    { icone: "🏆", titulo: `${escapeHtml(d.experience || "Anos")} de Experiência`, desc: "Profissional experiente e qualificado." },
    { icone: "⚡", titulo: "Atendimento Rápido", desc: "Resposta imediata e agendamento ágil." },
    { icone: "💰", titulo: "Preço Justo", desc: "Orçamento transparente, sem surpresas." },
    { icone: "✅", titulo: "Garantia no Serviço", desc: "Todo trabalho com garantia de qualidade." },
  ];

  const diferenciaisHtml = diferenciais.map(dif => `
    <div style="display:flex;gap:20px;background:${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};border:1px solid ${fundoEscuro(cores.fundo) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};border-radius:12px;padding:28px">
      <div style="font-size:2.5rem;flex-shrink:0;width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:${cores.primaria}22;border-radius:14px">${dif.icone}</div>
      <div><h3 style="font-size:1.1rem;font-weight:800;margin-bottom:8px;color:${texto}">${dif.titulo}</h3><p style="font-size:0.9rem;color:${textoSec};line-height:1.6">${dif.desc}</p></div>
    </div>
  `).join("");

  const portfolioHtml = (d.beforeAfter || []).map((item, i) => `
    <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      <div style="display:grid;grid-template-columns:1fr 1fr;height:200px">
        <div style="position:relative;overflow:hidden;background:#F8F9FA">
          <span style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,0.7);color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:50px;text-transform:uppercase;z-index:2">Antes</span>
          ${item.before?.preview ? `<img src="${item.before.preview}" alt="Antes" style="width:100%;height:100%;object-fit:cover">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#999;font-size:2rem;opacity:0.4">📷</div>'}
        </div>
        <div style="position:relative;overflow:hidden;background:#F8F9FA">
          <span style="position:absolute;top:8px;left:8px;background:rgba(37,211,102,0.9);color:white;font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:50px;text-transform:uppercase;z-index:2">Depois</span>
          ${item.after?.preview ? `<img src="${item.after.preview}" alt="Depois" style="width:100%;height:100%;object-fit:cover">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#999;font-size:2rem;opacity:0.4">📷</div>'}
        </div>
      </div>
      <div style="padding:20px">
        <h3 style="font-size:1.05rem;font-weight:800;color:${cores.fundo};margin-bottom:4px">${escapeHtml(item.title || `Trabalho #${i + 1}`)}</h3>
        ${item.description ? `<p style="font-size:0.85rem;color:#666">${escapeHtml(item.description)}</p>` : ''}
      </div>
    </div>
  `).join("");

  const regioesHtml = (d.regions || []).filter(r => r?.trim()).map(r => `
    <li style="font-size:0.9rem;color:#666;padding:8px 0;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;gap:8px;justify-content:center">
      <span style="color:#28A745;font-weight:700">✓</span>${escapeHtml(r)}
    </li>
  `).join("");

  const horariosHtml = diasSemana.map(dia => {
    const h = d.providerHours?.[dia.id];
    return `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:0.9rem">
      <span style="font-weight:700;color:${cores.fundo}">${dia.label}</span>
      <span style="color:${h?.open ? '#666' : '#E07A5F'}">${h?.open ? `${h.start || '08:00'} – ${h.end || '18:00'}` : 'Fechado'}</span>
    </div>`;
  }).join("");

  const contatoItems = [];
  if (d.providerContact?.whatsapp) contatoItems.push(`<div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #e0e0e0;text-align:left"><div style="font-size:1.3rem;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:${cores.destaque};border-radius:10px">📱</div><div><div style="font-size:0.75rem;color:#999;text-transform:uppercase;letter-spacing:0.5px">WhatsApp</div><div style="font-weight:700;color:${cores.fundo}">${escapeHtml(d.providerContact.whatsapp)}</div></div></div>`);
  if (d.providerContact?.phone) contatoItems.push(`<div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #e0e0e0;text-align:left"><div style="font-size:1.3rem;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:${cores.destaque};border-radius:10px">📞</div><div><div style="font-size:0.75rem;color:#999;text-transform:uppercase;letter-spacing:0.5px">Telefone</div><div style="font-weight:700;color:${cores.fundo}">${escapeHtml(d.providerContact.phone)}</div></div></div>`);
  if (d.providerContact?.email) contatoItems.push(`<div style="display:flex;align-items:center;gap:12px;padding:14px 0;text-align:left"><div style="font-size:1.3rem;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:${cores.destaque};border-radius:10px">✉️</div><div><div style="font-size:0.75rem;color:#999;text-transform:uppercase;letter-spacing:0.5px">E-mail</div><div style="font-weight:700;color:${cores.fundo};font-size:0.8rem">${escapeHtml(d.providerContact.email)}</div></div></div>`);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(d.name || "Profissional")} — ${escapeHtml(d.profession || "")}</title>
  <meta name="description" content="${escapeHtml((d.trustParagraph || '').substring(0, 160))}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:'Inter',sans-serif;color:#333;line-height:1.6}img{max-width:100%;display:block}a{text-decoration:none;color:inherit}
    .wpp-float{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
    .wpp-btn{width:64px;height:64px;border-radius:50%;background:#25D366;color:white;display:flex;align-items:center;justify-content:center;font-size:2rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,0.5);animation:pulsa 2s infinite}
    @keyframes pulsa{0%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)}70%{box-shadow:0 0 0 15px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
    @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;text-align:center}.hero-grid .hero-visual{order:-1}.hero-foto{width:250px!important;height:300px!important}.servicos-grid{grid-template-columns:1fr!important}.dif-grid{grid-template-columns:1fr!important}.portfolio-grid{grid-template-columns:1fr!important}.atend-grid{grid-template-columns:1fr!important}.stats-row{flex-wrap:wrap;justify-content:center!important}}
  </style>
</head>
<body>

  <!-- HEADER -->
  <header style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-bottom:1px solid #e0e0e0;padding:12px 20px;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:42px;height:42px;background:${cores.primaria};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:white">🔧</div>
      <div>
        <div style="font-size:1.1rem;font-weight:800;color:${cores.fundo};line-height:1.2">${escapeHtml(d.name || "")}</div>
        <span style="font-size:0.75rem;color:${cores.primaria};font-weight:600;text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(d.profession || "")}</span>
      </div>
    </div>
    ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;background:#25D366;color:white;padding:10px 20px;border-radius:50px;font-weight:700;font-size:0.85rem">📱 Orçamento Grátis</a>` : ''}
  </header>

  <!-- HERO -->
  <section style="padding:120px 20px 60px;min-height:85vh;display:flex;align-items:center;background:linear-gradient(135deg,${cores.fundo} 0%,${cores.fundo}ee 100%);position:relative;overflow:hidden">
    <div class="hero-grid" style="max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
      <div style="color:${texto}">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);padding:8px 18px;border-radius:50px;font-size:0.8rem;font-weight:600;color:${cores.primaria};margin-bottom:24px;text-transform:uppercase;letter-spacing:1px"><span style="width:8px;height:8px;background:#25D366;border-radius:50%"></span>Disponível agora</div>
        <h1 style="font-size:3.2rem;font-weight:900;line-height:1.1;margin-bottom:8px">${escapeHtml(d.name || "Seu Nome")}</h1>
        <p style="font-size:1.3rem;color:${cores.primaria};font-weight:700;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px">${escapeHtml(d.profession || "")}</p>
        <p style="color:${textoSec};margin-bottom:36px;line-height:1.7;max-width:480px;font-size:1.05rem;white-space:pre-line">${escapeHtml(d.trustParagraph || "")}</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:white;padding:18px 36px;border-radius:50px;font-size:1.05rem;font-weight:800;box-shadow:0 4px 20px rgba(37,211,102,0.4)">📲 Solicitar Orçamento</a>` : ''}
          <a href="#servicos" style="display:inline-flex;align-items:center;gap:10px;background:transparent;color:${texto};padding:18px 36px;border-radius:50px;font-size:1rem;font-weight:700;border:2px solid rgba(255,255,255,0.3)">Ver Serviços ↓</a>
        </div>
        <div class="stats-row" style="display:flex;gap:32px;margin-top:40px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1)">
          ${d.experience ? `<div style="text-align:center"><div style="font-size:2rem;font-weight:900;color:${cores.primaria}">${escapeHtml(d.experience)}</div><div style="font-size:0.8rem;color:${textoSec};text-transform:uppercase;letter-spacing:1px">Experiência</div></div>` : ''}
          ${d.clientsServed ? `<div style="text-align:center"><div style="font-size:2rem;font-weight:900;color:${cores.primaria}">${escapeHtml(d.clientsServed)}</div><div style="font-size:0.8rem;color:${textoSec};text-transform:uppercase;letter-spacing:1px">Clientes</div></div>` : ''}
          <div style="text-align:center"><div style="font-size:2rem;font-weight:900;color:${cores.primaria}">100%</div><div style="font-size:0.8rem;color:${textoSec};text-transform:uppercase;letter-spacing:1px">Garantia</div></div>
        </div>
      </div>
      <div class="hero-visual" style="display:flex;justify-content:center;align-items:center">
        <div class="hero-foto" style="width:380px;height:450px;border-radius:20px;overflow:hidden;border:4px solid ${cores.primaria}44;background:linear-gradient(135deg,${cores.primaria}33,${cores.primaria}11);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:rgba(255,255,255,0.3)">
          ${d.photo?.preview ? `<img src="${d.photo.preview}" alt="${escapeHtml(d.name)}" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:5rem">👷</span><span style="font-size:0.85rem;text-transform:uppercase;letter-spacing:1px">Sua foto aqui</span>`}
        </div>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS -->
  ${servicosHtml ? `
  <section id="servicos" style="padding:80px 20px;background:#F8F9FA">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:50px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};text-transform:uppercase;letter-spacing:2px;display:inline-block;margin-bottom:10px">O que eu faço</span>
        <h2 style="font-size:2.2rem;font-weight:900;color:${cores.fundo}">Serviços Realizados</h2>
      </div>
      <div class="servicos-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">${servicosHtml}</div>
      ${wppLink ? `<div style="text-align:center;margin-top:40px"><a href="${wppLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:white;padding:18px 36px;border-radius:50px;font-weight:800;box-shadow:0 4px 20px rgba(37,211,102,0.4)">📲 Solicitar Orçamento Grátis</a></div>` : ''}
    </div>
  </section>` : ''}

  <!-- DIFERENCIAIS -->
  <section style="padding:80px 20px;background:${cores.fundo};color:${texto}">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:50px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.secundaria};text-transform:uppercase;letter-spacing:2px;display:inline-block;margin-bottom:10px">Diferenciais</span>
        <h2 style="font-size:2.2rem;font-weight:900">Por que me contratar?</h2>
      </div>
      <div class="dif-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px">${diferenciaisHtml}</div>
      ${d.trustParagraph ? `<div style="margin-top:48px;background:${cores.primaria}1A;border-left:4px solid ${cores.primaria};border-radius:0 12px 12px 0;padding:28px 32px"><p style="font-size:1rem;color:${textoSec};line-height:1.8;font-style:italic;white-space:pre-line">${escapeHtml(d.trustParagraph)}</p></div>` : ''}
    </div>
  </section>

  <!-- PORTFÓLIO -->
  ${portfolioHtml ? `
  <section style="padding:80px 20px;background:white">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:50px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};text-transform:uppercase;letter-spacing:2px;display:inline-block;margin-bottom:10px">Portfólio</span>
        <h2 style="font-size:2.2rem;font-weight:900;color:${cores.fundo}">Fotos de Trabalhos</h2>
      </div>
      <div class="portfolio-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px">${portfolioHtml}</div>
    </div>
  </section>` : ''}

  <!-- ATENDIMENTO -->
  <section style="padding:80px 20px;background:#F8F9FA">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:50px">
        <span style="font-size:0.8rem;font-weight:700;color:${cores.primaria};text-transform:uppercase;letter-spacing:2px;display:inline-block;margin-bottom:10px">Atendimento</span>
        <h2 style="font-size:2.2rem;font-weight:900;color:${cores.fundo}">Como me encontrar</h2>
      </div>
      <div class="atend-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">📍</div>
          <h3 style="font-size:1.1rem;font-weight:800;color:${cores.fundo};margin-bottom:16px">Regiões Atendidas</h3>
          <ul style="list-style:none;padding:0">${regioesHtml}</ul>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">🕐</div>
          <h3 style="font-size:1.1rem;font-weight:800;color:${cores.fundo};margin-bottom:16px">Horário de Atendimento</h3>
          ${horariosHtml}
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.08);text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">📞</div>
          <h3 style="font-size:1.1rem;font-weight:800;color:${cores.fundo};margin-bottom:16px">Contato</h3>
          ${contatoItems.join("")}
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,${cores.primaria},${cores.secundaria});padding:60px 20px;text-align:center;color:white">
    <h2 style="font-size:2rem;font-weight:900;margin-bottom:12px">Precisa de um orçamento?</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:28px">Fale comigo agora pelo WhatsApp!</p>
    ${wppLink ? `<a href="${wppLink}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:white;color:#25D366;padding:20px 44px;border-radius:50px;font-size:1.15rem;font-weight:800;box-shadow:0 4px 20px rgba(0,0,0,0.2)">📲 Chamar no WhatsApp</a>` : ''}
  </section>

  <!-- FOOTER -->
  <footer style="background:${cores.fundo};color:rgba(255,255,255,0.5);padding:30px 20px;text-align:center;font-size:0.85rem">
    <p>© ${new Date().getFullYear()} <a href="#inicio" style="color:${cores.primaria};font-weight:600">${escapeHtml(d.name || "")}</a> — ${escapeHtml(d.profession || "")}</p>
    <p style="margin-top:4px;font-size:0.75rem;opacity:0.6">Todos os direitos reservados</p>
  </footer>

  ${wppLink ? `<div class="wpp-float"><div style="background:white;color:#333;padding:10px 16px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);font-size:0.8rem;font-weight:600">💬 Fale comigo agora!</div><a href="${wppLink}" target="_blank" rel="noopener" class="wpp-btn">📱</a></div>` : ''}

</body>
</html>`;
}

module.exports = { renderizarSitePublico };