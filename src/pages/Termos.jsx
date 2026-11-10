import { Link } from 'react-router-dom';
import { business } from '../data/business';

export default function Termos() {
  return (
    <main id="main-content" tabIndex={-1} className="section-pad">
      <article className="container legal-copy">
        <h1>Termos e <em>Condições</em></h1>
        <p>Atualizados em <time dateTime="2026-11-09">9 de novembro de 2026</time>.</p>

        <h2>Identificação da prestadora</h2>
        <p>{business.name}, sob a marca {business.brand}, presta serviços de maquilhagem, penteado e formação. Contactos: <a href={`mailto:${business.email}`}>{business.email}</a> e <a href="tel:+351968427599">{business.phone}</a>.</p>
        {business.address && <p>Morada: {business.address}.</p>}
        {business.taxId && <p>NIF: {business.taxId}.</p>}

        <h2>Pedidos e reservas</h2>
        <p>O envio de um formulário é um pedido de informação ou orçamento. A disponibilidade, os serviços incluídos, o preço total, as despesas de deslocação e as condições de pagamento são comunicados antes da contratação. A reserva é confirmada por escrito, nas condições indicadas na proposta.</p>

        <h2>Alterações, cancelamentos e livre resolução</h2>
        <p>As condições de cancelamento, reagendamento e eventual sinal são comunicadas antes da reserva e aplicam-se dentro dos limites legais. Em contratos celebrados à distância ou fora do estabelecimento, aplicam-se os direitos previstos na lei, incluindo a livre resolução quando aplicável e as respetivas exceções. As condições e as instruções para exercer esse direito são disponibilizadas antes de o cliente ficar vinculado.</p>

        <h2>Fotografias e conteúdos</h2>
        <p>A utilização promocional de imagens identificáveis de clientes depende de autorização separada. Os conteúdos do site só podem ser reutilizados com a autorização do titular dos direitos ou quando a lei o permitir.</p>

        <h2>Reclamações e litígios de consumo</h2>
        <p>As reclamações podem ser enviadas para <a href={`mailto:${business.email}`}>{business.email}</a> ou apresentadas no <a href="https://www.livroreclamacoes.pt/">Livro de Reclamações Eletrónico</a>.</p>
        {business.ralName && business.ralUrl && <p>Entidade de resolução alternativa de litígios de consumo: <a href={business.ralUrl}>{business.ralName}</a>.</p>}
        <p>Consulte também a <Link to="/privacidade">Política de Privacidade</Link>.</p>
      </article>
    </main>
  );
}
