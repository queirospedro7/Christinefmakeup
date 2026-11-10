import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContacto } from './contacto.js';

const origin = 'https://christinefernandes.pt';
const valid = {
  tipo: 'orcamento',
  nome: 'Pessoa de teste',
  email: 'teste@example.com',
  telefone: '+351 912 345 678',
  local: 'Local de teste',
};

function request(data, overrides = {}) {
  return new Request(`${origin}/api/contacto`, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    ...overrides,
  });
}

test('só confirma pedidos aceites pelo servidor de correio', async () => {
  let message;
  const accepted = await handleContacto(request({ ...valid, _subject: 'Assunto ignorado' }), {
    ip: '192.0.2.1',
    deliver: async (value) => { message = value; },
  });
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).success, true);
  assert.equal(message.replyTo.address, valid.email);
  assert.equal(message.subject, 'Pedido de orçamento de noiva');
  assert.equal('html' in message, false);

  const failed = await handleContacto(request(valid), {
    ip: '192.0.2.2',
    deliver: async () => { throw new Error('Falha de teste'); },
  });
  assert.equal(failed.status, 503);
  assert.equal((await failed.json()).success, false);
});

test('rejeita método, origem, dados inválidos e pedidos demasiado grandes', async () => {
  const deliver = async () => assert.fail('O pedido inválido não deve ser enviado.');
  const cases = [
    [new Request(`${origin}/api/contacto`), 405],
    [request(valid, { headers: { Origin: 'https://example.com', 'Content-Type': 'application/json' } }), 403],
    [request({ ...valid, email: 'teste@example.com\r\nCc: x@example.com' }), 400],
    [request({ ...valid, tipo: 'formacao' }), 400],
    [request({ ...valid, _hp_check: 'bot' }), 400],
    [request({ ...valid, mensagem: 'x'.repeat(20_000) }), 413],
  ];
  for (const [req, status] of cases) {
    assert.equal((await handleContacto(req, { ip: '192.0.2.3', deliver })).status, status);
  }
});

test('aceita formação e limita pedidos repetidos', async () => {
  const data = { ...valid, tipo: 'formacao', formacao: 'Automaquilhagem', formacaoPrevia: 'Não' };
  const opts = { ip: '192.0.2.4', deliver: async () => {} };
  for (let i = 0; i < 5; i++) assert.equal((await handleContacto(request(data), opts)).status, 200);
  const blocked = await handleContacto(request(data), opts);
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('Retry-After'), '900');
});
