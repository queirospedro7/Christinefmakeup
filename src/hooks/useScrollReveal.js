import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook para animação de revelação de elementos ao scroll.
 * Otimizado para alto desempenho (GPU-accelerated, unobserve imediato, sem timeouts artificiais).
 * Reativo a mudanças de rota e a novos elementos adicionados dinamicamente.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Se o utilizador prefere movimento reduzido, revela tudo imediatamente
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealSelectors = '.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-fade, .reveal-scale, .reveal-blur, .reveal-stagger > *';

    const revealAll = () => {
      document.querySelectorAll(revealSelectors).forEach((el) => {
        el.classList.add('visible');
      });
    };

    if (prefersReducedMotion) {
      revealAll();
      return;
    }

    // Configuração do IntersectionObserver
    // threshold moderado e rootMargin inferior negativo para disparar quando o elemento realmente entra
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Deixa de observar logo que fica visível para poupar CPU/GPU
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(revealSelectors);
      const viewportHeight = window.innerHeight;

      elements.forEach((el) => {
        // Se o elemento já tem a classe 'visible', ignora
        if (el.classList.contains('visible')) return;

        // Se o elemento já está na parte superior do viewport no momento do carregamento, revela de imediato
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.85 && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    };

    // Pequeno delay para garantir que o DOM do React terminou a montagem da nova rota
    const initTimer = setTimeout(observeElements, 40);

    // MutationObserver leve para observar novos elementos adicionados (ex: filtros de portfolio ou faq)
    let mutationTimer = null;
    const mutationObserver = new MutationObserver(() => {
      if (mutationTimer) clearTimeout(mutationTimer);
      mutationTimer = setTimeout(observeElements, 60);
    });

    const mainContent = document.getElementById('main-content') || document.body;
    mutationObserver.observe(mainContent, { childList: true, subtree: true });

    return () => {
      clearTimeout(initTimer);
      if (mutationTimer) clearTimeout(mutationTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);
}
