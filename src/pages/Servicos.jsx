import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Servicos() {
  useScrollReveal();

  const [openAdicional, setOpenAdicional] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleAdicional = (idx) => {
    setOpenAdicional(openAdicional === idx ? null : idx);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const adicionais = [
    {
      num: '01',
      title: "L'équipe",
      sub: '— Convidadas',
      desc: 'Madrinhas, mãe da noiva, família — cada uma com um look personalizado e em harmonia com o conjunto.',
      details: (
        <>
          <p>A minha equipa pode preparar também as madrinhas, as mães dos noivos e outras convidadas.</p>
          <ul>
            <li>✓ Consulta de grupo para definir looks</li>
            <li>✓ Harmonização de cores e estilos</li>
            <li>✓ Equipa de 2-3 artistas</li>
            <li>✓ Gestão de tempo profissional</li>
            <li>✓ Produtos premium para todos os tons de pele</li>
          </ul>
        </>
      )
    },
    {
      num: '02',
      title: 'Mudança de',
      sub: 'Look',
      desc: 'Da noiva clássica à festa — uma transição rápida e discreta a meio da cerimónia.',
      details: (
        <>
          <p>Permite-te ter dois looks distintos no mesmo dia — um mais clássico e elegante para a cerimónia, e outro mais ousado e divertido para a festa. A transição é planeada com antecedência para ser rápida e discreta.</p>
          <ul>
            <li>✓ Planeamento prévio dos dois looks</li>
            <li>✓ Transição rápida (15-20 minutos)</li>
            <li>✓ Produtos de longa duração</li>
            <li>✓ Toque final com brilhos ou glitter</li>
          </ul>
          <p className="adicional-price-note">A partir de €80 adicionais.</p>
        </>
      )
    },
    {
      num: '03',
      title: 'Acompanhamento',
      sub: 'Diário',
      desc: 'Presença ao longo de todo o dia para retoques e ajustes — do altar à pista de dança.',
      details: (
        <>
          <p>Garante que o teu look se mantém impecável durante todo o dia, desde a preparação até ao final da festa. Estou disponível para retoques estratégicos e ajustes sempre que necessário.</p>
          <ul>
            <li>✓ Disponibilidade full day (até 12 horas)</li>
            <li>✓ Kit de retoques completo</li>
            <li>✓ Apoio antes da cerimónia, fotos e festa</li>
            <li>✓ Deslocação incluída</li>
          </ul>
          <p className="adicional-price-note">A partir de €200 adicionais.</p>
        </>
      )
    },
    {
      num: '04',
      title: 'Sessão',
      sub: 'Solteiro / Pós-Casamento',
      desc: 'Um look especial para a sessão fotográfica — memórias que ficam para sempre.',
      details: (
        <>
          <p>Uma sessão fotográfica especial antes ou depois do casamento merece um look igualmente especial. Crio uma maquilhagem que fotografa perfeitamente e realça a tua beleza natural.</p>
          <ul>
            <li>✓ Sessão de 2-3 horas</li>
            <li>✓ Maquilhagem adaptada ao local da sessão</li>
            <li>✓ Produtos fotogénicos</li>
            <li>✓ Disponível em estúdio ou deslocação</li>
          </ul>
          <p className="adicional-price-note">A partir de €100.</p>
        </>
      )
    },
    {
      num: '05',
      title: 'Grooming',
      sub: 'para Noivo',
      desc: 'Preparação discreta e natural — pele tratada, aspeto impecável para as fotografias.',
      details: (
        <>
          <p>Um serviço discreto e natural para noivos que desejam estar impecáveis nas fotografias. Inclui preparação de pele, correção de pequenas imperfeições e um acabamento fresco e natural.</p>
          <ul>
            <li>✓ Limpeza e preparação de pele</li>
            <li>✓ Correção discreta de imperfeições</li>
            <li>✓ Acabamento natural (não parece maquilhagem)</li>
            <li>✓ Produtos masculinos específicos</li>
          </ul>
          <p className="adicional-price-note">A partir de €60.</p>
        </>
      )
    }
  ];

  const faqs = [
    {
      q: 'Com quanto tempo de antecedência devo reservar?',
      a: 'Recomendamos reservar com pelo menos 6-12 meses de antecedência, especialmente para datas de primavera e verão. Para garantir disponibilidade, quanto mais cedo melhor.'
    },
    {
      q: 'O ensaio é obrigatório?',
      a: 'Não é obrigatório, mas é altamente recomendado. O ensaio permite testar o look, fazer ajustes e chegar ao dia do casamento com total confiança. Muitas noivas ficam surpreendidas com a diferença que faz.'
    },
    {
      q: 'Fazem deslocação para fora de Lisboa e Porto?',
      a: 'Sim! Trabalho em todo o Portugal e aceito convites para destinos internacionais. A deslocação é calculada com base na distância e incluída no orçamento final.'
    },
    {
      q: 'Que produtos utilizam?',
      a: 'Trabalhamos exclusivamente com marcas premium: Charlotte Tilbury, NARS, MAC, Armani Beauty, Hourglass, entre outras. Todos os produtos são de longa duração e adequados para fotografia e vídeo.'
    },
    {
      q: 'Trabalham com todos os tons de pele?',
      a: 'Sim. A equipa tem experiência com diferentes tons e tipos de pele. Na prova, testamos a cor e o acabamento que melhor se adaptam à tua pele.'
    },
    {
      q: 'Como é feita a reserva?',
      a: 'Após a consulta inicial e confirmação do orçamento, a reserva é feita com o pagamento de um sinal de 30%. O restante é pago no dia do casamento ou até 7 dias antes.'
    },
    {
      q: 'É possível fazer mudança de look a meio do casamento?',
      a: 'Sim! A mudança de look é um serviço adicional muito procurado. Combinamos a segunda maquilhagem ou o segundo penteado e reservamos tempo para a mudança.'
    },
    {
      q: 'Fazem grooming para o noivo?',
      a: 'Sim. O grooming masculino de casamento é muito discreto: preparação de pele, correção pontual, matificação invisível e finalização de cabelo para garantir que o noivo está perfeito nas fotografias.'
    },
    {
      q: 'Podem preparar todas as convidadas?',
      a: "Sim, através do serviço L'équipe. A equipa christinefmakeup pode preparar todas as convidadas especiais com a mesma atenção ao detalhe. O orçamento é calculado com base no número de pessoas e serviços pretendidos."
    },
    {
      q: 'Qual a política de cancelamento?',
      a: 'As condições de cancelamento e reagendamento são indicadas na proposta, antes da confirmação da reserva.'
    },
    {
      q: 'Oferecem formações de maquilhagem?',
      a: (
        <>
          Sim! Temos formações disponíveis para todos os níveis — desde workshops de automaquilhagem até cursos profissionais.{' '}
          <Link to="/formacoes" style={{ color: 'var(--gold)' }}>
            Consulta a página de Formações
          </Link>{' '}
          para saberes mais.
        </>
      )
    }
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/img/noiva/servicos.webp" alt="Noiva a colocar um brinco durante os preparativos" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <p className="eyebrow">O que ofereço</p>
          <h1>Serviços</h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container center" style={{ maxWidth: '700px' }}>
          <p className="eyebrow">A minha abordagem</p>
          <h2>Cada serviço é<br /><em>personalizado para ti</em></h2>
          <p className="section-sub">
            Garanto um serviço de noiva exclusivo e cuidadosamente personalizado para tornar o teu dia ainda mais especial. Os preços são indicativos — o orçamento final é sempre definido após a consulta inicial.
          </p>
        </div>
      </section>

      <section className="services-detail section-pad-sm">
        <div className="container">
          <div id="maquilhagem-noiva" className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">✦</div>
              <div>
                <h3>Maquilhagem de Noiva</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>O meu serviço principal — um look completamente personalizado para o teu dia de casamento. Começo com uma consulta detalhada para perceber o teu estilo, a paleta de cores do casamento e o tipo de look que sonhas.</p>
                <p>Realço através da maquilhagem o melhor de cada noiva, tendo sempre por base a harmonia de todos os elementos do seu casamento. O resultado mantém-se perfeito do altar à pista de dança.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Consulta inicial (presencial ou online)</li>
                  <li>✓ Preparação completa da pele</li>
                  <li>✓ Maquilhagem de longa duração</li>
                  <li>✓ Produtos premium (Charlotte Tilbury, NARS, MAC)</li>
                  <li>✓ Retoques durante a preparação</li>
                  <li>✓ Kit de retoques para a noiva</li>
                  <li>✓ Deslocação incluída (Lisboa/Porto)</li>
                </ul>
              </div>
            </div>
            <Link to="/contacto" className="btn btn-dark">Pedir Orçamento</Link>
          </div>

          <div id="pacote-madrinhas" className="service-detail-card featured reveal-up">
            <div className="sdc-badge">Mais Popular</div>
            <div className="sdc-header">
              <div className="sdc-icon">◈</div>
              <div>
                <h3>Pacote Noiva + Madrinhas</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>O pacote inclui o serviço completo para a noiva e maquilhagem para as madrinhas.</p>
                <p>Trabalho para que todos os looks fiquem prontos a tempo, sem stress e com toda a elegância que o momento merece — criando um ambiente confortável e de confiança para todas.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Tudo do pacote Noiva</li>
                  <li>✓ Maquilhagem para 2-4 madrinhas</li>
                  <li>✓ Looks coordenados e harmoniosos</li>
                  <li>✓ Equipa de 2 artistas</li>
                  <li>✓ Gestão de tempo profissional</li>
                  <li>✓ Maquilhagem da mãe da noiva (opcional)</li>
                  <li>✓ Deslocação incluída (Lisboa/Porto)</li>
                </ul>
              </div>
            </div>
            <Link to="/contacto" className="btn btn-gold">Pedir Orçamento</Link>
          </div>

          <div id="ensaio" className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">◇</div>
              <div>
                <h3>Ensaio de Maquilhagem</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>O ensaio é altamente recomendado para todas as noivas. É a oportunidade de testar o look, fazer ajustes e chegar ao dia do casamento com total confiança no resultado.</p>
                <p>Realizamos o ensaio no nosso estúdio em Lisboa ou Porto, ou em deslocação. Tiramos fotografias para que possas ver o resultado em diferentes condições de luz.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Sessão de 2-3 horas</li>
                  <li>✓ Teste de 1-2 looks diferentes</li>
                  <li>✓ Fotografias do resultado</li>
                  <li>✓ Ficha técnica do look final</li>
                  <li>✓ Recomendações para preparar a pele</li>
                  <li>✓ Desconto no serviço do dia</li>
                </ul>
              </div>
            </div>
            <Link to="/contacto" className="btn btn-dark">Pedir Orçamento</Link>
          </div>

          <div id="penteado" className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">✧</div>
              <div>
                <h3>Penteado &amp; Maquilhagem</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>Serviço completo de beleza nupcial — do penteado ao make, tudo num só lugar. Especialista em maquilhagem e cabelo, garanto total harmonia entre o look e o penteado.</p>
                <p>Disponível para noivas e madrinhas. Inclui penteados clássicos, modernos, semi-presos e tranças — sempre em harmonia com todos os elementos do casamento.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Maquilhagem completa de noiva</li>
                  <li>✓ Penteado à escolha</li>
                  <li>✓ Aplicação de acessórios (véu, flores, etc.)</li>
                  <li>✓ Produtos de fixação premium</li>
                  <li>✓ Retoques durante a preparação</li>
                  <li>✓ Deslocação incluída (Lisboa/Porto)</li>
                </ul>
              </div>
            </div>
            <Link to="/contacto" className="btn btn-dark">Pedir Orçamento</Link>
          </div>

          <div id="destination" className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">◎</div>
              <div>
                <h3>Casamentos no estrangeiro</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>Já trabalhei em Portugal, Espanha, França, Itália e no Reino Unido. Se o casamento for no estrangeiro, indica o destino e a data quando entrares em contacto.</p>
                <p>O orçamento inclui deslocação, alojamento e todos os serviços acordados. Contacta-me para um orçamento personalizado.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Serviço completo de noiva</li>
                  <li>✓ Deslocação internacional</li>
                  <li>✓ Coordenação com a organização do casamento</li>
                  <li>✓ Disponibilidade para múltiplos dias</li>
                  <li>✓ Serviço para toda a equipa nupcial</li>
                  <li>✓ Suporte pré-casamento online</li>
                </ul>
              </div>
            </div>
            <Link to="/contacto" className="btn btn-dark">Pedir Orçamento</Link>
          </div>
        </div>
      </section>

      <section className="section-pad adicional-section">
        <div className="container">
          <div className="adicional-header reveal-up">
            <div className="adicional-header-left">
              <p className="eyebrow">Extras</p>
              <h2>Serviços <em>adicionais</em></h2>
            </div>
            <p className="adicional-header-desc">
              Complementa o teu dia com serviços pensados para cada detalhe — desde a preparação de toda a equipa até ao acompanhamento ao longo do dia.
            </p>
          </div>

          <div className="adicional-list mt-60">
            {adicionais.map((item, idx) => (
              <div
                key={idx}
                className={`adicional-item ${openAdicional === idx ? 'open is-open' : ''}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <button
                  className="adicional-item-trigger"
                  type="button"
                  aria-expanded={openAdicional === idx}
                  onClick={() => toggleAdicional(idx)}
                >
                  <span className="adicional-item-num">{item.num}</span>
                  <div className="adicional-item-divider"></div>
                  <div className="adicional-item-main">
                    <h3>{item.title} <em>{item.sub}</em></h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="adicional-item-arrow" style={{ transform: openAdicional === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </button>
                <div className="adicional-item-content">
                  <div className="adicional-item-details">
                    {item.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container">
          <p className="eyebrow center">Como funciona</p>
          <h2 className="center">O meu <em>processo</em></h2>
          <div className="process-steps reveal-stagger">
            <div className="process-step reveal-up">
              <div className="step-num">01</div>
              <h4>Primeiro Contacto</h4>
              <p>Envia-me a data, o local e os serviços que procuras pelo formulário ou por email.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step reveal-up">
              <div className="step-num">02</div>
              <h4>Consulta Inicial</h4>
              <p>Marcamos uma consulta (presencial ou online) para perceber o teu estilo, visão e necessidades.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step reveal-up">
              <div className="step-num">03</div>
              <h4>Ensaio</h4>
              <p>Realizamos o ensaio para testar e definir o look perfeito. Sem surpresas no grande dia.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step reveal-up">
              <div className="step-num">04</div>
              <h4>Dia do Casamento</h4>
              <p>No dia, vou ao local da preparação e sigo os horários que combinámos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="eyebrow center">Perguntas Frequentes</p>
          <h2 className="center">Tens <em>dúvidas?</em></h2>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={openFaq === idx}
                  onClick={() => toggleFaq(idx)}
                >
                  {faq.q} <span>{openFaq === idx ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-end-contact section-pad-sm" aria-labelledby="page-end-contact-title">
        <div className="container page-end-contact-inner">
          <div>
            <h2 id="page-end-contact-title">Prepara o teu casamento</h2>
            <p>No pedido, podes indicar se queres maquilhagem, penteado ou também preparação para as madrinhas.</p>
          </div>
          <Link to="/contacto" className="btn btn-outline-dark">Pedir orçamento</Link>
        </div>
      </section>
    </main>
  );
}
