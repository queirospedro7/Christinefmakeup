import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import gallery from '../data/portfolio-gallery.json';

const films = [
  { slug: 'beleza-nupcial', title: 'Beleza nupcial' },
  { slug: 'qativa-makeup', title: 'Qativa Makeup' },
];
const photoBatchSize = 24;

function PortfolioFilms() {
  const player = useRef(null);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const openFilm = (film) => {
    setSelectedFilm(film);
    player.current.showModal();
  };

  return (
    <section className="portfolio-films section-pad" aria-labelledby="portfolio-films-heading">
      <div className="container">

        <h2 id="portfolio-films-heading" className="center">Nos <em>bastidores</em></h2>
        <div className="portfolio-films-grid">
          {films.map((film) => (
            <button
              type="button"
              className="portfolio-film"
              key={film.slug}
              onClick={() => openFilm(film)}
              aria-haspopup="dialog"
              aria-label={`Ver vídeo: ${film.title}`}
            >
              <span className="portfolio-film-cover">
                <img src={`/videos/${film.slug}.webp`} alt="" width="540" height="960" loading="lazy" decoding="async" />
                <span className="portfolio-film-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                    <path d="M9 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <dialog
        className="portfolio-film-dialog"
        ref={player}
        aria-label={selectedFilm?.title}
        onClose={() => setSelectedFilm(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="portfolio-film-player">
          <div className="portfolio-film-player-header">

            <button type="button" onClick={() => player.current.close()} aria-label="Fechar vídeo">×</button>
          </div>
          {selectedFilm && (
            <video
              controls
              autoPlay
              playsInline
              src={`/videos/${selectedFilm.slug}.mp4`}
              poster={`/videos/${selectedFilm.slug}.webp`}
              aria-label={selectedFilm.title}
            />
          )}
        </div>
      </dialog>
    </section>
  );
}

export default function Portfolio() {
  useScrollReveal();

  const heroSlides = [
    {
      img: '/img/noiva/portfolio-hero-01.webp',
      eyebrow: 'Clássico & Intemporal',
      title: 'A elegância de',
      emphasis: 'um dia único'
    },
    {
      img: '/img/noiva/portfolio-hero-02.webp',
      eyebrow: 'Natural & Luminoso',
      title: 'Beleza que conta',
      emphasis: 'a tua história'
    },
    {
      img: '/img/noiva/portfolio-hero-03.webp',
      eyebrow: 'Glamour Atemporal',
      title: 'O teu dia mais',
      emphasis: 'luminoso'
    },
    {
      img: '/img/noiva/portfolio-hero-04.webp',
      eyebrow: 'Casamentos no estrangeiro',
      title: 'Amor sem',
      emphasis: 'fronteiras'
    }
  ];

  const [activeHero, setActiveHero] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroTouchX = useRef(0);
  const HERO_DURATION = 6000;

  useEffect(() => {
    if (isHeroPaused) return;
    const interval = 50;
    const step = (interval / HERO_DURATION) * 100;
    const timer = setInterval(() => {
      setHeroProgress((prev) => {
        if (prev + step >= 100) {
          setActiveHero((cur) => (cur + 1) % heroSlides.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [isHeroPaused, heroSlides.length]);

  const goToHero = (index) => {
    setActiveHero((index + heroSlides.length) % heroSlides.length);
    setHeroProgress(0);
  };

  const portfolioItems = [
    {
      id: 1,
      cat: 'makeup',
      style: 'Maquilhagem nupcial',

      src: '/img/noiva/portfolio-01.webp',
      width: 522,
      height: 850,
      largeSrc: '/img/noiva/portfolio-01-ampliada.webp'
    },
    {
      id: 2,
      cat: 'equipe',
      style: 'Retrato de casal',

      src: '/img/noiva/portfolio-02.webp',
      width: 567,
      height: 850,
      largeSrc: '/img/noiva/portfolio-02-ampliada.webp'
    },
    {
      id: 3,
      cat: 'hair',
      style: 'Apanhado nupcial',

      src: '/img/noiva/portfolio-03.webp',
      width: 638,
      height: 850,
      largeSrc: '/img/noiva/portfolio-03-ampliada.webp'
    },
    {
      id: 4,
      cat: 'makeup',
      style: 'Maquilhagem de noiva',

      src: '/img/noiva/portfolio-04.webp',
      width: 567,
      height: 850,
      largeSrc: '/img/noiva/portfolio-04-ampliada.webp'
    },
    {
      id: 5,
      cat: 'equipe',
      style: 'Cerimónia',

      src: '/img/noiva/portfolio-05.webp',
      width: 1100,
      height: 733,
      largeSrc: '/img/noiva/portfolio-05-ampliada.webp'
    },
    {
      id: 6,
      cat: 'equipe',
      style: 'Cortejo nupcial',

      src: '/img/noiva/portfolio-06.webp',
      width: 850,
      height: 567,
      largeSrc: '/img/noiva/portfolio-06-ampliada.webp'
    },
    {
      id: 7,
      cat: 'hair',
      style: 'Coque baixo',

      src: '/img/noiva/portfolio-07.webp',
      width: 591,
      height: 850,
      largeSrc: '/img/noiva/portfolio-07-ampliada.webp'
    },
    {
      id: 8,
      cat: 'makeup',
      style: 'Maquilhagem natural',

      src: '/img/noiva/portfolio-08.webp',
      width: 691,
      height: 850,
      largeSrc: '/img/noiva/portfolio-08-ampliada.webp'
    },
    {
      id: 9,
      cat: 'equipe',
      style: 'Retrato de casal',

      src: '/img/noiva/portfolio-09.webp',
      width: 483,
      height: 850,
      largeSrc: '/img/noiva/portfolio-09-ampliada.webp'
    },
    {
      id: 10,
      cat: 'makeup',
      style: 'Maquilhagem editorial',

      src: '/img/noiva/portfolio-10.webp',
      width: 569,
      height: 850,
      largeSrc: '/img/noiva/portfolio-10-ampliada.webp'
    },
    {
      id: 11,
      cat: 'equipe',
      style: 'Preparativos da noiva',

      src: '/img/noiva/portfolio-11.webp',
      width: 1100,
      height: 733,
      largeSrc: '/img/noiva/portfolio-11-ampliada.webp'
    },
    {
      id: 12,
      cat: 'equipe',
      style: 'Preparativos da noiva',

      src: '/img/noiva/portfolio-12.webp',
      width: 567,
      height: 850,
      largeSrc: '/img/noiva/portfolio-12-ampliada.webp'
    },
    {
      id: 13,
      cat: 'hair',
      style: 'Ondas românticas',

      src: '/img/noiva/portfolio-13.webp',
      width: 606,
      height: 850,
      largeSrc: '/img/noiva/portfolio-13-ampliada.webp'
    },
    {
      id: 14,
      cat: 'equipe',
      style: 'Retrato de noiva',

      src: '/img/noiva/portfolio-14.webp',
      width: 481,
      height: 850,
      largeSrc: '/img/noiva/portfolio-14-ampliada.webp'
    },
    {
      id: 15,
      cat: 'makeup',
      style: 'Maquilhagem luminosa',

      src: '/img/noiva/portfolio-15.webp',
      width: 701,
      height: 850,
      largeSrc: '/img/noiva/portfolio-15-ampliada.webp'
    },
    {
      id: 16,
      cat: 'equipe',
      style: 'Saída dos noivos',

      src: '/img/noiva/portfolio-16.webp',
      width: 437,
      height: 850,
      largeSrc: '/img/noiva/portfolio-16-ampliada.webp'
    },
    {
      id: 17,
      cat: 'equipe',
      style: 'Retrato de casal',

      src: '/img/noiva/portfolio-17.webp',
      width: 1100,
      height: 733,
      largeSrc: '/img/noiva/portfolio-17-ampliada.webp'
    },
    {
      id: 18,
      cat: 'equipe',
      style: 'Bastidores',

      src: '/img/noiva/portfolio-18.webp',
      width: 850,
      height: 567,
      largeSrc: '/img/noiva/portfolio-18-ampliada.webp'
    },
    ...gallery
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(photoBatchSize);

  const filteredItems = portfolioItems.filter((item) =>
    activeFilter === 'all' ? true : item.cat === activeFilter
  );
  const visibleBatches = Array.from(
    { length: Math.ceil(Math.min(visibleCount, filteredItems.length) / photoBatchSize) },
    (_, batch) => batch * photoBatchSize
  );

  const filterLabels = {
    all: 'fotografias',
    makeup: 'maquilhagem',
    hair: 'penteado',
    equipe: 'de casamentos e equipa'
  };

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="visually-hidden">Portfólio</h1>
      <section
        className="portfolio-carousel"
        id="portfolioCarousel"
        aria-label="Destaques do Portfólio"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        onTouchStart={(e) => {
          heroTouchX.current = e.touches[0].clientX;
          setIsHeroPaused(true);
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - heroTouchX.current;
          if (Math.abs(dx) > 50) {
            dx < 0 ? goToHero(activeHero + 1) : goToHero(activeHero - 1);
          }
          setIsHeroPaused(false);
        }}
      >
        <div className="pc-slides" id="pcSlides">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`pc-slide ${idx === activeHero ? 'active' : ''}`} data-index={idx}>
              <div className="pc-slide-bg">
                <img src={slide.img} alt={slide.eyebrow} loading="lazy" decoding="async" />
              </div>
              <div className="pc-slide-overlay"></div>
              <div className="pc-slide-content">
                <span className="pc-eyebrow">{slide.eyebrow}</span>
                <h2 className="pc-title">{slide.title} <em>{slide.emphasis}</em></h2>
                <div className="pc-divider"></div>
              </div>
            </div>
          ))}
        </div>

        <button className="pc-arrow pc-prev" id="pcPrev" aria-label="Slide anterior" onClick={() => goToHero(activeHero - 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="pc-arrow pc-next" id="pcNext" aria-label="Próximo slide" onClick={() => goToHero(activeHero + 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="pc-bottom-bar">
          <div className="pc-dots" id="pcDots" role="tablist">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                className={`pc-dot ${idx === activeHero ? 'active' : ''}`}
                role="tab"
                aria-selected={idx === activeHero}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => goToHero(idx)}
              />
            ))}
          </div>
        </div>

        <div className="pc-progress-wrap">
          <div className="pc-progress" style={{ width: `${heroProgress}%` }}></div>
        </div>

        <div className="pc-counter">
          <span>{pad(activeHero + 1)}</span>
          <span className="pc-counter-sep"></span>
          <span className="pc-counter-total">{pad(heroSlides.length)}</span>
        </div>

        <div className="pc-scroll-cue">
          <span>Explorar</span>
          <div className="pc-scroll-line"></div>
        </div>
      </section>

      <div className="portfolio-divider">
        <div className="pd-inner pd-inner--quote-only">
          <div className="pd-item pd-item--quote">
            <p>"Cada look é uma história única,<br />criada para durar para sempre."</p>
            <span>— Christine Fernandes</span>
          </div>
        </div>
      </div>

      <div className="portfolio-filter-bar">
        <div className="filter-btns" id="filterBtns">
          {['all', 'makeup', 'hair', 'equipe'].map((filterKey) => (
            <button
              key={filterKey}
              className={`filter-btn ${activeFilter === filterKey ? 'active' : ''}`}
              aria-pressed={activeFilter === filterKey}
              onClick={() => {
                setActiveFilter(filterKey);
                setVisibleCount(photoBatchSize);
              }}
            >
              {filterKey === 'all'
                ? 'Todos'
                : filterKey === 'makeup'
                ? 'Maquilhagem'
                : filterKey === 'hair'
                ? 'Penteado'
                : 'Casamentos e equipa'}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid-header">
        <div className="portfolio-grid-header-inner">
          <span className="grid-counter-wrap">
            <span id="gridCounter">{filteredItems.length} {filterLabels[activeFilter]}</span>
          </span>
          <div className="grid-header-line"></div>
          <span className="grid-header-label">Portfólio</span>
        </div>
      </div>

      <section className="portfolio-grid-section">
        <div id="portfolioGrid">
          {visibleBatches.map((start) => (
            <div className="portfolio-grid" key={start}>
              {filteredItems.slice(start, start + photoBatchSize).map((item, offset) => (
                <button
                  type="button"
                  key={item.id}
                  className="portfolio-item"
                  aria-label={`Ampliar fotografia ${start + offset + 1}: ${item.style}`}
                  onClick={() => openLightbox(start + offset)}
                >
                  <img
                    src={item.src}
                    alt=""
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="portfolio-overlay" aria-hidden="true">
                    <span className="p-style">{item.style}</span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
        {visibleCount < filteredItems.length && (
          <div className="portfolio-more">
            <button type="button" className="btn btn-outline-gold" onClick={() => setVisibleCount((count) => count + photoBatchSize)}>
              Ver mais fotografias
            </button>
          </div>
        )}
      </section>

      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="lightbox open" id="lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
          <div className="lightbox-backdrop" onClick={closeLightbox}></div>
          <div className="lightbox-inner">
            <div className="lightbox-img-wrap">
              <img
                src={filteredItems[lightboxIndex].largeSrc || filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].style}
                id="lightboxImg"
              />
            </div>
            <div className="lightbox-caption">
              <span className="p-style">{filteredItems[lightboxIndex].style}</span>

            </div>
          </div>
          <button className="lightbox-close" aria-label="Fechar" onClick={closeLightbox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button className="lightbox-prev" aria-label="Anterior" onClick={prevLightbox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="lightbox-next" aria-label="Próximo" onClick={nextLightbox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="lightbox-counter">
            {pad(lightboxIndex + 1)} / {pad(filteredItems.length)}
          </div>
        </div>
      )}

      <PortfolioFilms />

      <section className="page-end-contact section-pad-sm" aria-labelledby="page-end-contact-title">
        <div className="container page-end-contact-inner">
          <div>
            <h2 id="page-end-contact-title">Viste um penteado ou uma maquilhagem de que gostaste?</h2>
            <p>Se tiveres uma fotografia de referência, podemos falar sobre ela na prova.</p>
          </div>
          <Link to="/contacto" className="btn btn-outline-dark">Consultar disponibilidade</Link>
        </div>
      </section>
    </main>
  );
}
