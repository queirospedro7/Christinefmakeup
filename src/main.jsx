import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './css/global.css';
import './css/home.css';
import './css/sobre.css';
import './css/portfolio.css';
import './css/servicos.css';
import './css/formacoes.css';
import './css/contacto.css';

try {
  for (const key of ['cf_pedidos_orcamento', 'cf_pedidos_formacao', 'cf_form_security_log_v1', 'cf_cookie_consent_v1']) {
    localStorage.removeItem(key);
  }
} catch {
}

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
