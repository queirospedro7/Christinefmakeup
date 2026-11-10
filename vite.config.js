import { Readable } from 'node:stream';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContacto } from './server/contacto.js';

export default defineConfig(({ mode, isSsrBuild }) => {
  const mailEnv = loadEnv(mode, process.cwd(), ['SMTP_', 'DESTINATION_EMAIL', 'SITE_ORIGIN']);
  for (const [key, value] of Object.entries(mailEnv)) process.env[key] ??= value;

  return {
    plugins: [
      react(),
      {
        name: 'local-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contacto', async (req, res) => {
            try {
              const method = req.method || 'GET';
              const request = new Request(`http://${req.headers.host}/api/contacto`, {
                method,
                headers: req.headers,
                ...(['GET', 'HEAD'].includes(method) ? {} : { body: Readable.toWeb(req), duplex: 'half' }),
              });
              const response = await handleContacto(request, { ip: req.socket.remoteAddress });
              res.writeHead(response.status, Object.fromEntries(response.headers));
              res.end(await response.text());
            } catch {
              res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' });
              res.end(JSON.stringify({ success: false, message: 'O pedido é inválido.' }));
            }
          });
        },
      },
    ],
    server: { port: 3000 },
    build: { target: 'es2022', copyPublicDir: !isSsrBuild },
  };
});
