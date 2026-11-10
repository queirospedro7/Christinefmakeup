import { contactFormsEnabled } from '../data/business';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import CustomSelect from '../components/CustomSelect';
import FormTerms from '../components/FormTerms';
import { sendLeadEmail } from '../utils/submitLead';

export default function Contacto() {
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
    local: '',
    hora: '',
    data: '',
    instagram: '',
    comoChegou: '',
    mensagem: '',

    aceitouTermos: false,
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
    if (!contactFormsEnabled || !formData.aceitouTermos || inFlight.current) return;

    const errors = {};
    if (!formData.nome.trim()) errors.nome = 'Indica o teu nome completo.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Indica um endereço de email válido.';
    if (!formData.telefone.trim()) errors.telefone = 'Indica o teu contacto telefónico / WhatsApp.';
    if (!formData.local.trim()) errors.local = 'Indica o local do casamento.';


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setValidationMessage('Por favor, preenche todos os campos obrigatórios assinalados com * para podermos enviar o teu pedido.');
      const formEl = document.getElementById('contactForm');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setFormErrors({});
    setValidationMessage('');
    inFlight.current = true;
    setSubmitting(true);
    const result = await sendLeadEmail({ ...formData, tipo: 'orcamento' });
    inFlight.current = false;
    setSubmitting(false);
    if (!result.success) {
      setValidationMessage(result.message);
      document.getElementById(e.currentTarget?.id || 'contactForm')?.scrollIntoView({ block: 'start' });
      return;
    }
    setSubmitted(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Em quanto tempo recebo a resposta ao meu pedido?',
      a: 'Respondo por email depois de confirmar a disponibilidade para a data que indicaste.'
    },
    {
      q: 'O que acontece depois de enviar o pedido?',
      a: 'Analisamos a tua data, local e necessidades e enviamos uma proposta completa. Se fizer sentido para ti, agendamos uma conversa ou o teu ensaio de noiva.'
    },
    {
      q: 'Posso incluir serviços para mãe da noiva e madrinhas mais tarde?',
      a: 'Sim! Podes adicionar serviços para convidadas e madrinhas até 30 dias antes do casamento, mediante confirmação de agenda e tempo de preparação.'
    }
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="/img/noiva/contacto.webp"
            alt=""
            fetchPriority="high"
          />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <p className="eyebrow">Vamos falar</p>
          <h1>Pede o teu <em>orçamento</em></h1>
        </div>
      </section>

      <div className="contact-section section-pad">
        <div className="container contact-grid">
          <div className="contact-info-col reveal-left">
            <div className="contact-info-block">
              <p className="eyebrow">Contacto Direto</p>
              <h2>Fala <em>comigo</em></h2>
              <p className="section-sub">Diz-nos como podemos tornar o teu grande dia inesquecível. Cada detalhe importa.</p>
            </div>

            <div className="contact-simple-list">
              <div className="contact-simple-item">
                <span className="csi-label">Email</span>
                <a href="mailto:christinef.makeup@gmail.com" className="csi-link">
                  christinef.makeup@gmail.com
                </a>
                <span className="csi-sub">Para pedidos de orçamento e dúvidas</span>
              </div>

              <div className="contact-simple-item">
                <span className="csi-label">Telefone / WhatsApp</span>
                <a href="https://wa.me/351968427599" target="_blank" rel="noopener noreferrer" className="csi-link">
                  +351 968 427 599
                </a>
                <span className="csi-sub">Seg – Sáb: 09:00 – 19:00</span>
              </div>

              <div className="contact-simple-item">
                <span className="csi-label">Localização</span>
                <span className="csi-text">Atelier por marcação</span>
                <span className="csi-sub">Deslocações disponíveis em todo o país e no estrangeiro</span>
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
              <span>Reservas sujeitas a confirmação da disponibilidade.</span>
            </div>
            <p className="contact-complaints"><a href="https://www.livroreclamacoes.pt/">Livro de Reclamações Eletrónico</a></p>
          </div>

          <div className="contact-form-col reveal-right">
            {!submitted ? (
              <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <p className="eyebrow">Formulário</p>
                  <h3>Pedido de <em>Orçamento</em></h3>
                  <p className="form-subtitle">Preenche os teus dados abaixo para receberes a disponibilidade e proposta.</p>
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
                    <label htmlFor="nome">Nome *</label>
                    <input
                      type="text"
                      id="nome"
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
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
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

                <div className="form-row">
                  <div className={`form-group ${formErrors.telefone ? 'has-error' : ''}`}>
                    <label htmlFor="telefone">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      maxLength={35}
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="+351 9XX XXX XXX"
                      required
                    />
                    {formErrors.telefone && <span className="form-field-error-msg">{formErrors.telefone}</span>}
                  </div>
                  <div className={`form-group ${formErrors.local ? 'has-error' : ''}`}>
                    <label htmlFor="local">Local do Casamento *</label>
                    <input
                      type="text"
                      id="local"
                      name="local"
                      maxLength={250}
                      value={formData.local}
                      onChange={handleChange}
                      placeholder="Ex: Sintra, Douro, Braga, Quinta..."
                      required
                    />
                    {formErrors.local && <span className="form-field-error-msg">{formErrors.local}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="hora">Hora da Cerimónia</label>
                    <input
                      type="time"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="data">Data do Casamento</label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                    />
                  </div>
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
                      placeholder="Seleciona uma opção"
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
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    maxLength={4000}
                    rows="4"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Conta-nos mais sobre o teu casamento, estilo, inspirações ou dúvidas..."
                  ></textarea>
                </div>

                <FormTerms id="contacto-termos" checked={formData.aceitouTermos} onChange={handleChange} />

                <button type={contactFormsEnabled ? 'submit' : 'button'} className="btn-submit" id="contactSubmitBtn" disabled={submitting || !formData.aceitouTermos}>
                  <span className="btn-submit-text">
                    {submitting ? 'A enviar pedido...' : 'Enviar Pedido de Orçamento'}
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
                <h4>Pedido Enviado com Sucesso!</h4>
                <p>
                  Obrigada, <strong>{formData.nome}</strong>! As informações do teu casamento foram recebidas com sucesso.
                </p>
                <p style={{ marginTop: '12px', color: 'var(--text-light)', fontSize: '13px', lineHeight: 1.7 }}>
                  Vou confirmar a disponibilidade e responder para <strong>{formData.email}</strong>.
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
                        local: '',
                        hora: '',
                        data: '',
                        instagram: '',
                        comoChegou: '',
                        mensagem: '',

                        aceitouTermos: false,
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
      </div>

      <div className="contact-gallery-strip">
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-01.webp" alt="Retrato de noiva com o cabelo apanhado" loading="lazy" decoding="async" /></div>
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-02.webp" alt="Retrato de noiva com ondas" loading="lazy" decoding="async" /></div>
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-03.webp" alt="Aplicação de maquilhagem de olhos" loading="lazy" decoding="async" /></div>
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-04.webp" alt="Pormenor de um coque baixo" loading="lazy" decoding="async" /></div>
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-05.webp" alt="Retoque de batom durante os preparativos" loading="lazy" decoding="async" /></div>
        <div className="contact-gallery-item"><img src="/img/noiva/contacto-06.webp" alt="Noiva com leque" loading="lazy" decoding="async" /></div>
      </div>

      <section className="faq-section section-pad-sm" style={{ background: '#f9f6f2' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="reveal-up">
            <p className="eyebrow center">Perguntas Rápidas</p>
            <h2 className="center">Dúvidas sobre o <em>Orçamento</em></h2>
          </div>
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
    </main>
  );
}
