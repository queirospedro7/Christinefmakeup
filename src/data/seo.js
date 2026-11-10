export const siteOrigin = 'https://christinefernandes.pt';
export const siteName = 'Christine Fernandes Bridal Beauty';
export const socialImage = '/img/noiva/inicio-abertura.webp';

export const pages = {
  '/': ['Christine Fernandes | Maquilhagem e penteados de noiva', 'Maquilhagem e penteados de noiva por Christine Fernandes. Conheça o portfólio, os serviços e as formações em Portugal.'],
  '/sobre': ['Sobre Christine Fernandes e o atelier', 'Conheça Christine Fernandes, a sua equipa, o atelier e os Wedding Awards.'],
  '/portfolio': ['Portfólio de maquilhagem e penteados de noiva', 'Fotografias de noivas, penteados, maquilhagem e bastidores do trabalho de Christine Fernandes.'],
  '/servicos': ['Serviços de maquilhagem e penteado de noiva', 'Serviços para noivas, madrinhas e convidadas. Saiba como funciona a prova e o pedido de orçamento.'],
  '/formacoes': ['Formações de maquilhagem', 'Conheça as formações de maquilhagem de Christine Fernandes e peça informações sobre programas, datas e vagas.'],
  '/contacto': ['Contacto e pedidos de orçamento', 'Peça um orçamento para maquilhagem e penteado de noiva ou contacte diretamente o atelier.'],
  '/faq': ['Perguntas frequentes', 'Respostas sobre reservas, provas, deslocações, maquilhagem, penteados e formações.'],
  '/privacidade': ['Política de Privacidade e Cookies', 'Informação sobre dados pessoais, formulários, cookies e direitos dos titulares dos dados.'],
  '/termos': ['Termos e Condições', 'Informação sobre pedidos, reservas, cancelamentos, reclamações e condições de utilização do site.'],
};

export function getPageMeta(pathname, indexable) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const page = Object.hasOwn(pages, path) ? pages[path] : null;
  return {
    title: page ? (path === '/' ? page[0] : `${page[0]} | Christine Fernandes`) : 'Página não encontrada | Christine Fernandes',
    description: page?.[1] ?? 'A página pedida não está disponível.',
    canonical: page && indexable ? new URL(path, siteOrigin).href : null,
  };
}
