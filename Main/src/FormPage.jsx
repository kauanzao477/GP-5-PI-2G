import { useState, useMemo, useEffect } from "react";
import "./FormPage.css";
import logopng from "./assets/logopng.png"

// Icons
const FormIcons = {
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-template">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Store: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-template">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-template">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Palette: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
};

// Color Palettes for each template
const colorPalettes = {
  portfolio: [
    {
      id: "portfolio-modern",
      name: "Moderno",
      colors: ["#1a1a2e", "#4a4e69", "#9a8c98", "#c9ada7"],
      description: "Elegante e sofisticado"
    },
    {
      id: "portfolio-tech",
      name: "Tech",
      colors: ["#0f0e17", "#ff8906", "#f25f4c", "#e53170"],
      description: "Vibrante e tecnológico"
    },
    {
      id: "portfolio-minimal",
      name: "Minimalista",
      colors: ["#fafafa", "#232323", "#6c757d", "#adb5bd"],
      description: "Limpo e profissional"
    },
    {
      id: "portfolio-creative",
      name: "Criativo",
      colors: ["#2d3047", "#419d78", "#e0a458", "#ffdbb5"],
      description: "Artístico e expressivo"
    },
    {
      id: "portfolio-corporate",
      name: "Corporativo",
      colors: ["#1b263b", "#415a77", "#778da9", "#e0e1dd"],
      description: "Formal e confiável"
    },
  ],
  business: [
    {
      id: "business-warm",
      name: "Acolhedor",
      colors: ["#2c1810", "#854442", "#be9b7b", "#fff4e6"],
      description: "Quente e convidativo"
    },
    {
      id: "business-fresh",
      name: "Fresco",
      colors: ["#1b4332", "#40916c", "#95d5b2", "#d8f3dc"],
      description: "Natural e saudável"
    },
    {
      id: "business-elegant",
      name: "Elegante",
      colors: ["#14213d", "#fca311", "#e5e5e5", "#ffffff"],
      description: "Sofisticado e premium"
    },
    {
      id: "business-vibrant",
      name: "Vibrante",
      colors: ["#d00000", "#ffba08", "#3f88c5", "#032b43"],
      description: "Energético e marcante"
    },
    {
      id: "business-classic",
      name: "Clássico",
      colors: ["#3d405b", "#81b29a", "#f2cc8f", "#f4f1de"],
      description: "Tradicional e atemporal"
    },
  ],
  service: [
    {
      id: "service-trust",
      name: "Confiança",
      colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef"],
      description: "Seguro e profissional"
    },
    {
      id: "service-energy",
      name: "Energia",
      colors: ["#ff4800", "#ff6d00", "#ff8500", "#ffaa00"],
      description: "Dinâmico e ativo"
    },
    {
      id: "service-nature",
      name: "Natureza",
      colors: ["#284b63", "#3c6e71", "#d9d9d9", "#ffffff"],
      description: "Orgânico e sustentável"
    },
    {
      id: "service-bold",
      name: "Marcante",
      colors: ["#10002b", "#5a189a", "#9d4edd", "#e0aaff"],
      description: "Ousado e memorável"
    },
    {
      id: "service-clean",
      name: "Limpo",
      colors: ["#212529", "#495057", "#adb5bd", "#f8f9fa"],
      description: "Simples e eficiente"
    },
  ],
};

// Phase 1 Steps (same for all)
const phase1Steps = [
  { id: "auth", title: "Acesse sua conta", subtitle: "Entre ou cadastre-se para continuar", icon: "🔐" },
  { id: "template", title: "Escolha seu template", subtitle: "Selecione o tipo de site que melhor representa você", icon: "🎨" },
];

// Phase 2 Steps based on template
const getPhase2Steps = (template) => {
  const portfolioSteps = [
    { id: "basic-info", title: "Informações básicas", subtitle: "Conte-nos sobre você e sua carreira profissional", icon: "👤" },
    { id: "about", title: "Sobre você", subtitle: "Descreva quem você é e suas principais características", icon: "✨" },
    { id: "experience", title: "Experiência profissional", subtitle: "Liste as empresas onde você trabalhou", icon: "💼" },
    { id: "education", title: "Formação acadêmica", subtitle: "Adicione sua formação e cursos realizados", icon: "🎓" },
    { id: "skills", title: "Habilidades", subtitle: "Avalie suas competências técnicas e pessoais", icon: "🚀" },
    { id: "contact", title: "Informações de contato", subtitle: "Como as pessoas podem te encontrar", icon: "📱" },
    { id: "photo", title: "Foto profissional", subtitle: "Adicione uma foto para seu perfil", icon: "📸" },
    { id: "colors", title: "Paleta de cores", subtitle: "Escolha as cores do seu site", icon: "🎨" },
    { id: "subdomain", title: "Escolha seu link", subtitle: "Defina o endereço único do seu site na internet", icon: "🌐" },
  ];

  const businessSteps = [
    { id: "business-info", title: "Informações do negócio", subtitle: "Conte-nos sobre seu estabelecimento", icon: "🏪" },
    { id: "history", title: "História", subtitle: "Compartilhe a história do seu negócio", icon: "📖" },
    { id: "services", title: "Serviços oferecidos", subtitle: "Liste os serviços e preços", icon: "🛎️" },
    { id: "photos", title: "Fotos do local", subtitle: "Mostre seu espaço (mínimo 6 fotos)", icon: "🖼️" },
    { id: "location", title: "Localização", subtitle: "Onde seu negócio está localizado", icon: "📍" },
    { id: "hours", title: "Horário de funcionamento", subtitle: "Quando seu negócio está aberto", icon: "🕐" },
    { id: "contact-business", title: "Contato e redes sociais", subtitle: "Formas de entrar em contato", icon: "📞" },
    { id: "colors", title: "Paleta de cores", subtitle: "Escolha as cores do seu site", icon: "🎨" },
    { id: "subdomain", title: "Escolha seu link", subtitle: "Defina o endereço único do seu site na internet", icon: "🌐" },
  ];

  const serviceSteps = [
    { id: "provider-info", title: "Informações básicas", subtitle: "Conte-nos sobre você e seu trabalho", icon: "🔧" },
    { id: "provider-services", title: "Serviços oferecidos", subtitle: "Liste os serviços que você oferece (mín. 3)", icon: "🛠️" },
    { id: "trust", title: "Parágrafo de confiança", subtitle: "Por que os clientes devem confiar em você", icon: "🤝" },
    { id: "portfolio-photos", title: "Fotos de trabalhos", subtitle: "Mostre o antes e depois dos seus serviços", icon: "📷" },
    { id: "regions", title: "Regiões atendidas", subtitle: "Onde você oferece seus serviços", icon: "🗺️" },
    { id: "provider-hours", title: "Horários de atendimento", subtitle: "Quando você está disponível", icon: "⏰" },
    { id: "contact-provider", title: "Informações de contato", subtitle: "Como clientes podem te contatar", icon: "💬" },
    { id: "colors", title: "Paleta de cores", subtitle: "Escolha as cores do seu site", icon: "🎨" },
    { id: "subdomain", title: "Escolha seu link", subtitle: "Defina o endereço único do seu site na internet", icon: "🌐" },
  ];

  switch (template) {
    case "portfolio":
      return portfolioSteps;
    case "business":
      return businessSteps;
    case "service":
      return serviceSteps;
    default:
      return [];
  }
};

