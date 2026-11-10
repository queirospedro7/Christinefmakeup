import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: 1.15, autoRaf: true, anchors: { offset: -88 } });
    window.lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let target = null;
      if (hash) {
        try {
          target = document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch {
          target = null;
        }
      }
      if (window.lenis) window.lenis.scrollTo(target || 0, { immediate: true, offset: target ? -88 : 0, force: true });
      else if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
