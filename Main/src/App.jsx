import { useState, useEffect } from "react";
import "./App.css";
import FormPage from "./FormPage";
import logopng from "./assets/logopng.png"

// Ícones simples em SVG
const Icons = {
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-small">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Store: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon-small">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
};

// Componente Navbar
function Navbar({ onStartCreating }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src={logopng} alt="Logo do MeuSiteJá." style={{height: "13rem", cursor: "pointer"}} onClick={() => window.location.href = "/"}/>
        </div>
        
        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#templates">Templates</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#sobre">Sobre</a>
          <button className="btn btn-primary btn-nav" onClick={onStartCreating}>Comece a Criar</button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>
    </nav>
  );
}

// Componente Hero Section
function HeroSection({ onStartCreating }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  
  const words = ["Portfólio", "Negócio", "Serviço"];

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    let timeout;
    
    if (isWaiting) {
      setIsTyping(false);
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
        setIsTyping(true);
      }, 3000);
    } else if (isDeleting) {
      if (displayText.length > 0) {
        const deleteSpeed = 500 / currentWord.length;
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayText.length < currentWord.length) {
        const typeSpeed = 2000 / currentWord.length;
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        setIsWaiting(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, isWaiting]);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <Icons.Zap />
          <span>Simples, rápido e gratuito</span>
        </div>
        
        <h1 className="hero-title">
          Crie seu site <br />
          <span className="highlight">
            de{" "}
            <span className={`typewriter-container ${isDeleting ? 'deleting' : ''}`}>
              <span className="typewriter-word-wrapper">
                <span className="typewriter-word">
                  {displayText}
                  {}
                  {displayText.length === 0 && '\u200B'}
                </span>
                {}
                <span 
                  className="typewriter-underline"
                  style={{ 
                    transform: `scaleX(${displayText.length > 0 ? 1 : 0})`,
                  }}
                ></span>
              </span>
              <span className={`typewriter-cursor ${isWaiting ? 'blink' : ''} ${isTyping ? 'typing' : ''}`}>|</span>
            </span>
          </span>
          <br />
          em poucos cliques
        </h1>
        
        <p className="hero-description">
          Transforme suas informações em um site profissional automaticamente.
          Sem conhecimento técnico, sem complicação. 
          <strong> Apenas preencha um formulário e pronto!</strong>
        </p>

        <div className="hero-cta">
          <button className="btn btn-primary btn-large" onClick={onStartCreating}>
            Comece a Criar
            <Icons.ArrowRight />
          </button>
          <button className="btn btn-secondary btn-large" onClick={() => window.location.href = "#como-funciona"}>
            <Icons.Play />
            Veja como funciona
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Gratuito</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Templates</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">IA</span>
            <span className="stat-label">Integrada</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="mockup-container">
          <div className="mockup-browser">
            <div className="browser-header">
              <div className="browser-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="browser-url">
                <span>meusiteja.com/usuarios/</span>
                <span className="url-highlight">seu-nome</span>
              </div>
            </div>
            <div className="browser-content">
              <div className="mockup-card">
                <div className="mockup-avatar"></div>
                <div className="mockup-lines">
                  <div className="line line-title"></div>
                  <div className="line line-subtitle"></div>
                  <div className="line line-text"></div>
                  <div className="line line-text short"></div>
                </div>
                <div className="mockup-badges">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-card card-1">
            <Icons.CheckCircle />
            <span>Site publicado!</span>
          </div>
          
          <div className="floating-card card-2">
            <Icons.Globe />
            <span>Link pronto para compartilhar</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de Features/Benefícios
function FeaturesSection() {
  const features = [
    {
      icon: <Icons.Zap />,
      title: "Rápido e Simples",
      description: "Preencha um formulário e seu site é criado automaticamente. Sem códigos, sem complicação."
    },
    {
      icon: <Icons.Users />,
      title: "Feito para Você",
      description: "Pensado especialmente para quem tem dificuldade com tecnologia. Interface amigável e intuitiva."
    },
    {
      icon: <Icons.Globe />,
      title: "Seu Link Próprio",
      description: "Receba um link personalizado para compartilhar seu site com qualquer pessoa, em qualquer lugar."
    },
    {
      icon: <Icons.MapPin />,
      title: "Google Maps Integrado",
      description: "Seu negócio aparece no mapa! Clientes encontram você facilmente com a localização integrada."
    },
    {
      icon: <Icons.Shield />,
      title: "Hospedagem Gratuita",
      description: "Seu site fica hospedado conosco sem nenhum custo. Você só se preocupa com o conteúdo."
    },
    {
      icon: <Icons.Heart />,
      title: "Análise por IA",
      description: "Nossa inteligência artificial analisa seus dados e cria o melhor site possível para você."
    }
  ];

  return (
    <section className="features" id="beneficios">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Benefícios</span>
          <h2 className="section-title">
            Por que escolher o <span className="highlight">MeuSiteJá</span>?
          </h2>
          <p className="section-description">
            Criamos uma plataforma pensada em você, para facilitar sua vida e aumentar sua visibilidade online.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Componente Como Funciona
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Cadastre-se",
      description: "Crie sua conta com email e senha. Simples e rápido, sem complicação.",
      icon: <Icons.Users />
    },
    {
      number: "02",
      title: "Escolha seu Template",
      description: "Selecione entre Portfólio Profissional, Negócio Local ou Prestador de Serviços.",
      icon: <Icons.Briefcase />
    },
    {
      number: "03",
      title: "Preencha seus Dados",
      description: "Complete o formulário com suas informações. Nossa IA vai organizar tudo para você.",
      icon: <Icons.Zap />
    },
    {
      number: "04",
      title: "Compartilhe!",
      description: "Escolha seu link personalizado e compartilhe seu novo site com o mundo!",
      icon: <Icons.Share />
    }
  ];

  return (
    <section className="how-it-works" id="como-funciona">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Processo</span>
          <h2 className="section-title">
            Como funciona em <span className="highlight">4 passos</span>
          </h2>
          <p className="section-description">
            Criar seu site nunca foi tão fácil. Siga estes passos simples e tenha sua presença online hoje mesmo.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Componente de Templates
function TemplatesSection({ onStartCreating }) {
  const templates = [
    {
      title: "Portfólio Profissional",
      description: "Ideal para profissionais buscando emprego ou visibilidade. Mostre sua experiência, formação e habilidades.",
      icon: <Icons.Briefcase />,
      features: ["Foto profissional", "Experiências", "Formação acadêmica", "Habilidades com nota", "Contatos"],
      color: "blue"
    },
    {
      title: "Negócio Local",
      description: "Perfeito para lojas, restaurantes e estabelecimentos. Mostre seu espaço e atraia mais clientes.",
      icon: <Icons.Store />,
      features: ["Fotos do local", "Serviços e preços", "Horário de funcionamento", "Localização no mapa", "Redes sociais"],
      color: "purple"
    },
    {
      title: "Prestador de Serviços",
      description: "Para autônomos que oferecem serviços. Mostre seus trabalhos e conquiste novos clientes.",
      icon: <Icons.Wrench />,
      features: ["Antes e depois", "Regiões atendidas", "Lista de serviços", "Horários disponíveis", "Avaliações"],
      color: "green"
    }
  ];

  return (
    <section className="templates" id="templates">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Templates</span>
          <h2 className="section-title">
            Escolha o template <span className="highlight">perfeito</span> para você
          </h2>
          <p className="section-description">
            Temos templates profissionais para diferentes necessidades. Escolha o seu e comece a criar!
          </p>
        </div>

        <div className="templates-grid">
          {templates.map((template, index) => (
            <div key={index} className={`template-card template-${template.color}`}>
              <div className="template-header">
                <div className="template-icon">{template.icon}</div>
                <h3 className="template-title">{template.title}</h3>
              </div>
              <p className="template-description">{template.description}</p>
              <ul className="template-features">
                {template.features.map((feature, i) => (
                  <li key={i}>
                    <Icons.CheckCircle />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-template" onClick={onStartCreating}>
                Usar este template
                <Icons.ArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Componente Para Quem É
function TargetAudienceSection({ onStartCreating }) {
  const audiences = [
    {
      emoji: "👴👵",
      title: "Pessoas com Dificuldade em Tecnologia",
      description: "Se você não sabe mexer em computador ou aplicativos, o MeuSiteJá foi feito para você!"
    },
    {
      emoji: "🏪",
      title: "Pequenos Empresários",
      description: "Donos de lojas, restaurantes, salões e outros negócios locais que querem mais visibilidade."
    },
    {
      emoji: "🔧",
      title: "Prestadores de Serviços",
      description: "Eletricistas, encanadores, diaristas, cabeleireiros e outros profissionais autônomos."
    },
    {
      emoji: "💼",
      title: "Pessoas Buscando Emprego",
      description: "Profissionais que querem um portfólio online para impressionar recrutadores."
    }
  ];

  return (
    <section className="target-audience" id="sobre">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Público-alvo</span>
          <h2 className="section-title">
            O MeuSiteJá é <span className="highlight">para você</span>?
          </h2>
          <p className="section-description">
            Nossa plataforma foi criada pensando em pessoas reais, com necessidades reais.
          </p>
        </div>

        <div className="audience-grid">
          {audiences.map((audience, index) => (
            <div key={index} className="audience-card">
              <span className="audience-emoji">{audience.emoji}</span>
              <h3 className="audience-title">{audience.title}</h3>
              <p className="audience-description">{audience.description}</p>
            </div>
          ))}
        </div>

        <div className="audience-cta">
          <p>Se identificou? Então o MeuSiteJá é para você!</p>
          <button className="btn btn-primary btn-large" onClick={onStartCreating}>
            Comece a Criar Agora
            <Icons.ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

// Componente de Depoimentos
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Dona de Salão de Beleza",
      content: "Sempre quis ter um site pro meu salão, mas achava muito complicado. Com o MeuSiteJá, consegui fazer em 10 minutos!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Eletricista Autônomo",
      content: "Agora meus clientes me acham pela internet. Meu telefone não para de tocar com pedidos de orçamento!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Procurando Emprego",
      content: "Criei meu portfólio e mandei o link nas entrevistas. Os recrutadores ficaram impressionados!",
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Depoimentos</span>
          <h2 className="section-title">
            O que nossos <span className="highlight">usuários</span> dizem
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icons.Star key={i} />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-info">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Componente CTA Final
function FinalCTASection({ onStartCreating }) {
  return (
    <section className="final-cta">
      <div className="cta-background">
        <div className="cta-gradient"></div>
      </div>
      <div className="section-container">
        <div className="cta-content">
          <h2 className="cta-title">
            Pronto para ter seu <span className="highlight">próprio site</span>?
          </h2>
          <p className="cta-description">
            Junte-se a centenas de pessoas que já criaram seus sites com o MeuSiteJá.
            É grátis, rápido e fácil. Comece agora mesmo!
          </p>
          <button className="btn btn-primary btn-xlarge" onClick={onStartCreating}>
            <Icons.Rocket />
            Comece a Criar Gratuitamente
          </button>
          <p className="cta-note">
            ✓ Sem cartão de crédito &nbsp; ✓ Sem conhecimento técnico &nbsp; ✓ 100% gratuito
          </p>
        </div>
      </div>
    </section>
  );
}

// Componente Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo">
              <img src={logopng} alt="Logo do MeuSiteJá." style={{height: "13rem", cursor: "pointer", marginTop: "-3rem"}} onClick={() => window.location.href = "/"}/>
            </div>
            <p className="footer-tagline">
              Transformando ideias em sites profissionais, sem complicação.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Produto</h4>
              <a href="#como-funciona">Como Funciona</a>
              <a href="#templates">Templates</a>
              <a href="#beneficios">Benefícios</a>
            </div>
            <div className="footer-column">
              <h4>Sobre</h4>
              <a href="#sobre">Quem Somos</a>
              <a href="#contato">Contato</a>
              <a href="#faq">Perguntas Frequentes</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#termos">Termos de Uso</a>
              <a href="#privacidade">Privacidade</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 MeuSiteJá. Todos os direitos reservados.</p>
          <p className="footer-tech">
            Desenvolvido para o Projeto Integrador
          </p>
        </div>
      </div>
    </footer>
  );
}

// Componente Principal
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleStartCreating = () => {
    setCurrentPage("form");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  if (currentPage === "form") {
    return <FormPage onBack={handleBackToHome} />;
  }

  return (
    <div className="app">
      <Navbar onStartCreating={handleStartCreating} />
      <HeroSection onStartCreating={handleStartCreating} />
      <FeaturesSection />
      <HowItWorksSection />
      <TemplatesSection onStartCreating={handleStartCreating} />
      <TargetAudienceSection onStartCreating={handleStartCreating} />
      <TestimonialsSection />
      <FinalCTASection onStartCreating={handleStartCreating} />
      <Footer />
    </div>
  );
}