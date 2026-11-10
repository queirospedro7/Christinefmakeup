import { business, contactFormsEnabled } from '../data/business';

export default function Privacidade() {
  return (
    <main id="main-content" tabIndex={-1} className="section-pad">
      <article className="container legal-copy">
        <header className="legal-header">
          <p className="eyebrow">Informação legal</p>
          <h1>Política de <em>Privacidade</em></h1>
          <p>Saiba que dados são tratados quando visita o site, contacta o atelier ou faz uma reserva.</p>
          <p className="legal-date">Atualizada em <time dateTime="2026-11-10">10 de novembro de 2026</time>.</p>
        </header>

        <h2>1. Responsável pelo tratamento</h2>
        <p>{business.name}, sob a marca {business.brand}, é responsável pelo tratamento descrito nesta página. Para questões de privacidade, contacte <a href={'mailto:' + business.email}>{business.email}</a>.</p>
        {business.address && <p>Morada para contacto: {business.address}.</p>}

        <h2>2. Dados, finalidades e bases jurídicas</h2>
        <ul>
          <li><strong>Pedidos e reservas.</strong> Tratamos os dados de identificação e contacto que partilha, como nome, email e telefone, e os pormenores necessários sobre o casamento ou a formação. Usamo-los para responder, preparar uma proposta e gerir a reserva ou a prestação do serviço. A base é a realização de diligências pré-contratuais a seu pedido ou a execução do contrato (artigo 6.º, n.º 1, alínea b), do RGPD).</li>
          <li><strong>Faturação.</strong> Quando é necessário faturar, tratamos os dados exigidos para cumprir as obrigações fiscais e contabilísticas (alínea c)).</li>
          <li><strong>Funcionamento e segurança.</strong> O alojamento pode tratar dados técnicos de acesso, como o endereço IP. O interesse legítimo é manter o site disponível e proteger o serviço de abuso (alínea f)).</li>
          <li><strong>Fotografias para divulgação.</strong> Se autorizar a utilização promocional de imagens em que seja identificável, esse tratamento tem por base o consentimento (alínea a)). Pode retirá-lo a qualquer momento por email, sem afetar o tratamento anterior à retirada.</li>
        </ul>
        {contactFormsEnabled ? (
          <p>Nos formulários, os campos com asterisco são necessários para tratar o pedido. Se faltar informação essencial, poderá não ser possível preparar uma proposta. O perfil de Instagram e a indicação de como conheceu o atelier são opcionais. O endereço IP é usado temporariamente para limitar pedidos repetidos.</p>
        ) : (
          <p>Nesta demonstração, os formulários servem para experimentar a interface. Os dados aí introduzidos não são enviados ao atelier nem guardados pelo site. Ao contactar por email ou WhatsApp, partilha os dados que incluir na mensagem e os dados de contacto associados.</p>
        )}

        <h2>3. Quem recebe os dados</h2>
        <p>Os pedidos são tratados por quem assegura o atendimento no atelier. Os dados podem ser tratados pelos prestadores de alojamento e de correio eletrónico necessários ao serviço e comunicados às autoridades quando exista uma obrigação legal. O alojamento do site é assegurado pela Vercel.</p>
        {business.mailProvider && <p>Fornecedor de correio eletrónico: {business.mailProvider}.</p>}
        {business.privacyTransfers && <p>{business.privacyTransfers}</p>}

        <h2>4. Durante quanto tempo guardamos os dados</h2>
        <p>Os pedidos são conservados pelo tempo necessário para responder, acompanhar a proposta e, havendo reserva, prestar o serviço. A documentação de faturação segue os prazos legais aplicáveis. Os dados necessários para defender um direito podem ser mantidos pelo prazo aplicável à situação.</p>
        {contactFormsEnabled && <p>O limite técnico de pedidos funciona em janelas de 15 minutos. O site não guarda cópias dos formulários enviados no navegador.</p>}

        <h2>5. Os seus direitos</h2>
        <p>Pode pedir acesso aos dados, retificação, apagamento, limitação do tratamento ou portabilidade, quando se verifiquem as respetivas condições. Pode também opor-se ao tratamento baseado em interesse legítimo e retirar um consentimento que tenha dado.</p>
        <p>Para exercer os seus direitos, escreva para <a href={'mailto:' + business.email}>{business.email}</a>. Pode também apresentar reclamação junto da <a href="https://www.cnpd.pt/">Comissão Nacional de Proteção de Dados (CNPD)</a>.</p>

        <h2 id="cookies">6. Cookies, armazenamento e serviços externos</h2>
        <p>O site não instala cookies de publicidade ou de análise. Se fechar o aviso de cookies, o navegador guarda localmente essa escolha para evitar que volte a aparecer. Pode removê-la nas definições do navegador, apagando os dados deste site.</p>
        <p>Os links para WhatsApp, redes sociais, Google Maps e Apple Maps abrem serviços externos. Ao segui-los, aplica-se a política de privacidade do respetivo serviço.</p>
      </article>
    </main>
  );
}
