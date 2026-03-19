import React from 'react';
import config from '../config/siteConfig';

const WhyHireMe = () => {
  const { diferenciais, textoSobre } = config;

  return (
    <section className="secao secao-escura" id="diferenciais">
      <div className="container">
        <div className="secao-titulo">
          <span className="secao-titulo-label">Diferenciais</span>
          <h2>Por que me contratar?</h2>
          <p>Motivos para confiar no meu trabalho</p>
        </div>

        <div className="diferenciais-grid">
          {diferenciais.map((item, index) => (
            <div className="diferencial-card" key={index}>
              <div className="diferencial-icone">
                <span>{item.icone}</span>
              </div>
              <div className="diferencial-conteudo">
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        {textoSobre && (
          <div className="sobre-texto-box">
            <p>{textoSobre}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyHireMe;