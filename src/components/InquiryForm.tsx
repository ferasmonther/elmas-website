'use client';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/content/site';
export function InquiryForm({
  kind,
  product = '',
  ready,
  emailHref,
  whatsappHref,
}: {
  kind: 'contact' | 'quote';
  product?: string;
  ready: boolean;
  emailHref?: string;
  whatsappHref?: string;
}) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [sent, setSent] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    setErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind, consent: data.consent === 'on' }),
      });
      const json = await res.json();
      setStatus(json.message);
      setErrors(json.errors || {});
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } catch {
      setStatus('Connection failed. Your message has not been confirmed. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  function field(name: string, label: string, type = 'text', required = true) {
    return (
      <div className="field" key={name}>
        <label htmlFor={name}>
          {label}
          {!required && ' (optional)'}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          maxLength={name === 'email' ? 254 : 200}
          minLength={name === 'name' ? 2 : undefined}
          autoComplete={
            {
              name: 'name',
              email: 'email',
              company: 'organization',
              phone: 'tel',
              location: 'address-level2',
            }[name]
          }
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <small id={`${name}-error`} className="error">
            {errors[name].join(' ')}
          </small>
        )}
      </div>
    );
  }
  return (
    <form className="inquiry-form" onSubmit={submit}>
      {!ready && (
        <div className="notice" role="status">
          Online form submission is not available yet. Please send your inquiry directly by email or
          WhatsApp.
          <div className="direct-contact">
            {emailHref && <a href={emailHref}>Email your inquiry →</a>}
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp your inquiry →
              </a>
            )}
          </div>
        </div>
      )}
      <div className="form-grid">
        {field('name', 'Full name')}
        {field('company', 'Company / farm', 'text', kind === 'quote')}
        {field('email', 'Email', 'email')}
        {field('phone', 'Phone', 'tel', kind === 'quote')}
        {kind === 'quote' && (
          <>
            <div className="field">
              <label htmlFor="product">Product</label>
              <select id="product" name="product" defaultValue={product} required>
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.product && <small className="error">Choose a product.</small>}
            </div>
            <div className="quantity">
              <div className="field">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0.001"
                  step="any"
                  max="1000000000"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="unit">Unit</label>
                <select id="unit" name="unit" required defaultValue="">
                  <option value="">Select unit</option>
                  <option value="kg">kg</option>
                  <option value="tonnes">tonnes</option>
                  <option value="other">Other (specify below)</option>
                </select>
              </div>
            </div>
            {field('location', 'Delivery location')}
          </>
        )}
        <div className="field full">
          <label htmlFor="message">
            {kind === 'quote' ? 'Tell us about your application' : 'How can we help?'}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            minLength={10}
            maxLength={4000}
            required
            placeholder="Share your requirements and any questions for our team."
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && (
            <small className="error">Please write between 10 and 4,000 characters.</small>
          )}
        </div>
      </div>
      <div className="honey" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />{' '}
        <span>
          I agree that Elma’s may use these details to respond to this inquiry, as described in the{' '}
          <Link href="/privacy">privacy policy</Link>.
        </span>
      </label>
      <button className="button" disabled={!ready || busy || sent} type="submit">
        {busy
          ? 'Submitting…'
          : sent
            ? 'Inquiry submitted'
            : kind === 'quote'
              ? 'Send quote request →'
              : 'Send message →'}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
