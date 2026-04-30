import React, { useState, useEffect } from 'react';
import config from '../config/siteConfig';

const WhatsAppFloat = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisivel(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = `https://wa.me/${config.profissional.whatsapp}?text=${encodeURIComponent(config.profissional.whatsappMensagem)}`;

  if (!visivel) return null;

  return (
    <div className="whatsapp-float">
      <div className="whatsapp-float-tooltip">
        💬 Fale comigo agora!
      </div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chamar no WhatsApp"
      >
        📱
      </a>
    </div>
  );
};

export default WhatsAppFloat;