import React, { useState, useEffect } from 'react';
import config from '../config/siteConfig';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappLink = `https://wa.me/${config.profissional.whatsapp}?text=${encodeURIComponent(config.profissional.whatsappMensagem)}`;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo">
          <div className="header-logo-icon">
            ⚡
          </div>
          <div className="header-logo-text">
            <h1>{config.profissional.nome}</h1>
            <span>{config.profissional.profissao}</span>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta"
        >
          <span className="header-cta-icon">📱</span>
          <span>Orçamento Grátis</span>
        </a>
      </div>
    </header>
  );
};

export default Header;