// Error Message Component
function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <span className="error-message">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {message}
    </span>
  );
}

// Progress Bar Component
function ProgressBar({ current, total, phase, phaseLabel }) {
  return (
    <div className="progress-container">
      <div className="progress-info">
        <div className="progress-phase">
          <span className="phase-badge">Fase {phase}</span>
          <span className="phase-label">{phaseLabel}</span>
        </div>
        <div className="progress-text">
          <span className="progress-current">{current}</span>
          <span className="progress-separator">de</span>
          <span className="progress-total">{total}</span>
        </div>
      </div>
      <div className="progress-bars">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`progress-bar ${i < current ? "filled" : ""} ${i === current - 1 ? "current" : ""}`}
          >
            <div className="progress-bar-fill"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Template Card Component
function TemplateCard({ icon, title, description, selected, onClick, color }) {
  return (
    <button
      type="button"
      className={`template-option template-${color} ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="template-option-glow"></div>
      <div className="template-option-icon">{icon}</div>
      <div className="template-option-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="template-option-check">
        <FormIcons.Check />
      </div>
    </button>
  );
}

// Custom Color Picker Component
function CustomColorPicker({ color, onChange, onClose }) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [inputValue, setInputValue] = useState(color);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h, s, l) => {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  useEffect(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
    setInputValue(color);
  }, [color]);

  const handleColorChange = (newHue, newSat, newLight) => {
    const h = newHue ?? hue;
    const s = newSat ?? saturation;
    const l = newLight ?? lightness;
    if (newHue !== undefined) setHue(h);
    if (newSat !== undefined) setSaturation(s);
    if (newLight !== undefined) setLightness(l);
    const hex = hslToHex(h, s, l);
    setInputValue(hex);
    onChange(hex);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value);
      const rgb = hexToRgb(value);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
      }
    }
  };

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e", "#ffffff", "#6b7280", "#000000"
  ];

  return (
    <div className="color-picker-overlay" onClick={onClose}>
      <div className="color-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-picker-header">
          <h4>Escolher cor</h4>
          <button className="color-picker-close" onClick={onClose}>×</button>
        </div>
        
        <div className="color-picker-preview-large" style={{ backgroundColor: inputValue }} />
        
        <div className="color-picker-sliders">
          <div className="color-slider-group">
            <label>Matiz</label>
            <div className="slider-wrapper hue-slider">
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => handleColorChange(parseInt(e.target.value), undefined, undefined)}
              />
            </div>
          </div>
          
          <div className="color-slider-group">
            <label>Saturação</label>
            <div className="slider-wrapper" style={{
              background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`
            }}>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={(e) => handleColorChange(undefined, parseInt(e.target.value), undefined)}
              />
            </div>
          </div>
          
          <div className="color-slider-group">
            <label>Luminosidade</label>
            <div className="slider-wrapper" style={{
              background: `linear-gradient(to right, #000, hsl(${hue}, ${saturation}%, 50%), #fff)`
            }}>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={(e) => handleColorChange(undefined, undefined, parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="color-picker-input-group">
          <label>Hex</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="#000000"
            maxLength={7}
          />
        </div>

        <div className="color-picker-presets">
          <label>Cores rápidas</label>
          <div className="preset-colors-grid">
            {presetColors.map((presetColor, index) => (
              <button
                key={index}
                className={`preset-color ${inputValue.toLowerCase() === presetColor ? 'selected' : ''}`}
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  setInputValue(presetColor);
                  onChange(presetColor);
                  const rgb = hexToRgb(presetColor);
                  if (rgb) {
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    setHue(hsl.h);
                    setSaturation(hsl.s);
                    setLightness(hsl.l);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <button className="color-picker-confirm" onClick={onClose}>
          Confirmar
        </button>
      </div>
    </div>
  );
}

// Color Palette Selector Component
function ColorPaletteSelector({ template, selectedPalette, customPalette, onSelectPalette, onCustomPaletteChange, useCustom, onToggleCustom, showColorPicker, setShowColorPicker }) {
  const palettes = colorPalettes[template] || [];

  return (
    <div className="color-palette-selector">
      <div className="palette-section">
        <h4 className="palette-section-title">
          <FormIcons.Sparkles />
          Paletas sugeridas
        </h4>
        <div className="palettes-grid">
          {palettes.map((palette) => (
            <button
              key={palette.id}
              type="button"
              className={`palette-card ${selectedPalette === palette.id && !useCustom ? "selected" : ""}`}
              onClick={() => {
                onSelectPalette(palette.id);
                onToggleCustom(false);
              }}
            >
              <div className="palette-colors">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="palette-color"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="palette-info">
                <span className="palette-name">{palette.name}</span>
                <span className="palette-description">{palette.description}</span>
              </div>
              {selectedPalette === palette.id && !useCustom && (
                <div className="palette-check">
                  <FormIcons.Check />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="palette-divider">
        <span>ou</span>
      </div>

      <div className="palette-section">
        <button
          type="button"
          className={`custom-palette-toggle ${useCustom ? "active" : ""}`}
          onClick={() => onToggleCustom(!useCustom)}
        >
          <FormIcons.Palette />
          <span>Criar minha própria paleta</span>
          <div className={`toggle-indicator ${useCustom ? "active" : ""}`}>
            <div className="toggle-dot"></div>
          </div>
        </button>

        {useCustom && (
          <div className="custom-palette-editor">
            <p className="custom-palette-hint">Escolha 4 cores para sua paleta personalizada:</p>
            <div className="custom-colors-grid">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="custom-color-item">
                  <label className="custom-color-label">Cor {index + 1}</label>
                  <div className="custom-color-input-wrapper">
                    <div
                      className="custom-color-preview"
                      style={{ backgroundColor: customPalette[index] || "#6366f1" }}
                      onClick={() => setShowColorPicker(index)}
                    />
                    <input
                      type="text"
                      value={customPalette[index] || "#6366f1"}
                      onChange={(e) => {
                        const newPalette = [...customPalette];
                        newPalette[index] = e.target.value;
                        onCustomPaletteChange(newPalette);
                      }}
                      className="custom-color-hex"
                      placeholder="#000000"
                    />
                  </div>
                  {showColorPicker === index && (
                    <CustomColorPicker
                      color={customPalette[index] || "#6366f1"}
                      onChange={(newColor) => {
                        const newPalette = [...customPalette];
                        newPalette[index] = newColor;
                        onCustomPaletteChange(newPalette);
                      }}
                      onClose={() => setShowColorPicker(null)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="custom-palette-preview">
              <span className="preview-label">Pré-visualização:</span>
              <div className="preview-colors">
                {customPalette.map((color, index) => (
                  <div
                    key={index}
                    className="preview-color"
                    style={{ backgroundColor: color || "#6366f1" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Dynamic List Component
function DynamicList({ items, onAdd, onRemove, onUpdate, fields, title, minItems = 0, errors = {} }) {
  return (
    <div className="dynamic-list">
      {items.map((item, index) => (
        <div key={index} className="dynamic-list-item" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="dynamic-list-header">
            <span className="dynamic-list-number">#{index + 1}</span>
            {items.length > minItems && (
              <button
                type="button"
                className="btn-icon btn-remove"
                onClick={() => onRemove(index)}
              >
                <FormIcons.Trash />
              </button>
            )}
          </div>
          <div className="dynamic-list-fields">
            {fields.map((field) => {
              const errorKey = `${title}_${index}_${field.name}`;
              const hasError = errors[errorKey];
              return (
                <div key={field.name} className={`form-field ${field.fullWidth ? "full-width" : ""} ${hasError ? "has-error" : ""}`}>
                  <label>{field.label} {field.required !== false && "*"}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={item[field.name] || ""}
                      onChange={(e) => onUpdate(index, field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className={hasError ? "input-error" : ""}
                    />
                  ) : field.type === "select" ? (
                    <div className="select-wrapper">
                      <select
                        value={item[field.name] || ""}
                        onChange={(e) => onUpdate(index, field.name, e.target.value)}
                        className={hasError ? "input-error" : ""}
                      >
                        <option value="">Selecione...</option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <FormIcons.ChevronDown />
                    </div>
                  ) : field.type === "checkbox" ? (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={item[field.name] || false}
                        onChange={(e) => onUpdate(index, field.name, e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="checkbox-text">{field.checkboxLabel}</span>
                    </label>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={item[field.name] || ""}
                      onChange={(e) => onUpdate(index, field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={hasError ? "input-error" : ""}
                    />
                  )}
                  {hasError && <ErrorMessage message={hasError} />}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button type="button" className="btn-add-item" onClick={onAdd}>
        <div className="btn-add-icon">
          <FormIcons.Plus />
        </div>
        <span>Adicionar {title}</span>
      </button>
    </div>
  );
}

// Skill Rating Component
function SkillRating({ skills, onAdd, onRemove, onUpdate, errors = {} }) {
  return (
    <div className="skills-list">
      {errors.skills && <ErrorMessage message={errors.skills} />}
      {skills.map((skill, index) => {
        const ratingError = errors[`skill_${index}_rating`];
        return (
          <div key={index} className={`skill-item ${ratingError ? "has-error" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
            <input
              type="text"
              value={skill.name}
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              placeholder="Nome da habilidade *"
              className="skill-name"
            />
            <div className="skill-rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`rating-dot ${skill.rating >= rating ? "active" : ""}`}
                  onClick={() => onUpdate(index, "rating", rating)}
                >
                  <span className="rating-dot-inner"></span>
                </button>
              ))}
              <span className="skill-rating-label">
                {skill.rating > 0 ? `${skill.rating}/5` : ""}
              </span>
            </div>
            <button
              type="button"
              className="btn-icon btn-remove"
              onClick={() => onRemove(index)}
            >
              <FormIcons.Trash />
            </button>
            {ratingError && <div className="skill-error"><ErrorMessage message={ratingError} /></div>}
          </div>
        );
      })}
      <button type="button" className="btn-add-item" onClick={onAdd}>
        <div className="btn-add-icon">
          <FormIcons.Plus />
        </div>
        <span>Adicionar habilidade</span>
      </button>
    </div>
  );
}

// Photo Upload Component
function PhotoUpload({ photos, onAdd, onRemove, maxPhotos = 10, minPhotos = 1, label = "Adicionar foto", error }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (photos.length < maxPhotos) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onAdd({ file, preview: reader.result });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="photo-upload">
      {error && <ErrorMessage message={error} />}
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <img src={photo.preview} alt={`Upload ${index + 1}`} />
            <div className="photo-overlay">
              <button
                type="button"
                className="photo-remove"
                onClick={() => onRemove(index)}
              >
                <FormIcons.Trash />
              </button>
            </div>
          </div>
        ))}
        {photos.length < maxPhotos && (
          <label className={`photo-add ${error ? "upload-error" : ""}`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple={maxPhotos > 1}
            />
            <div className="photo-add-content">
              <FormIcons.Upload />
              <span>{label}</span>
            </div>
          </label>
        )}
      </div>
      <div className="photo-info">
        <div className="photo-count">
          <span className="count-current">{photos.length}</span>
          <span className="count-separator">/</span>
          <span className="count-max">{maxPhotos}</span>
        </div>
        <p className="photo-hint">
          {minPhotos > 1 ? `Mínimo ${minPhotos} fotos • ` : ""}
          {maxPhotos - photos.length} restantes
        </p>
      </div>
    </div>
  );
}

// Before/After Photo Component
function BeforeAfterUpload({ items, onAdd, onRemove, onUpdate, error }) {
  const handleFileChange = (index, field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(index, field, { file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="before-after-list">
      {error && <ErrorMessage message={error} />}
      {items.map((item, index) => (
        <div key={index} className="before-after-item" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="before-after-header">
            <span className="ba-title">
              <span className="ba-icon">🔄</span>
              Trabalho #{index + 1}
            </span>
            <button
              type="button"
              className="btn-icon btn-remove"
              onClick={() => onRemove(index)}
            >
              <FormIcons.Trash />
            </button>
          </div>
          <div className="before-after-photos">
            <div className="ba-photo">
              <label className="ba-label">
                <span className="ba-badge before">Antes</span>
              </label>
              {item.before?.preview ? (
                <div className="ba-photo-preview">
                  <img src={item.before.preview} alt="Antes" />
                  <div className="ba-photo-overlay">
                    <label className="ba-change">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, "before", e)}
                      />
                      Trocar
                    </label>
                  </div>
                </div>
              ) : (
                <label className="ba-photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, "before", e)}
                  />
                  <FormIcons.Image />
                  <span>Selecionar foto</span>
                </label>
              )}
            </div>
            <div className="ba-arrow">→</div>
            <div className="ba-photo">
              <label className="ba-label">
                <span className="ba-badge after">Depois</span>
              </label>
              {item.after?.preview ? (
                <div className="ba-photo-preview">
                  <img src={item.after.preview} alt="Depois" />
                  <div className="ba-photo-overlay">
                    <label className="ba-change">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, "after", e)}
                      />
                      Trocar
                    </label>
                  </div>
                </div>
              ) : (
                <label className="ba-photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, "after", e)}
                  />
                  <FormIcons.Image />
                  <span>Selecionar foto</span>
                </label>
              )}
            </div>
          </div>
          <div className="ba-fields">
            <div className="form-field">
              <label>Título do trabalho *</label>
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
                placeholder="Ex: Reforma de cozinha"
              />
            </div>
            <div className="form-field">
              <label>Descrição breve</label>
              <input
                type="text"
                value={item.description || ""}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                placeholder="Ex: Pintura completa e troca de piso"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn-add-item" onClick={onAdd}>
        <div className="btn-add-icon">
          <FormIcons.Plus />
        </div>
        <span>Adicionar trabalho</span>
      </button>
    </div>
  );
}

// Hours Schedule Component
function HoursSchedule({ hours, onUpdate, error }) {
  const days = [
    { id: "monday", label: "Segunda-feira", short: "Seg" },
    { id: "tuesday", label: "Terça-feira", short: "Ter" },
    { id: "wednesday", label: "Quarta-feira", short: "Qua" },
    { id: "thursday", label: "Quinta-feira", short: "Qui" },
    { id: "friday", label: "Sexta-feira", short: "Sex" },
    { id: "saturday", label: "Sábado", short: "Sáb" },
    { id: "sunday", label: "Domingo", short: "Dom" },
  ];

  return (
    <div className="hours-schedule">
      {error && <ErrorMessage message={error} />}
      {days.map((day, index) => (
        <div 
          key={day.id} 
          className={`hours-day ${hours[day.id]?.open ? "open" : ""}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <label className="checkbox-label day-checkbox">
            <input
              type="checkbox"
              checked={hours[day.id]?.open || false}
              onChange={(e) =>
                onUpdate(day.id, { ...hours[day.id], open: e.target.checked })
              }
            />
            <span className="checkbox-custom"></span>
            <span className="day-name">{day.label}</span>
            <span className="day-name-short">{day.short}</span>
          </label>
          <div className={`hours-time ${hours[day.id]?.open ? "visible" : ""}`}>
            <input
              type="time"
              value={hours[day.id]?.start || "09:00"}
              onChange={(e) =>
                onUpdate(day.id, { ...hours[day.id], start: e.target.value })
              }
            />
            <span className="time-separator">às</span>
            <input
              type="time"
              value={hours[day.id]?.end || "18:00"}
              onChange={(e) =>
                onUpdate(day.id, { ...hours[day.id], end: e.target.value })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Subdomain Suggestions Component
function SubdomainSuggestions({ suggestions, selected, onSelect }) {
  return (
    <div className="subdomain-suggestions">
      <p className="suggestions-label">
        <FormIcons.Sparkles />
        Sugestões baseadas no seu perfil:
      </p>
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            className={`suggestion-chip ${selected === suggestion ? "selected" : ""}`}
            onClick={() => onSelect(suggestion)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Form Page Component
export default function FormPage({ onBack }) {
  const [phase, setPhase] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [formData, setFormData] = useState({
    // Auth
    email: "",
    password: "",
    confirmPassword: "",
    // Template
    template: "",
    // Color Palette
    selectedPalette: "",
    customPalette: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
    useCustomPalette: false,
    // Portfolio
    name: "",
    profession: "",
    experience: "",
    aboutMe: "",
    tags: [],
    companies: [{ name: "", role: "", description: "", duration: "" }],
    education: [{ institution: "", date: "", current: false, type: "" }],
    skills: [{ name: "", rating: 0 }],
    contact: { whatsapp: "", phone: "", email: "", location: "" },
    photo: null,
    // Business
    businessName: "",
    businessTime: "",
    history: "",
    services: [{ name: "", price: "", description: "" }],
    photos: [],
    cep: "",
    reference: "",
    hours: {},
    businessContact: {
      whatsapp: "",
      phone: "",
      landline: "",
      email: "",
      instagram: "",
      facebook: "",
      tiktok: "",
      youtube: "",
    },
    // Service Provider
    clientsServed: "",
    providerServices: [{ name: "", description: "" }, { name: "", description: "" }, { name: "", description: "" }],
    trustParagraph: "",
    beforeAfter: [],
    regions: ["", "", "", "", ""],
    providerHours: {},
    providerContact: { whatsapp: "", phone: "", email: "" },
    // Subdomain
    subdomain: "",
  });

  const phase2Steps = useMemo(() => getPhase2Steps(formData.template), [formData.template]);
  
  const currentPhaseSteps = phase === 1 ? phase1Steps : phase2Steps;
  const totalSteps = currentPhaseSteps.length;
  const currentStepData = currentPhaseSteps[currentStep];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função de validação
  const validateStep = () => {
    const newErrors = {};
    
    if (!currentStepData) return true;

    switch (currentStepData.id) {
      case "auth":
        if (!formData.email) newErrors.email = "E-mail é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
        if (!formData.password) newErrors.password = "Senha é obrigatória";
        else if (formData.password.length < 6) newErrors.password = "Senha deve ter no mínimo 6 caracteres";
        if (!isLoginMode) {
          if (!formData.confirmPassword) newErrors.confirmPassword = "Confirme sua senha";
          else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";
        }
        break;

      case "template":
        if (!formData.template) newErrors.template = "Selecione um template";
        break;

      case "basic-info":
        if (!formData.name?.trim()) newErrors.name = "Nome é obrigatório";
        if (!formData.profession?.trim()) newErrors.profession = "Profissão é obrigatória";
        if (!formData.experience?.trim()) newErrors.experience = "Tempo de experiência é obrigatório";
        break;

      case "provider-info":
        if (!formData.name?.trim()) newErrors.name = "Nome é obrigatório";
        if (!formData.profession?.trim()) newErrors.profession = "Profissão é obrigatória";
        if (!formData.experience?.trim()) newErrors.experience = "Tempo de experiência é obrigatório";
        if (!formData.clientsServed?.trim()) newErrors.clientsServed = "Informe a quantidade de clientes atendidos";
        break;

      case "about":
        if (!formData.aboutMe?.trim()) newErrors.aboutMe = "Conte sobre você";
        if (formData.tags.length === 0) newErrors.tags = "Adicione pelo menos uma tag";
        break;

      case "experience":
        formData.companies.forEach((company, index) => {
          if (!company.name?.trim()) newErrors[`company_${index}_name`] = "Nome da empresa é obrigatório";
          if (!company.role?.trim()) newErrors[`company_${index}_role`] = "Função é obrigatória";
        });
        break;

      case "education":
        formData.education.forEach((edu, index) => {
          if (!edu.institution?.trim()) newErrors[`edu_${index}_institution`] = "Instituição é obrigatória";
          if (!edu.type) newErrors[`edu_${index}_type`] = "Tipo de formação é obrigatório";
        });
        break;

      case "skills":
        if (formData.skills.length === 0 || !formData.skills.some(s => s.name?.trim())) {
          newErrors.skills = "Adicione pelo menos uma habilidade";
        }
        formData.skills.forEach((skill, index) => {
          if (skill.name?.trim() && skill.rating === 0) {
            newErrors[`skill_${index}_rating`] = "Avalie a habilidade";
          }
        });
        break;

      case "contact":
        if (!formData.contact.whatsapp?.trim() && !formData.contact.phone?.trim() && !formData.contact.email?.trim()) {
          newErrors.contact = "Informe pelo menos uma forma de contato";
        }
        break;

      case "photo":
        if (!formData.photo) newErrors.photo = "Adicione uma foto profissional";
        break;

      case "business-info":
        if (!formData.businessName?.trim()) newErrors.businessName = "Nome do negócio é obrigatório";
        if (!formData.businessTime?.trim()) newErrors.businessTime = "Tempo de atividade é obrigatório";
        break;

      case "history":
        if (!formData.history?.trim()) newErrors.history = "Conte a história do seu negócio";
        break;

      case "services":
        if (formData.services.length === 0) {
          newErrors.services = "Adicione pelo menos um serviço";
        }
        formData.services.forEach((service, index) => {
          if (!service.name?.trim()) newErrors[`service_${index}_name`] = "Nome do serviço é obrigatório";
        });
        break;

      case "photos":
        if (formData.photos.length < 6) newErrors.photos = "Adicione no mínimo 6 fotos";
        break;

      case "location":
        if (!formData.cep?.trim()) newErrors.cep = "CEP é obrigatório";
        break;

      case "hours":
        const hasOpenDayBusiness = Object.values(formData.hours).some(day => day?.open);
        if (!hasOpenDayBusiness) newErrors.hours = "Selecione pelo menos um dia de funcionamento";
        break;

      case "provider-hours":
        const hasOpenDayProvider = Object.values(formData.providerHours).some(day => day?.open);
        if (!hasOpenDayProvider) newErrors.hours = "Selecione pelo menos um dia de funcionamento";
        break;

      case "contact-business":
        if (!formData.businessContact.whatsapp?.trim() && !formData.businessContact.phone?.trim()) {
          newErrors.businessContact = "Informe WhatsApp ou telefone";
        }
        break;

      case "provider-services":
        const validServices = formData.providerServices.filter(s => s.name?.trim());
        if (validServices.length < 3) {
          newErrors.providerServices = "Adicione no mínimo 3 serviços";
        }
        break;

      case "trust":
        if (!formData.trustParagraph?.trim()) newErrors.trustParagraph = "Escreva o parágrafo de confiança";
        break;

      case "portfolio-photos":
        if (formData.beforeAfter.length === 0) {
          newErrors.beforeAfter = "Adicione pelo menos um trabalho";
        }
        break;

      case "regions":
        const validRegions = formData.regions.filter(r => r?.trim());
        if (validRegions.length === 0) newErrors.regions = "Informe pelo menos uma região";
        break;

      case "contact-provider":
        if (!formData.providerContact.whatsapp?.trim() && !formData.providerContact.phone?.trim()) {
          newErrors.providerContact = "Informe WhatsApp ou telefone";
        }
        break;

      case "colors":
        if (!formData.useCustomPalette && !formData.selectedPalette) {
          newErrors.colors = "Selecione uma paleta de cores";
        }
        break;

      case "subdomain":
        if (!formData.subdomain?.trim()) newErrors.subdomain = "Escolha um link para seu site";
        else if (formData.subdomain.length < 3) newErrors.subdomain = "O link deve ter no mínimo 3 caracteres";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (isAnimating) return;

    // Validar step atual
    if (!validateStep()) {
      return;
    }

    // Check if we're at the end of phase 1
    if (phase === 1 && currentStep === phase1Steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setPhase(2);
        setCurrentStep(0);
        setErrors({});
        setIsAnimating(false);
      }, 300);
      return;
    }

    // Normal next step
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setErrors({});
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;

    // Check if we're at the start of phase 2
    if (phase === 2 && currentStep === 0) {
      // Go back to phase 1
      setIsAnimating(true);
      setTimeout(() => {
        setPhase(1);
        setCurrentStep(phase1Steps.length - 1);
        setErrors({});
        setIsAnimating(false);
      }, 300);
      return;
    }

    // Normal previous step
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setErrors({});
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) {
      return;
    }
    console.log("Form submitted:", formData);
    alert("🎉 Site criado com sucesso! Você será redirecionado em breve.");
  };

  // Generate subdomain suggestions
  const getSubdomainSuggestions = () => {
    const suggestions = [];
    const name = formData.name || formData.businessName || "";
    const cleanName = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    if (cleanName) {
      suggestions.push(cleanName);
      if (formData.template) {
        suggestions.push(`${cleanName}-${formData.template}`);
      }
    }
    
    if (formData.profession) {
      const cleanProfession = formData.profession.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (cleanName) {
        suggestions.push(`${cleanName}-${cleanProfession}`);
      }
    }
    
    suggestions.push(`meu-${formData.template || "site"}`);
    suggestions.push(`${formData.template || "site"}-${Date.now().toString().slice(-4)}`);
    
    return suggestions.filter((s, i, arr) => s && arr.indexOf(s) === i).slice(0, 5);
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        updateFormData("tags", [...formData.tags, newTag]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    updateFormData("tags", formData.tags.filter((tag) => tag !== tagToRemove));
  };

  // Render step content
  const renderStepContent = () => {
    if (!currentStepData) return null;

    switch (currentStepData.id) {
      case "auth":
        return (
          <div className="form-fields auth-fields">
            <div className="auth-mode-toggle">
              <button
                type="button"
                className={`auth-mode-btn ${!isLoginMode ? "active" : ""}`}
                onClick={() => setIsLoginMode(false)}
              >
                Cadastrar
              </button>
              <button
                type="button"
                className={`auth-mode-btn ${isLoginMode ? "active" : ""}`}
                onClick={() => setIsLoginMode(true)}
              >
                Entrar
              </button>
            </div>

            <div className={`form-field full-width ${errors.email ? 'has-error' : ''}`}>
              <label>E-mail *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="seu@email.com"
                className={errors.email ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.email} />
            </div>
            <div className={`form-field full-width ${errors.password ? 'has-error' : ''}`}>
              <label>Senha *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="••••••••"
                className={errors.password ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.password} />
            </div>
            
            {!isLoginMode && (
              <div className={`form-field full-width ${errors.confirmPassword ? 'has-error' : ''}`}>
                <label>Confirmar senha *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                <ErrorMessage message={errors.confirmPassword} />
              </div>
            )}

            <div className="auth-hint-box">
              {isLoginMode ? (
                <p>Não tem uma conta? <button type="button" onClick={() => setIsLoginMode(false)}>Cadastre-se gratuitamente</button></p>
              ) : (
                <p>Já tem uma conta? <button type="button" onClick={() => setIsLoginMode(true)}>Acesse aqui</button></p>
              )}
            </div>
          </div>
        );

      case "template":
        return (
          <div className="template-options">
            {errors.template && <ErrorMessage message={errors.template} />}
            <TemplateCard
              icon={<FormIcons.Briefcase />}
              title="Portfólio Profissional"
              description="Ideal para profissionais buscando emprego ou visibilidade"
              selected={formData.template === "portfolio"}
              onClick={() => updateFormData("template", "portfolio")}
              color="blue"
            />
            <TemplateCard
              icon={<FormIcons.Store />}
              title="Negócio Local"
              description="Perfeito para lojas, restaurantes e estabelecimentos"
              selected={formData.template === "business"}
              onClick={() => updateFormData("template", "business")}
              color="purple"
            />
            <TemplateCard
              icon={<FormIcons.Wrench />}
              title="Prestador de Serviços"
              description="Para autônomos que oferecem serviços"
              selected={formData.template === "service"}
              onClick={() => updateFormData("template", "service")}
              color="green"
            />
          </div>
        );

      case "colors":
        return (
          <>
            {errors.colors && <ErrorMessage message={errors.colors} />}
            <ColorPaletteSelector
              template={formData.template}
              selectedPalette={formData.selectedPalette}
              customPalette={formData.customPalette}
              onSelectPalette={(id) => updateFormData("selectedPalette", id)}
              onCustomPaletteChange={(palette) => updateFormData("customPalette", palette)}
              useCustom={formData.useCustomPalette}
              onToggleCustom={(value) => updateFormData("useCustomPalette", value)}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
            />
          </>
        );

      // PORTFOLIO STEPS
      case "basic-info":
        return (
          <div className="form-fields">
            <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
              <label>Nome completo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="João da Silva"
                className={errors.name ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.name} />
            </div>
            <div className={`form-field ${errors.profession ? 'has-error' : ''}`}>
              <label>Profissão atual *</label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => updateFormData("profession", e.target.value)}
                placeholder="Desenvolvedor de Software"
                className={errors.profession ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.profession} />
            </div>
            <div className={`form-field full-width ${errors.experience ? 'has-error' : ''}`}>
              <label>Tempo de experiência *</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => updateFormData("experience", e.target.value)}
                placeholder="5 anos"
                className={errors.experience ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.experience} />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="form-fields">
            <div className={`form-field full-width ${errors.aboutMe ? 'has-error' : ''}`}>
              <label>Sobre mim *</label>
              <textarea
                value={formData.aboutMe}
                onChange={(e) => updateFormData("aboutMe", e.target.value)}
                placeholder="Conte um pouco sobre você, sua trajetória e objetivos profissionais..."
                rows={5}
                className={errors.aboutMe ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.aboutMe} />
            </div>
            <div className={`form-field full-width ${errors.tags ? 'has-error' : ''}`}>
              <label>Tags sobre mim *</label>
              <div className={`tags-input ${errors.tags ? 'input-error' : ''}`}>
                <div className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag" style={{ animationDelay: `${index * 0.05}s` }}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Digite uma tag e pressione Enter"
                  onKeyDown={handleTagInput}
                />
              </div>
              <ErrorMessage message={errors.tags} />
              <p className="field-hint">Ex: Proativo, Criativo, Trabalho em equipe, Liderança</p>
            </div>
          </div>
        );

      case "experience":
        return (
          <DynamicList
            items={formData.companies}
            onAdd={() =>
              updateFormData("companies", [
                ...formData.companies,
                { name: "", role: "", description: "", duration: "" },
              ])
            }
            onRemove={(index) =>
              updateFormData(
                "companies",
                formData.companies.filter((_, i) => i !== index)
              )
            }
            onUpdate={(index, field, value) => {
              const updated = [...formData.companies];
              updated[index][field] = value;
              updateFormData("companies", updated);
            }}
            fields={[
              { name: "name", label: "Empresa", placeholder: "Nome da empresa" },
              { name: "role", label: "Função", placeholder: "Seu cargo" },
              { name: "duration", label: "Período", placeholder: "Ex: 2020 - 2023", required: false },
              { name: "description", label: "Descrição das atividades", placeholder: "Descreva suas responsabilidades e conquistas", type: "textarea", fullWidth: true, required: false },
            ]}
            title="empresa"
            errors={errors}
          />
        );

      case "education":
        return (
          <DynamicList
            items={formData.education}
            onAdd={() =>
              updateFormData("education", [
                ...formData.education,
                { institution: "", date: "", current: false, type: "" },
              ])
            }
            onRemove={(index) =>
              updateFormData(
                "education",
                formData.education.filter((_, i) => i !== index)
              )
            }
            onUpdate={(index, field, value) => {
              const updated = [...formData.education];
              updated[index][field] = value;
              updateFormData("education", updated);
            }}
            fields={[
              { name: "institution", label: "Instituição", placeholder: "Nome da universidade/escola" },
              { name: "type", label: "Tipo de formação", type: "select", options: [
                { value: "graduation", label: "Graduação" },
                { value: "postgrad", label: "Pós-graduação" },
                { value: "masters", label: "Mestrado" },
                { value: "doctorate", label: "Doutorado" },
                { value: "technical", label: "Técnico" },
                { value: "course", label: "Curso Livre" },
              ]},
              { name: "date", label: "Ano de conclusão", placeholder: "2020", required: false },
              { name: "current", label: "", type: "checkbox", checkboxLabel: "Cursando atualmente", fullWidth: true, required: false },
            ]}
            title="formação"
            errors={errors}
          />
        );

      case "skills":
        return (
          <SkillRating
            skills={formData.skills}
            onAdd={() =>
              updateFormData("skills", [...formData.skills, { name: "", rating: 0 }])
            }
            onRemove={(index) =>
              updateFormData(
                "skills",
                formData.skills.filter((_, i) => i !== index)
              )
            }
            onUpdate={(index, field, value) => {
              const updated = [...formData.skills];
              updated[index][field] = value;
              updateFormData("skills", updated);
            }}
            errors={errors}
          />
        );

      case "contact":
        return (
          <div className="form-fields">
            {errors.contact && (
              <div className="full-width">
                <ErrorMessage message={errors.contact} />
              </div>
            )}
            <div className="form-field">
              <label>WhatsApp</label>
              <input
                type="tel"
                value={formData.contact.whatsapp}
                onChange={(e) =>
                  updateFormData("contact", { ...formData.contact, whatsapp: e.target.value })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input
                type="tel"
                value={formData.contact.phone}
                onChange={(e) =>
                  updateFormData("contact", { ...formData.contact, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field">
              <label>E-mail de contato</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  updateFormData("contact", { ...formData.contact, email: e.target.value })
                }
                placeholder="contato@email.com"
              />
            </div>
            <div className="form-field">
              <label>Localização</label>
              <input
                type="text"
                value={formData.contact.location}
                onChange={(e) =>
                  updateFormData("contact", { ...formData.contact, location: e.target.value })
                }
                placeholder="São Paulo, SP"
              />
            </div>
            <p className="field-hint full-width">* Preencha pelo menos uma forma de contato</p>
          </div>
        );

      case "photo":
        return (
          <div className="photo-upload-single">
            {errors.photo && <ErrorMessage message={errors.photo} />}
            {formData.photo ? (
              <div className="photo-preview-single">
                <div className="photo-frame">
                  <img src={formData.photo.preview} alt="Foto profissional" />
                </div>
                <button
                  type="button"
                  className="btn-remove-photo"
                  onClick={() => updateFormData("photo", null)}
                >
                  <FormIcons.Trash />
                  <span>Remover foto</span>
                </button>
              </div>
            ) : (
              <label className={`photo-upload-area ${errors.photo ? 'upload-error' : ''}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateFormData("photo", { file, preview: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="upload-content">
                  <div className="upload-icon">
                    <FormIcons.Upload />
                  </div>
                  <span className="upload-text">Clique para enviar sua foto *</span>
                  <p className="upload-hint">Recomendamos uma foto profissional com fundo neutro</p>
                </div>
              </label>
            )}
          </div>
        );

      // BUSINESS STEPS
      case "business-info":
        return (
          <div className="form-fields">
            <div className={`form-field full-width ${errors.businessName ? 'has-error' : ''}`}>
              <label>Nome do negócio *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                placeholder="Restaurante da Maria"
                className={errors.businessName ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.businessName} />
            </div>
            <div className={`form-field full-width ${errors.businessTime ? 'has-error' : ''}`}>
              <label>Tempo de atividade *</label>
              <input
                type="text"
                value={formData.businessTime}
                onChange={(e) => updateFormData("businessTime", e.target.value)}
                placeholder="5 anos"
                className={errors.businessTime ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.businessTime} />
            </div>
          </div>
        );

      case "history":
        return (
          <div className="form-fields">
            <div className={`form-field full-width ${errors.history ? 'has-error' : ''}`}>
              <label>História do negócio *</label>
              <textarea
                value={formData.history}
                onChange={(e) => updateFormData("history", e.target.value)}
                placeholder="Conte a história do seu negócio, como começou, sua missão e valores..."
                rows={8}
                className={errors.history ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.history} />
            </div>
          </div>
        );

      case "services":
        return (
          <>
            {errors.services && <ErrorMessage message={errors.services} />}
            <DynamicList
              items={formData.services}
              onAdd={() =>
                updateFormData("services", [
                  ...formData.services,
                  { name: "", price: "", description: "" },
                ])
              }
              onRemove={(index) =>
                updateFormData(
                  "services",
                  formData.services.filter((_, i) => i !== index)
                )
              }
              onUpdate={(index, field, value) => {
                const updated = [...formData.services];
                updated[index][field] = value;
                updateFormData("services", updated);
              }}
              fields={[
                { name: "name", label: "Nome do serviço/produto", placeholder: "Corte de cabelo" },
                { name: "price", label: "Preço", placeholder: "R$ 50,00", required: false },
                { name: "description", label: "Descrição", placeholder: "Descrição detalhada do serviço", type: "textarea", fullWidth: true, required: false },
              ]}
              title="serviço"
              errors={errors}
            />
          </>
        );

      case "photos":
        return (
          <PhotoUpload
            photos={formData.photos}
            onAdd={(photo) => updateFormData("photos", [...formData.photos, photo])}
            onRemove={(index) =>
              updateFormData(
                "photos",
                formData.photos.filter((_, i) => i !== index)
              )
            }
            maxPhotos={10}
            minPhotos={6}
            label="Adicionar foto"
            error={errors.photos}
          />
        );

      case "location":
        return (
          <div className="form-fields">
            <div className={`form-field ${errors.cep ? 'has-error' : ''}`}>
              <label>CEP *</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => updateFormData("cep", e.target.value)}
                placeholder="00000-000"
                className={errors.cep ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.cep} />
            </div>
            <div className="form-field full-width">
              <label>Ponto de referência</label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => updateFormData("reference", e.target.value)}
                placeholder="Próximo à praça central, em frente ao banco"
              />
            </div>
          </div>
        );

      case "hours":
        return (
          <HoursSchedule
            hours={formData.hours}
            onUpdate={(day, value) =>
              updateFormData("hours", { ...formData.hours, [day]: value })
            }
            error={errors.hours}
          />
        );

      case "contact-business":
        return (
          <div className="form-fields">
            {errors.businessContact && (
              <div className="full-width">
                <ErrorMessage message={errors.businessContact} />
              </div>
            )}
            <div className="form-field">
              <label>WhatsApp</label>
              <input
                type="tel"
                value={formData.businessContact.whatsapp}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    whatsapp: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input
                type="tel"
                value={formData.businessContact.phone}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    phone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field">
              <label>Telefone Fixo</label>
              <input
                type="tel"
                value={formData.businessContact.landline}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    landline: e.target.value,
                  })
                }
                placeholder="(11) 3333-3333"
              />
            </div>
            <div className="form-field">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.businessContact.email}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    email: e.target.value,
                  })
                }
                placeholder="contato@empresa.com"
              />
            </div>
            <div className="form-field">
              <label>Instagram <span className="optional">(opcional)</span></label>
              <input
                type="text"
                value={formData.businessContact.instagram}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    instagram: e.target.value,
                  })
                }
                placeholder="@seuinstagram"
              />
            </div>
            <div className="form-field">
              <label>Facebook <span className="optional">(opcional)</span></label>
              <input
                type="text"
                value={formData.businessContact.facebook}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    facebook: e.target.value,
                  })
                }
                placeholder="facebook.com/seuperfil"
              />
            </div>
            <div className="form-field">
              <label>TikTok <span className="optional">(opcional)</span></label>
              <input
                type="text"
                value={formData.businessContact.tiktok}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    tiktok: e.target.value,
                  })
                }
                placeholder="@seutiktok"
              />
            </div>
            <div className="form-field">
              <label>YouTube <span className="optional">(opcional)</span></label>
              <input
                type="text"
                value={formData.businessContact.youtube}
                onChange={(e) =>
                  updateFormData("businessContact", {
                    ...formData.businessContact,
                    youtube: e.target.value,
                  })
                }
                placeholder="youtube.com/@seucanal"
              />
            </div>
            <p className="field-hint full-width">* Preencha pelo menos WhatsApp ou telefone</p>
          </div>
        );

      // SERVICE PROVIDER STEPS
      case "provider-info":
        return (
          <div className="form-fields">
            <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
              <label>Nome completo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="José da Silva"
                className={errors.name ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.name} />
            </div>
            <div className={`form-field ${errors.profession ? 'has-error' : ''}`}>
              <label>Profissão atual *</label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => updateFormData("profession", e.target.value)}
                placeholder="Eletricista"
                className={errors.profession ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.profession} />
            </div>
            <div className={`form-field ${errors.experience ? 'has-error' : ''}`}>
              <label>Tempo de experiência *</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => updateFormData("experience", e.target.value)}
                placeholder="10 anos"
                className={errors.experience ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.experience} />
            </div>
            <div className={`form-field ${errors.clientsServed ? 'has-error' : ''}`}>
              <label>Clientes atendidos *</label>
              <input
                type="text"
                value={formData.clientsServed}
                onChange={(e) => updateFormData("clientsServed", e.target.value)}
                placeholder="+500 clientes"
                className={errors.clientsServed ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.clientsServed} />
            </div>
          </div>
        );

      case "provider-services":
        return (
          <>
            {errors.providerServices && <ErrorMessage message={errors.providerServices} />}
            <DynamicList
              items={formData.providerServices}
              onAdd={() =>
                updateFormData("providerServices", [
                  ...formData.providerServices,
                  { name: "", description: "" },
                ])
              }
              onRemove={(index) =>
                updateFormData(
                  "providerServices",
                  formData.providerServices.filter((_, i) => i !== index)
                )
              }
              onUpdate={(index, field, value) => {
                const updated = [...formData.providerServices];
                updated[index][field] = value;
                updateFormData("providerServices", updated);
              }}
              fields={[
                { name: "name", label: "Nome do serviço", placeholder: "Instalação elétrica" },
                { name: "description", label: "Descrição", placeholder: "Descreva o serviço oferecido", type: "textarea", fullWidth: true, required: false },
              ]}
              title="serviço"
              minItems={3}
              errors={errors}
            />
          </>
        );

      case "trust":
        return (
          <div className="form-fields">
            <div className={`form-field full-width ${errors.trustParagraph ? 'has-error' : ''}`}>
              <label>Parágrafo de confiança *</label>
              <textarea
                value={formData.trustParagraph}
                onChange={(e) => updateFormData("trustParagraph", e.target.value)}
                placeholder="Explique por que os clientes devem confiar em você. Fale sobre sua experiência, compromisso com qualidade, garantias oferecidas, diferenciais do seu trabalho..."
                rows={6}
                className={errors.trustParagraph ? 'input-error' : ''}
              />
              <ErrorMessage message={errors.trustParagraph} />
              <p className="field-hint">
                💡 Este texto aparecerá em destaque no seu site para gerar confiança nos clientes
              </p>
            </div>
          </div>
        );

      case "portfolio-photos":
        return (
          <BeforeAfterUpload
            items={formData.beforeAfter}
            onAdd={() =>
              updateFormData("beforeAfter", [
                ...formData.beforeAfter,
                { before: null, after: null, title: "", description: "" },
              ])
            }
            onRemove={(index) =>
              updateFormData(
                "beforeAfter",
                formData.beforeAfter.filter((_, i) => i !== index)
              )
            }
            onUpdate={(index, field, value) => {
              const updated = [...formData.beforeAfter];
              updated[index][field] = value;
              updateFormData("beforeAfter", updated);
            }}
            error={errors.beforeAfter}
          />
        );

      case "regions":
        return (
          <div className="form-fields regions-grid">
            {errors.regions && (
              <div className="full-width">
                <ErrorMessage message={errors.regions} />
              </div>
            )}
            <p className="form-intro">Informe até 5 regiões onde você atende (mínimo 1):</p>
            {formData.regions.map((region, index) => (
              <div key={index} className="form-field" style={{ animationDelay: `${index * 0.1}s` }}>
                <label>Região {index + 1} {index === 0 ? "*" : ""}</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => {
                    const updated = [...formData.regions];
                    updated[index] = e.target.value;
                    updateFormData("regions", updated);
                  }}
                  placeholder="Ex: Zona Norte de São Paulo"
                />
              </div>
            ))}
          </div>
        );

      case "provider-hours":
        return (
          <HoursSchedule
            hours={formData.providerHours}
            onUpdate={(day, value) =>
              updateFormData("providerHours", { ...formData.providerHours, [day]: value })
            }
            error={errors.hours}
          />
        );

      case "contact-provider":
        return (
          <div className="form-fields">
            {errors.providerContact && (
              <div className="full-width">
                <ErrorMessage message={errors.providerContact} />
              </div>
            )}
            <div className="form-field">
              <label>WhatsApp</label>
              <input
                type="tel"
                value={formData.providerContact.whatsapp}
                onChange={(e) =>
                  updateFormData("providerContact", {
                    ...formData.providerContact,
                    whatsapp: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input
                type="tel"
                value={formData.providerContact.phone}
                onChange={(e) =>
                  updateFormData("providerContact", {
                    ...formData.providerContact,
                    phone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="form-field full-width">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.providerContact.email}
                onChange={(e) =>
                  updateFormData("providerContact", {
                    ...formData.providerContact,
                    email: e.target.value,
                  })
                }
                placeholder="contato@email.com"
              />
            </div>
            <p className="field-hint full-width">* Preencha pelo menos WhatsApp ou telefone</p>
          </div>
        );

      // SUBDOMAIN
      case "subdomain":
        return (
          <div className="subdomain-step">
            <div className="subdomain-preview">
              <div className={`subdomain-url ${errors.subdomain ? 'subdomain-error' : ''}`}>
                <span className="subdomain-base">meusiteja.com/usuarios/</span>
                <input
                  type="text"
                  value={formData.subdomain}
                  onChange={(e) =>
                    updateFormData(
                      "subdomain",
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                    )
                  }
                  placeholder="seu-nome"
                  className="subdomain-input"
                />
              </div>
              {errors.subdomain && <ErrorMessage message={errors.subdomain} />}
              {formData.subdomain && formData.subdomain.length >= 3 && !errors.subdomain && (
                <div className="subdomain-availability available">
                  <FormIcons.Check />
                  <span>Disponível!</span>
                </div>
              )}
            </div>
            <SubdomainSuggestions
              suggestions={getSubdomainSuggestions()}
              selected={formData.subdomain}
              onSelect={(suggestion) => updateFormData("subdomain", suggestion)}
            />
          </div>
        );

      default:
        return <p>Passo não encontrado</p>;
    }
  };

  const isLastStep = phase === 2 && currentStep === phase2Steps.length - 1;
  const isFirstStep = phase === 1 && currentStep === 0;

  const getPhaseLabel = () => {
    if (phase === 1) return "Configuração da conta";
    return "Informações do site";
  };

  return (
    <div className="form-page">
      {/* Background Effects */}
      <div className="form-background">
        <div className="gradient-orb form-orb-1"></div>
        <div className="gradient-orb form-orb-2"></div>
        <div className="gradient-orb form-orb-3"></div>
      </div>

      {/* Header */}
      <header className="form-header">
        <button className="btn-back" onClick={onBack}>
          <FormIcons.ArrowLeft />
          <span>Voltar ao início</span>
        </button>
        <div className="form-logo">
          <img src={logopng} alt="Logo do MeuSiteJá." style={{height: "13rem", cursor: "pointer"}} onClick={() => window.location.href = "/"}/>
        </div>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="form-main">
        <div className="form-wrapper">
          <ProgressBar 
            current={currentStep + 1} 
            total={totalSteps} 
            phase={phase}
            phaseLabel={getPhaseLabel()}
          />

          <div className={`form-container ${isAnimating ? "animating" : ""}`}>
            <div className="form-container-glow"></div>
            
            <div className="form-left">
              <div className="step-indicator">
                <span className="step-icon">{currentStepData?.icon}</span>
              </div>
              <h2 className="form-title">{currentStepData?.title}</h2>
              <p className="form-subtitle">{currentStepData?.subtitle}</p>
            </div>

            <div className="form-divider"></div>

            <div className="form-right">
              <div className="form-content-wrapper">
                {renderStepContent()}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="form-navigation">
            <button
              className="btn btn-secondary btn-nav-prev"
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              <FormIcons.ArrowLeft />
              <span>Anterior</span>
            </button>

            {isLastStep ? (
              <button
                className="btn btn-success btn-nav-next"
                onClick={handleSubmit}
              >
                <FormIcons.Rocket />
                <span>Criar meu site</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-nav-next"
                onClick={handleNext}
              >
                <span>Próximo</span>
                <FormIcons.ArrowRight />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}