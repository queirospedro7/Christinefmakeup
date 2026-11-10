import { rm, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { renderPage } from '../dist-ssr/entry-server.js';
import { getPageMeta, pages, siteName, siteOrigin, socialImage } from '../src/data/seo.js';

const indexable = process.env.VITE_SITE_INDEXABLE === 'true';
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const titleSlot = '<title>Christine Fernandes Bridal Beauty</title>';
const rootSlot = '<div id="root"></div>';
if (!template.includes(titleSlot) || !template.includes(rootSlot)) {
  throw new Error('O modelo de publicação não contém os pontos de inserção esperados.');
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const meta = (key, value, attribute = 'name') =>
  '<meta ' + attribute + '="' + key + '" content="' + escapeHtml(value) + '">';
const og = (key, value) => meta('og:' + key, value, 'property');
const image = new URL(socialImage, siteOrigin).href;
const business = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': siteOrigin + '/#business',
  name: siteName,
  url: siteOrigin + '/',
  telephone: '+351968427599',
  email: 'christinef.makeup@gmail.com',
  logo: siteOrigin + '/img/branding/logo.png',
  image,
  sameAs: ['https://www.instagram.com/christinefmakeup', 'https://www.facebook.com/christinefmakeup'],
};

for (const path of [...Object.keys(pages), '/404']) {
  const { title, description, canonical } = getPageMeta(path, indexable);
  const metadata = [
    '<title>' + escapeHtml(title) + '</title>',
    meta('description', description),
    canonical ? '<link rel="canonical" href="' + escapeHtml(canonical) + '">' : meta('robots', 'noindex, follow'),
    og('type', 'website'),
    og('site_name', siteName),
    og('locale', 'pt_PT'),
    og('title', title),
    og('description', description),
    ...(canonical ? [og('url', canonical)] : []),
    og('image', image),
    og('image:alt', 'Noiva num salão de casamento'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
    meta('twitter:image', image),
  ];
  if (path === '/' && indexable) {
    metadata.push('<script type="application/ld+json">' + JSON.stringify(business).replaceAll('<', '\\u003c') + '</script>');
  }

  const html = template
    .replace(titleSlot, () => metadata.join('\n  '))
    .replace(rootSlot, () => '<div id="root">' + renderPage(path) + '</div>');
  const filename = path === '/' ? 'index.html' : path.slice(1) + '.html';
  await writeFile(new URL(filename, dist), html);
}

if (indexable) {
  const urls = Object.keys(pages).map((path) => '  <url><loc>' + new URL(path, siteOrigin).href + '</loc></url>');
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(new URL('sitemap.xml', dist), sitemap);
} else {
  await rm(new URL('sitemap.xml', dist), { force: true });
  await writeFile(new URL('robots.txt', dist), 'User-agent: *\nAllow: /\n');
}

const licences = new URL('licenses/', dist);
await mkdir(licences, { recursive: true });
for (const font of ['cormorant-garamond', 'montserrat']) {
  await copyFile(new URL('../node_modules/@fontsource-variable/' + font + '/LICENSE', import.meta.url), new URL(font + '.txt', licences));
}
