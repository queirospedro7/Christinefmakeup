import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cookie-notice.css';

const noticeKey = 'cf_cookie_notice_v4';

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
      <div>
        <h2 id="cookie-notice-title">Cookies</h2>
        <p>Este site não usa cookies de publicidade ou análise. O teu navegador guarda apenas que fechaste este aviso.</p>
      </div>
      <div className="cookie-notice-actions">
        <Link to="/privacidade#cookies" onClick={dismiss}>Saber mais</Link>
        <button type="button" className="btn btn-dark" onClick={dismiss}>Entendido</button>
      </div>
    </aside>
  );
}