import React from 'react';
import config from '../config/siteConfig';

const Footer = () => {
  const { profissional, redesSociais } = config;
  const ano = new Date().getFullYear();

  const temRedes = redesSociais && Object.values(redesSociais).some(v => v);

  const redesIcones = {
    instagram: '📸',
    facebook: '👤',
    youtube: '🎬',
    tiktok: '🎵',
  };

  return (
    <footer className="footer">
      {temRedes && (
        <div className="footer-social">
          {Object.entries(redesSociais).map(([rede, url]) => {
            if (!url) return null;
            return (
              <a
                key={rede}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={rede.charAt(0).toUpperCase() + rede.slice(1)}
              >
                {redesIcones[rede] || '🔗'}
              </a>
            );
          })}
        </div>
      )}

      <p>
        © {ano} <a href="#inicio">{profissional.nome}</a> — {profissional.profissao}
      </p>
      <p style={{ marginTop: '4px', fontSize: '0.75rem', opacity: 0.6 }}>
        Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;