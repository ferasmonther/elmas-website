'use client';
import Link from 'next/link';
import { useState } from 'react';
import { packLabel, packPrice, products } from '@/content/site';
export function InquiryForm({
  kind,
  product = '',
  pack = '',
  ready,
  whatsappHref,
}: {
  kind: 'contact' | 'quote';
  product?: string;
  pack?: string;
  ready: boolean;
  whatsappHref?: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState(product);
  const [selectedPack, setSelectedPack] = useState(pack);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus(
        'Location is unavailable in this browser. Enter your delivery address below.',
      );
      return;
    }
    setLocating(true);
    setLocationStatus('Finding your current location…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDeliveryLocation(`${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`);
        setLocationStatus('Current location added. You can edit it if delivery is elsewhere.');
        setLocating(false);
      },
      (error) => {
        setLocationStatus(
          error.code === 1
            ? 'Location permission was not granted. Allow location access or enter your delivery address below.'
            : 'Could not find your location. Try again or enter your delivery address below.',
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }
  const currentProduct = products.find((p) => p.slug === selectedProduct);
  const currentPack = currentProduct?.packs.find((p) => p.id === selectedPack);
  const selection =
    currentProduct && currentPack ? packLabel(currentProduct, currentPack) : currentProduct?.name;
  const directWa = whatsappHref ? new URL(whatsappHref) : undefined;
  if (directWa && kind === 'quote')
    directWa.searchParams.set(
      'text',
      `Hello Elma’s, I would like to inquire about ${selection || 'your products'}.`,
    );
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
        setDeliveryLocation('');
        setLocationStatus('');
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
          maxLength={name === 'email' ? 254 : name === 'location' ? 2000 : 200}
          placeholder={
            name === 'location' ? 'Use current location or enter a delivery address' : undefined
          }
          value={name === 'location' ? deliveryLocation : undefined}
          onChange={name === 'location' ? (e) => setDeliveryLocation(e.target.value) : undefined}
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
          Online form submission is not available yet. Please send your inquiry through WhatsApp.
          <div className="direct-contact">
            {whatsappHref && (
              <a href={directWa?.toString()} target="_blank" rel="noopener noreferrer">
                WhatsApp your inquiry →
              </a>
            )}
          </div>
        </div>
      )}
      <div className="form-grid">
        {field('name', kind === 'quote' ? 'Full name' : 'Name')}
        {kind === 'quote' && field('company', 'Company / farm')}
        {field('email', 'Email', 'email')}
        {kind === 'quote' && field('phone', 'Phone', 'tel')}
        {kind === 'quote' && (
          <>
            <div className="field">
              <label htmlFor="product">Product</label>
              <select
                id="product"
                name="product"
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setSelectedPack('');
                }}
                required
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.product && <small className="error">Choose a product.</small>}
            </div>
            <div className="field">
              <label htmlFor="pack">Pack option (optional)</label>
              <select
                id="pack"
                name="pack"
                value={selectedPack}
                onChange={(e) => setSelectedPack(e.target.value)}
              >
                <option value="">
                  {currentProduct?.packs.length
                    ? 'Select a pack or discuss requirements'
                    : 'Inquiry-only / discuss requirements'}
                </option>
                {currentProduct?.packs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {packPrice(p)}
                  </option>
                ))}
              </select>
              {errors.pack && (
                <small className="error">Choose a pack belonging to this product.</small>
              )}
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
                </select>
              </div>
            </div>
            <div className="field full">
              <button
                className="button"
                type="button"
                onClick={useCurrentLocation}
                disabled={locating || sent}
              >
                {locating ? 'Finding location…' : 'Use my current location'}
              </button>
              <p className="note" role="status" aria-live="polite">
                {locationStatus}
              </p>
            </div>
            {field('location', 'Delivery location')}
          </>
        )}
        <div className="field full">
          <label htmlFor="message">
            {kind === 'quote' ? 'Tell us about your application' : 'Message'}
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
      <button className="button" disabled={!ready || busy || sent || locating} type="submit">
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
