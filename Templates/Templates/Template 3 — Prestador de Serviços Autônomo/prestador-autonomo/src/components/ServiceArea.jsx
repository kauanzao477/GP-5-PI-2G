import React from 'react';
import config from '../config/siteConfig';

const ServiceArea = () => {
  const { atendimento, profissional, depoimentos } = config;

  const whatsappLink = `https://wa.me/${profissional.whatsapp}?text=${encodeURIComponent(profissional.whatsappMensagem)}`;

  return (
    <>
      {/* Depoimentos */}
      {depoimentos && depoimentos.length > 0 && (
        <section className="secao secao-alt" id="depoimentos">
          <div className="container">
            <div className="secao-titulo">
              <span className="secao-titulo-label">Depoimentos</span>
              <h2>O que dizem sobre mim</h2>
              <p>A opinião de quem já contratou meus serviços</p>
            </div>

            <div className="depoimentos-grid">
              {depoimentos.map((dep, index) => (
                <div className="depoimento-card" key={index}>
                  <div className="depoimento-aspas">"</div>
                  <p className="depoimento-texto">{dep.texto}</p>
                  <div className="depoimento-autor">
                    <div className="depoimento-avatar">
                      {dep.foto ? (
                        <img src={dep.foto} alt={dep.nome} />
                      ) : (
                        dep.nome.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="depoimento-nome">{dep.nome}</div>
                      <div className="depoimento-estrelas">
                        {'★'.repeat(dep.estrelas)}{'☆'.repeat(5 - dep.estrelas)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Atendimento */}
      <section className="secao" id="atendimento">
        <div className="container">
          <div className="secao-titulo">
            <span className="secao-titulo-label">Atendimento</span>
            <h2>Como me encontrar</h2>
            <p>Regiões atendidas, horários e contato</p>
          </div>

          <div className="atendimento-grid">
            {/* Regiões */}
            <div className="atendimento-card">
              <div className="atendimento-card-icon">📍</div>
              <h3>Regiões Atendidas</h3>
              <ul className="atendimento-lista">
                {atendimento.regioes.map((regiao, index) => (
                  <li key={index}>
                    <span className="atendimento-lista-check">✓</span>
                    {regiao}
                  </li>
                ))}
              </ul>
            </div>

            {/* Horário */}
            <div className="atendimento-card">
              <div className="atendimento-card-icon">🕐</div>
              <h3>Horário de Atendimento</h3>
              <div>
                <div className="horario-item">
                  <span className="horario-dia">Seg - Sex</span>
                  <span className="horario-hora">{atendimento.horario.semana}</span>
                </div>
                <div className="horario-item">
                  <span className="horario-dia">Sábado</span>
                  <span className="horario-hora">{atendimento.horario.sabado}</span>
                </div>
                <div className="horario-item">
                  <span className="horario-dia">Domingo</span>
                  <span className="horario-hora">{atendimento.horario.domingo}</span>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="atendimento-card">
              <div className="atendimento-card-icon">📞</div>
              <h3>Contato</h3>
              <div>
                <div className="contato-item">
                  <div className="contato-item-icon">📱</div>
                  <div>
                    <div className="contato-item-label">WhatsApp</div>
                    <div className="contato-item-valor">{profissional.telefone}</div>
                  </div>
                </div>
                <div className="contato-item">
                  <div className="contato-item-icon">📞</div>
                  <div>
                    <div className="contato-item-label">Telefone</div>
                    <div className="contato-item-valor">{profissional.telefone}</div>
                  </div>
                </div>
                {profissional.email && (
                  <div className="contato-item">
                    <div className="contato-item-icon">✉️</div>
                    <div>
                      <div className="contato-item-label">E-mail</div>
                      <div className="contato-item-valor" style={{ fontSize: '0.8rem' }}>
                        {profissional.email}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-final">
        <div className="container">
          <h2>Precisa de um orçamento?</h2>
          <p>Fale comigo agora mesmo pelo WhatsApp. Resposta rápida e sem compromisso!</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-principal"
          >
            <span className="btn-principal-icon">📲</span>
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

export default ServiceArea;