import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { renderPage } from '../dist-ssr/entry-server.js';
import { getPageMeta, pages, siteName, siteOrigin, socialImage } from '../src/data/seo.js';

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
if (!template.includes('<title>Christine Fernandes Bridal Beauty</title>') || !template.includes('<div id="root"></div>')) {
  throw new Error('O modelo de publicação não contém os pontos de inserção esperados.');
}

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const meta = (key, value, attribute = 'name') => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
const image = new URL(socialImage, siteOrigin).href;
const business = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteOrigin}/#business`,
  name: siteName,
  url: `${siteOrigin}/`,
  telephone: '+351968427599',
  email: 'christinef.makeup@gmail.com',
  logo: `${siteOrigin}/img/branding/logo.png`,
  image,
  sameAs: ['https://www.instagram.com/christinefmakeup', 'https://www.facebook.com/christinefmakeup'],
};

for (const path of [...Object.keys(pages), '/404']) {
  const { title, description, canonical } = getPageMeta(path);
  const metadata = [
    `<title>${escapeHtml(title)}</title>`,
    meta('description', description),
    canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : meta('robots', 'noindex, follow'),
    meta('og:type', 'website', 'property'),
    meta('og:site_name', siteName, 'property'),
    meta('og:locale', 'pt_PT', 'property'),
    meta('og:title', title, 'property'),
    meta('og:description', description, 'property'),
    ...(canonical ? [meta('og:url', canonical, 'property')] : []),
    meta('og:image', image, 'property'),
    meta('og:image:alt', 'Noiva num salão de casamento', 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
    meta('twitter:image', image),
    ...(path === '/' ? [`<script type="application/ld+json">${JSON.stringify(business).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n  ');
  const html = template
    .replace('<title>Christine Fernandes Bridal Beauty</title>', () => metadata)
    .replace('<div id="root"></div>', () => `<div id="root">${renderPage(path)}</div>`);
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  await writeFile(new URL(`../dist/${file}`, import.meta.url), html);
}

const urls = Object.keys(pages).map((path) => `  <url><loc>${new URL(path, siteOrigin).href}</loc></url>`).join('\n');
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const licences = new URL('../dist/licenses/', import.meta.url);
await mkdir(licences, { recursive: true });
for (const font of ['cormorant-garamond', 'montserrat']) {
  await copyFile(new URL(`../node_modules/@fontsource-variable/${font}/LICENSE`, import.meta.url), new URL(`${font}.txt`, licences));
}
