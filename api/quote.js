// Emails quote requests to the shop. Needs RESEND_API_KEY; QUOTE_TO and QUOTE_FROM are optional.
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]).slice(0, 2000);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'Email is not configured' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  if (!body.name || !body.phone) return res.status(400).json({ error: 'Name and phone are required' });

  const rows = [['Name', body.name], ['Phone', body.phone], ['Product', body.product], ['Quantity', body.quantity], ['Details', body.details], ['Language', body.lang]]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join('');

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM || 'Prottoya Website <onboarding@resend.dev>',
      to: [process.env.QUOTE_TO || 'prottoyabd68@gmail.com'],
      subject: `Quote request: ${esc(body.product)} from ${esc(body.name)}`,
      html: `<h2>New quote request</h2><table>${rows}</table>`,
    }),
  });
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
