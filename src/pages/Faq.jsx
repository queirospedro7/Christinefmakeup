import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Faq() {
  useScrollReveal();

  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqData = {
    reservas: {
      title: 'Reservas & Preços',
      items: [
        {
          id: 'res-1',
          q: 'Com quanto tempo de antecedência devo reservar?',
          a: (
            <>
              <p>Recomendamos reservar com pelo menos <strong>6 a 12 meses de antecedência</strong>, especialmente para datas de primavera e verão (abril a setembro), que são os meses de maior procura. Para casamentos em épocas menos populares, 3 a 6 meses costumam ser suficientes.</p>
              <p>Atenção: o simples contacto ou troca de mensagens <strong>não garante a reserva</strong> — a data só fica bloqueada após o pagamento do sinal de 30%.</p>
            </>
          )
        },
        {
          id: 'res-2',
          q: 'Qual é o valor do sinal para confirmar a data?',
          a: (
            <>
              <p>A reserva é confirmada com o pagamento de um <strong>sinal de 30%</strong> do valor total do serviço. O valor restante (70%) deverá ser liquidado até 7 dias antes da data do casamento, ou no próprio dia antes do início dos trabalhos, mediante acordo prévio por escrito.</p>
              <p>Aceitamos pagamento por <strong>Transferência Bancária</strong> e <strong>MB Way</strong>.</p>
            </>
          )
        },
        {
          id: 'res-3',
          q: 'Posso cancelar ou reagendar a minha reserva?',
          a: (
            <>
              <p>As condições de cancelamento e reagendamento são comunicadas antes da reserva. Consulta os <Link to="/termos">Termos e Condições</Link>.</p>
            </>
          )
        },
        {
          id: 'res-4',
          q: 'Os orçamentos têm algum prazo de validade?',
          a: (
            <p>Sim. As propostas de orçamento enviadas têm a validade de <strong>15 dias</strong> a contar da data de envio, salvo indicação expressa em contrário. Após esse prazo, os preços podem sofrer alterações e a data pode ter sido entretanto reservada por outra cliente.</p>
          )
        }
      ]
    },
    servicos: {
      title: 'Serviços',
      items: [
        {
          id: 'srv-1',
          q: 'O ensaio de maquilhagem é obrigatório?',
          a: (
            <p>Não é obrigatório, mas é <strong>altamente recomendado</strong>. O ensaio permite testar o look, os produtos e a adequação à tua pele, e chegas ao grande dia com total confiança no resultado. É também a oportunidade de nos conhecermos melhor e afinarmos todos os detalhes numa sessão de 2 a 3 horas.</p>
          )
        },
        {
          id: 'srv-2',
          q: 'Que marcas e produtos utilizam?',
          a: (
            <p>Utilizamos exclusivamente <strong>produtos premium</strong> de marcas reconhecidas internacionalmente, incluindo <strong>Charlotte Tilbury, NARS, MAC</strong> e outras. Todos os produtos são selecionados pela longevidade, acabamento fotogénico e adequação a todos os tons de pele.</p>
          )
        },
        {
          id: 'srv-3',
          q: 'A maquilhagem aguenta todo o dia do casamento?',
          a: (
            <>
              <p>Sim. Utilizamos técnicas e produtos de <strong>longa duração</strong> especificamente concebidos para casamentos. Cada serviço inclui um kit de retoques para a noiva levar consigo.</p>
              <p>Para máxima tranquilidade, oferecemos também o serviço de <strong>Acompanhamento Diário</strong> (a partir de €200 adicionais), com presença de um artista ao longo de todo o evento para retoques estratégicos — do altar à pista de dança.</p>
            </>
          )
        },
        {
          id: 'srv-4',
          q: 'Podem maquilhar as madrinhas e família?',
          a: (
            <p>Sim! O nosso <strong>Pacote Noiva + Madrinhas</strong> inclui maquilhagem para 2 a 4 madrinhas com looks coordenados e harmoniosos, assegurado por uma equipa de 2 artistas. Podemos também incluir a mãe da noiva e outras convidadas especiais. Podes adicionar serviços até <strong>30 dias antes do casamento</strong>, sujeito a disponibilidade de agenda.</p>
          )
        },
        {
          id: 'srv-5',
          q: 'Fazem também penteados?',
          a: (
            <p>Sim! Oferecemos um serviço completo de <strong>Penteado &amp; Maquilhagem</strong> — do penteado ao make, tudo num só lugar. Disponível para noivas e madrinhas. Inclui penteados clássicos, modernos, semi-presos e tranças, sempre em total harmonia com todos os elementos do casamento.</p>
          )
        },
        {
          id: 'srv-6',
          q: 'Como é que a Christine usa as fotos do meu casamento?',
          a: (
            <p>Podemos usar fotografias dos trabalhos realizados para divulgação do portfólio profissional (website, Instagram e materiais promocionais), sempre <strong>respeitando a dignidade e imagem</strong> da noiva. Se preferires exclusividade e não autorizares a partilha pública, basta comunicar-nos por escrito antes do evento — e cumpriremos sem questionar.</p>
          )
        }
      ]
    },
    logistica: {
      title: 'Logística & Deslocações',
      items: [
        {
          id: 'log-1',
          q: 'Fazem deslocação para fora da vossa área?',
          a: (
            <>
              <p>Sim! Trabalhamos em <strong>todo o Portugal continental e ilhas</strong>. Para eventos fora da nossa área de residência, os custos de deslocação (combustível, portagens e tempo de viagem) são discriminados no orçamento inicial.</p>
              <p>Para casamentos a mais de <strong>150 km</strong> ou com início antes das <strong>06h00</strong>, pode ser necessário assegurar alojamento na véspera para garantir a pontualidade e descanso da equipa.</p>
            </>
          )
        },
        {
          id: 'log-2',
          q: 'Trabalham em casamentos no estrangeiro?',
          a: (
            <>
              <p>Sim. Já trabalhámos em Portugal, Espanha, França, Itália e no Reino Unido. Indica a data e o destino quando nos contactares.</p>
              <p>Para casamentos no estrangeiro, as despesas de voos, transferes e estadia são da responsabilidade da cliente, conforme acordado na proposta individual. <Link to="/contacto" style={{ color: 'var(--gold)' }}>Contacta-nos</Link> para um orçamento personalizado.</p>
            </>
          )
        },
        {
          id: 'log-3',
          q: 'Onde decorre o ensaio de maquilhagem?',
          a: (
            <p>Os ensaios decorrem no nosso <strong>estúdio</strong> ou em local acordado previamente. Em alternativa, podemos também realizar o ensaio em deslocação, com custo adicional. Tiramos fotografias do resultado para que possas avaliar o look em diferentes condições de luz.</p>
          )
        }
      ]
    },
    formacoes: {
      title: 'Formações',
      items: [
        {
          id: 'for-1',
          q: 'As formações são para profissionais ou para qualquer pessoa?',
          a: (
            <p>Temos formações para todos os níveis. O <strong>Workshop de Automaquilhagem</strong> é ideal para quem quer aprender a maquilhar-se melhor no dia a dia, sem experiência anterior. Os cursos <strong>PRO Noivas</strong> e <strong>PRO Social</strong> são destinados a quem quer profissionalizar-se na área da maquilhagem.</p>
          )
        },
        {
          id: 'for-2',
          q: 'Os materiais de maquilhagem estão incluídos nas formações?',
          a: (
            <p>Nos cursos profissionais PRO, cada formanda trabalha com os seus próprios materiais (lista facultada no momento da inscrição). Nos workshops de automaquilhagem, Christine utiliza o seu kit profissional durante a sessão. Para os cursos de longa duração, a lista de materiais recomendados é disponibilizada com antecedência.</p>
          )
        },
        {
          id: 'for-3',
          q: 'Os cursos têm certificado?',
          a: (
            <p>Sim! Os cursos <strong>PRO Noivas</strong> e <strong>PRO Social</strong> incluem certificado de participação e conclusão, emitido por Christine Fernandes Bridal Beauty. O certificado é um documento válido para integrar o teu portfólio profissional.</p>
          )
        },
        {
          id: 'for-4',
          q: 'Onde decorrem as formações?',
          a: (
            <p>As formações decorrem no nosso estúdio,. Para grupos ou empresas, podemos analisar a possibilidade de formação em deslocação. <Link to="/formacoes#pedido-formacao" style={{ color: 'var(--gold)' }}>Pede informações</Link> para mais detalhes.</p>
          )
        }
      ]
    }
  };

  const categories = [
    { key: 'all', label: 'Todas' },
    { key: 'reservas', label: 'Reservas & Preços' },
    { key: 'servicos', label: 'Serviços' },
    { key: 'logistica', label: 'Logística' },
    { key: 'formacoes', label: 'Formações' }
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--compact" role="banner">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/img/noiva/perguntas.webp" alt="" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay" aria-hidden="true"></div>
        <div className="container page-hero-content">
          <p className="eyebrow">Respostas Rápidas</p>
          <h1>Perguntas <em>Frequentes</em></h1>
        </div>
      </header>

      <nav className="container" aria-label="Localização na página" style={{ paddingTop: '24px', paddingBottom: 0 }}>
        <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', fontSize: '11px', color: 'var(--text-light)', letterSpacing: '1px' }}>
          <li><Link to="/" style={{ color: 'var(--text-light)' }}>Início</Link></li>
          <li aria-hidden="true" style={{ color: 'var(--gold)' }}>›</li>
          <li aria-current="page" style={{ color: 'var(--text)' }}>FAQ</li>
        </ol>
      </nav>

      <section className="section-pad-sm" style={{ background: 'var(--ivory)' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <p className="eyebrow">Tudo o que precisas de saber</p>
          <h2>As dúvidas mais <em>comuns</em></h2>
          <p className="section-sub center" style={{ marginBottom: 0 }}>
            Reunimos as perguntas que nos chegam com mais frequência. Se não encontrares a resposta que procuras,{' '}
            <Link to="/contacto" style={{ color: 'var(--gold)', fontWeight: 500 }}>
              entra em contacto
            </Link>{' '}
            connosco.
          </p>
        </div>
      </section>

      <section className="section-pad faq-section" style={{ background: 'var(--ivory)', paddingTop: '40px' }} aria-label="Perguntas frequentes">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="faq-categories" role="group" aria-label="Filtrar por categoria">
            {categories.map((c) => (
              <button
                key={c.key}
                className={`faq-cat-btn ${activeCategory === c.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.key)}
                aria-pressed={activeCategory === c.key}
              >
                {c.label}
              </button>
            ))}
          </div>

          {Object.entries(faqData).map(([groupKey, group]) => {
            const isVisible = activeCategory === 'all' || activeCategory === groupKey;
            if (!isVisible) return null;

            return (
              <div key={groupKey} className="faq-group visible" style={{ marginTop: groupKey !== 'reservas' ? '56px' : '0' }}>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>{group.title}</p>
                <div className="faq-list" role="list">
                  {group.items.map((item) => (
                    <div key={item.id} className={`faq-item ${openId === item.id ? 'open' : ''}`} role="listitem">
                      <button
                        className="faq-question"
                        type="button"
                        aria-expanded={openId === item.id}
                        onClick={() => toggleItem(item.id)}
                      >
                        {item.q}
                        <span aria-hidden="true">{openId === item.id ? '−' : '+'}</span>
                      </button>
                      <div className="faq-answer">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="faq-cta-box reveal-up">
            <p className="eyebrow">Contacto</p>
            <h2>Ainda tens <em>dúvidas?</em></h2>
            <p>Queres saber mais sobre um serviço ou confirmar uma data? Fala connosco.</p>
            <div className="faq-cta-actions">
              <Link to="/contacto" className="btn btn-dark">Pedir orçamento</Link>
              <a
                href="https://wa.me/351968427599"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.58 1.961.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.073.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1 1.224zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.957-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.634 0-3.15-.494-4.417-1.343l-.316-.213-3.14.884.843-3.08-.234-.337A7.95 7.95 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
