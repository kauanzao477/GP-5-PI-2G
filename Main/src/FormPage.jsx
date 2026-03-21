import { useState, useMemo } from "react";
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
};

// Step definitions based on template
const getSteps = (template) => {
  const commonStart = [
    { id: "login", title: "Acesse sua conta", subtitle: "Entre com seu e-mail e senha para continuar", icon: "🔐" },
    { id: "template", title: "Escolha seu template", subtitle: "Selecione o tipo de site que melhor representa você", icon: "🎨" },
  ];

  const commonEnd = [
    { id: "subdomain", title: "Escolha seu link", subtitle: "Defina o endereço único do seu site na internet", icon: "🌐" },
  ];

  const portfolioSteps = [
    { id: "basic-info", title: "Informações básicas", subtitle: "Conte-nos sobre você e sua carreira profissional", icon: "👤" },
    { id: "about", title: "Sobre você", subtitle: "Descreva quem você é e suas principais características", icon: "✨" },
    { id: "experience", title: "Experiência profissional", subtitle: "Liste as empresas onde você trabalhou", icon: "💼" },
    { id: "education", title: "Formação acadêmica", subtitle: "Adicione sua formação e cursos realizados", icon: "🎓" },
    { id: "skills", title: "Habilidades", subtitle: "Avalie suas competências técnicas e pessoais", icon: "🚀" },
    { id: "contact", title: "Informações de contato", subtitle: "Como as pessoas podem te encontrar", icon: "📱" },
    { id: "photo", title: "Foto profissional", subtitle: "Adicione uma foto para seu perfil", icon: "📸" },
  ];

  const businessSteps = [
    { id: "business-info", title: "Informações do negócio", subtitle: "Conte-nos sobre seu estabelecimento", icon: "🏪" },
    { id: "history", title: "História", subtitle: "Compartilhe a história do seu negócio", icon: "📖" },
    { id: "services", title: "Serviços oferecidos", subtitle: "Liste os serviços e preços", icon: "🛎️" },
    { id: "photos", title: "Fotos do local", subtitle: "Mostre seu espaço (mínimo 6 fotos)", icon: "🖼️" },
    { id: "location", title: "Localização", subtitle: "Onde seu negócio está localizado", icon: "📍" },
    { id: "hours", title: "Horário de funcionamento", subtitle: "Quando seu negócio está aberto", icon: "🕐" },
    { id: "contact-business", title: "Contato e redes sociais", subtitle: "Formas de entrar em contato", icon: "📞" },
  ];

  const serviceSteps = [
    { id: "provider-info", title: "Informações básicas", subtitle: "Conte-nos sobre você e seu trabalho", icon: "🔧" },
    { id: "provider-services", title: "Serviços oferecidos", subtitle: "Liste os serviços que você oferece (mín. 3)", icon: "🛠️" },
    { id: "trust", title: "Parágrafo de confiança", subtitle: "Por que os clientes devem confiar em você", icon: "🤝" },
    { id: "portfolio-photos", title: "Fotos de trabalhos", subtitle: "Mostre o antes e depois dos seus serviços", icon: "📷" },
    { id: "regions", title: "Regiões atendidas", subtitle: "Onde você oferece seus serviços", icon: "🗺️" },
    { id: "provider-hours", title: "Horários de atendimento", subtitle: "Quando você está disponível", icon: "⏰" },
    { id: "contact-provider", title: "Informações de contato", subtitle: "Como clientes podem te contatar", icon: "💬" },
  ];

  let templateSteps = [];
  switch (template) {
    case "portfolio":
      templateSteps = portfolioSteps;
      break;
    case "business":
      templateSteps = businessSteps;
      break;
    case "service":
      templateSteps = serviceSteps;
      break;
    default:
      templateSteps = [];
  }

  return [...commonStart, ...templateSteps, ...commonEnd];
};

