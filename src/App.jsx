import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PageMeta from './components/PageMeta';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Portfolio from './pages/Portfolio';
import Servicos from './pages/Servicos';
import Formacoes from './pages/Formacoes';
import Contacto from './pages/Contacto';
import Faq from './pages/Faq';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>

      <PageMeta />
      <a className="skip-link" href="#main-content" onClick={() => document.getElementById('main-content')?.focus()}>Saltar para o conteúdo</a>
      <SmoothScroll />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/formacoes" element={<Formacoes />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <BackToTop />

    </>
  );
}
