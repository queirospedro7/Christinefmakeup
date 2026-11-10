import { isIP } from 'node:net';

const limits = new Map();
const maxBodyBytes = 16_384;
const fallback = 'Não foi possível enviar o pedido. Tenta novamente ou usa o email indicado nesta página.';
const fields = {
  nome: ['Nome', 120],
  email: ['Email', 254],
  telefone: ['Telefone', 35],
  local: ['Local do casamento', 250],
  data: ['Data do casamento', 30],
  hora: ['Hora da cerimónia', 30],
  formacao: ['Formação pretendida', 150],
  formacaoPrevia: ['Formação prévia', 150],
  instagram: ['Instagram', 100],
  comoChegou: ['Como conheceu o atelier', 120],
  mensagem: ['Mensagem', 4000],
};

function reply(status, message, headers) {
  return Response.json({ success: status === 200, message }, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
}

async function readJson(request) {
  if (Number(request.headers.get('content-length')) > maxBodyBytes) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBodyBytes) {
      void reader.cancel().catch(() => {});
      throw new RangeError();
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  if (data._hp_check || !['orcamento', 'formacao'].includes(data.tipo)) return null;
  const values = {};
  for (const [key, [, maxLength]] of Object.entries(fields)) {
    const value = data[key] ?? '';
    if (typeof value !== 'string' || value.length > maxLength) return null;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) return null;
    values[key] = value.trim();
  }
  if (!values.nome || !/^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]+$/u.test(values.email)) return null;
  if (!/^\+?[\d ().-]{6,35}$/u.test(values.telefone) || values.telefone.replace(/\D/g, '').length < 6) return null;
  if (data.tipo === 'orcamento' ? !values.local : !values.formacao || !values.formacaoPrevia) return null;
  return values;
}

function allowRequest(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  for (const [key, entry] of limits) if (entry.expires <= now) limits.delete(key);
  if (!limits.has(ip) && limits.size >= 1000) return false;
  const entry = limits.get(ip) ?? { count: 0, expires: now + windowMs };
  if (entry.count >= 5) return false;
  entry.count += 1;
  limits.set(ip, entry);
  return true;
}

async function sendMail(message) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, DESTINATION_EMAIL } = process.env;
  const port = Number(SMTP_PORT || 465);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !DESTINATION_EMAIL || ![465, 587].includes(port)) {
    throw new Error('SMTP não configurado');
  }
  const { default: nodemailer } = await import('nodemailer');
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
  const result = await transport.sendMail({ ...message, from: SMTP_FROM, to: DESTINATION_EMAIL });
  if (!result.accepted?.length) throw new Error('O servidor SMTP recusou o destinatário');
}

export async function handleContacto(request, { ip = '', deliver = sendMail } = {}) {
  if (request.method !== 'POST') return reply(405, 'Método não permitido.', { Allow: 'POST' });
  const origin = request.headers.get('origin');
  const siteOrigin = new URL(request.url).origin;
  const local = !process.env.VERCEL && ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname);
  const sameOrigin = origin === siteOrigin || origin === process.env.SITE_ORIGIN;
  if ((!sameOrigin && !(local && !origin)) || request.headers.get('sec-fetch-site') === 'cross-site') {
    return reply(403, 'Origem do pedido não autorizada.');
  }
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) {
    return reply(415, 'Formato de pedido não suportado.');
  }
  const client = ip.split(',')[0].trim();
  if (!allowRequest(isIP(client) ? client : 'unknown')) {
    return reply(429, 'Já foram enviados vários pedidos. Tenta novamente mais tarde.', { 'Retry-After': '900' });
  }

  let data;
  try {
    data = await readJson(request);
  } catch (error) {
    return error instanceof RangeError
      ? reply(413, 'O pedido é demasiado grande.')
      : reply(400, 'O pedido é inválido.');
  }
  const values = validate(data);
  if (!values) return reply(400, 'Verifica os campos obrigatórios e o tamanho da mensagem.');

  const subject = data.tipo === 'formacao' ? 'Pedido de informação sobre formação' : 'Pedido de orçamento de noiva';
  const text = Object.entries(fields)
    .filter(([key]) => values[key])
    .map(([key, [label]]) => `${label}: ${values[key]}`)
    .join('\n');
  try {
    await deliver({ replyTo: { address: values.email }, subject, text });
    return reply(200, 'Pedido enviado.');
  } catch {
    return reply(503, fallback);
  }
}
