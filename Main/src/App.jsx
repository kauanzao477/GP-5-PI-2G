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

// Componente Quem Somos
function AboutUsSection() {
  const teamMembers = [
    {
      name: "Breno Biazus Farina",
      role: "Cargo / Função",
      description: "Breve descrição sobre o membro, sua experiência e contribuição para o projeto.",
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      social: {
        Instagram: "#",
        github: "#",
        email: "email@exemplo.com"
      }
    },
    {
      name: "Kauan Henrique Balestrin",
      role: "Cargo / Função",
      description: "Breve descrição sobre o membro, sua experiência e contribuição para o projeto.",
      skills: ["Comunicação", "Marketing", "Programação"],
      social: {
        Instagram: "#",
        github: "https://github.com/kauanzao477",
        email: "kauanhenriquesilvabalestrin@gmail.com"
      }
    },
    {
      name: "Gabriel Pereira da Silva",
      role: "Cargo / Função",
      description: "Breve descrição sobre o membro, sua experiência e contribuição para o projeto.",
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      social: {
        Instagram: "#",
        github: "#",
        email: "email@exemplo.com"
      }
    },
    {
      name: "Lorenzo Biazus Farina",
      role: "Cargo / Função",
      description: "Breve descrição sobre o membro, sua experiência e contribuição para o projeto.",
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      social: {
        Instagram: "#",
        github: "https://github.com/lorenz1o",
        email: "email@exemplo.com"
      }
    },
    {
      name: "Miguel Gasperini Klidzio",
      role: "Designer",
      description: "Breve descrição sobre o membro, sua experiência e contribuição para o projeto.",
      skills: ["Comunicação", "Geração de Ideias", "Design"],
      social: {
        Instagram: "https://www.instagram.com/miguel_.mgk/",
        github: " https://github.com/miguelklidzio1-lang",
        email: "miguelklidzio1@gmail.com"
      }
    }
  ];

  const projectInfo = {
    title: "Sobre o Projeto",
    description: "O MeuSiteJá é uma plataforma que utiliza inteligência artificial para criar sites e portfólios profissionais de forma simples e gratuita, focada em pessoas com pouca experiência em tecnologia.",
    mission: "Promover a inclusão e autonomia digital através de uma plataforma acessível que facilite a criação de sites profissionais. Acreditamos que a presença online não deve ser privilégio de quem domina tecnologia. Queremos quebrar barreiras técnicas para que pequenos empreendedores, profissionais autônomos e pessoas em busca de emprego possam se destacar no mundo digital sem complicação.",
    vision: "Ser referência em criação automatizada de sites no Brasil, tornando a presença digital acessível a todos, independentemente de idade ou conhecimento tecnológico. Vislumbramos um futuro onde cada pequeno negócio e profissional tenha sua própria página na internet, contribuindo para reduzir desigualdades de acesso à tecnologia e gerar impacto positivo na economia local.",
    course: "Informática para a Internet",
    institution: "Instituto Federal Catarinense",
    campus: "Concórdia",
    year: "2026"
  };

  return (
    <section className="about-us" id="quem-somos">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Quem Somos</span>
          <h2 className="section-title">
            Conheça a <span className="highlight">nossa equipe</span>
          </h2>
          <p className="section-description">
            Somos estudantes apaixonados por tecnologia, unidos pelo objetivo de criar soluções que facilitem a vida das pessoas.
          </p>
        </div>

        {/* Informações do Projeto */}
        <div className="project-info-container">
          <div className="project-info-card">
            <div className="project-info-header">
              <Icons.Rocket />
              <h3>{projectInfo.title}</h3>
            </div>
            <p className="project-description">{projectInfo.description}</p>
            
            <div className="project-values">
              <div className="value-card">
                <div className="value-icon">
                  <Icons.Heart />
                </div>
                <h4>Nossa Missão</h4>
                <p>{projectInfo.mission}</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <Icons.Globe />
                </div>
                <h4>Nossa Visão</h4>
                <p>{projectInfo.vision}</p>
              </div>
            </div>

            <div className="project-academic">
              <div className="academic-item">
                <span className="academic-label">Curso</span>
                <span className="academic-value">{projectInfo.course}</span>
              </div>
              <div className="academic-divider"></div>
              <div className="academic-item">
                <span className="academic-label">Instituição</span>
                <span className="academic-value">{projectInfo.institution}</span>
              </div>
              <div className="academic-divider"></div>
              <div className="academic-item">
                <span className="academic-label">Campus</span>
                <span className="academic-value">{projectInfo.campus} - {projectInfo.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div className="team-section">
          <h3 className="team-title">Nossa Equipe</h3>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-card-header">
                  <div className="member-avatar">
                    <span>{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  </div>
                  <div className="member-info">
                    <h4 className="member-name">{member.name}</h4>
                    <span className="member-role">{member.role}</span>
                  </div>
                </div>
                <p className="member-description">{member.description}</p>
                <div className="member-skills">
                  {member.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="member-social">
                  <a href={member.social.Instagram} target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={`mailto:${member.social.email}`} className="social-link" title="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="social-icon">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente Contato
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Limpa a mensagem de sucesso após 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-info-icon">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email",
      value: "contato@meusiteja.com",
      href: "mailto:contato@meusiteja.com"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-info-icon">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Localização",
      value: "Concórdia, SC - Brasil",
      href: null
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-info-icon">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: "Horário",
      value: "Qui: 07:30h às 09:45h",
      href: null
    }
  ];

  return (
    <section className="contact" id="contato">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Contato</span>
          <h2 className="section-title">
            Entre em <span className="highlight">contato</span> conosco
          </h2>
          <p className="section-description">
            Tem alguma dúvida, sugestão ou feedback? Ficaremos felizes em ouvir você!
          </p>
        </div>

        <div className="contact-container">
          {/* Informações de Contato */}
          <div className="contact-info-section">
            <h3 className="contact-info-title">Informações de Contato</h3>
            <p className="contact-info-description">
              Escolha a forma mais conveniente para entrar em contato conosco. Responderemos o mais rápido possível!
            </p>

            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    {info.icon}
                  </div>
                  <div className="contact-info-content">
                    <span className="contact-info-label">{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className="contact-info-value">{info.value}</a>
                    ) : (
                      <span className="contact-info-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <span className="contact-social-label">Siga-nos nas redes sociais</span>
              <div className="contact-social-links">
                <a href="#" className="contact-social-link" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="contact-social-link" title="Twitter/X">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="contact-social-link" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="contact-social-link" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="problema">Reportar Problema</option>
                  <option value="parceria">Parceria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary btn-submit ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-small">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Enviar Mensagem
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="form-success">
                  <Icons.CheckCircle />
                  <span>Mensagem enviada com sucesso! Responderemos em breve.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente FAQ
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "O MeuSiteJá é realmente gratuito?",
      answer: "Sim! O MeuSiteJá é 100% gratuito. Você pode criar seu site, personalizar e publicar sem pagar nada. Não pedimos cartão de crédito e não há taxas escondidas."
    },
    {
      question: "Preciso saber programar para usar?",
      answer: "Não! O MeuSiteJá foi criado especialmente para pessoas que não têm conhecimento técnico. Você só precisa preencher um formulário com suas informações e nós criamos o site para você automaticamente."
    },
    {
      question: "Como funciona o link personalizado?",
      answer: "Ao criar seu site, você escolhe um nome único para seu link, como meusiteja.com/usuarios/seu-nome. Este link é seu para compartilhar em redes sociais, cartões de visita, WhatsApp e onde mais quiser!"
    },
    {
      question: "Posso editar meu site depois de criado?",
      answer: "Sim! Você pode acessar sua conta a qualquer momento e atualizar suas informações. As alterações são aplicadas automaticamente ao seu site."
    },
    {
      question: "Meu site aparece no Google?",
      answer: "Sim! Todos os sites criados no MeuSiteJá são otimizados para mecanismos de busca (SEO). Com o tempo, seu site pode aparecer nos resultados de pesquisa do Google."
    },
    {
      question: "Quais tipos de site posso criar?",
      answer: "Oferecemos três tipos de templates: Portfólio Profissional (para quem busca emprego), Negócio Local (para lojas, restaurantes, etc.) e Prestador de Serviços (para autônomos como eletricistas, encanadores, etc.)."
    },
    {
      question: "O site funciona em celulares?",
      answer: "Sim! Todos os nossos templates são responsivos, ou seja, se adaptam automaticamente a qualquer tamanho de tela - seja celular, tablet ou computador."
    },
    {
      question: "Como a Inteligência Artificial ajuda na criação?",
      answer: "Nossa IA analisa as informações que você fornece e organiza o conteúdo da melhor forma possível, sugerindo layouts, cores e textos otimizados para seu tipo de negócio ou perfil profissional."
    },
    {
      question: "Posso usar meu próprio domínio?",
      answer: "No momento, oferecemos apenas links no formato meusiteja.com/usuarios/seu-nome."
    },
    {
      question: "E se eu tiver problemas ou dúvidas?",
      answer: "Você pode entrar em contato conosco através do formulário de contato nesta página. Nossa equipe responderá o mais rápido possível para ajudá-lo!"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">FAQ</span>
          <h2 className="section-title">
            Perguntas <span className="highlight">Frequentes</span>
          </h2>
          <p className="section-description">
            Tire suas dúvidas sobre o MeuSiteJá. Se não encontrar o que procura, entre em contato conosco!
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <div className="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <div className="faq-cta-content">
              <h3>Ainda tem dúvidas?</h3>
              <p>Nossa equipe está pronta para ajudar você!</p>
              <a href="#contato" className="btn btn-primary">
                Entre em Contato
                <Icons.ArrowRight />
              </a>
            </div>
          </div>
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
              <a href="#quem-somos">Quem Somos</a>
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
      <AboutUsSection />
      <ContactSection />
      <FAQSection />
      <FinalCTASection onStartCreating={handleStartCreating} />
      <Footer />
    </div>
  );
}