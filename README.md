# Christine Fernandes Bridal Beauty

Site em português de Portugal com React, Vite e páginas geradas em HTML no build. Os formulários usam a função Node.js `/api/contacto` na Vercel. O ficheiro `dist/` contém o site, mas um alojamento que só sirva ficheiros estáticos não executa a função de contacto.

## Desenvolvimento

Requer Node.js 24. Executa `npm ci`, `npm run dev` e abre o endereço mostrado no terminal. A API local usa a mesma validação da API de produção. Por defeito, os pedidos seguem por email direto ou WhatsApp. Para ativar os formulários, define VITE_CONTACT_FORMS=true e configura o SMTP.

- `npm test` verifica a validação e os casos de sucesso e erro com um transporte simulado.
- `npm run build` gera o HTML, o sitemap, a página 404 e os recursos em `dist/`.
- `npm run preview` pré-visualiza o resultado estático.
- `npm run check:publication -- --build-only` verifica o HTML e os recursos publicados.

## Demonstração na Vercel

A configuração predefinida permite partilhar o site por link sem SMTP e sem preencher dados legais. As páginas têm noindex e os pedidos podem ser feitos por contacto direto.

## Antes de publicar a versão final

Define VITE_SITE_INDEXABLE=true na Vercel para ativar a indexação, o sitemap e a validação dos dados legais no build.

1. Revoga as credenciais SMTP que estiveram gravadas na versão anterior. Se a versão anterior esteve pública, confirma também a remoção de `/api/contacto.php` de versões antigas acessíveis e de eventuais caches.
2. Copia `.env.example` para `.env.local` e preenche os valores locais. Na Vercel, define o domínio e os dados legais em Production. Configura o SMTP e os dados do fornecedor de correio se ativares os formulários. Os valores `VITE_*` são públicos e fazem parte do HTML. Guarda as credenciais SMTP só nas variáveis do servidor.
3. Confirma nome legal, NIF, morada, localização dos dois mapas e a entidade RAL competente. Regista o operador no Livro de Reclamações Eletrónico quando aplicável. Confirma as condições de reserva e livre resolução, as autorizações das fotografias, dos testemunhos e dos vídeos, os prestadores de dados, os prazos de conservação e as garantias de transferências internacionais.
4. Define o domínio canónico `christinefernandes.pt` na Vercel e redireciona as variantes do domínio. O build da Vercel verifica a presença da configuração antes de publicar. Executa também `npm run check:publication` após o build local.
5. Configura no firewall da Vercel uma regra de limitação de pedidos para `POST /api/contacto`, de acordo com o plano disponível. O limite em memória da aplicação é por instância e serve como segunda camada. Verifica o envio real dos dois formulários para a caixa de correio escolhida e confirma os registos SPF, DKIM e DMARC do remetente.
6. Confirma em produção o HTTPS, a página 404 com estado HTTP 404, o carregamento dos ficheiros de vídeo e a ausência de cookies opcionais. Se ativares análise de tráfego ou outras integrações, atualiza a política e aplica o consentimento prévio quando necessário.
7. No Google Search Console, cria a propriedade de domínio, verifica o registo DNS TXT e submete `https://christinefernandes.pt/sitemap.xml`. Inspeciona o início e algumas páginas internas na propriedade.

## Estrutura

- `src/pages/` — páginas e conteúdo.
- `src/components/` — navegação, componentes partilhados e metadados.
- `src/data/` — dados da galeria, identificação pública e metadados.
- `server/` e `api/` — validação, envio por SMTP e ponto de entrada da Vercel.
- `scripts/` — geração e verificação dos ficheiros publicados.
