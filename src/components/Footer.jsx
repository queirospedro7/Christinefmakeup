import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="logo-script">Christine Fernandes</span>
          <p>Arte e elegância ao serviço da noiva mais bonita — tu.</p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/christinefmakeup"
              aria-label="Instagram de Christine Fernandes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/christinefmakeup"
              aria-label="Facebook de Christine Fernandes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="mailto:christinef.makeup@gmail.com" aria-label="Enviar email para Christine Fernandes">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
            </a>
            <a
              href="https://wa.me/351968427599"
              aria-label="Conversar no WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.961.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.073.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1 1.224zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.957-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.634 0-3.15-.494-4.417-1.343l-.316-.213-3.14.884.843-3.08-.234-.337A7.95 7.95 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-nav">
          <h4>Páginas</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/portfolio">Portfólio</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/formacoes">Formações</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-nav">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacidade">Política de Privacidade</Link></li>
            <li><Link to="/termos">Termos e Condições</Link></li>
            <li><Link to="/faq">Perguntas frequentes</Link></li>
            <li>
              <Link to="/privacidade#cookies">Cookies</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>
            <a href="mailto:christinef.makeup@gmail.com">christinef.makeup@gmail.com</a>
          </p>
          <p>
            <a href="tel:+351968427599">+351 968 427 599</a>
          </p>
          <p>Portugal</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Christine Fernandes Beauty · Todos os direitos reservados</p>
        <div className="footer-bottom-links">
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/termos">Termos e Condições</Link>
          <Link to="/privacidade#cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
