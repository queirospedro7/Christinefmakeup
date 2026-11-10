const fallback = 'Não foi possível enviar o pedido. Tenta novamente ou usa o email indicado nesta página.';

export async function sendLeadEmail(payload) {
  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(45_000),
    });
    const data = await response.json();
    return {
      success: response.ok && data.success === true,
      message: typeof data.message === 'string' ? data.message : fallback,
    };
  } catch {
    return { success: false, message: fallback };
  }
}
