'use client';
import { assetUrl } from '@/lib/assets';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '@/content/site';
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" aria-label="Elma’s home" onClick={() => setOpen(false)}>
          <Image
            src={assetUrl('/assets/logo/elmas-logo.svg')}
            alt="Elma’s"
            width={151}
            height={43}
            priority
          />
        </Link>
        <button
          className="menu"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
        <nav id="main-nav" aria-label="Main navigation" className={open ? 'open' : ''}>
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path.startsWith(n.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link className="button small" href="/request-quote" onClick={() => setOpen(false)}>
            Request a Quote <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