// Progress Bar Component
function ProgressBar({ current, total }) {
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Progresso</span>
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

// Dynamic List Component
function DynamicList({ items, onAdd, onRemove, onUpdate, fields, title, minItems = 0 }) {
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
            {fields.map((field) => (
              <div key={field.name} className={`form-field ${field.fullWidth ? "full-width" : ""}`}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={item[field.name] || ""}
                    onChange={(e) => onUpdate(index, field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <div className="select-wrapper">
                    <select
                      value={item[field.name] || ""}
                      onChange={(e) => onUpdate(index, field.name, e.target.value)}
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
                  />
                )}
              </div>
            ))}
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
function SkillRating({ skills, onAdd, onRemove, onUpdate }) {
  return (
    <div className="skills-list">
      {skills.map((skill, index) => (
        <div key={index} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
          <input
            type="text"
            value={skill.name}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="Nome da habilidade"
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
        </div>
      ))}
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
function PhotoUpload({ photos, onAdd, onRemove, maxPhotos = 10, minPhotos = 1, label = "Adicionar foto" }) {
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
          <label className="photo-add">
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
function BeforeAfterUpload({ items, onAdd, onRemove, onUpdate }) {
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
              <label>Título do trabalho</label>
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
function HoursSchedule({ hours, onUpdate }) {
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
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    // Login
    email: "",
    password: "",
    // Template
    template: "",
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

  const steps = useMemo(() => getSteps(formData.template), [formData.template]);
  const totalSteps = steps.length;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSubmit = () => {
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
    const step = steps[currentStep];
    if (!step) return null;

    switch (step.id) {
      case "login":
        return (
          <div className="form-fields">
            <div className="form-field">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div className="form-field">
              <label>Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="form-hint-box">
              <p>Não tem uma conta? <a href="#">Cadastre-se gratuitamente</a></p>
            </div>
          </div>
        );

      case "template":
        return (
          <div className="template-options">
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

      // PORTFOLIO STEPS
      case "basic-info":
        return (
          <div className="form-fields">
            <div className="form-field">
              <label>Nome completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="João da Silva"
              />
            </div>
            <div className="form-field">
              <label>Profissão atual</label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => updateFormData("profession", e.target.value)}
                placeholder="Desenvolvedor de Software"
              />
            </div>
            <div className="form-field full-width">
              <label>Tempo de experiência</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => updateFormData("experience", e.target.value)}
                placeholder="5 anos"
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="form-fields">
            <div className="form-field full-width">
              <label>Sobre mim</label>
              <textarea
                value={formData.aboutMe}
                onChange={(e) => updateFormData("aboutMe", e.target.value)}
                placeholder="Conte um pouco sobre você, sua trajetória e objetivos profissionais..."
                rows={5}
              />
            </div>
            <div className="form-field full-width">
              <label>Tags sobre mim</label>
              <div className="tags-input">
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
              { name: "duration", label: "Período", placeholder: "Ex: 2020 - 2023" },
              { name: "description", label: "Descrição das atividades", placeholder: "Descreva suas responsabilidades e conquistas", type: "textarea", fullWidth: true },
            ]}
            title="empresa"
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
              { name: "date", label: "Ano de conclusão", placeholder: "2020" },
              { name: "current", label: "", type: "checkbox", checkboxLabel: "Cursando atualmente", fullWidth: true },
            ]}
            title="formação"
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
          />
        );

      case "contact":
        return (
          <div className="form-fields">
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
          </div>
        );

      case "photo":
        return (
          <div className="photo-upload-single">
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
              <label className="photo-upload-area">
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
                  <span className="upload-text">Clique para enviar sua foto</span>
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
            <div className="form-field full-width">
              <label>Nome do negócio</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                placeholder="Restaurante da Maria"
              />
            </div>
            <div className="form-field full-width">
              <label>Tempo de atividade</label>
              <input
                type="text"
                value={formData.businessTime}
                onChange={(e) => updateFormData("businessTime", e.target.value)}
                placeholder="5 anos"
              />
            </div>
          </div>
        );

      case "history":
        return (
          <div className="form-fields">
            <div className="form-field full-width">
              <label>História do negócio</label>
              <textarea
                value={formData.history}
                onChange={(e) => updateFormData("history", e.target.value)}
                placeholder="Conte a história do seu negócio, como começou, sua missão e valores..."
                rows={8}
              />
            </div>
          </div>
        );

      case "services":
        return (
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
              { name: "price", label: "Preço", placeholder: "R$ 50,00" },
              { name: "description", label: "Descrição", placeholder: "Descrição detalhada do serviço", type: "textarea", fullWidth: true },
            ]}
            title="serviço"
          />
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
          />
        );

      case "location":
        return (
          <div className="form-fields">
            <div className="form-field">
              <label>CEP</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => updateFormData("cep", e.target.value)}
                placeholder="00000-000"
              />
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
          />
        );

      case "contact-business":
        return (
          <div className="form-fields">
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
          </div>
        );

      // SERVICE PROVIDER STEPS
      case "provider-info":
        return (
          <div className="form-fields">
            <div className="form-field">
              <label>Nome completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="José da Silva"
              />
            </div>
            <div className="form-field">
              <label>Profissão atual</label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => updateFormData("profession", e.target.value)}
                placeholder="Eletricista"
              />
            </div>
            <div className="form-field">
              <label>Tempo de experiência</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => updateFormData("experience", e.target.value)}
                placeholder="10 anos"
              />
            </div>
            <div className="form-field">
              <label>Clientes atendidos</label>
              <input
                type="text"
                value={formData.clientsServed}
                onChange={(e) => updateFormData("clientsServed", e.target.value)}
                placeholder="+500 clientes"
              />
            </div>
          </div>
        );

      case "provider-services":
        return (
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
              { name: "description", label: "Descrição", placeholder: "Descreva o serviço oferecido", type: "textarea", fullWidth: true },
            ]}
            title="serviço"
            minItems={3}
          />
        );

      case "trust":
        return (
          <div className="form-fields">
            <div className="form-field full-width">
              <label>Parágrafo de confiança</label>
              <textarea
                value={formData.trustParagraph}
                onChange={(e) => updateFormData("trustParagraph", e.target.value)}
                placeholder="Explique por que os clientes devem confiar em você. Fale sobre sua experiência, compromisso com qualidade, garantias oferecidas, diferenciais do seu trabalho..."
                rows={6}
              />
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
          />
        );

      case "regions":
        return (
          <div className="form-fields regions-grid">
            <p className="form-intro">Informe até 5 regiões onde você atende:</p>
            {formData.regions.map((region, index) => (
              <div key={index} className="form-field" style={{ animationDelay: `${index * 0.1}s` }}>
                <label>Região {index + 1}</label>
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
          />
        );

      case "contact-provider":
        return (
          <div className="form-fields">
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
          </div>
        );

      // SUBDOMAIN
      case "subdomain":
        return (
          <div className="subdomain-step">
            <div className="subdomain-preview">
              <div className="subdomain-url">
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
              {formData.subdomain && (
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

  const isLastStep = currentStep === totalSteps - 1;
  const canProceed = () => {
    const step = steps[currentStep];
    if (!step) return false;

    switch (step.id) {
      case "login":
        return formData.email && formData.password;
      case "template":
        return formData.template !== "";
      case "subdomain":
        return formData.subdomain.length >= 3;
      default:
        return true;
    }
  };

  return (
    <div className="form-page">
      {/* Background Effects */}
      <div className="form-background">
        <div className="gradient-orb form-orb-1"></div>
        <div className="gradient-orb form-orb-2"></div>
        <div className="gradient-orb form-orb-3"></div>
        <div className="grid-pattern"></div>
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
          <ProgressBar current={currentStep + 1} total={totalSteps} />

          <div className={`form-container ${isAnimating ? "animating" : ""}`}>
            <div className="form-container-glow"></div>
            
            <div className="form-left">
              <div className="step-indicator">
                <span className="step-icon">{steps[currentStep]?.icon}</span>
              </div>
              <h2 className="form-title">{steps[currentStep]?.title}</h2>
              <p className="form-subtitle">{steps[currentStep]?.subtitle}</p>
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
              disabled={currentStep === 0}
            >
              <FormIcons.ArrowLeft />
              <span>Anterior</span>
            </button>

            {isLastStep ? (
              <button
                className="btn btn-success btn-nav-next"
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                <FormIcons.Rocket />
                <span>Criar meu site</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-nav-next"
                onClick={handleNext}
                disabled={!canProceed()}
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