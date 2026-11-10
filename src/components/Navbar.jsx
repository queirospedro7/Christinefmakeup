import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { pages } from '../data/seo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const lightBackground = path === '/privacidade' || path === '/termos' || !Object.hasOwn(pages, path);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        document.getElementById('hamburger')?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  };

  const toggleMenu = () => {
    isOpen ? closeMenu() : openMenu();
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled || lightBackground ? 'scrolled' : ''}`}
        id="navbar"
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Christine Fernandes Bridal Beauty — Página Inicial">
            <img
              className="nav-logo-img"
              src="/img/branding/logo.webp"
              alt="Christine Fernandes Bridal Beauty"
              width="40"
              height="40"
            />
            <div className="nav-logo-text">
              <span className="logo-script">Christine Fernandes</span>
              <span className="logo-sub">Bridal Beauty</span>
            </div>
          </Link>

          <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks" role="list">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sobre
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
                Portfólio
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicos" className={({ isActive }) => (isActive ? 'active' : '')}>
                Serviços
              </NavLink>
            </li>
            <li>
              <NavLink to="/formacoes" className={({ isActive }) => (isActive ? 'active' : '')}>
                Formações
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className="nav-cta">
                Pedir Orçamento
              </NavLink>
            </li>
          </ul>

          <button
            className={`hamburger ${isOpen ? 'is-open' : ''}`}
            type="button"
            id="hamburger"
            aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isOpen}
            aria-controls="navLinks"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`nav-overlay ${isOpen ? 'open' : ''}`}
        id="navOverlay"
        aria-hidden={!isOpen}
        onClick={closeMenu}
      />
    </>
  );
}
