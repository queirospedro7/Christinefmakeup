import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const weddingAwards = [
  { year: 2026, image: 'premio4.webp' },
  { year: 2025, image: 'premio3.webp' },
  { year: 2024, image: 'premio2.webp' },
  { year: 2023, image: 'premio1.webp' },
];

export default function Sobre() {
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
            heroBgRef.current.style.transform = `translate3d(0, ${(y * 0.32).toFixed(1)}px, 0)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const studioSlides = [
    { src: '/img/espaco/espaco.webp', label: 'Estúdio Principal' },
    { src: '/img/espaco/espaco1.webp', label: 'Área de Maquilhagem' },
    { src: '/img/espaco/espaco2.webp', label: 'Sala de Espera' },
    { src: '/img/espaco/espaco3.webp', label: 'Zona de Penteados' },
    { src: '/img/espaco/espaco4.webp', label: 'Produtos & Ferramentas' },
    { src: '/img/espaco/espaco5.webp', label: 'Recepção' }
  ];

  const [studioCurrent, setStudioCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudioCurrent((prev) => (prev + 1) % studioSlides.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [studioSlides.length]);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero page-hero--compact">
        <div className="page-hero-bg" ref={heroBgRef}>
          <img
            src="/img/noiva/sobre.webp"
            alt="Preparativos de beleza nupcial"
            fetchPriority="high"
          />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <p className="eyebrow">Sobre Mim</p>
          <h1>Sobre <em>mim</em></h1>
        </div>
      </section>

      <section className="team-section section-pad" id="equipa">
        <div className="container">
          <p className="eyebrow center">Quem Sou</p>
          <h2 className="center">Conhece a <em>artista</em></h2>
          <p className="section-sub center">
            Maquilhadora e especialista em penteados de noiva há mais de dez anos.
          </p>

          <div className="team-lead reveal-up">
            <div className="team-lead-img">
              <img src="/img/equipa/img2.webp" alt="Christine Fernandes" loading="lazy" decoding="async" />
            </div>
            <div className="team-lead-text">
              <p className="eyebrow">Makeup Artist &amp; Hairstylist</p>
              <h3>Christine <em>Fernandes</em></h3>
              <p className="lead-text">
                Há mais de dez anos que trabalho com noivas.
              </p>
              <p>
                Gosto de perceber como te maquilhas no dia a dia e o que queres experimentar para o casamento.
              </p>
              <p>
                Na prova, acertamos a maquilhagem e o penteado e combinamos os horários da preparação.
              </p>
              <div className="team-lead-skills">
                <span>Maquilhagem de noiva</span>
                <span>Hairstyle</span>
                <span>Preparação da pele</span>
                <span>Casamentos no estrangeiro</span>
                <span>10+ Anos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="container">
          <p className="eyebrow center">Os Meus Valores</p>
          <h2 className="center">O que me <em>define</em></h2>
          <div className="values-grid reveal-stagger">
            <div className="value-card reveal-up">
              <div className="value-icon">◎</div>
              <h3>Personalização Total</h3>
              <p>
                Nenhum look é igual. Cada noiva tem uma consulta dedicada onde definimos juntas o estilo, a intensidade e os detalhes do look ideal para si.
              </p>
            </div>
            <div className="value-card reveal-up">
              <div className="value-icon">✦</div>
              <h3>Produtos Premium</h3>
              <p>
                Escolho os produtos consoante o teu tipo de pele e o acabamento que preferes.
              </p>
            </div>
            <div className="value-card reveal-up">
              <div className="value-icon">◇</div>
              <h3>Presença Calma</h3>
              <p>
                O dia do casamento é intenso. Crio um ambiente confortável e de confiança para que te sintas completamente à vontade durante toda a preparação.
              </p>
            </div>
            <div className="value-card reveal-up">
              <div className="value-icon">✧</div>
              <h3>Harmonia Total</h3>
              <p>
                O vestido, o véu e os acessórios ajudam-nos a escolher o penteado e a maquilhagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section section-pad-sm" id="lequipe">
        <div className="container">
          <div className="team-equipe-header reveal-up">
            <div className="team-equipe-header-line"></div>
            <div className="team-equipe-header-center">
              <p className="eyebrow">A nossa equipa</p>
              <h2>Conhece a <em>L’Équipe</em></h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>
                A equipa que me ajuda a preparar noivas, madrinhas e convidadas.
              </p>
            </div>
            <div className="team-equipe-header-line"></div>
          </div>

          <div className="brand-story-inline reveal-up">
            <div className="bsi-img-wrap">
              <img src="/img/equipa/team.webp" alt="Equipa christinefmakeup" loading="lazy" decoding="async" />
              <div className="brand-img-caption">
                <strong>christinefmakeup Bridal Beauty</strong>
                <span>A nossa equipa</span>
              </div>
            </div>
            <div className="bsi-text">
              <p className="eyebrow">Sobre Nós</p>
              <h2>Somos a <em>christinefmakeup</em></h2>
              <p className="lead-text">
                Nascemos da paixão pela beleza nupcial e crescemos até nos tornarmos uma das referências em maquilhagem e cabelo para noivas em Portugal.
              </p>
              <p>
                Um atelier especializado em beleza nupcial, com profissionais apaixonadas, formação internacional e anos de experiência — prontas para tornar o teu dia ainda mais especial.
              </p>
            </div>
          </div>

          <div className="team-divider reveal-up">
            <div className="team-divider-line"></div>
            <div className="team-divider-body">
              <div className="team-divider-corner-bl"></div>
              <div className="team-divider-corner-br"></div>
              <div className="team-divider-dots">
                <span></span><span></span><span></span>
              </div>
              <p className="team-divider-text">
                Cada noiva merece uma equipa<br /><em>tão especial quanto o seu dia</em>
              </p>
              <div className="team-divider-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="team-divider-line"></div>
          </div>

          <div className="team-colabs-header reveal-up">
            <p className="eyebrow center">As nossas artistas</p>
            <h3 className="center">A equipa que me <em>acompanha</em></h3>
          </div>

          <div className="team-grid reveal-stagger mt-60">
            <div className="team-card reveal-up">
              <div className="team-card-img">
                <img src="/img/equipa/img3.webp" alt="Juliana" loading="lazy" decoding="async" />
              </div>
              <div className="team-card-info">
                <h4>Juliana</h4>
                <span className="team-role">Senior Makeup Artist</span>
                <p>5 anos de experiência em noivas. Especialista em looks naturais e românticos. Formada pela Make Up For Ever Academy em Paris.</p>
                <div className="team-skills">
                  <span>Natural Bridal</span><span>Penteados</span><span>Madrinhas</span>
                </div>
              </div>
            </div>

            <div className="team-card reveal-up">
              <div className="team-card-img">
                <img src="/img/equipa/img4.webp" alt="Francisca" loading="lazy" decoding="async" />
              </div>
              <div className="team-card-info">
                <h4>Francisca</h4>
                <span className="team-role">Makeup Artist &amp; Hair Stylist</span>
                <p>Especialista em penteados e maquilhagem. Formada em Madrid, com experiência em casamentos de destino em Espanha e França.</p>
                <div className="team-skills">
                  <span>Penteados</span><span>Glamour</span><span>Destination</span>
                </div>
              </div>
            </div>

            <div className="team-card reveal-up">
              <div className="team-card-img">
                <img src="/img/equipa/img5.webp" alt="Natália" loading="lazy" decoding="async" />
              </div>
              <div className="team-card-info">
                <h4>Natália</h4>
                <span className="team-role">Junior Makeup Artist</span>
                <p>Recém-formada pela ESAP Porto, Natália traz frescura e criatividade à equipa. Especialista em looks modernos e editoriais.</p>
                <div className="team-skills">
                  <span>Editorial</span><span>Moderno</span><span>Madrinhas</span>
                </div>
              </div>
            </div>

            <div className="team-card reveal-up">
              <div className="team-card-img">
                <img src="/img/equipa/img6.webp" alt="Daniela" loading="lazy" decoding="async" />
              </div>
              <div className="team-card-info">
                <h4>Daniela</h4>
                <span className="team-role">Makeup Artist &amp; Skincare Specialist</span>
                <p>Especialista em preparação de pele e maquilhagem de longa duração. Formada em Barcelona, com foco em técnicas de skincare pré-nupcial.</p>
                <div className="team-skills">
                  <span>Skincare</span><span>Longa Duração</span><span>Noivas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="awards-section section-pad" id="premios" aria-labelledby="awards-title">
        <div className="container">
          <header className="awards-intro reveal-up">
            <p className="eyebrow">Reconhecimento</p>
            <h2 id="awards-title">Os meus <em>prémios</em></h2>
            <p className="section-sub">Quatro anos consecutivos de Wedding Awards pela casamentos.pt.</p>
          </header>

          <ul className="awards-gallery reveal-stagger" role="list">
            {weddingAwards.map(({ year, image }) => (
              <li className="award-entry reveal-up" key={year}>
                <img src={`/img/premios/${image}`} alt="Wedding Awards" loading="lazy" decoding="async" />
                <span className="award-entry-caption">{year}</span>
              </li>
            ))}
            <li className="award-entry reveal-up">
              <img src="/img/premios/premio5.webp" alt="" loading="lazy" decoding="async" />
              <span className="award-entry-caption">Recomendadas</span>
            </li>
          </ul>

          <dl className="awards-stats reveal-up">
            <div>
              <dt>Wedding Awards</dt>
              <dd>4</dd>
            </div>
            <div>
              <dt>Opiniões de 5 estrelas</dt>
              <dd>50+</dd>
            </div>
            <div>
              <dt>Noivas acompanhadas</dt>
              <dd>500+</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="studio-section section-pad" id="espaco">
        <div className="container">
          <p className="eyebrow center">O Meu Espaço</p>
          <h2 className="center">O meu <em>atelier</em></h2>
          <div className="studio-intro">
            <p className="section-sub">
              Um espaço pensado para te fazer sentir em casa — luminoso, elegante e completamente dedicado à tua preparação.
            </p>
          </div>

          <div className="studio-carousel" id="studioCarousel">
            {studioSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`studio-carousel-slide ${idx === studioCurrent ? 'active' : ''}`}
              >
                <img src={slide.src} alt={slide.label} loading="lazy" decoding="async" />
                <span className="studio-carousel-label">{slide.label}</span>
              </div>
            ))}
            <div className="studio-carousel-dots" id="studioCarouselDots">
              {studioSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`studio-carousel-dot ${idx === studioCurrent ? 'active' : ''}`}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setStudioCurrent(idx)}
                />
              ))}
            </div>
          </div>

          <div className="studio-map-section reveal-up">
            <div className="studio-map-header">
              <div className="studio-map-header-line"></div>
              <div className="studio-map-header-center">
                <p className="eyebrow">Onde me encontrar</p>
                <h3>O meu <em>atelier</em></h3>
              </div>
              <div className="studio-map-header-line"></div>
            </div>

            <div className="studio-map-layout">
              <div className="studio-map-embed" id="studioMap">
                <div className="studio-map-mosaic">
                  <img src="/img/mapa/1.1.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/2.1.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/3.1.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/4.1.webp" alt="" loading="lazy" decoding="async" />

                  <img src="/img/mapa/1.2.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/2.2.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/3.2.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/4.2.webp" alt="" loading="lazy" decoding="async" />

                  <img src="/img/mapa/1.3.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/2.3.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/3.3.webp" alt="" loading="lazy" decoding="async" />
                  <img src="/img/mapa/4.3.webp" alt="" loading="lazy" decoding="async" />

                  <div className="map-pin-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 26 38">
                      <defs>
                        <filter id="pd" x="-40%" y="-20%" width="180%" height="160%">
                          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="rgba(0,0,0,0.35)" />
                        </filter>
                      </defs>
                      <g filter="url(#pd)">
                        <path d="M13,1 C6.4,1 1,6.4 1,13 C1,22.5 13,37 13,37 C13,37 25,22.5 25,13 C25,6.4 19.6,1 13,1 Z" fill="#a07840" />
                        <circle cx="13" cy="13" r="5.5" fill="white" />
                      </g>
                    </svg>
                    <div className="map-pin-shadow"></div>
                  </div>
                </div>
              </div>

              <div className="studio-map-card-v2">
                <div className="smc-deco"></div>
                <p className="eyebrow">Atelier</p>
                <h4 className="smc-name">Christine Fernandes<br /><em>Bridal Beauty</em></h4>
                <div className="smc-divider"></div>

                <div className="smc-row">
                  <div className="smc-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="smc-label">Morada</span>
                    <span className="smc-value">Morada confirmada por marcação</span>
                  </div>
                </div>

                <div className="smc-row">
                  <div className="smc-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="smc-label">Atendimento</span>
                    <span className="smc-value">Atendimento por marcação</span>
                  </div>
                </div>

                <div className="smc-row">
                  <div className="smc-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="smc-label">Telefone / WhatsApp</span>
                    <span className="smc-value">+351 968 427 599</span>
                  </div>
                </div>

                <div className="smc-directions">
                  <p className="smc-directions-label">Como chegar</p>
                  <div className="smc-btns">
                    <a href="https://maps.app.goo.gl/vBgkXL3xPQj8Pdyk7" target="_blank" rel="noopener noreferrer" className="btn btn-dark">Google Maps</a>
                    <a href="https://maps.apple.com/?ll=41.7072754,-8.8093529&q=Christine+Makeup+Artist+Hairstylist+Beauty+Atelier" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">Apple Maps</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section section-pad" id="testemunhos">
        <div className="container">
          <p className="eyebrow center">Testemunhos</p>
          <h2 className="center">O que dizem do <em>meu trabalho</em></h2>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"A Christine, para além de ser uma pessoa incrível, é uma profissional exímia. Tanto na prova como no dia conseguiu criar um ambiente confortável e de confiança em que me senti completamente à vontade. Quanto ao trabalho realizado foi exatamente o que queria, manteve todo o dia como se tivesse acabado de sair da cadeira, sem necessidade de qualquer retoque. Não podia ter pedido melhor pessoa para me acompanhar no meu dia."</p>
              <div className="t-author">

                <div><strong>Mégane</strong><span>Não podia pedir melhor</span></div>
              </div>
            </div>

            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"A Christine fez a maquilhagem e o penteado para mim e para as minhas madrinhas. Ficámos todas absolutamente deslumbrantes. A sua calma e profissionalismo tornaram a preparação num momento mágico e sem stress."</p>
              <div className="t-author">

                <div><strong>Mariana</strong><span>Penteado &amp; Maquilhagem · Porto</span></div>
              </div>
            </div>

            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"Desde o ensaio até ao dia do casamento, senti-me nas melhores mãos. A Christine percebeu exatamente o que eu queria — um look natural mas luminoso — e o resultado foi perfeito durante todas as horas de festa."</p>
              <div className="t-author">

                <div><strong>Sofia</strong><span>Maquilhagem de Noiva · Lisboa</span></div>
              </div>
            </div>

            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"Casei em Paris e a Christine veio connosco. Foi uma experiência incrível — profissional, pontual e com um resultado absolutamente deslumbrante. Garanto um serviço exclusivo e personalizado como ela promete."</p>
              <div className="t-author">

                <div><strong>Catarina</strong><span>Destination Wedding · Paris</span></div>
              </div>
            </div>

            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"Recomendo a 100%. A Christine tem um talento enorme para perceber o estilo de cada pessoa e realçar o melhor de cada uma. O meu look foi exatamente o que eu sonhei — sem nunca me sentir diferente de mim mesma."</p>
              <div className="t-author">

                <div><strong>Rita</strong><span>Maquilhagem de Noiva · Algarve</span></div>
              </div>
            </div>

            <div className="testimonial-card reveal-up">
              <div className="stars">★★★★★</div>
              <p>"A melhor decisão que tomei para o meu casamento foi contratar a Christine. Criou um ambiente de confiança desde o primeiro momento e o resultado foi uma versão mais bonita e empoderada de mim mesma."</p>
              <div className="t-author">

                <div><strong>Joana</strong><span>Maquilhagem de Noiva · Cascais</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-end-contact section-pad-sm" aria-labelledby="page-end-contact-title">
        <div className="container page-end-contact-inner">
          <div>
            <h2 id="page-end-contact-title">Do atelier ao dia do casamento</h2>
            <p>Na prova, experimentamos o que tens em mente e acertamos os detalhes antes do dia.</p>
          </div>
          <Link to="/contacto" className="btn btn-outline-dark">Entrar em contacto</Link>
        </div>
      </section>
    </main>
  );
}
