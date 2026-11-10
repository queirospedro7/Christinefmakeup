import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  const heroBgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (heroBgRef.current && y < window.innerHeight * 1.5) {
            heroBgRef.current.style.transform = `translate3d(0, ${(y * 0.35).toFixed(1)}px, 0)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const testimonials = [
    {
      ornament: '✦',
      text: '"A Christine, para além de ser uma pessoa incrível, é uma profissional exímia. Tanto na prova como no dia conseguiu criar um ambiente confortável e de confiança em que me senti completamente à vontade. Quanto ao trabalho realizado foi exatamente o que queria, manteve todo o dia como se tivesse acabado de sair da cadeira, sem necessidade de qualquer retoque. Não podia ter pedido melhor pessoa para me acompanhar no meu dia."',
      name: 'Mégane',
      service: 'Maquilhagem de Noiva',
      location: 'Não podia pedir melhor'
    },
    {
      ornament: '◈',
      text: '"A Christine fez a maquilhagem e o penteado para mim e para as minhas madrinhas. Ficámos todas absolutamente deslumbrantes. A sua calma e profissionalismo tornaram a preparação num momento mágico e sem stress."',
      name: 'Mariana',
      service: 'Penteado & Maquilhagem',
      location: 'Casamento no Porto'
    },
    {
      ornament: '◇',
      text: '"Desde o ensaio até ao dia do casamento, senti-me nas melhores mãos. A Christine percebeu exatamente o que eu queria — um look natural mas luminoso — e o resultado foi perfeito durante todas as horas de festa."',
      name: 'Sofia',
      service: 'Maquilhagem de Noiva',
      location: 'Casamento em Lisboa'
    },
    {
      ornament: '✧',
      text: '"Casei em Paris e a Christine veio connosco. Foi uma experiência incrível — profissional, pontual e com um resultado absolutamente deslumbrante. Garanto um serviço exclusivo e personalizado como ela promete."',
      name: 'Catarina',
      service: 'Destination Wedding',
      location: 'Paris'
    },
    {
      ornament: '◎',
      text: '"Recomendo a 100%. A Christine tem um talento enorme para perceber o estilo de cada pessoa e realçar o melhor de cada uma. O meu look foi exatamente o que eu sonhei — sem nunca me sentir diferente de mim mesma."',
      name: 'Rita',
      service: 'Maquilhagem de Noiva',
      location: 'Casamento no Algarve'
    },
    {
      ornament: '✦',
      text: '"A melhor decisão que tomei para o meu casamento foi contratar a Christine. Criou um ambiente de confiança desde o primeiro momento e o resultado foi uma versão mais bonita e empoderada de mim mesma."',
      name: 'Joana',
      service: 'Maquilhagem de Noiva',
      location: 'Casamento em Cascais'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const SLIDE_DURATION = 5500;

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          setCurrentSlide((cur) => (cur + 1) % testimonials.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const goToSlide = (idx) => {
    setCurrentSlide((idx + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef}>
          <img
            src="/img/noiva/portfolio-hero-03.webp"
            srcSet="/img/noiva/galeria-047.webp 1280w, /img/noiva/portfolio-hero-03.webp 1920w"
            sizes="100vw"
            alt="Os noivos junto à entrada iluminada de uma casa cor-de-rosa"
            fetchPriority="high"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-grain"></div>
        <div className="hero-content">
          <p className="eyebrow">Maquilhagem e penteado de noiva</p>
          <h1>Maquilho histórias <em>de amor</em></h1>
          <p className="hero-lead">
            Faço maquilhagem e penteados de noiva há mais de dez anos, em Portugal e no estrangeiro.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-outline-white">Ver Portfólio</Link>
            <Link to="/contacto" className="btn hero-budget-link">
              Pedir Orçamento
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line"></div>
          <span>Descer</span>
        </div>
      </section>

      <section className="about-teaser section-pad">
        <div className="container grid-2">
          <div className="about-img-block reveal-left">
            <div className="img-frame">
              <img
                src="/img/equipa/img1.webp"
                alt="Christine Fernandes maquilhadora profissional de noivas"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="about-text reveal-right">
            <p className="eyebrow">Sobre Mim</p>
            <h2>Sou a <em>Christine Fernandes</em></h2>
            <p className="lead-text">
              Sou maquilhadora e especialista em penteados de noiva.
            </p>
            <p>
              Na prova, experimentamos a maquilhagem e o penteado e acertamos os detalhes antes do casamento.
            </p>
            <Link to="/sobre" className="btn btn-dark mt-32">Saber Mais</Link>
          </div>
        </div>
      </section>

      <section className="parallax-band" aria-label="Casamentos no estrangeiro">
        <div className="parallax-band-bg">
          <img
            src="/img/noiva/inicio-editorial.webp"
            alt="Retrato de casal num editorial nupcial"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="parallax-band-overlay"></div>
        <div className="parallax-band-content reveal-up">
          <h2>Casamentos <em>no estrangeiro</em></h2>
          <p className="parallax-band-lead">
            Faço a preparação da noiva em Portugal e no estrangeiro.
          </p>
          <Link to="/portfolio" className="btn btn-outline-white">
            Descobrir o Portfólio
          </Link>
        </div>
      </section>

      <section className="gallery-teaser">
        <div className="container reveal-up">
          <p className="eyebrow center">Portfólio</p>
          <h2 className="center">As minhas <em>noivas</em></h2>
          <p className="section-sub center">Uma seleção de maquilhagens e penteados de noiva.</p>
        </div>
        <div className="masonry-grid reveal-stagger">
          <div className="masonry-item reveal-up">
            <img src="/img/noiva/galeria-063.webp" alt="Noiva a colocar um brinco junto à janela" loading="lazy" decoding="async" />
          </div>
          <div className="masonry-item tall reveal-up">
            <img src="/img/noiva/galeria-052.webp" alt="Retrato de noiva com vestido de renda num jardim" loading="lazy" decoding="async" />
          </div>
          <div className="masonry-item reveal-up">
            <img src="/img/noiva/galeria-019.webp" alt="Noiva junto a uma porta em contraluz, a preto e branco" loading="lazy" decoding="async" />
          </div>
          <div className="masonry-item reveal-up">
            <img src="/img/noiva/galeria-114.webp" alt="Noiva de cabelo ondulado junto a um arranjo de flores brancas" loading="lazy" decoding="async" />
          </div>
          <div className="masonry-item tall reveal-up">
            <img src="/img/noiva/galeria-082.webp" alt="Noiva sentada junto a uma janela com o vestido espalhado pelo chão" loading="lazy" decoding="async" />
          </div>
          <div className="masonry-item reveal-up">
            <img src="/img/noiva/galeria-034.webp" alt="Noiva vista de costas a erguer os braços num jardim" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="center mt-60" style={{ paddingBottom: '80px' }}>
          <Link to="/portfolio" className="btn btn-outline-dark">Ver Portfólio Completo</Link>
        </div>
      </section>

      <section className="awards-teaser">
        <div className="container reveal-up">
          <p className="eyebrow center">Reconhecimento</p>
          <h2 className="center">Os meus <em>prémios</em></h2>
          <p className="section-sub center">Distinguida pelo casamentos.pt com Wedding Awards consecutivos e mais de 50 opiniões de 5 estrelas.</p>
        </div>
        <div className="awards-badges-home reveal-stagger">
          <div className="award-badge-home reveal-up">
            <img src="/img/premios/premio4.webp" alt="Wedding Awards 2026 casamentos.pt - Christine Fernandes Beauty" loading="lazy" decoding="async" />
          </div>
          <div className="award-badge-home reveal-up">
            <img src="/img/premios/premio3.webp" alt="Wedding Awards 2025 casamentos.pt - Christine Fernandes Beauty" loading="lazy" decoding="async" />
          </div>
          <div className="award-badge-home reveal-up">
            <img src="/img/premios/premio2.webp" alt="Wedding Awards 2024 casamentos.pt - Christine Fernandes Beauty" loading="lazy" decoding="async" />
          </div>
          <div className="award-badge-home reveal-up">
            <img src="/img/premios/premio1.webp" alt="Wedding Awards 2023 casamentos.pt - Christine Fernandes Beauty" loading="lazy" decoding="async" />
          </div>
          <div className="award-badge-home reveal-up">
            <img src="/img/premios/premio5.webp" alt="Recomendadas Casamentos.pt - Avaliação de topo de noivas" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="services-teaser section-pad">
        <div className="container">
          <div className="reveal-up">
            <p className="eyebrow center">Serviços</p>
            <h2 className="center">O que <em>ofereço</em></h2>
          </div>
          <div className="services-row reveal-stagger">
            <div className="service-tile reveal-up">
              <div className="tile-icon">✦</div>
              <h3>Maquilhagem de Noiva</h3>
              <p>Inclui uma prova para escolhermos a maquilhagem e acertarmos os detalhes.</p>
              <Link to="/servicos#maquilhagem-noiva" className="tile-link">Saber mais →</Link>
            </div>
            <div className="service-tile featured reveal-up">
              <div className="tile-icon">◈</div>
              <h3>Pacote Noiva + Madrinhas</h3>
              <p>Maquilhagem para a noiva e as madrinhas, com horários combinados antes do casamento.</p>
              <Link to="/servicos#pacote-madrinhas" className="tile-link">Saber mais →</Link>
            </div>
            <div className="service-tile reveal-up">
              <div className="tile-icon">◇</div>
              <h3>Penteado &amp; Maquilhagem</h3>
              <p>Maquilhagem e penteado no mesmo serviço, desde a prova até ao dia do casamento.</p>
              <Link to="/servicos#penteado" className="tile-link">Saber mais →</Link>
            </div>
            <div className="service-tile reveal-up">
              <div className="tile-icon">✧</div>
              <h3>Casamentos no estrangeiro</h3>
              <p>Desloco-me ao local onde te vais preparar.</p>
              <Link to="/servicos#destination" className="tile-link">Saber mais →</Link>
            </div>
          </div>
          <div className="center mt-48">
            <Link to="/servicos" className="btn btn-dark">Ver Todos os Serviços</Link>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-header">
          <div className="tc-header-line"></div>
          <div className="tc-header-center">
            <span className="eyebrow">Testemunhos</span>
            <h2>O que dizem do <em>meu trabalho</em></h2>
          </div>
          <div className="tc-header-line"></div>
        </div>

        <div
          className="tc-viewport"
          id="tcViewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            setIsPaused(true);
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 44) {
              dx < 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
            }
            setIsPaused(false);
          }}
        >
          <div
            className="tc-track"
            id="tcTrack"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {testimonials.map((item, idx) => (
              <div key={idx} className={`tc-slide ${idx === currentSlide ? 'active' : ''}`}>
                <div className="tc-slide-inner">
                  <div className="tc-ornament">{item.ornament}</div>
                  <div className="tc-stars">★★★★★</div>
                  <blockquote className="tc-text">{item.text}</blockquote>
                  <div className="tc-divider"><span></span></div>
                  <div className="tc-person">
                    <div className="tc-person-info">
                      <strong>{item.name}</strong>
                      <span className="tc-service">{item.service}</span>
                      <span className="tc-where">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tc-controls">
          <button
            className="tc-btn-prev"
            id="tcPrev"
            aria-label="Testemunho anterior"
            onClick={() => goToSlide(currentSlide - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="tc-progress-wrap">
            <div className="tc-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="tc-count" id="tcCount">
            <span>{currentSlide + 1}</span><em>/</em><span>{testimonials.length}</span>
          </div>

          <button
            className="tc-btn-next"
            id="tcNext"
            aria-label="Testemunho seguinte"
            onClick={() => goToSlide(currentSlide + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="tc-dots" id="tcDots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`tc-dot ${idx === currentSlide ? 'active' : ''}`}
              aria-label={`Testemunho ${idx + 1}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>

        <div className="tc-footer-link">
          <Link to="/sobre#testemunhos">Ver todos os testemunhos <span>→</span></Link>
        </div>
      </section>

      <section className="home-booking section-pad-sm" aria-labelledby="home-booking-title">
        <div className="container home-booking-inner">
          <div>
            <h2 id="home-booking-title">Tens <em>data marcada?</em></h2>
            <p>Envia-me a data e o local do casamento para eu confirmar a disponibilidade e preparar o orçamento.</p>
          </div>
          <div className="home-booking-actions">
            <Link to="/contacto" className="btn btn-dark">Pedir orçamento</Link>
          </div>
        </div>
      </section>

      <section className="instagram-strip">
        <div className="insta-header reveal-up">
          <p>Segue-me no Instagram</p>
          <a href="https://www.instagram.com/christinefmakeup" target="_blank" rel="noopener noreferrer">@christinefmakeup</a>
        </div>
        <div className="insta-grid reveal-stagger">
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-003.webp" alt="Sorriso da noiva por detrás do véu" loading="lazy" decoding="async" /></div>
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-073.webp" alt="Noiva junto à janela com tecido translúcido em contraluz" loading="lazy" decoding="async" /></div>
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-117.webp" alt="Retrato de noiva num salão com flores e molduras douradas" loading="lazy" decoding="async" /></div>
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-095.webp" alt="Noiva de cabelo apanhado num retrato em tons de branco" loading="lazy" decoding="async" /></div>
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-012.webp" alt="Noiva de pé junto à janela, com a cauda do vestido estendida" loading="lazy" decoding="async" /></div>
          <div className="insta-item reveal-scale"><img src="/img/noiva/galeria-110.webp" alt="Pormenor das mãos dos noivos durante a primeira dança" loading="lazy" decoding="async" /></div>
        </div>
      </section>
    </main>
  );
}
