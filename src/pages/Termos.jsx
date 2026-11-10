import { Link } from 'react-router-dom';
import { business, contactFormsEnabled } from '../data/business';

export default function Termos() {
  return (
    <main id="main-content" tabIndex={-1} className="section-pad">
      <article className="container legal-copy">
        <header className="legal-header">
          <p className="eyebrow">Informação legal</p>
          <h1>Termos e <em>Condições</em></h1>
          <p>Como funcionam os pedidos de informação, os orçamentos e as reservas do atelier.</p>
          <p className="legal-date">Atualizados em <time dateTime="2026-11-10">10 de novembro de 2026</time>.</p>
        </header>

        <h2>1. Identificação da prestadora</h2>
        <p>{business.name}, sob a marca {business.brand}, presta serviços de maquilhagem, penteado e formação. Pode contactar o atelier através de <a href={'mailto:' + business.email}>{business.email}</a> ou do número <a href="tel:+351968427599">{business.phone}</a>.</p>
        {business.address && <p>Morada: {business.address}.</p>}
        {business.taxId && <p>NIF: {business.taxId}.</p>}

        <h2>2. Pedidos, orçamento e confirmação</h2>
        {!contactFormsEnabled && <p>Os formulários deste site estão em modo de demonstração. Para pedir informações ou um orçamento, use os contactos indicados nesta página.</p>}
        <p>Um pedido de informação ou de orçamento não confirma uma reserva. Antes da contratação, a proposta indica a disponibilidade, os serviços incluídos, a data e o local, o preço total com os impostos aplicáveis, as despesas adicionais e as condições de pagamento. A reserva é confirmada por escrito, de acordo com as condições comunicadas e aceites.</p>

        <h2>3. Pagamentos e alterações</h2>
        <p>Os prazos de pagamento e o valor de um eventual sinal são indicados na proposta. Para alterar a data, o local ou os serviços acordados, contacte o atelier por escrito. As alterações dependem da disponibilidade e de confirmação. Qualquer alteração ao preço é comunicada antes de ser aceite.</p>
        <p>Em caso de cancelamento ou reagendamento, aplicam-se as condições comunicadas antes da contratação, respeitando os direitos legais do cliente.</p>

        <h2>4. Livre resolução</h2>
        <p>Nos contratos de prestação de serviços celebrados à distância ou fora do estabelecimento, o consumidor dispõe, em regra, de 14 dias a contar da celebração do contrato para exercer o direito de livre resolução, quando aplicável. A lei prevê prazos diferentes para certas formas de contratação e exceções que dependem do serviço e das condições da contratação.</p>
        <p>Quando o direito se aplica, pode exercê-lo por uma declaração inequívoca, enviada, por exemplo, para <a href={'mailto:' + business.email}>{business.email}</a>. As instruções, o formulário legal e a informação sobre eventuais exceções ou encargos são disponibilizados antes de o consumidor ficar vinculado.</p>
        <p><a href="https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2014-73222992-208203239">Consultar o regime de livre resolução no Diário da República</a>.</p>

        <h2>5. Fotografias e conteúdos</h2>
        <p>A utilização promocional de fotografias em que clientes sejam identificáveis depende de autorização separada. Fotografias, vídeos e outros conteúdos do site só podem ser reutilizados com autorização do titular dos direitos ou nos casos permitidos por lei.</p>

        <h2 id="reclamacoes">6. Reclamações e litígios de consumo</h2>
        <p>Pode apresentar uma reclamação diretamente ao atelier por <a href={'mailto:' + business.email}>email</a> ou através do <a href="https://www.livroreclamacoes.pt/">Livro de Reclamações Eletrónico</a>.</p>
        {business.ralName && business.ralUrl && <p>Entidade de resolução alternativa de litígios de consumo: <a href={business.ralUrl}>{business.ralName}</a>.</p>}
        <p>Consulte também a <Link to="/privacidade">Política de Privacidade</Link> para saber como são tratados os seus dados pessoais.</p>
      </article>
    </main>
  );
}
