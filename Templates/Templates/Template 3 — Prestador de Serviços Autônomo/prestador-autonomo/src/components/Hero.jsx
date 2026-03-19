import React from 'react';
import config from '../config/siteConfig';

const Hero = () => {
  const { nome, profissao, fraseImpacto, subtitulo, whatsapp, whatsappMensagem, foto } = config.profissional;
  const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMensagem)}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Disponível agora
          </div>

          <h2 className="hero-nome">{nome}</h2>
          <p className="hero-profissao">{profissao}</p>

          <h3 className="hero-frase">
            <span className="hero-frase-destaque">{fraseImpacto}</span>
          </h3>

          <p className="hero-subtitulo">{subtitulo}</p>

          <div className="hero-botoes">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-principal"
            >
              <span className="btn-principal-icon">📲</span>
              Solicitar Orçamento
            </a>

            <a href="#servicos" className="btn-secundario">
              Ver Serviços ↓
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-numero">15+</div>
              <div className="hero-stat-label">Anos Exp.</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-numero">2.000+</div>
              <div className="hero-stat-label">Clientes</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-numero">100%</div>
              <div className="hero-stat-label">Garantia</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-foto-container">
            {foto ? (
              <img src={foto} alt={nome} />
            ) : (
              <div className="hero-foto-placeholder">
                <span className="hero-foto-placeholder-icon">👷</span>
                <span className="hero-foto-placeholder-text">Sua foto aqui</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;