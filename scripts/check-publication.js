import { access, readFile } from 'node:fs/promises';
import { getPageMeta, pages, siteOrigin } from '../src/data/seo.js';

const required = [
  'SITE_ORIGIN', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'DESTINATION_EMAIL',
  'VITE_LEGAL_NAME', 'VITE_LEGAL_ADDRESS', 'VITE_LEGAL_TAX_ID',
  'VITE_RAL_NAME', 'VITE_RAL_URL', 'VITE_MAIL_PROVIDER', 'VITE_PRIVACY_TRANSFERS',
];

if (!process.argv.includes('--build-only')) {
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    console.error('Configuração em falta:', missing.join(', '));
    process.exitCode = 1;
  } else if (process.env.SITE_ORIGIN !== siteOrigin || !/^https:\/\//.test(process.env.VITE_RAL_URL) ||
    !/^\d{9}$/.test(process.env.VITE_LEGAL_TAX_ID) || !['465', '587'].includes(process.env.SMTP_PORT || '465')) {
    console.error('Confirma o domínio canónico, o NIF, o endereço HTTPS da entidade RAL e a porta SMTP.');
    process.exitCode = 1;
  }
}

if (!process.argv.includes('--configuration-only')) {
  const dist = new URL('../dist/', import.meta.url);
  const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
  for (const path of [...Object.keys(pages), '/404']) {
    const html = await readFile(new URL(path === '/' ? 'index.html' : `${path.slice(1)}.html`, dist), 'utf8');
    const { canonical } = getPageMeta(path);
    if (!html.includes('lang="pt-PT"') || !/<h1[\s>]/.test(html) ||
      (canonical ? !html.includes(`rel="canonical" href="${canonical}"`) || !sitemap.includes(`<loc>${canonical}</loc>`) : !html.includes('noindex, follow'))) {
      throw new Error(`Metadados ou conteúdo incompletos para ${path}`);
    }
    const assets = [...html.matchAll(/(?:src|href)="(\/(?:assets|img|videos)\/[^"]+)"/g)];
    for (const [, asset] of assets) await access(new URL(asset.slice(1), dist));
  }
  const robots = await readFile(new URL('robots.txt', dist), 'utf8');
  if (!robots.includes(`${siteOrigin}/sitemap.xml`)) throw new Error('Sitemap ausente de robots.txt');
  console.log('HTML, metadados, sitemap e recursos locais verificados.');
}
