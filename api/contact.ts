import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey) {
    return res.status(500).json({ message: 'Email service not configured' });
  }

  const sanitize = (s: string) => String(s).replace(/[\r\n\t\0]/g, ' ').trim().slice(0, 2000);
  const escape = (s: string) =>
    sanitize(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: 'info@drahoslava.com',
      subject: sanitize(`New message: ${subject ?? 'Website inquiry'}`),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Subject:</strong> ${escape(subject ?? 'Website inquiry')}</p>
        <p><strong>Message:</strong></p>
        <p>${escape(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Sent' });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ message: 'Failed to send' });
  }
}
