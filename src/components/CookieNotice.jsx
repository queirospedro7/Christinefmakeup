import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const noticeKey = 'cf_cookie_notice_v1';

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
    <aside className="cookie-corner-rect" aria-labelledby="cookie-notice-title">
      <h2 className="cookie-rect-title cookie-rect-header" id="cookie-notice-title">Privacidade e <em>cookies</em></h2>
      <p className="cookie-rect-desc">Este site não usa cookies de publicidade ou análise. Guardamos neste navegador apenas que fechaste este aviso.</p>
      <div className="cookie-rect-actions">
        <Link className="cookie-btn" to="/privacidade#cookies">Saber mais</Link>
        <button type="button" className="cookie-btn cookie-btn--primary" onClick={dismiss}>Entendido</button>
      </div>
    </aside>
  );
}
