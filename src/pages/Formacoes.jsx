import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import CustomSelect from '../components/CustomSelect';
import { sendLeadEmail } from '../utils/submitLead';

export default function Formacoes() {
  useScrollReveal();

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [validationMessage, setValidationMessage] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    formacaoPrevia: '',
    formacao: '',
    instagram: '',
    comoChegou: '',
    mensagem: '',

    _hp_check: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
      if (Object.keys(formErrors).length <= 1) {
        setValidationMessage('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;

    const errors = {};
    if (!formData.nome.trim()) errors.nome = 'Indica o teu nome completo.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Indica um endereço de email válido.';
    if (!formData.telefone.trim()) errors.telefone = 'Indica o teu contacto telefónico / WhatsApp.';
    if (!formData.formacaoPrevia) errors.formacaoPrevia = 'Indica se já tens formação profissional.';
    if (!formData.formacao) errors.formacao = 'Seleciona a formação pretendida.';


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setValidationMessage('Por favor, preenche todos os campos obrigatórios assinalados com * para podermos enviar o teu pedido.');
      const formEl = document.getElementById('formacoesForm');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setFormErrors({});
    setValidationMessage('');
    inFlight.current = true;
    setSubmitting(true);
    const result = await sendLeadEmail({ ...formData, tipo: 'formacao' });
    inFlight.current = false;
    setSubmitting(false);
    if (!result.success) {
      setValidationMessage(result.message);
      document.getElementById(e.currentTarget?.id || 'formacoesForm')?.scrollIntoView({ block: 'start' });
      return;
    }
    setSubmitted(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Preciso de levar os meus produtos para o Workshop de Automaquilhagem?',
      a: 'Recomendamos que tragas a tua bolsa de maquilhagem atual para analisarmos o que já tens, mas disponibilizamos todos os produtos e pincéis profissionais necessários durante a sessão.'
    },
    {
      q: 'As formações profissionais incluem certificado?',
      a: 'Sim! Todos os cursos profissionais (PRO Noivas e Maquilhagem Profissional) incluem certificado de conclusão emitido por Christine Fernandes Beauty.'
    },
    {
      q: 'Onde são realizadas as formações?',
      a: 'As formações decorrem no estúdio de Christine Fernandes , com opção de deslocação para workshops de grupo em empresas ou eventos sob consulta.'
    },
    {
      q: 'Como posso agendar ou garantir a minha vaga?',
      a: 'Basta preencher o formulário abaixo ou enviar mensagem por WhatsApp. A vaga fica confirmada mediante o pagamento de um sinal de 30%.'
    }
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/img/noiva/formacoes.webp"
            alt="Masterclass e Formações de Maquilhagem Profissional"
            fetchPriority="high"
          />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <p className="eyebrow">Aprende Comigo</p>
          <h1>Formações de <em>Maquilhagem</em></h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container center" style={{ maxWidth: '700px' }}>
          <p className="eyebrow">O meu método</p>
          <h2>Partilho o que<br /><em>aprendi ao longo dos anos</em></h2>
          <p className="section-sub">
            Formações pensadas para todos os níveis — desde quem quer aprender a maquilhar-se melhor até quem quer tornar a maquilhagem a sua profissão.
          </p>
        </div>
      </section>

      <section className="services-detail section-pad-sm">
        <div className="container">
          <div className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">✦</div>
              <div>
                <h3>Workshop Automaquilhagem</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>Aprende a realçar a tua beleza natural com técnicas simples e eficazes. Ideal para quem quer sentir-se mais confiante no dia a dia ou para uma ocasião especial.</p>
                <p>Sessão personalizada, adaptada ao teu tom de pele, tipo de olhos e estilo pessoal. Sais com uma rotina de maquilhagem que consegues replicar em casa.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ Sessão individual de 2-3 horas</li>
                  <li>✓ Análise de tom de pele e tipo de rosto</li>
                  <li>✓ Técnicas de base, olhos e lábios</li>
                  <li>✓ Dicas de produtos e ferramentas</li>
                  <li>✓ Guia personalizado para levar</li>
                </ul>
              </div>
            </div>
            <a href="#pedido-formacao" className="btn btn-dark">Pedir Informações</a>
          </div>

          <div className="service-detail-card featured reveal-up">
            <div className="sdc-badge">Mais Procurado</div>
            <div className="sdc-header">
              <div className="sdc-icon">◈</div>
              <div>
                <h3>PRO Noivas</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>Formação especializada em maquilhagem nupcial para profissionais ou quem quer entrar no mercado bridal. Aprende as técnicas, os produtos e os segredos de uma maquilhagem que dura o dia todo.</p>
                <p>Inclui trabalho prático em modelo real, gestão de tempo no dia do casamento e como criar um portefólio de noivas.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ 2 dias de formação intensiva</li>
                  <li>✓ Preparação da pele para maquilhagem de noiva</li>
                  <li>✓ Looks clássico, natural e glamour</li>
                  <li>✓ Trabalho em modelo real</li>
                  <li>✓ Gestão de tempo e logística</li>
                  <li>✓ Certificado de participação</li>
                </ul>
              </div>
            </div>
            <a href="#pedido-formacao" className="btn btn-gold">Pedir Informações</a>
          </div>

          <div className="service-detail-card reveal-up">
            <div className="sdc-header">
              <div className="sdc-icon">◇</div>
              <div>
                <h3>PRO Social</h3>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>Formação em maquilhagem social para eventos, festas e ocasiões especiais. Aprende a criar looks versáteis, adaptados a diferentes clientes e contextos.</p>
                <p>Ideal para quem quer trabalhar em eventos, salões ou como freelancer em ocasiões sociais.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que está incluído</h4>
                <ul>
                  <li>✓ 1 dia de formação intensiva</li>
                  <li>✓ Looks dia, noite e evento</li>
                  <li>✓ Técnicas de olhos e pele</li>
                  <li>✓ Trabalho em modelo real</li>
                  <li>✓ Certificado de participação</li>
                </ul>
              </div>
            </div>
            <a href="#pedido-formacao" className="btn btn-dark">Pedir Informações</a>
          </div>

          <div className="service-detail-card formacao-brevemente reveal-up">
            <div className="sdc-badge formacao-badge-soon">Em breve</div>
            <div className="sdc-header">
              <div className="sdc-icon">✧</div>
              <div>
                <h3>Maquilhagem Profissional</h3>
                <span className="sdc-price">A anunciar</span>
              </div>
            </div>
            <div className="sdc-body">
              <div className="sdc-desc">
                <p>O curso mais completo está a ser preparado com muito cuidado. Da teoria à prática, com módulos de maquilhagem social, nupcial, editorial e de palco — tudo o que precisas para construir uma carreira sólida.</p>
                <p>Deixa o teu contacto para seres das primeiras a saber quando abrirem as inscrições.</p>
              </div>
              <div className="sdc-includes">
                <h4>O que vai incluir</h4>
                <ul>
                  <li>◇ Módulos teóricos e práticos</li>
                  <li>◇ Maquilhagem social, nupcial e editorial</li>
                  <li>◇ Construção de portefólio profissional</li>
                  <li>◇ Certificação profissional reconhecida</li>
                </ul>
              </div>
            </div>
            <a href="#pedido-formacao" className="btn btn-outline-dark">Quero ser notificada</a>
          </div>
        </div>
      </section>

      <section className="formacoes-studio-banner reveal-up">
        <div className="container">
          <div className="fsb-grid">
            <div className="fsb-img-wrap">
              <img
                src="/img/espaco/espaco1.webp"
                alt="Bancadas de maquilhagem e espelhos profissionais no estúdio"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="fsb-content">
              <p className="eyebrow">O Nosso Espaço</p>
              <h2>Aprende num <em>estúdio profissional</em></h2>
              <p>
                As sessões decorrem no nosso atelier — um espaço acolhedor e totalmente equipado com bancadas individuais, espelhos com iluminação profissional e acesso aos melhores produtos do mercado.
              </p>
              <div className="fsb-features">
                <div className="fsb-feat-item">
                  <span className="fsb-feat-icon">✦</span>
                  <div>
                    <strong>Iluminação Calibrada</strong>
                    <small>Luz neutra de alta fidelidade para técnicas precisas de esfumado e pele</small>
                  </div>
                </div>
                <div className="fsb-feat-item">
                  <span className="fsb-feat-icon">✦</span>
                  <div>
                    <strong>Produtos de Alta Gama</strong>
                    <small>Acesso a bancadas completas com marcas de prestígio internacional</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="pedido-formacao" style={{ background: 'var(--ivory-mid)' }}>
        <div className="container contact-grid">
          <div className="contact-info-col reveal-left">
            <div className="contact-info-block">
              <p className="eyebrow">Formações &amp; Workshops</p>
              <h2>Pede as tuas<br /><em>informações</em></h2>
              <p className="section-sub">
                Tens dúvidas sobre qual a formação certa para ti? Entra em contacto e ajudo-te a escolher o caminho ideal para o teu desenvolvimento.
              </p>
            </div>

            <div className="contact-simple-list">
              <div className="contact-simple-item">
                <span className="csi-label">Email</span>
                <a href="mailto:christinef.makeup@gmail.com" className="csi-link">
                  christinef.makeup@gmail.com
                </a>
                <span className="csi-sub">Para dúvidas sobre as formações</span>
              </div>

              <div className="contact-simple-item">
                <span className="csi-label">Telefone / WhatsApp</span>
                <a href="https://wa.me/351968427599" target="_blank" rel="noopener noreferrer" className="csi-link">
                  +351 968 427 599
                </a>
                <span className="csi-sub">Atendimento Seg – Sáb: 09:00 – 19:00</span>
              </div>

              <div className="contact-simple-item">
                <span className="csi-label">Localização</span>
                <span className="csi-text">Atelier por marcação</span>
                <span className="csi-sub">Formações presenciais e personalizadas em estúdio</span>
              </div>

              <div className="contact-simple-item">
                <span className="csi-label">Segue o meu trabalho</span>
                <div className="contact-simple-social">
                  <a href="https://www.instagram.com/christinefmakeup" target="_blank" rel="noopener noreferrer" className="csi-social-link">
                    Instagram @christinefmakeup
                  </a>
                  <span className="csi-dot">•</span>
                  <a href="https://www.facebook.com/christinefmakeup" target="_blank" rel="noopener noreferrer" className="csi-social-link">
                    Facebook christinefmakeup
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-simple-note">
              <span className="csn-icon">✦</span>
              <span>Turmas reduzidas para atenção individual · Certificado incluído</span>
            </div>
          </div>

          <div className="contact-form-col reveal-right">
            {!submitted ? (
              <form className="contact-form" id="formacoesForm" onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <p className="eyebrow">Formulário</p>
                  <h3>Pedido de <em>Informação</em></h3>
                  <p className="form-subtitle">Preenche os campos abaixo e entrarei em contacto em breve.</p>
                </div>

                {validationMessage && (
                  <div className="form-validation-alert" role="alert">
                    <div className="fva-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div className="fva-text">
                      <strong>Informação em falta</strong>
                      <p>{validationMessage}</p>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  name="_hp_check"
                  value={formData._hp_check || ''}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                />

                <div className="form-row">
                  <div className={`form-group ${formErrors.nome ? 'has-error' : ''}`}>
                    <label htmlFor="f-nome">Nome *</label>
                    <input
                      type="text"
                      id="f-nome"
                      name="nome"
                      maxLength={120}
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="O teu nome completo"
                      required
                    />
                    {formErrors.nome && <span className="form-field-error-msg">{formErrors.nome}</span>}
                  </div>
                  <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
                    <label htmlFor="f-email">Email *</label>
                    <input
                      type="email"
                      id="f-email"
                      name="email"
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="O teu email"
                      required
                    />
                    {formErrors.email && <span className="form-field-error-msg">{formErrors.email}</span>}
                  </div>
                </div>

                <div className={`form-group ${formErrors.telefone ? 'has-error' : ''}`}>
                  <label htmlFor="f-telefone">Contacto *</label>
                  <input
                    type="tel"
                    id="f-telefone"
                    name="telefone"
                    maxLength={35}
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="+351 9XX XXX XXX"
                    required
                  />
                  {formErrors.telefone && <span className="form-field-error-msg">{formErrors.telefone}</span>}
                </div>

                <div className={`form-group ${formErrors.formacaoPrevia ? 'has-error' : ''}`}>
                  <label htmlFor="f-formacao-previa">Já tens formação profissional? *</label>
                  <CustomSelect
                    id="f-formacao-previa"
                    name="formacaoPrevia"
                    value={formData.formacaoPrevia}
                    onChange={handleChange}
                    placeholder="Seleciona"
                    hasError={!!formErrors.formacaoPrevia}
                    options={[
                      { value: 'sim', label: 'Sim' },
                      { value: 'nao', label: 'Não' }
                    ]}
                  />
                  {formErrors.formacaoPrevia && <span className="form-field-error-msg">{formErrors.formacaoPrevia}</span>}
                </div>

                <div className={`form-group ${formErrors.formacao ? 'has-error' : ''}`}>
                  <label htmlFor="f-formacao">Formação Pretendida *</label>
                  <CustomSelect
                    id="f-formacao"
                    name="formacao"
                    value={formData.formacao}
                    onChange={handleChange}
                    placeholder="Seleciona uma formação"
                    hasError={!!formErrors.formacao}
                    options={[
                      { value: 'workshop-auto', label: 'Workshop Automaquilhagem' },
                      { value: 'pro-noivas', label: 'PRO Noivas' },
                      { value: 'pro-social', label: 'PRO Social' },
                      { value: 'profissional', label: 'Maquilhagem Profissional (brevemente)' },
                      { value: 'nao-sei', label: 'Ainda não sei — quero aconselhamento' }
                    ]}
                  />
                  {formErrors.formacao && <span className="form-field-error-msg">{formErrors.formacao}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="instagram">
                      Instagram <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      maxLength={100}
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@o_teu_instagram"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="como-chegou">Como chegaste até mim?</label>
                    <CustomSelect
                      id="como-chegou"
                      name="comoChegou"
                      value={formData.comoChegou}
                      onChange={handleChange}
                      placeholder="Seleciona"
                      options={[
                        'Instagram',
                        'Facebook',
                        'Google',
                        'Casamentos.pt',
                        'Recomendação',
                        'TikTok',
                        'Organizador de casamentos',
                        'Outro'
                      ]}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="f-mensagem">Mensagem</label>
                  <textarea
                    id="f-mensagem"
                    name="mensagem"
                    maxLength={4000}
                    rows="4"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Conta-me mais sobre os teus objetivos, experiência ou dúvidas..."
                  ></textarea>
                </div>

                <p className="form-privacy-note">
                  Usamos os teus dados para responder a este pedido. Consulta a <Link to="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link>.
                </p>

                <button type="submit" className="btn-submit" id="formacoesSubmitBtn" disabled={submitting}>
                  <span className="btn-submit-text">
                    {submitting ? 'A enviar pedido...' : 'Enviar Pedido de Informação'}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="form-success" id="formSuccess" style={{ display: 'block' }}>
                <div className="success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4>Pedido de Informação Enviado!</h4>
                <p>
                  Obrigada, <strong>{formData.nome}</strong>! O teu pedido de informação sobre a formação foi recebido com sucesso.
                </p>
                <p style={{ marginTop: '12px', color: 'var(--text-light)', fontSize: '13px', lineHeight: 1.7 }}>
                  Vou enviar-te o programa e os detalhes da vaga para <strong>{formData.email}</strong>.
                </p>
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed rgba(160,120,64,0.3)', display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nome: '',
                        email: '',
                        telefone: '',
                        formacaoPrevia: '',
                        formacao: '',
                        instagram: '',
                        comoChegou: '',
                        mensagem: '',

                        _hp_check: ''
                      });
                    }}
                    className="btn btn-outline-dark"
                    style={{ fontSize: '11px', padding: '10px 24px' }}
                  >
                    Enviar Novo Pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="faq-section section-pad-sm" style={{ background: '#f9f6f2' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="eyebrow center">Dúvidas Frequentes</p>
          <h2 className="center">Perguntas sobre as <em>Formações</em></h2>
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
            <h2 id="page-end-contact-title">Próximas formações</h2>
            <p>Posso enviar-te o programa, as próximas datas e as vagas disponíveis.</p>
          </div>
          <a href="#pedido-formacao" className="btn btn-outline-dark">Pedir informações sobre as formações</a>
        </div>
      </section>
    </main>
  );
}
