import { Link } from 'react-router-dom';
import '../css/not-found.css';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found" tabIndex={-1}>
      <section className="not-found-layout" aria-labelledby="not-found-title">
        <div className="not-found-copy">
          <p className="not-found-code"><span /> Erro 404</p>
          <h1 id="not-found-title">Página <em>não encontrada</em></h1>
          <p className="not-found-description">
            O endereço pode ter mudado. Podes voltar ao início ou explorar o portfólio.
          </p>
          <nav className="not-found-actions" aria-label="Continuar a navegar">
            <Link to="/" className="btn btn-dark">
              Voltar ao início
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <Link to="/portfolio" className="btn btn-outline-dark">Ver portfólio</Link>
          </nav>
        </div>
        <div className="not-found-photo" aria-hidden="true">
          <img src="/img/noiva/galeria-034.webp" alt="" />
        </div>
      </section>
    </main>
  );
}
