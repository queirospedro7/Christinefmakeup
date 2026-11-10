import { handleContacto } from '../server/contacto.js';

export default {
  fetch(request) {
    if (process.env.VITE_CONTACT_FORMS !== 'true') {
      return Response.json({ success: false, message: 'Usa o email ou WhatsApp para enviar o teu pedido.' }, { status: 503 });
    }
    return handleContacto(request, { ip: request.headers.get('x-vercel-forwarded-for') || '' });
  },
};
