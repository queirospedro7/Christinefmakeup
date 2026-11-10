import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '../data/seo';

function updateTag(selector, attribute, value, create) {
  const existing = document.head.querySelector(selector);
  if (!value) {
    existing?.remove();
    return;
  }
  const element = existing ?? create();
  element.setAttribute(attribute, value);
  if (!existing) document.head.append(element);
}

export default function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description, canonical } = getPageMeta(pathname);
    document.title = title;
    const setMeta = (key, value, attribute = 'name') => {
      updateTag(`meta[${attribute}="${key}"]`, 'content', value, () => {
        const meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        return meta;
      });
    };
    setMeta('description', description);
    setMeta('robots', canonical ? null : 'noindex, follow');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    updateTag('link[rel="canonical"]', 'href', canonical, () => {
      const link = document.createElement('link');
      link.rel = 'canonical';
      return link;
    });
  }, [pathname]);
  return null;
}
