import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createHash } from 'node:crypto';
import { packLabel, products } from '@/content/site';
import { inquirySchema, limiter } from '@/lib/inquiries';
import { emailReady, siteUrl } from '@/lib/config';
export const runtime = 'nodejs';
const reply = (message: string, status: number, extra = {}) =>
  NextResponse.json({ message, ...extra }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const expectedOrigin =
    (process.env.NODE_ENV === 'production' ? siteUrl() : undefined) ||
    `${new URL(req.url).protocol}//${req.headers.get('host')}`;
  if (!origin || origin !== expectedOrigin) return reply('Please submit from this website.', 403);
  if (!req.headers.get('content-type')?.includes('application/json'))
    return reply('Unsupported request format.', 415);
  const length = Number(req.headers.get('content-length') || 0);
  if (length > 20000) return reply('Your message is too long.', 413);
  // Only trust an IP header explicitly configured by the host. Otherwise use a conservative shared bucket.
  const header = process.env.TRUSTED_CLIENT_IP_HEADER;
  const key = createHash('sha256')
    .update(header ? req.headers.get(header) || 'shared' : 'shared')
    .digest('hex');
  if (!limiter.take(key)) return reply('Too many attempts. Please try again in 15 minutes.', 429);
  let body: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) return reply('Invalid request.', 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 20000) {
        await reader.cancel();
        return reply('Your message is too long.', 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    return reply('Invalid request.', 400);
  }
  const result = inquirySchema.safeParse(body);
  if (!result.success)
    return reply('Please check the highlighted fields.', 400, {
      errors: result.error.flatten().fieldErrors,
    });
  const data = result.data;
  if (data.website) return reply('Unable to accept this submission.', 400);
  if (!emailReady())
    return reply(
      'Online messages are temporarily unavailable. Please use the contact details shown on our contact page, or return later. Your message has not been sent.',
      503,
    );
  const port = Number(process.env.SMTP_PORT || 587);
  if (![465, 587].includes(port))
    return reply('Messaging is temporarily unavailable. Your message has not been sent.', 503);
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      disableFileAccess: true,
      disableUrlAccess: true,
      connectionTimeout: 10000,
      socketTimeout: 15000,
    });
    const info = await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: data.email,
      subject: `Elma’s ${data.kind === 'quote' ? 'quotation request' : 'contact inquiry'}${data.product ? ` — ${data.product}` : ''}`,
      text: Object.entries({
        ...data,
        pack: (() => {
          const p = products.find((p) => p.slug === data.product);
          const pack = p?.packs.find((pack) => pack.id === data.pack);
          return p && pack ? packLabel(p, pack) : '';
        })(),
      })
        .filter(([k]) => k !== 'website')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n\n'),
    });
    if (!info.accepted?.length) throw new Error('No recipient accepted');
    return reply(
      'Thank you. Your inquiry has been submitted to Elma’s. We’ll respond using the details you provided.',
      200,
    );
  } catch {
    console.error('Inquiry email service failed; no submission data logged.');
    return reply(
      'We couldn’t submit your message. Please try again later or use our other contact options.',
      502,
    );
  }
}
