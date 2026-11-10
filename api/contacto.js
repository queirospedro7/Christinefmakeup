import { handleContacto } from '../server/contacto.js';

export default {
  fetch(request) {
    return handleContacto(request, { ip: request.headers.get('x-vercel-forwarded-for') || '' });
  },
};
