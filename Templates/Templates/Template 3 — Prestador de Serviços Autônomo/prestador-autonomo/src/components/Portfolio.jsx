import React from 'react';
import config from '../config/siteConfig';

const Portfolio = () => {
  const { portfolio } = config;

  if (!portfolio || portfolio.length === 0) return null;

  const renderImagem = (item) => {
    const temAntesDepois = item.imagemAntes || item.imagemDepois;
    const temUnica = item.imagemUnica;

    if (temAntesDepois) {
      return (
        <div className="portfolio-imagens">
          <div className="portfolio-img-box">
            <span className="portfolio-img-label">Antes</span>
            {item.imagemAntes ? (
              <img src={item.imagemAntes} alt="Antes" />
            ) : (
              <div className="portfolio-img-placeholder">
                <span className="portfolio-img-placeholder-icon">📷</span>
                <span>Foto Antes</span>
              </div>
            )}
          </div>
          <div className="portfolio-img-box">
            <span className="portfolio-img-label" style={{ background: 'rgba(37,211,102,0.9)' }}>
              Depois
            </span>
            {item.imagemDepois ? (
              <img src={item.imagemDepois} alt="Depois" />
            ) : (
              <div className="portfolio-img-placeholder">
                <span className="portfolio-img-placeholder-icon">📷</span>
                <span>Foto Depois</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (temUnica) {
      return (
        <div className="portfolio-imagem-unica">
          <div className="portfolio-img-box" style={{ height: '100%' }}>
            <img src={item.imagemUnica} alt={item.titulo} />
          </div>
        </div>
      );
    }

    // Placeholder quando não tem nenhuma imagem
    return (
      <div className="portfolio-imagens">
        <div className="portfolio-img-box">
          <span className="portfolio-img-label">Antes</span>
          <div className="portfolio-img-placeholder">
            <span className="portfolio-img-placeholder-icon">📷</span>
            <span>Foto Antes</span>
          </div>
        </div>
        <div className="portfolio-img-box">
          <span className="portfolio-img-label" style={{ background: 'rgba(37,211,102,0.9)' }}>
            Depois
          </span>
          <div className="portfolio-img-placeholder">
            <span className="portfolio-img-placeholder-icon">📷</span>
            <span>Foto Depois</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="secao" id="portfolio">
      <div className="container">
        <div className="secao-titulo">
          <span className="secao-titulo-label">Portfólio</span>
          <h2>Fotos de Trabalhos</h2>
          <p>Veja alguns dos serviços que já realizei</p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <div className="portfolio-card" key={index}>
              {renderImagem(item)}
              <div className="portfolio-info">
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;