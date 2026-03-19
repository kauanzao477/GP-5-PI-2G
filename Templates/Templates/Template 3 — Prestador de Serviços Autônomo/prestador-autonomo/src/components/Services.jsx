import React from 'react';
import config from '../config/siteConfig';

const Services = () => {
  const { servicos, profissional } = config;
  const whatsappLink = `https://wa.me/${profissional.whatsapp}?text=${encodeURIComponent(profissional.whatsappMensagem)}`;

  return (
    <section className="secao secao-alt" id="servicos">
      <div className="container">
        <div className="secao-titulo">
          <span className="secao-titulo-label">O que eu faço</span>
          <h2>Serviços Realizados</h2>
          <p>Conheça os serviços que ofereço com qualidade e garantia</p>
        </div>

        <div className="servicos-grid">
          {servicos.map((servico, index) => (
            <div className="servico-card" key={index}>
              <span className="servico-icone">{servico.icone}</span>
              <h3 className="servico-titulo">{servico.titulo}</h3>
              <p className="servico-descricao">{servico.descricao}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-principal"
          >
            <span className="btn-principal-icon">📲</span>
            Solicitar Orçamento Grátis
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;