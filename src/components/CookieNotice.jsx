import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cookie-notice.css';

const noticeKey = 'cf_cookie_notice_v3';

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
      <div className="cookie-notice-copy">
        <h2 id="cookie-notice-title">Cookies</h2>
        <p>Guardamos neste navegador que fechaste este aviso. Consulta a <Link to="/privacidade#cookies" onClick={dismiss}>Política de Privacidade</Link>.</p>
      </div>
      <button type="button" className="btn btn-dark" onClick={dismiss}>Fechar</button>
    </aside>
  );
}