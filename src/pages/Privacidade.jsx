import { business, contactFormsEnabled } from '../data/business';

export default function Privacidade() {
  return (
    <main id="main-content" tabIndex={-1} className="section-pad">
      <article className="container legal-copy">
        <h1>Política de <em>Privacidade</em></h1>
        <p>Atualizada em <time dateTime="2026-11-09">9 de novembro de 2026</time>.</p>

        <h2>Responsável pelo tratamento</h2>
        <p>{business.name}, sob a marca {business.brand}, é responsável pelo tratamento dos dados pessoais neste site. Para questões de privacidade, escreva para <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        {business.address && <p>Morada para contacto: {business.address}.</p>}

        <h2>Dados recolhidos e finalidades</h2>
        {contactFormsEnabled ? <p>Os formulários pedem o nome, o email, o telefone e as informações necessárias sobre o casamento ou a formação. Os campos opcionais podem incluir o perfil de Instagram, como conheceu o atelier e uma mensagem. Os campos assinalados com um asterisco são necessários para processar o pedido. Se não os preencher, pode contactar o atelier por email.</p> : <p>Quando nos contacta por email ou WhatsApp, recebemos os dados de contacto e as informações que decide partilhar no pedido.</p>}
        <p>Usamos esses dados para responder a pedidos de informação, preparar orçamentos e tratar de reservas, ao abrigo de diligências pré-contratuais solicitadas pela pessoa interessada ou da execução do contrato, conforme o artigo 6.º, n.º 1, alínea b), do RGPD. A faturação e outras obrigações legais têm como fundamento a alínea c) do mesmo artigo.</p>
        <p>O alojamento pode tratar o endereço IP e dados técnicos de acesso.{contactFormsEnabled && ' O formulário usa o endereço IP temporariamente para limitar pedidos repetidos, com base no interesse legítimo de proteger o serviço, nos termos da alínea f) do mesmo artigo.'}</p>

        <h2>Destinatários e transferências</h2>
        <p>Os pedidos são acessíveis à equipa responsável pelo atendimento e passam pelos prestadores de alojamento e de correio eletrónico, necessários ao funcionamento do serviço. Podem também ser comunicados às autoridades quando exista uma obrigação legal.</p>
        {business.mailProvider && <p>O alojamento é assegurado pela Vercel. O correio eletrónico é processado por {business.mailProvider}.</p>}
        {business.privacyTransfers && <p>{business.privacyTransfers}</p>}

        <h2>Conservação</h2>
        <p>Os pedidos são conservados enquanto forem necessários para responder e acompanhar a proposta ou a reserva. Quando existe contratação, os dados necessários são conservados durante a prestação do serviço e pelos prazos legais de faturação ou de defesa de direitos que forem aplicáveis.</p>
        {contactFormsEnabled && <p>O contador técnico de pedidos tem uma janela de 15 minutos. Os formulários não guardam cópias dos pedidos no navegador.</p>}

        <h2>Direitos</h2>
        <p>Pode pedir acesso, retificação, apagamento, limitação ou portabilidade dos dados, nos casos previstos no RGPD. Pode também opor-se ao tratamento baseado em interesse legítimo. Para exercer estes direitos, escreva para <a href={`mailto:${business.email}`}>{business.email}</a>. Pode apresentar reclamação à <a href="https://www.cnpd.pt/">Comissão Nacional de Proteção de Dados</a>.</p>

        <h2 id="cookies">Cookies e serviços externos</h2>
        <p>O código deste site não instala cookies de análise, publicidade ou preferências. As fotografias, os mapas apresentados na página, as fontes e os vídeos são carregados a partir do próprio site.</p>
        <p>Os links para redes sociais, WhatsApp, Google Maps e Apple Maps abrem serviços externos. As políticas desses serviços aplicam-se quando os visita.</p>
      </article>
    </main>
  );
}
