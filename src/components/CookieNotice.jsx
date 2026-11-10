import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cookie-notice.css';

const noticeKey = 'cf_cookie_notice_v2';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(noticeKey) !== 'seen');
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(noticeKey, 'seen');
    } catch {
      // The notice can still be dismissed when storage is unavailable.
    }
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-labelledby="cookie-notice-title">
      <header className="cookie-notice-heading">
        <span className="cookie-notice-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a10 10 0 1 1 0-20 4 4 0 0 0 5 5 4 4 0 0 0 5 5 10 10 0 0 1-10 10Z" />
            <path d="M8 9h.01M8 15h.01M13 13h.01M15 17h.01" strokeWidth="2.8" />
          </svg>
        </span>
        <h2 id="cookie-notice-title">Privacidade e <em>cookies</em></h2>
      </header>
      <p>O site não usa cookies de publicidade ou análise. O navegador guarda apenas que fechaste este aviso.</p>
      <details className="cookie-notice-details" data-lenis-prevent>
        <summary>O que fica guardado?</summary>
        <dl>
          <dt>O aviso neste navegador</dt>
          <dd>Guardamos localmente a indicação de que fechaste o aviso. Se apagares os dados do site nas definições do navegador, voltará a aparecer.</dd>
          <dt>Ligações externas</dt>
          <dd>Ao abrir serviços como o WhatsApp ou o Google Maps, aplicam-se as respetivas políticas de privacidade.</dd>
        </dl>
      </details>
      <div className="cookie-notice-actions">
        <Link to="/privacidade#cookies" onClick={dismiss}>Política de Privacidade</Link>
        <button type="button" className="btn btn-dark" onClick={dismiss}>Entendido</button>
      </div>
    </aside>
  );
}